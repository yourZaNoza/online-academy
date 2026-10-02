import { bootstrap } from '../../layout/bootstrap';
import { $ } from '../../utils/dom';
import { initReveal } from '../../utils/reveal';
import { renderConsultation } from '../../components/consultation/consultation';
import { initReviews } from './reviews';
import { initWorks, renderLicenses } from './works';
import './academy.css';

bootstrap('academy');

initWorks($('#works-filters'), $('#works-grid'));
renderLicenses($('#licenses-grid'));
initReviews($('#reviews'));
renderConsultation($('#consultation'));

// Запускаем последним, чтобы анимация подхватила и отрисованные из TS блоки
initReveal();
