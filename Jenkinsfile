def builderImage
def imagename = 'gustiana/back-blanja:1.0'
pipeline {
    agent any

    parameters {
        string(name: 'NAME', defaultValue: 'gustiana/back-blanja:1.0', description: 'Who should I say hello to?')

    }

    stages {
        stage('Instaling') {
            steps {
                nodejs("nodejs") {
                    sh 'yarn install'
                }
            }
        }
        stage('Running Test') {
            steps {
                // sh "sudo docker-compose up -d" 
                nodejs("nodejs") {
                    sh 'yarn run test'
                }
                // sh "docker-compose down"
            }
        }
        stage("Build image") {
            when {
                expression {
                    params.NAME != ''
                }
            }
            steps {
                script {
                    builderImage = docker.build("${imagename}")
                }
            }
        }
        stage("Push Image") {
            when {
                expression {
                    params.NAME != ''
                }
            }
            steps {
                script {
                    builderImage.push()
                }
                sh "docker image prune -f"
            }
        }
        stage('Deployment') {
            when {
                expression {
                    params.NAME != ''
                }
            }
            steps {
                script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'develop',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        //execCommand: "docker pull ${imagename}; docker kill backend; docker run -d --rm --name backend --net blanjanet -p 9000:9000 ${imagename}",
                                        execCommand: "docker pull ${imagename}; cd /home/ubuntu; ./run.sh",
                                        execTimeout: 120000,
                                    )
                                ]
                            )
                        ]
                    )

                }
            }
        }
        stage("Success") {
            steps {
                sh "echo 'success runing'"
            }
        }
    }
}
