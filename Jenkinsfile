pipeline {
    agent any

    stages {
        stage('Instaling') {
            steps {
                nodejs("nodejs") {
                    sh 'npm install'
                }
            }
        }
        stage('Running Test') {
            steps {
                nodejs("nodejs") {
                    sh 'npm run test'
                }
            }
        }
        stage("finish") {
            steps {
                sh "echo 'finish'"
            }
        }
    }
}