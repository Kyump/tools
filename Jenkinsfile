#!/usr/bin/env groovy
githubProject = 'kronos'

pipeline {
    agent  { node { label 'jenkins-node-slave' } }
    options {
            disableConcurrentBuilds()
            timeout(time: 15, unit: 'MINUTES')
    }
    stages {
        stage('Build') {
            steps {
                sh 'node -v'
                sh 'npm install'
                sh 'lerna bootstrap'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh 'npm run validate'
            }
        }
    }

    post {
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
