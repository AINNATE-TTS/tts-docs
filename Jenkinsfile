def getEnvCode(def _git_branch){
    if (_git_branch == "develop") {
        env_code = "dev"
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
        PROJECT_NAME  = "ttsopenai"
        PAGES_PROJECT_NAME = "frontend-docs-tts"
        SHORT_COMMIT = "${GIT_COMMIT[0..7]}"
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
                    configFile(fileId: "${PAGES_PROJECT_NAME}-${ENV_CODE}-profile", 
                    targetLocation: './.env')
                ]) { 
                    sh 'cat ./.env'
                }
                echo "Update Backend TTS Service Profiles Done!!!!"
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
                script {
                    env.ENV_CODE = getEnvCode(env.BRANCH_NAME)
                    def now = new Date()
                    def dateTag = now.format("yyyy_MM_dd_HHmmss")
                    env.IMAGE_TAG = "${SHORT_COMMIT}_${env.BRANCH_NAME}_${dateTag}"
                    sh "source .env"
                    sh "docker buildx build -e CLOUDFLARE_ACCOUNT_ID=${CLOUDFLARE_ACCOUNT_ID} -e CLOUDFLARE_API_TOKEN=${CLOUDFLARE_API_TOKEN} -t local/${PAGES_PROJECT_NAME}-${ENV_CODE}-service:${IMAGE_TAG} -f Dockerfile ."
	                sh "docker run --rm local/${PAGES_PROJECT_NAME}-${ENV_CODE}-service:${IMAGE_TAG} wrangler pages deploy dist --project-name=${PAGES_PROJECT_NAME}-${ENV_CODE}"
                }
                echo "Image tag: ${env.IMAGE_TAG}"
            }
        }


        stage('Deploy') {
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
            environment {
                GIT_PROTOCOL = 'https'
                GIT_CONFIG_URI = "github.com/AINNATE-TTS/ttsopeai-chart.git"
                GIT_CREDS = "tran.van.cong"

            }
            steps {
                configFileProvider([configFile(fileId: 'patchTagImages-tts', targetLocation: '/tmp/patchTagImages.sh')]) {
                    withCredentials([usernamePassword(credentialsId: GIT_CREDS, passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]){
                        sh "chmod +x /tmp/patchTagImages.sh"
                        sh "/tmp/patchTagImages.sh"
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

