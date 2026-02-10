
function moveRandomEl(elm) {
  elm.style.position = "absolute";
  elm.style.transition = "all 0.3s ease";
  elm.style.top = Math.floor(Math.random() * 60 + 20) + "%";
  elm.style.left = Math.floor(Math.random() * 60 + 20) + "%";
  
  // Add a little shake animation
  elm.style.transform = "scale(0.85) rotate(" + (Math.random() * 15 - 7.5) + "deg)";
  
  // Reset transform after animation
  setTimeout(() => {
    elm.style.transform = "scale(1) rotate(0deg)";
  }, 300);
  
  // Create rejection particles
  createRejectionParticles(elm);
  
  // Add vibration for mobile devices
  if (navigator.vibrate) {
    navigator.vibrate([100, 30, 100]);
  }
}

function createRejectionParticles(element) {
  for (let i = 0; i < 5; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '8px';
    particle.style.height = '8px';
    particle.style.background = '#ff6b6b';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.left = element.offsetLeft + element.offsetWidth / 2 + 'px';
    particle.style.top = element.offsetTop + element.offsetHeight / 2 + 'px';
    particle.style.transition = 'all 0.6s ease-out';
    
    document.body.appendChild(particle);
    
    // Animate particle
    setTimeout(() => {
      particle.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) scale(0)`;
      particle.style.opacity = '0';
    }, 10);
    
    // Remove particle
    setTimeout(() => {
      particle.remove();
    }, 600);
  }
}

const moveRandom = document.querySelector("#move-random");
let clickCount = 0;
let sadMessages = [
  "No 💔",
  "Are you sure? 🥺",
  "Please reconsider! 😢",
  "Think again! 💭",
  "Really? 😭",
  "My heart... 💔",
  "One more chance? 🙏",
  "Please please! 😰",
  "Don't break my heart! 💔",
  "Final chance! 😭"
];

// Detect if device is mobile/tablet
function isMobileOrTablet() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
         ('ontouchstart' in window);
}

if (moveRandom) {
  // Use both touch and mouse events for better mobile support
  const eventType = isMobileOrTablet() ? 'touchstart' : 'mouseenter';
  
  moveRandom.addEventListener(eventType, function (e) {
    e.preventDefault(); // Prevent touch scroll
    moveRandomEl(e.target);
    clickCount++;
    
    // Change text based on attempts with more variety
    if (clickCount < sadMessages.length) {
      e.target.textContent = sadMessages[clickCount - 1];
    } else {
      e.target.textContent = "You're breaking my heart! 💔😭";
      e.target.style.animation = "heartbreak 1s ease-in-out";
    }
    
    // Make button smaller and sadder looking
    e.target.style.filter = `grayscale(${Math.min(clickCount * 10, 50)}%)`;
  });
  
  // Add click event for mobile (since hover doesn't work)
  if (isMobileOrTablet()) {
    moveRandom.addEventListener('click', function(e) {
      e.preventDefault();
      moveRandomEl(e.target);
    });
  }
  
  // Make "Yes" button grow and more appealing when hovering over "No"
  const yesButton = document.querySelector('a[href="yes.html"]');
  if (yesButton) {
    moveRandom.addEventListener(eventType, function() {
      yesButton.style.transform = "scale(1.2)";
      yesButton.style.background = "linear-gradient(45deg, #ff6b6b, #ff8e8e, #ffd700)";
      yesButton.style.color = "white";
      yesButton.style.boxShadow = "0 0 20px rgba(255, 215, 0, 0.7)";
      yesButton.innerHTML = "Choose me instead! 💖";
      
      // Add vibration for "Yes" encouragement
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
      
      // Reset after some time
      setTimeout(() => {
        yesButton.style.transform = "";
        yesButton.style.background = "";
        yesButton.style.boxShadow = "";
        yesButton.innerHTML = "Yes! 💕";
      }, 2000);
    });
  }
}

// Add heartbreak animation
const style = document.createElement('style');
style.textContent = `
  @keyframes heartbreak {
    0% { transform: scale(1) rotate(0deg); }
    25% { transform: scale(0.8) rotate(-5deg); }
    50% { transform: scale(0.9) rotate(5deg); }
    75% { transform: scale(0.7) rotate(-3deg); }
    100% { transform: scale(0.8) rotate(0deg); }
  }
`;
document.head.appendChild(style);

// Modified mouse trail effect for better mobile performance
if (!isMobileOrTablet()) {
  document.addEventListener('mousemove', function(e) {
    // Create heart trail (reduced frequency for better performance)
    if (Math.random() < 0.05) { // Reduced from 0.1 to 0.05
      const heart = document.createElement('div');
      heart.innerHTML = '💕';
      heart.style.position = 'fixed';
      heart.style.left = e.clientX + 'px';
      heart.style.top = e.clientY + 'px';
      heart.style.pointerEvents = 'none';
      heart.style.fontSize = '12px';
      heart.style.transition = 'all 1s ease-out';
      heart.style.zIndex = '9999';
      
      document.body.appendChild(heart);
      
      setTimeout(() => {
        heart.style.transform = 'translateY(-50px) scale(0)';
        heart.style.opacity = '0';
      }, 10);
      
      setTimeout(() => {
        heart.remove();
      }, 1000);
    }
  });
} else {
  // Touch-based heart creation for mobile
  document.addEventListener('touchstart', function(e) {
    if (Math.random() < 0.3 && e.touches.length === 1) {
      const touch = e.touches[0];
      const heart = document.createElement('div');
      heart.innerHTML = '💕';
      heart.style.position = 'fixed';
      heart.style.left = touch.clientX + 'px';
      heart.style.top = touch.clientY + 'px';
      heart.style.pointerEvents = 'none';
      heart.style.fontSize = '16px';
      heart.style.transition = 'all 1s ease-out';
      heart.style.zIndex = '9999';
      
      document.body.appendChild(heart);
      
      setTimeout(() => {
        heart.style.transform = 'translateY(-50px) scale(0)';
        heart.style.opacity = '0';
      }, 10);
      
      setTimeout(() => {
        heart.remove();
      }, 1000);
    }
  });
}
