def getEnvCode(def _git_branch){
    if (_git_branch == "develop") {
        env_code = "prod"
    }
    else if (_git_branch == "main") {
        env_code = "prod"
    }
    return env_code
}
 
pipeline {
    agent {
        label 'Jenkins-Agent'
    }
    options {
        buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '5', numToKeepStr: '30')
    }
    environment {
        SERVICE_NAME    = 'frontend-docs-service'
        currentVersion  = "v1.0"
        PROJECT_NAME    = "ttsopenai"
        PROFILE_NAME    = "frontend-docs-tts"
        SHORT_COMMIT    = "${GIT_COMMIT[0..7]}"
    }
    parameters {
        string(name: 'SLEEP_TIME_IN_SECONDS', defaultValue: '10', description: 'The waiting time to Sonar server perform analysis')
        string(name: 'BUILD_MANUAL', defaultValue: 'Name-Service', description: 'Enter the Name Service')
    }

    
    stages {
        stage('Pre Deployment') {
            when{
                anyOf{
                    changeset "**"
                    expression { params.BUILD_MANUAL == 'frontend-docs-tts' }
                }
                anyOf {
                    branch 'develop'
                    branch 'main'
                }
            }
            steps {
                slackSend (
                    channel: 'tts-cicd-notify',
                    color: '#FFFF00',
                    message: "Staring Job:          » ${env.JOB_NAME} [${env.BUILD_NUMBER}]\nBranch     » ${env.GIT_BRANCH}\nCommit:   » ${env.GIT_COMMIT}\nURL:          » (${env.BUILD_URL})",
                    teamDomain: 'chatbotgpt-group',
                    tokenCredentialId: 'ttsopenai-slack'
                )
                script {
                    env.GIT_TAG = sh(returnStdout: true, script: 'git tag --points-at ${GIT_COMMIT} || :').trim()
                    env.GIT_COMMIT_MSG = sh(script: 'git log -1 --pretty=%B ${GIT_COMMIT}', returnStdout: true).trim()
                }
            }
        }
        stage('Checkout Source Code') {
            when{
                anyOf{
                    changeset "**"
                    expression { params.BUILD_MANUAL == 'frontend-docs-tts' }
                }
                anyOf {
                    branch 'develop'
                    branch 'main'
                }
            }
            steps {

                script {
                    env.ENV_CODE = getEnvCode(env.BRANCH_NAME)
                    echo "${ENV_CODE}"
                    checkout([
                        $class: 'GitSCM',
                        branches: scm.branches,
                        doGenerateSubmoduleConfigurations: scm.doGenerateSubmoduleConfigurations,
                        extensions: scm.extensions + [[$class: 'CloneOption', noTags: false, reference: '', shallow: false]],
                        userRemoteConfigs: scm.userRemoteConfigs
                    ])
                    currentVersion = sh(returnStdout: true, script: "git tag -l | tail -1").trim()
                    echo "${currentVersion}"
                }
            }
        }

        stage('Update File Enviroment'){
            when {
                anyOf{
                    changeset "**"
                    expression { params.BUILD_MANUAL == 'frontend-docs-tts' }
                }
                anyOf {
                    branch 'develop'
                    branch 'main'
                }
            }
            steps {
                configFileProvider([
                    configFile(fileId: "${PROFILE_NAME}-${ENV_CODE}-profile", 
                    targetLocation: './.env')
                ]) { 
                    sh 'cat ./.env'
                }
                echo "Update Frontend Docs TTS Service Profiles Done!!!!"
            }
        }
        stage('Build and Deploy'){
            when {
                anyOf{
                    changeset "**"
                    expression { params.BUILD_MANUAL == 'frontend-docs-tts' }
                }
                anyOf {
                    branch 'develop'
                    branch 'main'
                }
            }
            steps {
                withCredentials([[
                $class: 'AmazonWebServicesCredentialsBinding',
                accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                secretKeyVariable: 'AWS_SECRET_ACCESS_KEY',
                credentialsId: 'cicd-deployment']]) {
                    script {
                        env.ENV_CODE = getEnvCode(env.BRANCH_NAME)
                        sh 'aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID'
                        sh 'aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY'
                        sh "cp deployment/group_vars/${env.ENV_CODE}.yml deployment/group_vars/all.yml"
                        sh "ansible-playbook --connection=local --inventory 127.0.0.1, deployment/playbook.yml --extra-vars application_path=${env.WORKSPACE}"
                    }
                }
            }
        }
    }
  post {
    success {
        slackSend (
            channel: 'tts-cicd-notify',
            color: '#00FF00',
            message: "Status      » SUCCESS\nJob:          » ${env.JOB_NAME} [${env.BUILD_NUMBER}]\nBranch     » ${env.GIT_BRANCH}\nCommit:   » ${env.GIT_COMMIT}\nURL:          » (${env.BUILD_URL})",
            teamDomain: 'chatbotgpt-group',
            tokenCredentialId: 'ttsopenai-slack'
        )
    }
    failure {
        slackSend (
            channel: 'tts-cicd-notify',
            color: '#FF0000',
            message: "Status      » FAILURE\nJob:          » ${env.JOB_NAME} [${env.BUILD_NUMBER}]\nBranch     » ${env.GIT_BRANCH}\nCommit:   » ${env.GIT_COMMIT}\nURL:          » (${env.BUILD_URL})",
            teamDomain: 'chatbotgpt-group',
            tokenCredentialId: 'ttsopenai-slack'
        )
    }
  }
}

