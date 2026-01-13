// Mars Planet Animation Trigger
document.addEventListener('DOMContentLoaded', function() {
    const marsTrigger = document.getElementById('mars-trigger');
    const marsModal = document.getElementById('mars-modal');
    
    if (marsTrigger && marsModal) {
        marsTrigger.addEventListener('click', function() {
            // Show the modal
            marsModal.classList.add('active');
            
            // Auto-hide after 3 seconds
            setTimeout(function() {
                marsModal.classList.remove('active');
            }, 3000);
        });
        
        // Optional: Click anywhere on modal to close it early
        marsModal.addEventListener('click', function() {
            marsModal.classList.remove('active');
        });
    }
});

// Scroll Mod to make smoother transition | DONT WORK 
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