import { bootstrap } from '../../layout/bootstrap';
import { $ } from '../../utils/dom';
import { initReveal } from '../../utils/reveal';
import { renderConsultation } from '../../components/consultation/consultation';
import { renderWorks } from '../../components/works/works';
import { initReviews } from './reviews';
import { initLicenses } from './licenses';
import './academy.css';

bootstrap('academy');

renderWorks($('#works'));
initLicenses($('#licenses'));
initReviews($('#reviews'));
renderConsultation($('#consultation'));

// Запускаем последним, чтобы анимация подхватила и отрисованные из TS блоки
initReveal();
