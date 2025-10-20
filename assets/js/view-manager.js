function toggleView(forceTerminal = false) {
    const portfolioView = document.getElementById('portfolio-view');
    const terminalView = document.getElementById('terminal-view');
    const mainToggleButton = document.getElementById('mainToggleButton');
    
    if (!portfolioView || !terminalView || !mainToggleButton) {
        console.error('❌ View elements not found');
        return;
    }
    
    // ⭐ DEBUG: Log who called toggleView
    console.trace('🔍 toggleView called with forceTerminal:', forceTerminal);
    
    const currentView = window.portfolioApp.currentView;
    
    if (currentView === 'portfolio' || forceTerminal) {
        // Switch to Terminal View
        console.log('🔄 Switching to Terminal view...');
        
        portfolioView.style.display = 'none';
        terminalView.style.display = 'flex';
        mainToggleButton.textContent = 'GUI';
        mainToggleButton.classList.remove('portfolio-active');
        
        window.portfolioApp.currentView = 'terminal';
        
        // Initialize terminal if not already done
        if (typeof initTerminal === 'function') {
            initTerminal();
        }
        
        // Start live feed
        if (typeof startLiveFeed === 'function') {
            startLiveFeed();
        }
        
        // Focus terminal input
        setTimeout(() => {
            const terminalInput = document.getElementById('terminal-input');
            if (terminalInput) {
                terminalInput.focus();
            }
        }, 100);
        
        console.log('✅ Terminal view active');
        
    } else {
        // Switch to Portfolio View
        console.log('🔄 Switching to Portfolio view...');
        
        portfolioView.style.display = 'block';
        terminalView.style.display = 'none';
        mainToggleButton.textContent = 'CLI';
        mainToggleButton.classList.add('portfolio-active');
        
        window.portfolioApp.currentView = 'portfolio';
        
        // Stop live feed when leaving terminal
        if (typeof stopLiveFeed === 'function') {
            stopLiveFeed();
        }
        
        console.log('✅ Portfolio view active');
    }
}