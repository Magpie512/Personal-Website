// Oh captain, my captain. I discovered how to hide elements not as <detail> but as <div> with JS. Very cool!
// Global variables for state tracking

//Oh no I did comment. just not well.
var currentSection = 'home';

// Function to show different sections - simple DOM manipulation
function showSection(sectionName) {
    // Hide all sections first
    var sections = document.getElementsByClassName('content-section');
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none';
    }
    
    // Show the requested section
    var targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.style.display = 'block';
        currentSection = sectionName;
    }
}

// Purchase inquiry handler
function handlePurchaseInquiry() {
    // I am going to be very verbose and old-timey here. Please Enjoy because sober me will.
    //Trust me I do enjoy this. "Verbose" you can tell i just got the wordle done
    var customerName = prompt('Good Sir or Madam, may I have your esteemed name?', '');
    
    if (customerName && customerName !== '') {
        var confirmation = 'Most excellent, ' + customerName + '!\n\n';
        confirmation += 'Your inquiry has been duly noted.\n';
        confirmation += 'A representative shall contact you via telegraph post-haste!\n\n';
        confirmation += 'Price: $15.00\n';
        confirmation += 'Delivery: 2-3 weeks by horse-drawn carriage';
        
        alert(confirmation);
    } else {
        alert('We shall await your return when you are prepared to provide your name, dear patron.');
    }
}

// Model selection from catalogue
function selectModel(modelName, price) {
    var message = 'You have selected: ' + modelName + '\n\n';
    message += 'Price: $' + price + '.00\n\n';
    message += 'Shall we proceed with your inquiry?';
    
    var proceed = confirm(message);
    
    if (proceed) {
        var customerName = prompt('Please provide your distinguished name:', '');
        if (customerName && customerName !== '') {
            var displayMessage = 'Splendid choice, ' + customerName + '!\n\n';
            displayMessage += 'Model: ' + modelName + '\n';
            displayMessage += 'Price: $' + price + '.00\n\n';
            displayMessage += 'A telegram shall be dispatched to you forthwith!';
            
            alert(displayMessage);
            
            // Show confirmation message on page
            var messageBox = document.getElementById('selection-message');
            if (messageBox) {
                messageBox.innerHTML = '<strong>Order Received!</strong><br>Model: ' + modelName + '<br>Customer: ' + customerName;
                messageBox.style.display = 'block';
            }
        }
    }
}

// Custom Audio Player Controls
var isPlaying = false;

function togglePlay() {
    var audio = document.getElementById('audio-player');
    var playIcon = document.getElementById('play-icon');
    
    //Gah why not use unicode characters for play/pause
    // my eyes hurt. but the chipits cookie from pizzahut is good. yippers  

    //unfdortunately this will make a color discrepancy but i cant find a unicode for rewimnd so meh
    if (audio) {
        if (isPlaying) {
            audio.pause();
            playIcon.innerHTML = '▶';
            isPlaying = false;
        } else {
            audio.play();
            playIcon.innerHTML = '⏸';
            isPlaying = true;
        }
    }
}

function stopAudio() {
    var audio = document.getElementById('audio-player');
    var playIcon = document.getElementById('play-icon');
    
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
        playIcon.innerHTML = '▶';
        isPlaying = false;
        updateProgress();
    }
}

function rewind() {
    var audio = document.getElementById('audio-player');
    if (audio) {
        audio.currentTime = Math.max(0, audio.currentTime - 10);
    }
}

function changeVolume(value) {
    var audio = document.getElementById('audio-player');
    var volumeDisplay = document.getElementById('volume-display');
    
    if (audio) {
        audio.volume = value / 100;
    }
    if (volumeDisplay) {
        volumeDisplay.innerHTML = value + '%';
    }
}

function seekAudio(event) {
    var audio = document.getElementById('audio-player');
    var progressBar = document.getElementById('progress-bar');
    
    if (audio && progressBar) {
        var rect = progressBar.getBoundingClientRect();
        var clickX = event.clientX - rect.left;
        var percent = clickX / rect.width;
        audio.currentTime = percent * audio.duration;
    }
}

function updateProgress() {
    var audio = document.getElementById('audio-player');
    var progressFill = document.getElementById('progress-fill');
    var progressHandle = document.getElementById('progress-handle');
    var currentTimeDisplay = document.getElementById('current-time');
    var durationDisplay = document.getElementById('duration');
    
    if (audio && progressFill && progressHandle) {
        var percent = (audio.currentTime / audio.duration) * 100 || 0;
        progressFill.style.width = percent + '%';
        progressHandle.style.left = percent + '%';
        
        if (currentTimeDisplay) {
            currentTimeDisplay.innerHTML = formatTime(audio.currentTime);
        }
        
        if (durationDisplay && audio.duration) {
            durationDisplay.innerHTML = formatTime(audio.duration);
        }
    }
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    
    var mins = Math.floor(seconds / 60);
    var secs = Math.floor(seconds % 60);
    return mins + ':' + (secs < 10 ? '0' : '') + secs;
}

// Initialize audio player when page loads
window.addEventListener('DOMContentLoaded', function() {
    var audio = document.getElementById('audio-player');
    
    if (audio) {
        // Set initial volume
        audio.volume = 0.7;
        
        // Update progress bar as audio plays
        audio.addEventListener('timeupdate', updateProgress);
        
        // Reset play button when audio ends
        audio.addEventListener('ended', function() {
            var playIcon = document.getElementById('play-icon');
            if (playIcon) {
                playIcon.innerHTML = '▶';
            }
            isPlaying = false;
        });
        
        // Update duration when metadata loads
        audio.addEventListener('loadedmetadata', function() {
            updateProgress();
        });
    }
});

// Testimonial submission
var testimonialCounter = 0;

function addTestimonial() {
    var form = document.getElementById('testimonial-form');
    if (form) {
        if (form.style.display === 'none' || form.style.display === '') {
            form.style.display = 'block';
        } else {
            form.style.display = 'none';
        }
    }
}

function submitTestimonial() {
    var nameInput = document.getElementById('testimonial-name');
    var textInput = document.getElementById('testimonial-text');
    
    if (!nameInput || !textInput) {
        return;
    }
    
    var name = nameInput.value;
    var text = textInput.value;
    
    if (name === '' || text === '') {
        alert('Pray tell, both your name and testimonial are required!');
        return;
    }
    
    // Create a new testimonial element
    testimonialCounter++;
    var newTestimonialHTML = '<div class="testimonial" style="animation: fadeIn 0.5s ease-in;">';
    newTestimonialHTML += '<p class="quote">' + text + '</p>';
    newTestimonialHTML += '<p class="attribution">— ' + name + '</p>';
    newTestimonialHTML += '</div>';
    
    // Insert before the button instead of in separate container
    var addButton = document.querySelector('#testimonials .secondary-btn');
    if (addButton) {
        addButton.insertAdjacentHTML('beforebegin', newTestimonialHTML);
        // Hide the button after first testimonial
        addButton.style.display = 'none';
    }
    
    // Clear form
    nameInput.value = '';
    textInput.value = '';
    
    // Hide form
    var form = document.getElementById('testimonial-form');
    if (form) {
        form.style.display = 'none';
    }
    
    alert('Your testimonial has been received with gratitude!\n\nIt shall be displayed for all to see.');
}

// Simple animation for gramophone image on page load
// I dont even think this works anymore wtf was I doin with it
window.onload = function() {
    // Display welcome message
    setTimeout(function() {
        console.log('Welcome to the Edison-Bell Talking Machine Emporium!');
        console.log('Established Anno Domini 1890');
    }, 500);
};


