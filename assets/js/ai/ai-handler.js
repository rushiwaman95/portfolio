// ai-handler.js - AI Request Handler
// Handles all AI interactions using resume.json data

/**
 * Main function to handle AI queries
 * @param {string} prompt - User's question
 * @param {boolean} isTerminal - Whether called from terminal or modal
 * @returns {Promise<string>} - AI response
 */
async function handleAIQuery(prompt, isTerminal = false) {
    const resumeData = window.portfolioApp?.resumeData;
    const config = window.portfolioApp?.config;
    
    if (!resumeData) {
        console.error('Resume data not loaded');
        return "Sorry, portfolio data is still loading. Please try again.";
    }
    
    // Build context from resume data
    const context = buildResumeContext(resumeData);
    
    const systemPrompt = `You are a professional AI assistant for ${resumeData.personal.name}'s portfolio.

Your ONLY function is to answer questions about ${resumeData.personal.name}, his skills, experience, projects, and resume.

**Rules:**
1. If user says "hi" or "hello", respond with a friendly professional greeting
2. If question is about ${resumeData.personal.name}'s professional profile, answer using ONLY the context below
3. If question is NOT about ${resumeData.personal.name}'s professional profile (e.g., "what is DevOps?", "write a poem"), respond with EXACTLY: "I am only authorized to answer questions about ${resumeData.personal.name} and his professional experience."
4. Keep answers concise and professional
5. Use bullet points for lists
6. Mention specific metrics and achievements when relevant

**Context about ${resumeData.personal.name}:**
---
${context}
---

**User's Question:** "${prompt}"

**Your Response:**`;

    try {
        const chatHistory = [{ 
            role: "user", 
            parts: [{ text: systemPrompt }] 
        }];
        
        const payload = { contents: chatHistory };
        const model = config?.ai?.model || "gemini-2.0-flash";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${window.GEMINI_API_KEY}`;
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
            return result.candidates[0].content.parts[0].text;
        } else {
            throw new Error("Invalid response structure from API");
        }
    } catch (error) {
        console.error("AI Error:", error);
        return "Sorry, I couldn't get an answer. Please try again later.";
    }
}

/**
 * Build comprehensive context from resume data
 * @param {Object} data - Resume data from JSON
 * @returns {string} - Formatted context for AI
 */
function buildResumeContext(data) {
    return `
═══════════════════════════════════════════════════════════
PERSONAL INFORMATION
═══════════════════════════════════════════════════════════
Name: ${data.personal.name}
Title: ${data.personal.title}
Current Role: ${data.personal.currentRole}
Experience: ${data.personal.experience}
Email: ${data.personal.email}
Phone: ${data.personal.phone}
LinkedIn: ${data.personal.linkedin}
GitHub: ${data.personal.github}

═══════════════════════════════════════════════════════════
PROFESSIONAL SUMMARY
═══════════════════════════════════════════════════════════
${data.summary}

═══════════════════════════════════════════════════════════
EDUCATION
═══════════════════════════════════════════════════════════
Degree: ${data.education.degree}
University: ${data.education.university}
Year: ${data.education.year}

═══════════════════════════════════════════════════════════
TECHNICAL SKILLS
═══════════════════════════════════════════════════════════
Cloud Platforms: ${data.skills.cloud.join(', ')}

Infrastructure as Code: ${data.skills.iac.join(', ')}

CI/CD Tools: ${data.skills.cicd.join(', ')}

Containerization & Orchestration: ${data.skills.containers.join(', ')}

Security & Compliance: ${data.skills.security.join(', ')}

Programming & Scripting: ${data.skills.programming.join(', ')}

Databases: ${data.skills.databases.join(', ')}

Monitoring & Observability: ${data.skills.monitoring.join(', ')}

Other Tools: ${data.other?.join(', ') || 'Jira, Nginx, Linux'}

═══════════════════════════════════════════════════════════
PROFESSIONAL CERTIFICATIONS
═══════════════════════════════════════════════════════════
${data.certifications.map((cert, i) => `${i + 1}. ${cert.name} (${cert.level})
   Issuer: ${cert.issuer}
   Verify: ${cert.url}`).join('\n\n')}

═══════════════════════════════════════════════════════════
PROFESSIONAL EXPERIENCE
═══════════════════════════════════════════════════════════
${data.experience.map(exp => `
▸ ${exp.position} at ${exp.company}
  Period: ${exp.period}${exp.current ? ' (Current)' : ''}
  
  Key Responsibilities:
${exp.responsibilities.map(r => `  • ${r}`).join('\n')}
  
${exp.achievements.length > 0 ? `  Key Achievements:
${exp.achievements.map(a => `  ✓ ${a}`).join('\n')}` : ''}
`).join('\n')}

═══════════════════════════════════════════════════════════
KEY PROJECTS
═══════════════════════════════════════════════════════════
${data.projects.map((proj, i) => `
${i + 1}. ${proj.title}
   Status: ${proj.status}
   
   Description: ${proj.description}
   
   Technologies: ${proj.tech.join(', ')}
   
   Key Metrics:
${Object.entries(proj.metrics).map(([key, value]) => `   • ${key}: ${value}`).join('\n')}
`).join('\n')}

═══════════════════════════════════════════════════════════
CAREER HIGHLIGHTS
═══════════════════════════════════════════════════════════
• Total Professional Experience: ${data.highlights.totalExperience} years
• Professional Certifications: ${data.highlights.certifications}
• Docker Experience: ${data.highlights.dockerExperience} years
• AWS Experience: ${data.highlights.awsExperience} years
• Terraform Experience: ${data.highlights.terraformExperience} years

═══════════════════════════════════════════════════════════
NOTABLE ACHIEVEMENTS (Summary)
═══════════════════════════════════════════════════════════
${data.experience
    .flatMap(exp => exp.achievements)
    .filter(a => a)
    .slice(0, 10)
    .map((a, i) => `${i + 1}. ${a}`)
    .join('\n')}
`;
}

console.log('🤖 AI Handler loaded');