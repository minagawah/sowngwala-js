/**
 * This is for checking.
 * It runs on the demo page.
 *
 * @module sowngwala/check
 */

import { create_dom_element_controller } from './controllers/dom_element';
import { create_event_listener_controller } from './controllers/event_listener';

window.addEventListener('load', () => {
  const dom = create_dom_element_controller();
  const event = create_event_listener_controller(dom);

  if (dom.register_elements()) {
    dom.fill_dates();
    event.register_listeners();
  }
});
