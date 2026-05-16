import { registerTegakiElement } from '../node_modules/tegaki/dist/wc/index.mjs';
import caveat from '../node_modules/tegaki/dist/fonts/caveat/bundle.mjs';

// Register the custom element — also synchronously upgrades any
// <tegaki-renderer> elements already in the DOM.
registerTegakiElement();

// Attach the Caveat bundle to every renderer on the page.
document.querySelectorAll('tegaki-renderer').forEach(el => {
  el.font = caveat;
});
