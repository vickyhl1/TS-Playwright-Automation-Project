pipeline {
    agent any
    
    environment {
        // Base configuration
        BASE_URL = 'https://advantageonlineshopping.com/#/'
        NODE_ENV = 'production'
        CI = 'true'
        
        // Docker registry configuration
        DOCKER_REGISTRY = 'ghcr.io'
        DOCKER_USERNAME = 'vickyhl1'
        IMAGE_NAME = 'playwright-tests'
        
        // Image tags
        IMAGE_TAG_LATEST = "${DOCKER_REGISTRY}/${DOCKER_USERNAME}/${IMAGE_NAME}:latest"
        IMAGE_TAG_VERSION = "${DOCKER_REGISTRY}/${DOCKER_USERNAME}/${IMAGE_NAME}:${env.BUILD_NUMBER}"
    }
    
    options {
        // Keep build history
        buildDiscarder(logRotator(numToKeepStr: '10'))
        
        // Timeout after 30 minutes
        timeout(time: 30, unit: 'MINUTES')
        
        // Add timestamps to console output
        timestamps()
    }
    
    stages {
        stage('Checkout') {
            steps {
                script {
                    echo "Checking out code from repository..."
                    checkout scm
                    // Windows-compatible git commit ID extraction
                    bat 'git rev-parse --short HEAD > commit-id.txt'
                    def commitId = readFile('commit-id.txt').trim()
                    env.GIT_COMMIT_SHORT = commitId
                    echo "Building commit: ${commitId}"
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    echo "Installing npm dependencies..."
                    bat 'npm install'
                    echo "Dependencies installed successfully"
                }
            }
        }
        
        stage('Install Playwright Browsers') {
            steps {
                script {
                    echo "Installing Playwright browsers..."
                    bat 'npx playwright install --with-deps chromium'
                    echo "Playwright browsers installed successfully"
                }
            }
        }
        
        stage('Run Tests') {
            environment {
                // Use Jenkins credentials for test credentials
                TEST_USERNAME = credentials('test-username')
                TEST_PASSWORD = credentials('test-password')
            }
            steps {
                script {
                    echo "Running Playwright tests..."
                    bat 'npm test'
                }
            }
            post {
                always {
                    // Publish HTML test report
                    publishHTML([
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Playwright Test Report',
                        keepAll: true
                    ])
                    
                    // Archive test results
                    archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
                    archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
                }
                success {
                    echo "✅ All tests passed!"
                }
                failure {
                    echo "❌ Tests failed. Check the test report for details."
                }
            }
        }
        
        stage('Build Docker Image') {
            when {
                // Only build Docker image if tests pass
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                script {
                    echo "Building Docker image..."
                    bat """
                        docker build -t ${IMAGE_TAG_VERSION} .
                        docker tag ${IMAGE_TAG_VERSION} ${IMAGE_TAG_LATEST}
                    """
                    echo "Docker image built successfully: ${IMAGE_TAG_VERSION}"
                }
            }
        }
        
        stage('Push Docker Image') {
            when {
                // Only push if build succeeded
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                script {
                    withCredentials([usernamePassword(
                        credentialsId: 'docker-registry-credentials',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )]) {
                        echo "Logging into Docker registry..."
                        // Windows-compatible Docker login
                        bat """
                            echo %DOCKER_PASS% | docker login %DOCKER_REGISTRY% -u %DOCKER_USER% --password-stdin
                        """
                        
                        echo "Pushing Docker images..."
                        bat "docker push ${IMAGE_TAG_VERSION}"
                        bat "docker push ${IMAGE_TAG_LATEST}"
                        
                        echo "✅ Images pushed successfully:"
                        echo "   - ${IMAGE_TAG_VERSION}"
                        echo "   - ${IMAGE_TAG_LATEST}"
                    }
                }
            }
        }
    }
    
    post {
        always {
            // Clean up workspace
            cleanWs()
            
            echo """
            ========================================
            Build Summary
            ========================================
            Build Number: ${env.BUILD_NUMBER}
            Git Commit: ${env.GIT_COMMIT_SHORT}
            Build Status: ${currentBuild.result}
            ========================================
            """
        }
        success {
            echo "🎉 Pipeline completed successfully!"
        }
        failure {
            echo "💥 Pipeline failed. Check the logs above for details."
        }
        unstable {
            echo "⚠️ Pipeline is unstable. Some tests may have failed."
        }
    }
}