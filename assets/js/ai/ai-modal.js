// ai-modal.js - AI Modal UI Logic
// Handles the "Ask AI" popup interface

/**
 * Open the AI modal popup
 */
function openAskAIPopup() {
    const modal = document.getElementById('askAiModal');
    const input = document.getElementById('aiQueryInput');
    
    if (!modal) {
        console.error('AI Modal not found');
        return;
    }
    
    modal.classList.add('visible');
    
    if (input) {
        input.value = '';
        input.focus();
    }
    
    console.log('🤖 AI Modal opened');
}

/**
 * Close the AI modal popup
 */
function closeAskAIPopup() {
    const modal = document.getElementById('askAiModal');
    
    if (!modal) {
        console.error('AI Modal not found');
        return;
    }
    
    modal.classList.remove('visible');
    console.log('🤖 AI Modal closed');
}

/**
 * Submit query from the AI popup
 */
async function submitAIPopupQuery() {
    const input = document.getElementById('aiQueryInput');
    const chatLog = document.getElementById('aiChatLog');
    const query = input?.value.trim();
    
    if (!query) {
        alert('Please enter a question for the AI.');
        return;
    }
    
    // Add user message to chat
    addChatMessage(chatLog, query, 'user');
    
    // Clear input and reset height
    input.value = '';
    input.style.height = 'auto';
    
    // Show thinking indicator
    const thinkingMsg = addChatMessage(chatLog, 'Thinking...', 'info');
    
    try {
        // Get AI response
        const response = await handleAIQuery(query, false);
        
        // Remove thinking message
        if (thinkingMsg && thinkingMsg.textContent === 'Thinking...') {
            thinkingMsg.remove();
        }
        
        // Add AI response
        addChatMessage(chatLog, response, 'ai');
        
    } catch (error) {
        console.error('AI Query Error:', error);
        
        // Remove thinking message
        if (thinkingMsg) {
            thinkingMsg.remove();
        }
        
        // Show error message
        addChatMessage(chatLog, 'Sorry, something went wrong. Please try again.', 'ai');
    }
}

/**
 * Add a message to the chat log
 * @param {HTMLElement} chatLogElement - The chat log container
 * @param {string} message - The message text
 * @param {string} senderClass - CSS class (user, ai, info)
 * @returns {HTMLElement} - The created message element
 */
function addChatMessage(chatLogElement, message, senderClass) {
    if (!chatLogElement) {
        console.error('Chat log element not found');
        return null;
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', senderClass);
    messageDiv.textContent = message;
    
    chatLogElement.appendChild(messageDiv);
    
    // Auto-scroll to latest message
    chatLogElement.scrollTop = chatLogElement.scrollHeight;
    
    return messageDiv;
}

/**
 * Initialize AI Modal event listeners
 */
function initializeAIModal() {
    console.log('🤖 Initializing AI Modal...');
    
    // Trigger button
    const triggerBtn = document.getElementById('askAiTriggerButton');
    if (triggerBtn) {
        triggerBtn.addEventListener('click', openAskAIPopup);
        console.log('✅ AI trigger button initialized');
    }
    
    // Close button (will be in HTML)
    const closeBtn = document.querySelector('.modal-overlay .cancel-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeAskAIPopup);
    }
    
    // Input field - Submit on Enter
    const input = document.getElementById('aiQueryInput');
    if (input) {
        // Auto-resize textarea
        input.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
        
        // Submit on Enter (Shift+Enter for new line)
        input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                submitAIPopupQuery();
            }
        });
        
        console.log('✅ AI input field initialized');
    }
    
    // Submit button
    const submitBtn = document.querySelector('.modal-content .submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', submitAIPopupQuery);
        console.log('✅ AI submit button initialized');
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('askAiModal');
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeAskAIPopup();
            }
        });
    }
    
    console.log('✅ AI Modal initialized');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAIModal);
} else {
    initializeAIModal();
}

console.log('🤖 AI Modal script loaded');