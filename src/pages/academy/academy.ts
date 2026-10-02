import { bootstrap } from '../../layout/bootstrap';
import { $ } from '../../utils/dom';
import { initReveal } from '../../utils/reveal';
import { initConsultationForm } from './consultation-form';
import { initReviews } from './reviews';
import { initWorks, renderLicenses } from './works';
import './academy.css';

bootstrap('academy');

initWorks($('#works-filters'), $('#works-grid'));
renderLicenses($('#licenses-grid'));
initReviews($('#reviews'));
initConsultationForm($<HTMLFormElement>('#consultation-form'));

// Запускаем последним, чтобы анимация подхватила и отрисованные из TS блоки
initReveal();
