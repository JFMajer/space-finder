import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Function as LambdaFunction } from "aws-cdk-lib/aws-lambda";
import { Runtime, Code } from "aws-cdk-lib/aws-lambda";
import { join } from "path";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";


export class LambdaStack extends cdk.Stack{

    public readonly lambdaIntegration: LambdaIntegration;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const lambda = new LambdaFunction(this, 'HelloLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: "hello.handler",
            code: Code.fromAsset(join(__dirname, '..', '..', 'services')),
        })

        this.lambdaIntegration = new LambdaIntegration(lambda);

    }

}