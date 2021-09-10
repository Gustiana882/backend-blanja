pipeline {
    agent any

    stages {
        stage('instal') {
            steps {
                nodejs("nodejs") {
                    sh 'npm install'
                }
            }
        }
    }
}