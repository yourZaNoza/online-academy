// Страница «Связь» (pages/contacts/index.html): шапка, форма обратной связи, подвал.

import { bootstrap } from '../../layout/bootstrap';
import { renderConsultation } from '../../components/consultation/consultation';
import { $ } from '../../utils/dom';
import { initReveal } from '../../utils/reveal';

bootstrap('contacts');
renderConsultation($('#consultation'));
initReveal();
