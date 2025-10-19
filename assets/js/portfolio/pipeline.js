// pipeline.js - CI/CD Pipeline Interactions
// Handles the interactive CI/CD pipeline visualization

/**
 * Show detailed logs for a specific pipeline stage
 * @param {string} stage - Stage name (commit, build, test, security, deploy)
 */
function showStageDetails(stage) {
    const stageDetails = {
        commit: [
            '[INFO] Git commit received: feat: add new deployment strategy',
            '[INFO] Validating commit message format...',
            '[SUCCESS] Commit message follows conventional commits',
            '[INFO] Checking for merge conflicts...',
            '[SUCCESS] No conflicts detected',
            '[INFO] Running pre-commit hooks...',
            '[SUCCESS] All pre-commit checks passed'
        ],
        build: [
            '[INFO] Starting Docker image build...',
            '[INFO] Pulling base image: node:18-alpine',
            '[INFO] Installing dependencies...',
            '[INFO] Running build scripts...',
            '[INFO] Optimizing Docker layers...',
            '[SUCCESS] Docker image built successfully',
            '[INFO] Image size: 245MB (optimized)',
            '[INFO] Tagging image: app:v1.2.3'
        ],
        test: [
            '[INFO] Running unit tests...',
            '[SUCCESS] 127 unit tests passed',
            '[INFO] Running integration tests...',
            '[SUCCESS] 45 integration tests passed',
            '[INFO] Running end-to-end tests...',
            '[SUCCESS] 23 E2E tests passed',
            '[INFO] Calculating code coverage...',
            '[SUCCESS] Code coverage: 94.2%',
            '[SUCCESS] All tests completed successfully'
        ],
        security: [
            '[INFO] Scanning Docker image for vulnerabilities...',
            '[INFO] Running Trivy security scan...',
            '[SUCCESS] No critical vulnerabilities found',
            '[INFO] Checking for secrets in code...',
            '[SUCCESS] No secrets detected',
            '[INFO] Running SLSA compliance check...',
            '[SUCCESS] SLSA Level 3 compliance verified',
            '[INFO] Verifying container signatures...',
            '[SUCCESS] All signatures valid'
        ],
        deploy: [
            '[INFO] Deploying to EKS cluster...',
            '[INFO] Updating Kubernetes manifests...',
            '[INFO] Applying deployment configuration...',
            '[INFO] Rolling out new deployment...',
            '[INFO] Waiting for pods to be ready...',
            '[SUCCESS] All pods running (3/3)',
            '[INFO] Running health checks...',
            '[SUCCESS] Health check: All endpoints responding',
            '[INFO] Updating load balancer...',
            '[SUCCESS] Deployment completed successfully',
            '[SUCCESS] Application is live and healthy'
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
        { type: 'log-info', text: '[INFO] Starting CI/CD pipeline...' },
        { type: 'log-info', text: '[INFO] Git commit SHA: a3f5b2c' },
        { type: 'log-info', text: '[INFO] Branch: main' },
        { type: 'log-info', text: '[INFO] Validating Git commit...' },
        { type: 'log-info', text: '[INFO] Checking for merge conflicts...' },
        { type: 'log-success', text: '[SUCCESS] Git commit validated' },
        { type: 'log-info', text: '[INFO] Building Docker image...' },
        { type: 'log-info', text: '[INFO] Pulling base image: node:18-alpine' },
        { type: 'log-info', text: '[INFO] Installing dependencies...' },
        { type: 'log-info', text: '[INFO] Running build scripts...' },
        { type: 'log-success', text: '[SUCCESS] Docker image built successfully' },
        { type: 'log-info', text: '[INFO] Image size: 245MB' },
        { type: 'log-info', text: '[INFO] Running unit tests...' },
        { type: 'log-success', text: '[SUCCESS] Unit tests passed (127 tests)' },
        { type: 'log-info', text: '[INFO] Running integration tests...' },
        { type: 'log-success', text: '[SUCCESS] Integration tests passed (45 tests)' },
        { type: 'log-info', text: '[INFO] Code coverage: 94.2%' },
        { type: 'log-success', text: '[SUCCESS] All tests passed' },
        { type: 'log-info', text: '[INFO] Scanning for vulnerabilities...' },
        { type: 'log-info', text: '[INFO] Running Trivy security scan...' },
        { type: 'log-success', text: '[SUCCESS] No critical vulnerabilities found' },
        { type: 'log-info', text: '[INFO] Checking for secrets in code...' },
        { type: 'log-success', text: '[SUCCESS] No secrets detected' },
        { type: 'log-info', text: '[INFO] SLSA compliance check...' },
        { type: 'log-success', text: '[SUCCESS] Security scan completed' },
        { type: 'log-info', text: '[INFO] Deploying to EKS cluster...' },
        { type: 'log-info', text: '[INFO] Updating Kubernetes manifests...' },
        { type: 'log-info', text: '[INFO] Rolling out new deployment...' },
        { type: 'log-info', text: '[INFO] Waiting for pods to be ready...' },
        { type: 'log-success', text: '[SUCCESS] All pods running (3/3)' },
        { type: 'log-info', text: '[INFO] Running health checks...' },
        { type: 'log-success', text: '[SUCCESS] Health check passed' },
        { type: 'log-success', text: '[SUCCESS] Deployment completed successfully' }
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