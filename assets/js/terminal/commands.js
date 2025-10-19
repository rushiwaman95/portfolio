// commands.js - Terminal Command Definitions
// Dynamically generates command outputs from resume.json

/**
 * Get command output based on command name
 * @param {string} command - Command name
 * @returns {string|null} - HTML formatted output or null if command not found
 */
function getCommandOutput(command) {
    const resumeData = window.portfolioApp?.resumeData;
    
    if (!resumeData) {
        return '<span class="error">Resume data not loaded. Please refresh the page.</span>';
    }
    
    const outputs = {
        'whoami': generateWhoamiOutput(resumeData),
        'skills': generateSkillsOutput(resumeData),
        'experience': generateExperienceOutput(resumeData),
        'projects': generateProjectsOutput(resumeData),
        'certs': generateCertsOutput(resumeData),
        'contact': generateContactOutput(resumeData),
        'resume': generateResumeOutput(resumeData),
        'help': generateHelpOutput()
    };
    
    return outputs[command] || null;
}

/**
 * Generate whoami command output
 */
function generateWhoamiOutput(data) {
    return `
<span class="success">NAME</span>
    ${data.personal.name} - ${data.personal.title}

<span class="success">CURRENT ROLE</span>
    ${data.personal.currentRole}

<span class="success">SYNOPSIS</span>
    ${data.summary}

<span class="success">EXPERIENCE</span>
    ${data.personal.experience} of professional experience

<span class="success">CONTACT</span>
    <span class="info">Email:</span>     ${data.personal.email}
    <span class="info">Phone:</span>     ${data.personal.phone}
    <span class="info">LinkedIn:</span>  ${data.personal.linkedin}
    <span class="info">GitHub:</span>    ${data.personal.github}
`;
}

/**
 * Generate skills command output
 */
function generateSkillsOutput(data) {
    return `
<span class="success">TECHNICAL SKILLS MATRIX</span>
──────────────────────────────────────────────────────────
<span class="info">[Cloud Platforms]</span>
  ▸ <span class="command">${data.skills.cloud.join(', ')}</span>

<span class="info">[Infrastructure as Code]</span>
  ▸ <span class="command">${data.skills.iac.join(', ')}</span>

<span class="info">[CI/CD & DevOps]</span>
  ▸ <span class="command">${data.skills.cicd.join(', ')}</span>

<span class="info">[Containerization & Orchestration]</span>
  ▸ <span class="command">${data.skills.containers.join(', ')}</span>

<span class="info">[Security & Compliance]</span>
  ▸ <span class="command">${data.skills.security.join(', ')}</span>

<span class="info">[Programming & Scripting]</span>
  ▸ <span class="command">${data.skills.programming.join(', ')}</span>

<span class="info">[Databases]</span>
  ▸ <span class="command">${data.skills.databases.join(', ')}</span>

<span class="info">[Monitoring & Observability]</span>
  ▸ <span class="command">${data.skills.monitoring.join(', ')}</span>
`;
}

/**
 * Generate experience command output
 */
function generateExperienceOutput(data) {
    return `
<span class="success">PROFESSIONAL EXPERIENCE</span>
──────────────────────────────────────────────────────────
${data.experience.map(exp => `
<span class="command">${exp.position} @ ${exp.company}</span> (${exp.period})${exp.current ? ' <span class="info">[CURRENT]</span>' : ''}

  <span class="info">Key Responsibilities:</span>
${exp.responsibilities.map(r => `  • ${r}`).join('\n')}

${exp.achievements.length > 0 ? `  <span class="success">Key Achievements:</span>
${exp.achievements.slice(0, 5).map(a => `  ✓ ${a}`).join('\n')}
${exp.achievements.length > 5 ? `  ... and ${exp.achievements.length - 5} more achievements` : ''}` : ''}
`).join('\n──────────────────────────────────────────────────────────\n')}
`;
}

/**
 * Generate projects command output
 */
function generateProjectsOutput(data) {
    return `
<span class="success">KEY PROJECTS</span>
──────────────────────────────────────────────────────────
${data.projects.map((proj, i) => `
<span class="info">${i + 1}. ${proj.title}</span> [${proj.status}]
   <span class="output">${proj.description}</span>
   
   <span class="command">Tech Stack:</span> ${proj.tech.join(', ')}
   
   <span class="success">Metrics:</span>
${Object.entries(proj.metrics).map(([key, value]) => `   • ${key}: ${value}`).join('\n')}
`).join('\n──────────────────────────────────────────────────────────\n')}
`;
}

/**
 * Generate certifications command output
 */
function generateCertsOutput(data) {
    return `
<span class="success">PROFESSIONAL CERTIFICATIONS</span>
──────────────────────────────────────────────────────────
${data.certifications.map((cert, i) => `
  <span class="command">${i + 1}. ${cert.name}</span>
     <span class="info">Level:</span> ${cert.level}
     <span class="info">Issuer:</span> ${cert.issuer}
     <span class="info">Verify:</span> <a href="${cert.url}" target="_blank" style="color: #58a6ff;">${cert.url}</a>
`).join('\n')}

<span class="success">EDUCATION</span>
──────────────────────────────────────────────────────────
  <span class="command">${data.education.degree}</span>
  ${data.education.university}, ${data.education.year}
`;
}

/**
 * Generate contact command output
 */
function generateContactOutput(data) {
    return `
<span class="success">CONTACT INFORMATION</span>
──────────────────────────────────────────────────────────
<span class="info">Name:</span>       ${data.personal.name}
<span class="info">Email:</span>      <a href="mailto:${data.personal.email}" style="color: #58a6ff;">${data.personal.email}</a>
<span class="info">Phone:</span>      ${data.personal.phone}
<span class="info">LinkedIn:</span>   <a href="${data.personal.linkedin}" target="_blank" style="color: #58a6ff;">${data.personal.linkedin}</a>
<span class="info">GitHub:</span>     <a href="${data.personal.github}" target="_blank" style="color: #58a6ff;">${data.personal.github}</a>
<span class="info">Portfolio:</span>  <a href="${data.personal.portfolio}" target="_blank" style="color: #58a6ff;">${data.personal.portfolio}</a>

<span class="success">AVAILABILITY</span>
──────────────────────────────────────────────────────────
Open to DevOps Engineer positions, cloud consulting opportunities,
and projects involving AWS, Kubernetes, and CI/CD.
Available for remote work globally.
`;
}

/**
 * Generate resume command output
 */
function generateResumeOutput(data) {
    return `
<span class="success">RESUME</span>
──────────────────────────────────────────────────────────
To request a full PDF copy of my resume, please send an email to:

<span class="command">${data.personal.email}</span>

Subject: "Resume Request"

You will receive a response within 24 hours.
`;
}

/**
 * Generate help command output
 */
function generateHelpOutput() {
    return `
<span class="success">PORTFOLIO HELP</span>

<span class="info">Usage:</span> command [options]

<span class="info">DESCRIPTION</span>
    This is an interactive portfolio terminal. Below is a list of
    supported commands.

<span class="info">AI-POWERED COMMANDS</span>
    <span class="command">ask "your question"</span>    ✨ Ask the AI assistant about Rushikesh
                           Example: ask "what are your top skills?"
                           Example: ask "tell me about your AWS experience"

<span class="info">PORTFOLIO COMMANDS</span>
    <span class="command">whoami</span>                 Displays professional summary and contact info
    <span class="command">skills</span>                 Lists technical skills and tools
    <span class="command">experience</span>             Shows detailed work experience
    <span class="command">projects</span>               Lists key projects with metrics
    <span class="command">certs</span>                  Displays professional certifications
    <span class="command">contact</span>                Shows contact information
    <span class="command">resume</span>                 Information on how to get PDF resume

<span class="info">SYSTEM COMMANDS</span>
    <span class="command">help</span>                   Shows this help menu
    <span class="command">clear</span>                  Clears the terminal screen
    <span class="command">exit</span>                   Closes the terminal session

<span class="info">NAVIGATION</span>
    Use <span class="command">↑</span> and <span class="command">↓</span> arrow keys to navigate through command history.

<span class="info">TIPS</span>
    • All commands are case-insensitive
    • Press Tab to auto-complete (coming soon)
    • Type "ask" followed by your question to get personalized answers
`;
}

console.log('📝 Terminal commands loaded');