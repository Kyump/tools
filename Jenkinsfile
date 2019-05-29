#!/usr/bin/env groovy
githubProject = 'kronos'

def discord() {
    def branch = env.BRANCH_NAME

    def gitCommit = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
    def shortCommit = gitCommit.take(6)

    def lastCommitMsg = sh(returnStdout: true, script: 'git log -1 --pretty=%B').trim()
    def lastCommitter = sh(returnStdout: true, script: 'git log -1 --format=\'%an\'').trim()

    GString commitLink = "[$shortCommit](https://github.com/Kyump/$githubProject/commit/$gitCommit)"

    def description = "Commit $commitLink => $lastCommitMsg"

    def header = ''
    if (branch == 'master') {
        header = '~~~ MASTER MASTER MASTER MASTER MASTER MASTER ~~~\n'
    }

    discordSend description: description,
            footer: "Pushed by $lastCommitter",
            link: env.BUILD_URL,
            successful: currentBuild.resultIsBetterOrEqualTo('SUCCESS'),
            title: currentBuild.fullDisplayName,
            webhookURL: 'https://discordapp.com/api/webhooks/454608669607460885/b0ZBJuJN9xkIoAyvfBxdk94T3fZnJaxwbY8SmWa71B5Mw21InKxPmpQ4TmKdJA3Vi_wJ'

}

pipeline {
    agent any
    environment {
        COMPOSE_PROJECT_NAME = "KronosBackend"
        DOCKER_TLS_VERIFY="1"
        DOCKER_HOST="tcp://34.245.78.242:2376"
        DOCKER_CERT_PATH="/var/jenkins_home/.docker/machine/machines/kronos-integration"
        DOCKER_MACHINE_NAME="kronos-integration"
    }
    stages {
        stage('Build') {
            steps {
                sh 'node -v'
                sh 'npm prune'
                sh 'npm install'
                sh 'npm run clean'
                sh 'npm run bootstrap'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh 'npm run lint'
                sh 'npm run flow'
                sh 'npm run test'
            }
        }
        stage('Deploy') {
            when {
                branch 'integration'
            }
            steps {
                echo 'Compile sources...'
                sh 'lerna run build --ignore *-frontend'
                sh 'lerna run build-integration'
                echo 'Deploying....'
                sh 'docker-machine env kronos-integration'
                sh 'eval $(docker-machine env kronos-integration)'
                sh 'docker-compose -f docker-compose-base.yml -f docker-compose-integration.yml down'
                sh 'docker-compose -f docker-compose-base.yml -f docker-compose-integration.yml up --build --force-recreate -d'
                sh 'docker-machine ls && docker images && docker ps -a'
            }
        }
    }

    post {
    always {
        echo 'send to discord chan'
        script {
            discord()
        }
    }
    success {
    deleteDir()
    }
    failure {
    deleteDir()
    }
    unstable {
    deleteDir()
    }
}
}
