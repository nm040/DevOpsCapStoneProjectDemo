pipeline {
    agent any

    environment {
        BRANCH_NAME = "${env.GIT_BRANCH ?: 'main'}" // Default to 'main' if BRANCH_NAME is null
        TOMCAT_HOME = '/Users/964340/Documents/apache-tomcat-11.0.1' // Update with your Tomcat installation path
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
                sh 'npm install'
            }
        }

        stage('Install Test dependencies') {
            steps {
                sh 'npm install --save-dev jest-junit'
            }
        }

        stage('Buil project') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy project to Tomcat') {
            steps {
                sh '''
                rmdir /S /Q "%TOMCAT_HOME%\\webapps\\your-app"
                xcopy /s /e /i /y /q build "%TOMCAT_HOME%\\webapps\\your-app"
                '''
            }
        }

        stage('Test the project') {
            steps {
                sh 'npm test -- --ci'
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
