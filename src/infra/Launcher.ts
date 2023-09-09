#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DataStack } from './stacks/DataStack';
import { LambdaStack } from './stacks/LambdaStack';


const app = new cdk.App();
new DataStack(app, 'DataStack', {});
new LambdaStack(app, 'LambdaStack', {});