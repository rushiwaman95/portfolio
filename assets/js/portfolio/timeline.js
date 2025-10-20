// timeline.js - Career Timeline Builder
// Builds interactive career timeline from resume.json

/**
 * Build the career timeline
 */
function buildCareerTimeline() {
    const resumeData = window.portfolioApp?.resumeData;
    
    if (!resumeData || !resumeData.experience) {
        console.error('Resume data or experience not found');
        return;
    }
    
    const timelineContainer = document.getElementById('timeline-container');
    
    if (!timelineContainer) {
        console.error('Timeline container not found');
        return;
    }
    
    console.log('🎯 Building career timeline...');
    
    // Build timeline HTML
    const timelineHTML = resumeData.experience.map((exp, index) => {
        const isCurrent = exp.current || false;
        const hasAchievements = exp.achievements && exp.achievements.length > 0;
        
        // Get company icon/emoji
        const companyIcon = getCompanyIcon(exp.company);
        
        // Limit initial display of responsibilities
        const displayResponsibilities = exp.responsibilities.slice(0, 3);
        const hasMoreResponsibilities = exp.responsibilities.length > 3;
        
        // Limit initial display of achievements
        const displayAchievements = hasAchievements ? exp.achievements.slice(0, 3) : [];
        const hasMoreAchievements = hasAchievements && exp.achievements.length > 3;
        
        return `
            <div class="timeline-item">
                <div class="timeline-content">
                    <div class="timeline-company">${exp.company}</div>
                    <div class="timeline-position">${exp.position}</div>
                    <div class="timeline-period">
                        ${exp.period}
                        ${isCurrent ? '<span class="timeline-current-badge">Current</span>' : ''}
                    </div>
                    
                    <div class="timeline-responsibilities">
                        <h4>Key Responsibilities:</h4>
                        <ul class="responsibilities-list">
                            ${displayResponsibilities.map(resp => `<li>${resp}</li>`).join('')}
                            ${hasMoreResponsibilities ? `
                                <div class="hidden-responsibilities" style="display: none;">
                                    ${exp.responsibilities.slice(3).map(resp => `<li>${resp}</li>`).join('')}
                                </div>
                            ` : ''}
                        </ul>
                        ${hasMoreResponsibilities ? `
                            <button class="timeline-toggle" onclick="toggleTimelineSection(${index}, 'responsibilities')">
                                Show More
                            </button>
                        ` : ''}
                    </div>
                    
                    ${hasAchievements ? `
                        <div class="timeline-achievements">
                            <h4>Key Achievements:</h4>
                            <ul class="achievements-list">
                                ${displayAchievements.map(achievement => `<li>${achievement}</li>`).join('')}
                                ${hasMoreAchievements ? `
                                    <div class="hidden-achievements" style="display: none;">
                                        ${exp.achievements.slice(3).map(achievement => `<li>${achievement}</li>`).join('')}
                                    </div>
                                ` : ''}
                            </ul>
                            ${hasMoreAchievements ? `
                                <button class="timeline-toggle" onclick="toggleTimelineSection(${index}, 'achievements')">
                                    Show More
                                </button>
                            ` : ''}
                        </div>
                    ` : ''}
                </div>
                
                <div class="timeline-dot ${isCurrent ? 'current' : ''}" title="${exp.company}">
                    ${companyIcon}
                </div>
            </div>
        `;
    }).join('');
    
    timelineContainer.innerHTML = timelineHTML;
    
    console.log('✅ Career timeline built successfully');
}

/**
 * Get company icon/emoji
 * @param {string} companyName - Company name
 * @returns {string} - Emoji icon
 */
function getCompanyIcon(companyName) {
    const icons = {
        'ACC': '🏢',
        'Flentas': '💼',
        'Ignite Solutions': '🚀',
        'default': '💻'
    };
    
    return icons[companyName] || icons['default'];
}

/**
 * Toggle show more/less for timeline sections
 * @param {number} index - Timeline item index
 * @param {string} section - Section type (responsibilities/achievements)
 */
function toggleTimelineSection(index, section) {
    const items = document.querySelectorAll('.timeline-item');
    const item = items[index];
    
    if (!item) return;
    
    const hiddenDiv = item.querySelector(`.hidden-${section}`);
    const button = item.querySelector(`.timeline-${section} .timeline-toggle`);
    
    if (!hiddenDiv || !button) return;
    
    const isHidden = hiddenDiv.style.display === 'none';
    
    if (isHidden) {
        hiddenDiv.style.display = 'block';
        button.textContent = 'Show Less';
    } else {
        hiddenDiv.style.display = 'none';
        button.textContent = 'Show More';
    }
}

/**
 * Initialize timeline when called
 */
function initializeTimeline() {
    // Wait for resume data
    const checkData = setInterval(function() {
        if (window.portfolioApp && window.portfolioApp.resumeData) {
            clearInterval(checkData);
            buildCareerTimeline();
        }
    }, 100);
}

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTimeline);
} else {
    initializeTimeline();
}

console.log('📅 Timeline script loaded');