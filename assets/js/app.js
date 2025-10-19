// app.js - Main Application Initialization
// Orchestrates the entire portfolio application

console.log('🚀 Rushikesh Waman Portfolio - Starting...');

// Global application state
window.portfolioApp = {
    currentView: 'terminal',
    resumeData: null,
    config: null,
    initialized: false
};

/**
 * Load configuration file
 */
async function loadConfig() {
    try {
        const response = await fetch('config/config.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        window.portfolioApp.config = await response.json();
        console.log('✅ Configuration loaded:', window.portfolioApp.config.app.name, 'v' + window.portfolioApp.config.app.version);
        return true;
    } catch (error) {
        console.error('❌ Failed to load config:', error);
        // Use default config
        window.portfolioApp.config = {
            app: { name: 'Portfolio', version: '2.0.0', defaultView: 'terminal' },
            terminal: { liveFeedInterval: 3000, maxHistorySize: 100 },
            ai: { provider: 'gemini', model: 'gemini-2.0-flash' }
        };
        return false;
    }
}

/**
 * Load resume data
 */
async function loadResumeData() {
    try {
        const response = await fetch('assets/data/resume.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        window.portfolioApp.resumeData = await response.json();
        console.log('✅ Resume data loaded for:', window.portfolioApp.resumeData.personal.name);
        return true;
    } catch (error) {
        console.error('❌ Failed to load resume data:', error);
        alert('Failed to load portfolio data. Please refresh the page.');
        return false;
    }
}

/**
 * Initialize portfolio view
 */
function initializePortfolioView() {
    console.log('🎨 Initializing Portfolio View...');
    
    // Portfolio view will be built dynamically in future
    // For now, it uses the existing HTML structure
    
    console.log('✅ Portfolio view ready');
}

/**
 * Initialize terminal view
 */
function initializeTerminalView() {
    console.log('💻 Initializing Terminal View...');
    
    // Terminal is initialized when view is activated
    // Just verify elements exist
    const terminalContent = document.getElementById('terminal-content');
    const liveOutput = document.getElementById('live-output');
    
    if (terminalContent && liveOutput) {
        console.log('✅ Terminal view ready');
    } else {
        console.error('❌ Terminal view elements missing');
    }
}

/**
 * Setup smooth scrolling for navigation
 */
function setupSmoothScrolling() {
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 80;
                const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 10;
                
                // Smooth scroll
                window.scrollTo({
                    top: targetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    console.log('✅ Smooth scrolling initialized');
}

/**
 * Main initialization function
 */
async function initializeApp() {
    console.log('⚙️ Starting application initialization...');
    
    try {
        // Load configuration and data
        await loadConfig();
        const dataLoaded = await loadResumeData();
        
        if (!dataLoaded) {
            console.error('❌ Critical: Resume data not loaded');
            return;
        }
        
        console.log('📊 All data loaded successfully');
        
        // Initialize views
        initializePortfolioView();
        initializeTerminalView();
        
        // Setup navigation
        setupSmoothScrolling();
        
        // Set default view from config
        // Set default view from config (or use 'portfolio' as fallback)
const defaultView = window.portfolioApp.config.app.defaultView || 'portfolio';
console.log(`🎯 Setting default view: ${defaultView}`);

// Small delay to ensure all scripts are loaded
setTimeout(() => {
    // Force portfolio view on first load
    toggleView(false); // false = portfolio view, true = terminal view
    window.portfolioApp.initialized = true;
    console.log('✅ Application initialized successfully');
}, 100);
        
    } catch (error) {
        console.error('❌ Initialization error:', error);
        alert('Failed to initialize portfolio. Please refresh the page.');
    }
}

/**
 * Handle page visibility change
 */
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, stop live feed
        if (typeof stopLiveFeed === 'function') {
            stopLiveFeed();
        }
    } else {
        // Page is visible again, restart live feed if in terminal view
        if (window.portfolioApp.currentView === 'terminal' && typeof startLiveFeed === 'function') {
            startLiveFeed();
        }
    }
});

/**
 * Log shortcuts to console
 */
console.log('%c🎮 Developer Shortcuts', 'color: #3498db; font-size: 14px; font-weight: bold;');
console.log('%cwindow.portfolioApp', 'color: #2ecc71;', '- Global app state');
console.log('%ctoggleView()', 'color: #2ecc71;', '- Switch between views');
console.log('%cstartLiveFeed()', 'color: #2ecc71;', '- Start terminal feed');
console.log('%cstopLiveFeed()', 'color: #2ecc71;', '- Stop terminal feed');

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}