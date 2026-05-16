import { registerTegakiElement } from 'https://esm.sh/tegaki/wc';
import caveat from 'https://esm.sh/tegaki/fonts/caveat';

registerTegakiElement();

window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('tegaki-renderer').forEach(el => {
        el.font = caveat;
    });
});