// live-feed.js - Live Achievement Feed
// Displays real-time achievements in the terminal's live output section

let liveFeedState = {
    interval: null,
    achievements: [],
    isRunning: false
};

/**
 * Load achievements from JSON file
 */
async function loadAchievements() {
    try {
        const response = await fetch('assets/data/achievements.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        liveFeedState.achievements = await response.json();
        console.log(`✅ Loaded ${liveFeedState.achievements.length} achievements`);
    } catch (error) {
        console.error('Failed to load achievements:', error);
        // Fallback achievements
        liveFeedState.achievements = [
            { type: 'success', message: '[ACHIEVEMENT] Portfolio loaded successfully' },
            { type: 'info', message: '[SKILL VALIDATED] AWS Certified DevOps Engineer' },
            { type: 'warning', message: '[SYSTEM ALERT] Monitoring active' }
        ];
    }
}

/**
 * Add a single achievement to live output
 */
function addLiveOutput() {
    const liveOutput = document.getElementById('live-output');
    
    if (!liveOutput || liveFeedState.achievements.length === 0) {
        return;
    }
    
    // Get random achievement
    const achievement = liveFeedState.achievements[
        Math.floor(Math.random() * liveFeedState.achievements.length)
    ];
    
    const timestamp = new Date().toLocaleTimeString();
    
    // Create output line
    const line = document.createElement('div');
    line.className = 'output-line';
    line.innerHTML = `<span class="prompt">[${timestamp}]</span> <span class="${achievement.type}">${achievement.message}</span>`;
    
    liveOutput.appendChild(line);
    
    // Keep only last 100 lines
    const maxLines = window.portfolioApp?.config?.terminal?.maxHistorySize || 100;
    if (liveOutput.children.length > maxLines) {
        liveOutput.removeChild(liveOutput.firstChild);
    }
    
    // Auto-scroll to bottom
    liveOutput.scrollTop = liveOutput.scrollHeight;
}

/**
 * Start the live feed
 */
async function startLiveFeed() {
    if (liveFeedState.isRunning) {
        console.log('⚠️ Live feed already running');
        return;
    }
    
    console.log('📡 Starting live feed...');
    
    // Load achievements if not already loaded
    if (liveFeedState.achievements.length === 0) {
        await loadAchievements();
    }
    
    // Get interval from config or use default
    const interval = window.portfolioApp?.config?.terminal?.liveFeedInterval || 3000;
    
    // Clear any existing interval
    if (liveFeedState.interval) {
        clearInterval(liveFeedState.interval);
    }
    
    // Start new interval
    liveFeedState.interval = setInterval(addLiveOutput, interval);
    liveFeedState.isRunning = true;
    
    // Add immediate first output
    addLiveOutput();
    
    // Add second output after delay
    setTimeout(addLiveOutput, interval / 2);
    
    console.log('✅ Live feed started');
}

/**
 * Stop the live feed
 */
function stopLiveFeed() {
    if (liveFeedState.interval) {
        clearInterval(liveFeedState.interval);
        liveFeedState.interval = null;
        liveFeedState.isRunning = false;
        console.log('⏹️ Live feed stopped');
    }
}

/**
 * Clear live output
 */
function clearLiveFeed() {
    const liveOutput = document.getElementById('live-output');
    if (liveOutput) {
        liveOutput.innerHTML = '';
        console.log('🧹 Live feed cleared');
    }
}

console.log('📡 Live feed script loaded');