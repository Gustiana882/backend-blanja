def builderImage
def imagename = 'gustiana/back-blanja:1.0'
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
        stage("Build image") {
            steps {
                script {
                    builderImage = docker.build("${imagename}")
                }
            }
        }
        stage("Test Image") {
            steps {
                script {
                    builderImage.inside(sh "echo 'pass'")
                }
            }
        }
    }
}