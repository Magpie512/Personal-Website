import { registerTegakiElement } from 'https://esm.sh/tegaki/wc';
import caveat from 'https://esm.sh/tegaki/fonts/caveat';

registerTegakiElement();

addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('tegaki-renderer').forEach(el => {
        el.font = caveat;
        const s = el.getAttribute('data-size');
        if (s) el.style.fontSize = s;
    });
});