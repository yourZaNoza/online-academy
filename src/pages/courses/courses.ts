// Страница «Курсы» (pages/courses/index.html)

import { bootstrap } from '../../layout/bootstrap';
import { initReveal } from '../../utils/reveal';
import { initCatalog } from './catalog';
import { renderPlans } from './plans';
import './courses.css';

bootstrap('courses');
initCatalog();
renderPlans();
initReveal();
