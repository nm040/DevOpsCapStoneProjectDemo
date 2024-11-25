pipeline {
    agent any

    environment {
        BRANCH_NAME = "${env.GIT_BRANCH ?: 'main'}" // Default to 'main' if BRANCH_NAME is null
        TOMCAT_HOME = 'C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0' // Update with your Tomcat installation path
    }

    tools {
        nodejs "18.16.0"
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from Git
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Test dependencies') {
            steps {
                bat 'npm install --save-dev jest-junit'
            }
        }

        stage('Buil project') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Deploy project to Tomcat') {
            steps {
                bat '''
                rmdir /S /Q "%TOMCAT_HOME%\\webapps\\your-app"
                xcopy /s /e /i /y /q build "%TOMCAT_HOME%\\webapps\\your-app"
                '''
            }
        }

        stage('Test the project') {
            steps {
                bat 'npm test -- --ci'
            }
            post {
                always {
                    junit 'test-results/junit.xml'
                }
            }
        }

        stage('Run Security Scan') {
            steps {
                // Placeholder for now
                echo 'Running security scans...'
            }
        }
    }

    post {
        success {
            echo 'Build and deployment success!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
