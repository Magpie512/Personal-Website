import { registerTegakiElement } from 'tegaki/wc';
import caveat from 'tegaki/fonts/caveat';

// Register the custom element — also synchronously upgrades any
// <tegaki-renderer> elements already in the DOM.
registerTegakiElement();

// Attach the Caveat bundle to every renderer on the page.
document.querySelectorAll('tegaki-renderer').forEach(el => {
  el.font = caveat;
});
