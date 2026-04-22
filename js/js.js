class FootElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<footer><p>&copy; 2026 Amara Briggs. Built with dedication and love.</p></footer>`;
    }
}
customElements.define('main-footer', FootElement);

// Planet Easter Egg
document.addEventListener('DOMContentLoaded', function () {
    const marsTrigger = document.getElementById('mars-trigger');
    const marsModal = document.getElementById('mars-modal');

    if (marsTrigger && marsModal) {
        marsTrigger.addEventListener('click', function () {
            // Show the modal
            marsModal.classList.add('active');

            // Auto-hide after 3 seconds
            setTimeout(function () {
                marsModal.classList.remove('active');
            }, 3000);
        });

        // Close the modal when clicking outside
        marsModal.addEventListener('click', function () {
            marsModal.classList.remove('active');
        });
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});