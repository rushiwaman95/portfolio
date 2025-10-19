// animation.js - Animation Utilities
// Reusable animation functions for UI effects

/**
 * Fade in element
 * @param {HTMLElement} element - Element to fade in
 * @param {number} duration - Duration in milliseconds (default: 300)
 */
function fadeIn(element, duration = 300) {
    element.style.opacity = 0;
    element.style.display = 'block';
    
    let start = null;
    
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const opacity = Math.min(progress / duration, 1);
        
        element.style.opacity = opacity;
        
        if (progress < duration) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

/**
 * Fade out element
 * @param {HTMLElement} element - Element to fade out
 * @param {number} duration - Duration in milliseconds (default: 300)
 */
function fadeOut(element, duration = 300) {
    let start = null;
    const initialOpacity = parseFloat(window.getComputedStyle(element).opacity) || 1;
    
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const opacity = initialOpacity - (initialOpacity * (progress / duration));
        
        element.style.opacity = Math.max(opacity, 0);
        
        if (progress < duration) {
            requestAnimationFrame(animate);
        } else {
            element.style.display = 'none';
        }
    }
    
    requestAnimationFrame(animate);
}

/**
 * Slide in element from direction
 * @param {HTMLElement} element - Element to slide
 * @param {string} direction - Direction: 'left', 'right', 'top', 'bottom'
 * @param {number} duration - Duration in milliseconds (default: 300)
 */
function slideIn(element, direction = 'left', duration = 300) {
    element.style.display = 'block';
    element.style.position = 'relative';
    
    const transforms = {
        left: { from: '-100%', to: '0', axis: 'X' },
        right: { from: '100%', to: '0', axis: 'X' },
        top: { from: '-100%', to: '0', axis: 'Y' },
        bottom: { from: '100%', to: '0', axis: 'Y' }
    };
    
    const transform = transforms[direction] || transforms.left;
    let start = null;
    
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);
        
        const current = parseFloat(transform.from) * (1 - percentage);
        element.style.transform = `translate${transform.axis}(${current}%)`;
        
        if (progress < duration) {
            requestAnimationFrame(animate);
        } else {
            element.style.transform = `translate${transform.axis}(0)`;
        }
    }
    
    requestAnimationFrame(animate);
}

/**
 * Scale animation
 * @param {HTMLElement} element - Element to scale
 * @param {number} from - Starting scale (default: 0)
 * @param {number} to - Ending scale (default: 1)
 * @param {number} duration - Duration in milliseconds (default: 300)
 */
function scaleAnimation(element, from = 0, to = 1, duration = 300) {
    let start = null;
    
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);
        
        const scale = from + (to - from) * percentage;
        element.style.transform = `scale(${scale})`;
        
        if (progress < duration) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

/**
 * Typing animation effect
 * @param {HTMLElement} element - Element to type into
 * @param {string} text - Text to type
 * @param {number} speed - Speed in milliseconds per character (default: 50)
 */
async function typeWriter(element, text, speed = 50) {
    element.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
        element.textContent += text.charAt(i);
        await sleep(speed);
    }
}

/**
 * Pulse animation
 * @param {HTMLElement} element - Element to pulse
 * @param {number} scale - Scale factor (default: 1.1)
 * @param {number} duration - Duration in milliseconds (default: 300)
 */
function pulse(element, scale = 1.1, duration = 300) {
    const originalTransform = element.style.transform;
    
    scaleAnimation(element, 1, scale, duration / 2);
    
    setTimeout(() => {
        scaleAnimation(element, scale, 1, duration / 2);
        setTimeout(() => {
            element.style.transform = originalTransform;
        }, duration / 2);
    }, duration / 2);
}

/**
 * Shake animation
 * @param {HTMLElement} element - Element to shake
 * @param {number} intensity - Shake intensity in pixels (default: 10)
 * @param {number} duration - Duration in milliseconds (default: 500)
 */
function shake(element, intensity = 10, duration = 500) {
    const originalPosition = element.style.position;
    const originalLeft = element.style.left;
    
    element.style.position = 'relative';
    
    let start = null;
    const shakeCount = 4;
    
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = progress / duration;
        
        if (percentage < 1) {
            const offset = Math.sin(percentage * Math.PI * shakeCount) * intensity * (1 - percentage);
            element.style.left = offset + 'px';
            requestAnimationFrame(animate);
        } else {
            element.style.position = originalPosition;
            element.style.left = originalLeft;
        }
    }
    
    requestAnimationFrame(animate);
}

/**
 * Progress bar animation
 * @param {HTMLElement} element - Progress bar element
 * @param {number} targetPercentage - Target percentage (0-100)
 * @param {number} duration - Duration in milliseconds (default: 1000)
 */
function animateProgressBar(element, targetPercentage, duration = 1000) {
    let start = null;
    const startWidth = parseFloat(element.style.width) || 0;
    
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);
        
        const currentWidth = startWidth + (targetPercentage - startWidth) * percentage;
        element.style.width = currentWidth + '%';
        
        if (progress < duration) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

/**
 * Bounce animation
 * @param {HTMLElement} element - Element to bounce
 * @param {number} height - Bounce height in pixels (default: 20)
 * @param {number} duration - Duration in milliseconds (default: 600)
 */
function bounce(element, height = 20, duration = 600) {
    const originalTransform = element.style.transform;
    element.style.position = 'relative';
    
    let start = null;
    
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = progress / duration;
        
        if (percentage < 1) {
            const bounceValue = Math.abs(Math.sin(percentage * Math.PI * 2)) * height * (1 - percentage);
            element.style.transform = `translateY(-${bounceValue}px)`;
            requestAnimationFrame(animate);
        } else {
            element.style.transform = originalTransform;
        }
    }
    
    requestAnimationFrame(animate);
}

/**
 * Reveal text character by character
 * @param {HTMLElement} element - Element containing text
 * @param {number} delay - Delay between characters in ms (default: 50)
 */
async function revealText(element, delay = 50) {
    const text = element.textContent;
    element.textContent = '';
    element.style.display = 'block';
    
    for (let char of text) {
        element.textContent += char;
        await sleep(delay);
    }
}

console.log('✨ Animation utilities loaded');