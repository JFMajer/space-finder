#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DataStack } from './stacks/DataStack';
import { LambdaStack } from './stacks/LambdaStack';
import { ApiGWStack } from './stacks/ApiGatewayStack';


const app = new cdk.App();
new DataStack(app, 'DataStack', {});
const lambda = new LambdaStack(app, 'LambdaStack', {});
new ApiGWStack(app, 'ApiGateway', {
    lambdaIntegration: lambda.lambdaIntegration,
});