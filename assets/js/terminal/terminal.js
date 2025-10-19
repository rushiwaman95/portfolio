// terminal.js - Terminal Main Logic
// Handles terminal initialization, input, and command execution

// Terminal state management
let terminalState = {
    outputRef: null,
    inputRef: null,
    commandHistory: [],
    historyIndex: -1,
    isInitialized: false
};

/**
 * Initialize the terminal
 */
function initTerminal() {
    if (terminalState.isInitialized) {
        console.log('⚠️ Terminal already initialized');
        return;
    }
    
    console.log('💻 Initializing terminal...');
    
    terminalState.outputRef = document.getElementById('terminal-content');
    terminalState.inputRef = document.getElementById('terminal-input');
    
    if (!terminalState.outputRef) {
        console.error('❌ Terminal output element not found');
        return;
    }
    
    if (terminalState.inputRef) {
        terminalState.inputRef.focus();
        terminalState.inputRef.addEventListener('keydown', handleTerminalInput);
        terminalState.isInitialized = true;
        console.log('✅ Terminal initialized successfully');
    } else {
        console.error('❌ Terminal input element not found');
    }
}

/**
 * Handle terminal keyboard input
 * @param {KeyboardEvent} e - Keyboard event
 */
function handleTerminalInput(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const command = terminalState.inputRef.value.trim();
        
        if (command) {
            // Add to history if it's not a duplicate of the last command
            if (terminalState.commandHistory.length === 0 || 
                terminalState.commandHistory[terminalState.commandHistory.length - 1] !== command) {
                terminalState.commandHistory.push(command);
            }
            terminalState.historyIndex = terminalState.commandHistory.length;
            
            executeCommand(command);
        } else {
            // Empty command, just add new prompt
            addTerminalLine(`<span class="prompt">rushiwaman95@devops:~$</span> `);
            addNewPrompt();
        }
        
        terminalState.inputRef.value = '';
        
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (terminalState.historyIndex > 0) {
            terminalState.historyIndex--;
            terminalState.inputRef.value = terminalState.commandHistory[terminalState.historyIndex];
        }
        
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (terminalState.historyIndex < terminalState.commandHistory.length - 1) {
            terminalState.historyIndex++;
            terminalState.inputRef.value = terminalState.commandHistory[terminalState.historyIndex];
        } else {
            terminalState.historyIndex = terminalState.commandHistory.length;
            terminalState.inputRef.value = '';
        }
    }
}

/**
 * Execute a terminal command
 * @param {string} commandText - Full command text
 */
async function executeCommand(commandText) {
    const [command, ...args] = commandText.toLowerCase().split(' ');
    const originalArgs = commandText.split(' ').slice(1).join(' ');
    
    // Echo the command
    addTerminalLine(`<span class="prompt">rushiwaman95@devops:~$</span> <span class="output">${commandText}</span>`);
    
    // Handle system commands
    if (command === 'clear') {
        clearTerminal();
        return;
    }
    
    if (command === 'exit') {
        addTerminalLine(`<span class="warning">Session ended. Thanks for visiting my portfolio!</span>`);
        addTerminalLine(`<span class="info">Refresh the page to start a new session.</span>`);
        terminalState.inputRef.disabled = true;
        return;
    }
    
    // Handle AI command
    if (command === 'ask') {
        const question = originalArgs.replace(/["']/g, "").trim();
        if (!question) {
            addTerminalLine(`<span class="error">Usage: ask "your question here"</span>`);
            addTerminalLine(`<span class="info">Example: ask "what are your top AWS skills?"</span>`);
            addNewPrompt();
            return;
        }
        await handleTerminalAIQuery(question);
        return;
    }
    
    // Handle portfolio commands
    const output = getCommandOutput(command);
    if (output) {
        addTerminalLine(output);
    } else {
        addTerminalLine(`<span class="error">bash: ${command}: command not found</span>`);
        addTerminalLine(`Type '<span class="command">help</span>' for a list of available commands.`);
    }
    
    addNewPrompt();
}

/**
 * Handle AI query from terminal
 * @param {string} prompt - User's question
 */
async function handleTerminalAIQuery(prompt) {
    // Add thinking indicator
    const thinkingLine = document.createElement('div');
    thinkingLine.className = 'terminal-line';
    thinkingLine.innerHTML = `<span class="info">✨ Thinking...</span>`;
    
    const inputLine = terminalState.outputRef.querySelector('.input-line');
    if (inputLine) {
        terminalState.outputRef.insertBefore(thinkingLine, inputLine);
    } else {
        terminalState.outputRef.appendChild(thinkingLine);
    }
    terminalState.outputRef.scrollTop = terminalState.outputRef.scrollHeight;
    
    try {
        // Get AI response
        const response = await handleAIQuery(prompt, true);
        
        // Remove thinking indicator
        thinkingLine.remove();
        
        // Add response
        addTerminalLine(`<span class="output">${response}</span>`);
        
    } catch (error) {
        console.error('Terminal AI Error:', error);
        thinkingLine.remove();
        addTerminalLine(`<span class="error">Sorry, I couldn't get an answer. Please try again later.</span>`);
    } finally {
        addNewPrompt();
    }
}

/**
 * Add a line to the terminal output
 * @param {string} content - HTML content to add
 */
function addTerminalLine(content) {
    if (!terminalState.outputRef) {
        console.error('Terminal output reference not set');
        return;
    }
    
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = content;
    
    const inputLine = terminalState.outputRef.querySelector('.input-line');
    if (inputLine) {
        terminalState.outputRef.insertBefore(line, inputLine);
    } else {
        terminalState.outputRef.appendChild(line);
    }
    
    terminalState.outputRef.scrollTop = terminalState.outputRef.scrollHeight;
}

/**
 * Add a new prompt line
 */
function addNewPrompt() {
    if (!terminalState.outputRef) return;
    
    // Remove old input line
    const oldInputLine = terminalState.outputRef.querySelector('.input-line');
    if (oldInputLine) {
        oldInputLine.remove();
    }
    
    // Create new input line
    const newInputLine = document.createElement('div');
    newInputLine.className = 'input-line';
    newInputLine.innerHTML = `
        <span class="prompt">rushiwaman95@devops:~$</span>
        <input type="text" class="terminal-input" id="terminal-input" autofocus>
    `;
    
    terminalState.outputRef.appendChild(newInputLine);
    
    // Update reference and add event listener
    terminalState.inputRef = document.getElementById('terminal-input');
    terminalState.inputRef.focus();
    terminalState.inputRef.removeEventListener('keydown', handleTerminalInput);
    terminalState.inputRef.addEventListener('keydown', handleTerminalInput);
    
    terminalState.outputRef.scrollTop = terminalState.outputRef.scrollHeight;
}

/**
 * Clear the terminal screen
 */
function clearTerminal() {
    if (!terminalState.outputRef) return;
    
    // Remove all lines
    const linesToRemove = terminalState.outputRef.querySelectorAll('.terminal-line, .input-line');
    linesToRemove.forEach(line => line.remove());
    
    // Add cleared message
    const welcomeLine = document.createElement('div');
    welcomeLine.className = 'terminal-line';
    welcomeLine.innerHTML = `<span class="success">Terminal cleared.</span> Type '<span class="command">help</span>' for available commands.`;
    terminalState.outputRef.appendChild(welcomeLine);
    
    addNewPrompt();
}

/**
 * Focus terminal input when clicking on terminal panel
 */
function setupTerminalClickFocus() {
    const terminalPanel = document.querySelector('.terminal-panel');
    if (terminalPanel) {
        terminalPanel.addEventListener('click', function(e) {
            // Don't focus if clicking on a link
            if (e.target.tagName !== 'A' && terminalState.inputRef) {
                terminalState.inputRef.focus();
            }
        });
    }
}

// Initialize click focus when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupTerminalClickFocus);
} else {
    setupTerminalClickFocus();
}

console.log('💻 Terminal script loaded');