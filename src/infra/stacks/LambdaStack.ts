import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Function as LambdaFunction } from "aws-cdk-lib/aws-lambda";
import { Runtime, Code } from "aws-cdk-lib/aws-lambda";
import { join } from "path";


export class LambdaStack extends cdk.Stack{
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const lambda = new LambdaFunction(this, 'HelloLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: "hello.handler",
            code: Code.fromAsset(join(__dirname, '..', '..', 'services', 'hello')),
        })



    }

}