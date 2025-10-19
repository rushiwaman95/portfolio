// projects.js - Project Card Interactions
// Handles project filtering, modal views, and interactions

/**
 * Initialize project cards
 */
function initializeProjectCards() {
    const resumeData = window.portfolioApp?.resumeData;
    
    if (!resumeData) {
        console.warn('Resume data not loaded yet');
        return;
    }
    
    console.log('🎨 Initializing project cards...');
    
    // Add hover effects and interactions to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add click handler for project details
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a link or button
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                return;
            }
            
            const projectTitle = this.querySelector('.project-title')?.textContent;
            if (projectTitle) {
                showProjectDetails(projectTitle);
            }
        });
        
        // Add keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                this.click();
            }
        });
    });
    
    console.log(`✅ Initialized ${projectCards.length} project cards`);
}

/**
 * Show detailed project information
 * @param {string} projectTitle - Title of the project
 */
function showProjectDetails(projectTitle) {
    const resumeData = window.portfolioApp?.resumeData;
    
    if (!resumeData) {
        console.error('Resume data not loaded');
        return;
    }
    
    const project = resumeData.projects.find(p => p.title === projectTitle);
    
    if (!project) {
        console.error(`Project not found: ${projectTitle}`);
        return;
    }
    
    // Create modal with project details
    const modalHtml = `
        <div class="project-modal-overlay" id="projectModal">
            <div class="project-modal-content">
                <button class="modal-close-btn" onclick="closeProjectModal()">✕</button>
                <h2>${project.title}</h2>
                <p class="project-modal-subtitle">${project.subtitle}</p>
                <div class="project-modal-status">Status: ${project.status}</div>
                
                <div class="project-modal-section">
                    <h3>Description</h3>
                    <p>${project.description}</p>
                </div>
                
                <div class="project-modal-section">
                    <h3>Technologies Used</h3>
                    <div class="tech-tags">
                        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="project-modal-section">
                    <h3>Key Metrics</h3>
                    <ul class="metrics-list">
                        ${Object.entries(project.metrics).map(([key, value]) => 
                            `<li><strong>${key}:</strong> ${value}</li>`
                        ).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHtml;
    document.body.appendChild(modalContainer.firstElementChild);
    
    // Animate modal appearance
    setTimeout(() => {
        document.getElementById('projectModal').classList.add('visible');
    }, 10);
    
    console.log(`📊 Showing details for: ${projectTitle}`);
}

/**
 * Close project modal
 */
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.remove('visible');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

/**
 * Filter projects by technology
 * @param {string} tech - Technology to filter by
 */
function filterProjectsByTech(tech) {
    const resumeData = window.portfolioApp?.resumeData;
    
    if (!resumeData) {
        console.error('Resume data not loaded');
        return;
    }
    
    const filteredProjects = resumeData.projects.filter(project => 
        project.tech.some(t => t.toLowerCase().includes(tech.toLowerCase()))
    );
    
    console.log(`🔍 Found ${filteredProjects.length} projects using ${tech}`);
    return filteredProjects;
}

/**
 * Sort projects by status
 * @param {string} status - Status to filter by (Live, Active, Production)
 */
function filterProjectsByStatus(status) {
    const resumeData = window.portfolioApp?.resumeData;
    
    if (!resumeData) {
        console.error('Resume data not loaded');
        return;
    }
    
    const filteredProjects = resumeData.projects.filter(project => 
        project.status.toLowerCase() === status.toLowerCase()
    );
    
    console.log(`🔍 Found ${filteredProjects.length} projects with status: ${status}`);
    return filteredProjects;
}

console.log('📁 Projects script loaded');