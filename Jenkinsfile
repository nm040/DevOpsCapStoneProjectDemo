pipeline {
    agent any

    environment {
        //NODE_VERSION = 'NodeJS 20' // Specify Node version if needed
        BRANCH_NAME = "${env.GIT_BRANCH ?: 'main'}" // Default to 'main' if BRANCH_NAME is null
        TOMCAT_HOME = 'C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0' // Update with your Tomcat installation path
    }

    tools {
        //nodejs "${NODE_VERSION}"
    }

    stages {
        stage('Checkout code') {
            steps {
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

        stage('Build project') {
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
