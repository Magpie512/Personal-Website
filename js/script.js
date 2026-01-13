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
