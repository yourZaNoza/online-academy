<?php
// Приём заявки из формы «Получите консультацию» и отправка письма на почту академии.
// Форма шлёт сюда POST из src/components/consultation/consultation-form.ts.
//
// Письмо уходит с ящика академии самому себе через SMTP Яндекса:
//   тема  — имя, телефон и удобное время звонка;
//   текст — обращение;
//   «Ответить» (Reply-To) — почта посетителя.
// Логин и пароль приложения — в config.php рядом (образец — config.example.php).

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

/** Ответ форме и выход */
function respond(int $status, array $data): never
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'method']);
}

$configFile = __DIR__ . '/config.php';
if (!is_file($configFile)) {
    error_log('send.php: нет файла config.php');
    respond(500, ['ok' => false, 'error' => 'config']);
}
$config = require $configFile;

// Скрытое поле-ловушка: человек его не видит, а боты заполняют
if (trim((string)($_POST['website'] ?? '')) !== '') {
    respond(200, ['ok' => true]);
}

/** Значение поля без переносов строк и лишних пробелов (текст не в UTF-8 — пустая строка) */
function field(string $name, int $max): string
{
    $value = trim(preg_replace('/\s+/u', ' ', (string)($_POST[$name] ?? '')) ?? '');
    return mb_substr($value, 0, $max);
}

const CALL_TIMES = [
    '9-12' => 'утром, 9:00–12:00',
    '12-15' => 'днём, 12:00–15:00',
    '15-18' => 'вечером, 15:00–18:00',
];

$name = field('name', 100);
$phone = field('phone', 30);
$email = field('email', 254);
$callTime = CALL_TIMES[(string)($_POST['callTime'] ?? '')] ?? '';
$message = (string)($_POST['message'] ?? '');
$message = mb_check_encoding($message, 'UTF-8') ? trim(str_replace("\r\n", "\n", $message)) : '';
$consent = !empty($_POST['consent']);

// Те же проверки, что в форме: в браузере их можно обойти
$errors = [];
if (mb_strlen($name) < 2) $errors[] = 'name';
if (strlen(preg_replace('/\D/', '', $phone)) !== 11) $errors[] = 'phone';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'email';
if ($callTime === '') $errors[] = 'callTime';
if ($message === '' || mb_strlen($message) > 500) $errors[] = 'message';
if (!$consent) $errors[] = 'consent';
if ($errors) {
    respond(422, ['ok' => false, 'error' => 'validation', 'fields' => $errors]);
}

// Откуда пришёл посетитель (utm-метки или сайт-источник) — есть, только если он согласился на cookie
$source = mb_substr(trim(preg_replace('/\s+/u', ' ', (string)($_COOKIE['lead_source'] ?? '')) ?? ''), 0, 300);

$subject = "Заявка с сайта: {$name}, {$phone}, звонок {$callTime}";
$body = $message . "\n\n—\nПочта для ответа: {$email}\n"
    . ($source !== '' ? "Источник: {$source}\n" : '')
    . 'Отправлено с формы на сайте.';

try {
    smtp_send($config, $config['to'], $email, $subject, $body);
} catch (Throwable $e) {
    error_log('send.php: ' . $e->getMessage());
    respond(502, ['ok' => false, 'error' => 'send']);
}

respond(200, ['ok' => true]);

/** Заголовок в UTF-8 (кириллица в теме и имени отправителя) */
function encode_header(string $text): string
{
    return mb_encode_mimeheader($text, 'UTF-8', 'B', "\r\n");
}

/** Отправка одного письма по SMTP с авторизацией (AUTH LOGIN). */
function smtp_send(array $config, string $to, string $replyTo, string $subject, string $body): void
{
    $from = $config['user'];
    $address = ($config['secure'] ?? 'ssl') === 'ssl' ? "ssl://{$config['host']}:{$config['port']}" : "tcp://{$config['host']}:{$config['port']}";
    $socket = @stream_socket_client($address, $errno, $errstr, 15);
    if (!$socket) {
        throw new RuntimeException("Нет соединения с {$address}: {$errstr} ({$errno})");
    }
    stream_set_timeout($socket, 15);

    $expect = function (int $code) use ($socket): void {
        $reply = '';
        while (($line = fgets($socket, 515)) !== false) {
            $reply .= $line;
            // Последняя строка ответа: «250 OK», промежуточные — «250-...»
            if (strlen($line) < 4 || $line[3] === ' ') break;
        }
        if ((int)substr($reply, 0, 3) !== $code) {
            throw new RuntimeException("SMTP: ждали {$code}, получили «" . trim($reply) . '»');
        }
    };
    $command = function (string $line, int $code) use ($socket, $expect): void {
        fwrite($socket, $line . "\r\n");
        $expect($code);
    };

    try {
        $expect(220);
        $command('EHLO ' . ($_SERVER['SERVER_NAME'] ?? 'localhost'), 250);
        $command('AUTH LOGIN', 334);
        $command(base64_encode($config['user']), 334);
        $command(base64_encode($config['password']), 235);
        $command("MAIL FROM:<{$from}>", 250);
        $command("RCPT TO:<{$to}>", 250);
        $command('DATA', 354);

        $domain = substr(strrchr($from, '@'), 1);
        $headers = [
            'Date: ' . date(DATE_RFC2822),
            'From: ' . encode_header($config['fromName']) . " <{$from}>",
            "To: <{$to}>",
            "Reply-To: <{$replyTo}>",
            'Subject: ' . encode_header($subject),
            'Message-ID: <' . bin2hex(random_bytes(12)) . "@{$domain}>",
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: base64',
        ];
        // base64 не содержит строк, начинающихся с точки, — конец письма не перепутается
        fwrite($socket, implode("\r\n", $headers) . "\r\n\r\n" . chunk_split(base64_encode($body), 76, "\r\n") . ".\r\n");
        $expect(250);
        $command('QUIT', 221);
    } finally {
        fclose($socket);
    }
}
