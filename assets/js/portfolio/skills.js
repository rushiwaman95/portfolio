// skills.js - Skills Section Interactions
// Handles skill animations, filtering, and interactions

/**
 * Initialize skills section
 */
function initializeSkillsSection() {
    const resumeData = window.portfolioApp?.resumeData;
    
    if (!resumeData) {
        console.warn('Resume data not loaded yet');
        return;
    }
    
    console.log('🎯 Initializing skills section...');
    
    // Add interactions to skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        // Add click handler to show skill details
        category.addEventListener('click', function() {
            const categoryTitle = this.querySelector('h3')?.textContent;
            if (categoryTitle) {
                highlightSkillCategory(this);
            }
        });
        
        // Add keyboard accessibility
        category.setAttribute('tabindex', '0');
        category.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                this.click();
            }
        });
    });
    
    // Add hover effects to individual skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            showSkillInfo(this.textContent);
        });
    });
    
    console.log(`✅ Initialized ${skillCategories.length} skill categories with ${skillItems.length} skills`);
}

/**
 * Highlight a skill category
 * @param {HTMLElement} categoryElement - Category element to highlight
 */
function highlightSkillCategory(categoryElement) {
    // Remove previous highlights
    document.querySelectorAll('.skill-category').forEach(cat => {
        cat.classList.remove('highlighted');
    });
    
    // Add highlight to selected category
    categoryElement.classList.add('highlighted');
    
    // Pulse animation
    if (typeof pulse === 'function') {
        pulse(categoryElement, 1.05, 400);
    }
    
    console.log('✨ Category highlighted');
}

/**
 * Show information about a specific skill
 * @param {string} skillName - Name of the skill
 */
function showSkillInfo(skillName) {
    const resumeData = window.portfolioApp?.resumeData;
    
    if (!resumeData) {
        console.error('Resume data not loaded');
        return;
    }
    
    // Find which category the skill belongs to
    let category = '';
    let found = false;
    
    for (const [cat, skills] of Object.entries(resumeData.skills)) {
        if (skills.includes(skillName)) {
            category = cat;
            found = true;
            break;
        }
    }
    
    if (!found) {
        console.warn(`Skill not found: ${skillName}`);
        return;
    }
    
    // Find related projects
    const relatedProjects = resumeData.projects.filter(project => 
        project.tech.some(tech => tech.toLowerCase().includes(skillName.toLowerCase()))
    );
    
    // Show notification
    const message = `
        <strong>${skillName}</strong><br>
        Category: ${category}<br>
        Used in ${relatedProjects.length} project(s)
    `;
    
    showNotification(message, 'info');
    
    console.log(`ℹ️ Skill info: ${skillName} (${category}), ${relatedProjects.length} projects`);
}

/**
 * Show notification message
 * @param {string} message - Message to display
 * @param {string} type - Type of notification (success, info, warning, error)
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.skill-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `skill-notification skill-notification-${type}`;
    notification.innerHTML = message;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.top = '100px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    notification.style.zIndex = '9999';
    notification.style.maxWidth = '300px';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(-20px)';
    notification.style.transition = 'all 0.3s ease';
    
    // Color based on type
    const colors = {
        success: { bg: '#27ae60', text: '#fff' },
        info: { bg: '#3498db', text: '#fff' },
        warning: { bg: '#f39c12', text: '#fff' },
        error: { bg: '#e74c3c', text: '#fff' }
    };
    
    const color = colors[type] || colors.info;
    notification.style.backgroundColor = color.bg;
    notification.style.color = color.text;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/**
 * Get skill proficiency level (mock data for demo)
 * @param {string} skillName - Name of the skill
 * @returns {number} - Proficiency level (0-100)
 */
function getSkillProficiency(skillName) {
    // This would ideally come from resume data
    // For now, return mock values
    const proficiencies = {
        'Terraform': 90,
        'AWS': 95,
        'Docker': 92,
        'Kubernetes': 88,
        'Jenkins': 85,
        'Python': 80,
        'Bash/Shell': 85
    };
    
    return proficiencies[skillName] || 75;
}

/**
 * Create skill proficiency chart (placeholder for future feature)
 * @param {string} category - Skill category
 */
function createSkillChart(category) {
    console.log(`📊 Chart feature coming soon for: ${category}`);
    // Future: Create interactive charts using Chart.js or D3.js
}

console.log('🎯 Skills script loaded');