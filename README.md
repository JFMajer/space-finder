## Space finder
### Simple serverless application deployed using Typescript CDK v2

## CDK Commands

* `cdk init app --language=typescript` - Create a new CDK project using Typescript
* `cdk bootstrap` - Bootstrap the AWS environment
* `cdk deploy` - Deploy the stack
* `cdk synth` - Synthesize the stack
* `cdk list` - List all stacks in the app
* `cdk diff` - Compare deployed stack with current state
* `cdk doctor` - Check the CDK environment and generate report
* `cdk destroy` - Destroy the stack
* `cdk deploy --parameters bucketName=cdk-bucket-1` - Deploy the stack with parameters
* `cdk deploy --all --profile <profile-name>` - Deploy the stack with a specific profile and all stacks in the app

## CDK project creation
* `npm init -y` - Create a new npm project
* `npm i -D aws-cdk aws-cdk-lib constructs` - Install the CDK dependencies<br>
Create a .gitignore file with the following content:
```bash
cat <<EOF >> .gitignore
*.js
!jest.config.js
*.d.ts
node_modules

CDK asset staging directory
.cdk.staging
cdk.out
EOF
```
* `npm i -D typescript ts-node` - Install Typescript and ts-node
* `mkdir -p src/infra/stacks && touch src/infra/stacks/DataStack.ts src/infra/Launcher.ts` - Create the project structure
* `npm i -D @types/aws-lambda` - Install the types for AWS Lambda
* `npm i uuid @types/uuid` - Install uuid and its types