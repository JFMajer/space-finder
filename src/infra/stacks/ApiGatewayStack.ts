import * as cdk from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";


interface ApiGWStackProps extends cdk.StackProps {
    lambdaIntegration: LambdaIntegration;
}

export class ApiGWStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: ApiGWStackProps) {
        super(scope, id, props);

        const api = new RestApi(this, 'ApiGW', {
            
        })
        const spacesResource = api.root.addResource('spaces');
        spacesResource.addMethod('GET', props.lambdaIntegration);

        const apiGWURL = new cdk.CfnOutput(this, 'ApiGWURL', {
            value: api.url + 'spaces',
        });


    }

}