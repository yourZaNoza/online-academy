<?php
// Журнал согласий на cookie: каждое нажатие «Согласен» в баннере записывается сюда.
// Нужен, чтобы при проверке подтвердить, когда и на какую версию политики посетитель дал согласие.
// Браузер шлёт POST из src/utils/consent.ts.
//
// Записи — по одной JSON-строке в файлах data/consents-ГГГГ-ММ.jsonl (новый файл каждый месяц).
// Папку можно поменять в config.php → 'dataDir'. Открыть её из браузера нельзя (.htaccess).

declare(strict_types=1);

const MAX_FILE_BYTES = 20 * 1024 * 1024; // защита от переполнения диска ботами

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

$config = is_file(__DIR__ . '/config.php') ? require __DIR__ . '/config.php' : [];
$dir = rtrim($config['dataDir'] ?? __DIR__ . '/data', '/\\');

$id = (string)($_POST['id'] ?? '');
$decision = (string)($_POST['decision'] ?? '');
$version = (string)($_POST['version'] ?? '');
$page = (string)($_POST['page'] ?? '');

$valid = preg_match('/^[0-9a-f-]{32,36}$/i', $id)
    && $decision === 'accepted'
    && preg_match('/^[\w-]{1,20}$/', $version)
    && preg_match('#^/[\w\-/.]{0,200}$#', $page);
if (!$valid) {
    http_response_code(422);
    exit;
}

/** IP без последней части (192.168.1.x → 192.168.1.0): для подтверждения хватает, лишнего не храним */
function masked_ip(string $ip): string
{
    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
        return preg_replace('/\.\d+$/', '.0', $ip);
    }
    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6)) {
        return implode(':', array_slice(explode(':', inet_ntop(inet_pton($ip))), 0, 3)) . '::';
    }
    return '';
}

$record = [
    'time' => date(DATE_ATOM),
    'id' => strtolower($id),
    'decision' => $decision,
    'version' => $version,
    'page' => $page,
    'ip' => masked_ip((string)($_SERVER['REMOTE_ADDR'] ?? '')),
    'userAgent' => mb_substr((string)($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 300),
];

if (!is_dir($dir) && !mkdir($dir, 0750, true)) {
    error_log("consent.php: не удалось создать папку {$dir}");
    http_response_code(500);
    exit;
}
// Если папка внутри сайта — закрываем её от браузера
if (!is_file("{$dir}/.htaccess")) {
    file_put_contents("{$dir}/.htaccess", "Require all denied\n");
}

$file = "{$dir}/consents-" . date('Y-m') . '.jsonl';
if (is_file($file) && filesize($file) > MAX_FILE_BYTES) {
    error_log("consent.php: файл {$file} больше лимита, запись пропущена");
    http_response_code(507);
    exit;
}

$line = json_encode($record, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . "\n";
if (file_put_contents($file, $line, FILE_APPEND | LOCK_EX) === false) {
    error_log("consent.php: не удалось записать в {$file}");
    http_response_code(500);
    exit;
}

http_response_code(204);
