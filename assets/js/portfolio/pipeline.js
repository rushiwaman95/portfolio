// pipeline.js - CI/CD Pipeline Interactions
// Handles the interactive CI/CD pipeline visualization

/**
 * Show detailed logs for a specific pipeline stage
 * @param {string} stage - Stage name (commit, build, test, security, deploy)
 */
function showStageDetails(stage) {
    const stageDetails = {
        commit: [
            '[INFO] Starting educational foundation...',
            '[INFO] Enrolled in Higher Secondary Certificate (HSC)',
            '[INFO] Majoring in Science with Computer Science',
            '[SUCCESS] Completed HSC with 85% marks',
            '[INFO] Developed foundational programming skills in C++',
            '[SUCCESS] Built first console-based student management system',
            '[INFO] Participated in school tech fests and coding competitions'
        ],
        build: [
            '[INFO] Building professional knowledge base...',
            '[INFO] Enrolled in Bachelor of Engineering (Information Technology)',
            '[INFO] Core subjects: Data Structures, Algorithms, DBMS, OS, Networking',
            '[SUCCESS] Maintained CGPA of 8.2/10 throughout degree',
            '[INFO] Completed academic projects on Cloud Computing and DevOps',
            '[SUCCESS] Implemented CI/CD pipeline for university project using Jenkins',
            '[INFO] Graduated with distinction in 2023',
            '[SUCCESS] Awarded "Best Project" for cloud infrastructure implementation'
        ],
        test: [
            '[INFO] Testing skills in real-world environment...',
            '[INFO] Joined Ignite Solutions as DevOps Intern',
            '[INFO] Containerized microservices using Docker for faster deployments',
            '[SUCCESS] Reduced deployment time by 40% through image optimization',
            '[INFO] Implemented CloudWatch monitoring for EC2 instances',
            '[SUCCESS] Automated log analysis reducing troubleshooting time by 30%',
            '[INFO] Gained hands-on experience with AWS EC2, ECS, and S3',
            '[SUCCESS] Successfully deployed 5+ containerized applications to production'
        ],
        security: [
            '[INFO] Scaling expertise at Flentas...',
            '[INFO] Promoted to DevOps Engineer role',
            '[SUCCESS] Designed three-tier AWS architecture with HA/DR capabilities',
            '[INFO] Implemented Cosign for container image signing and verification',
            '[SUCCESS] Reduced critical vulnerabilities by 70% using Docker Scout',
            '[INFO] Enforced SLSA framework securing software supply chain',
            '[SUCCESS] Automated vulnerability scanning saving 8 hours/week',
            '[INFO] Managed EKS clusters handling 10x traffic spikes',
            '[SUCCESS] Reduced Kubernetes costs by 18% through rightsizing',
            '[INFO] Led migration of 30+ repositories to Git with Azure AD SSO',
            '[SUCCESS] Improved client satisfaction scores by 20% through consulting'
        ],
        deploy: [
            '[INFO] Deploying advanced skills at Applied Cloud Computing...',
            '[INFO] Taking on Senior AWS Engineer responsibilities',
            '[SUCCESS] Architecting scalable AWS infrastructure with EC2, EKS, RDS',
            '[INFO] Leading deployment automation using Terraform & CloudFormation',
            '[SUCCESS] Designing optimized CI/CD pipelines with Jenkins & GitHub Actions',
            '[INFO] Implementing containerized workloads on Amazon EKS/ECS',
            '[SUCCESS] Monitoring production workloads with CloudWatch, Prometheus, Grafana',
            '[INFO] Managing networking components: VPC peering, Transit Gateway, VPN',
            '[SUCCESS] Enforcing security best practices with IAM, Security Groups, GuardDuty',
            '[INFO] Collaborating with dev teams to optimize cost, performance, reliability',
            '[SUCCESS] Driving incident management and high-availability architecture design'
        ]
    };
    
    const logs = document.getElementById('portfolio-pipeline-logs');
    if (!logs) {
        console.error('Pipeline logs element not found');
        return;
    }
    
    // Clear existing logs
    logs.innerHTML = '';
    
    // Add new logs with animation
    const stageLogs = stageDetails[stage] || [];
    stageLogs.forEach((log, index) => {
        setTimeout(() => {
            const logLine = document.createElement('div');
            logLine.className = `log-line ${log.includes('SUCCESS') ? 'log-success' : log.includes('ERROR') ? 'log-error' : 'log-info'}`;
            logLine.textContent = log;
            logs.appendChild(logLine);
            logs.scrollTop = logs.scrollHeight;
        }, index * 200);
    });
    
    console.log(`📊 Showing details for stage: ${stage}`);
}

/**
 * Trigger a new pipeline build
 */
function triggerPipeline() {
    const status = document.getElementById('portfolio-pipeline-status');
    const stages = document.querySelectorAll('#pipeline .pipeline-stage');
    const logs = document.getElementById('portfolio-pipeline-logs');
    
    if (!status || !stages.length || !logs) {
        console.error('Pipeline elements not found');
        return;
    }
    
    console.log('🚀 Triggering new pipeline build...');
    
    // Reset all stages
    stages.forEach(stage => {
        stage.classList.remove('success', 'active');
    });
    
    // Update status
    status.textContent = '🔄 Pipeline Running...';
    status.className = 'status-badge status-running';
    
    // Clear logs
    logs.innerHTML = '';
    
    // Comprehensive pipeline logs
const pipelineLogs = [
    // Education Phase
    { type: 'log-info', text: '[INFO] Starting educational foundation...' },
    { type: 'log-info', text: '[INFO] Enrolled in Higher Secondary Certificate (HSC)' },
    { type: 'log-success', text: '[SUCCESS] Completed HSC with 85% marks' },
    { type: 'log-info', text: '[INFO] Developed foundational programming skills in C++' },
    { type: 'log-success', text: '[SUCCESS] Built first console-based student management system' },
    
    // University Phase
    { type: 'log-info', text: '[INFO] Building professional knowledge base...' },
    { type: 'log-info', text: '[INFO] Enrolled in Bachelor of Engineering (Information Technology)' },
    { type: 'log-success', text: '[SUCCESS] Maintained CGPA of 8.2/10 throughout degree' },
    { type: 'log-info', text: '[INFO] Core subjects: Data Structures, Algorithms, DBMS, OS, Networking' },
    { type: 'log-info', text: '[INFO] Completed academic projects on Cloud Computing and DevOps' },
    { type: 'log-success', text: '[SUCCESS] Implemented CI/CD pipeline for university project using Jenkins' },
    { type: 'log-success', text: '[SUCCESS] Graduated with distinction in 2023' },
    { type: 'log-success', text: '[SUCCESS] Awarded "Best Project" for cloud infrastructure implementation' },
    
    // Ignite Solutions (Internship)
    { type: 'log-info', text: '[INFO] Testing skills in real-world environment...' },
    { type: 'log-info', text: '[INFO] Joined Ignite Solutions as DevOps Intern' },
    { type: 'log-info', text: '[INFO] Containerized microservices using Docker for faster deployments' },
    { type: 'log-success', text: '[SUCCESS] Reduced deployment time by 40% through image optimization' },
    { type: 'log-info', text: '[INFO] Implemented CloudWatch monitoring for EC2 instances' },
    { type: 'log-success', text: '[SUCCESS] Automated log analysis reducing troubleshooting time by 30%' },
    { type: 'log-info', text: '[INFO] Gained hands-on experience with AWS EC2, ECS, and S3' },
    { type: 'log-success', text: '[SUCCESS] Successfully deployed 5+ containerized applications to production' },
    
    // Flentas (DevOps Engineer)
    { type: 'log-info', text: '[INFO] Scaling expertise at Flentas...' },
    { type: 'log-info', text: '[INFO] Promoted to DevOps Engineer role' },
    { type: 'log-success', text: '[SUCCESS] Designed three-tier AWS architecture with HA/DR capabilities' },
    { type: 'log-info', text: '[INFO] Implemented Cosign for container image signing and verification' },
    { type: 'log-success', text: '[SUCCESS] Reduced critical vulnerabilities by 70% using Docker Scout' },
    { type: 'log-info', text: '[INFO] Enforced SLSA framework securing software supply chain' },
    { type: 'log-success', text: '[SUCCESS] Automated vulnerability scanning saving 8 hours/week' },
    { type: 'log-info', text: '[INFO] Managed EKS clusters handling 10x traffic spikes' },
    { type: 'log-success', text: '[SUCCESS] Reduced Kubernetes costs by 18% through rightsizing' },
    { type: 'log-info', text: '[INFO] Led migration of 30+ repositories to Git with Azure AD SSO' },
    { type: 'log-success', text: '[SUCCESS] Improved client satisfaction scores by 20% through consulting' },
    
    // Applied Cloud Computing (Senior Role)
    { type: 'log-info', text: '[INFO] Deploying advanced skills at Applied Cloud Computing...' },
    { type: 'log-info', text: '[INFO] Taking on Senior AWS Engineer responsibilities' },
    { type: 'log-success', text: '[SUCCESS] Architecting scalable AWS infrastructure with EC2, EKS, RDS' },
    { type: 'log-info', text: '[INFO] Leading deployment automation using Terraform & CloudFormation' },
    { type: 'log-success', text: '[SUCCESS] Designing optimized CI/CD pipelines with Jenkins & GitHub Actions' },
    { type: 'log-info', text: '[INFO] Implementing containerized workloads on Amazon EKS/ECS' },
    { type: 'log-success', text: '[SUCCESS] Monitoring production workloads with CloudWatch, Prometheus, Grafana' },
    { type: 'log-info', text: '[INFO] Managing networking components: VPC peering, Transit Gateway, VPN' },
    { type: 'log-success', text: '[SUCCESS] Enforcing security best practices with IAM, Security Groups, GuardDuty' },
    { type: 'log-info', text: '[INFO] Collaborating with dev teams to optimize cost, performance, reliability' },
    { type: 'log-success', text: '[SUCCESS] Driving incident management and high-availability architecture design' },
    
    // Career Summary
    { type: 'log-success', text: '[SUCCESS] Career Journey Completed!' },
    { type: 'log-info', text: '[INFO] Total Professional Experience: 3.5+ Years' },
    { type: 'log-info', text: '[INFO] Certifications Earned: AWS DevOps Pro, AWS SA Associate, HashiCorp Terraform' },
    { type: 'log-success', text: '[SUCCESS] Ready for next challenge in DevOps/Cloud Engineering!' }
];
    
    // Animate logs
    pipelineLogs.forEach((log, idx) => {
        setTimeout(() => {
            const logLine = document.createElement('div');
            logLine.className = `log-line ${log.type}`;
            logLine.textContent = log.text;
            logs.appendChild(logLine);
            logs.scrollTop = logs.scrollHeight;
        }, idx * 150);
    });
    
    // Animate stages
    stages.forEach((stage, index) => {
        setTimeout(() => {
            stage.classList.add('active');
            setTimeout(() => {
                stage.classList.remove('active');
                stage.classList.add('success');
                
                // Update status when all stages complete
                if (index === stages.length - 1) {
                    status.textContent = '✓ All Checks Passing';
                    status.className = 'status-badge status-success';
                    console.log('✅ Pipeline completed successfully');
                }
            }, 1000);
        }, index * 1200);
    });
}

console.log('🔄 Pipeline script loaded');