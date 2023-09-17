import * as cdk from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

interface ApiGWStackProps extends cdk.StackProps {
  lambdaIntegration: LambdaIntegration[];
}

export class ApiGWStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ApiGWStackProps) {
    super(scope, id, props);

    const api = new RestApi(this, "ApiGW", {});
    const resources = [
      {
        path: "hello",
        method: "GET",
        lambdaIntegration: props.lambdaIntegration[0],
      },
      {
        path: "s3",
        method: "GET",
        lambdaIntegration: props.lambdaIntegration[1],
      },
      {
        path: "spaces",
        method: "GET",
        lambdaIntegration: props.lambdaIntegration[2],
      },
    ];

    resources.forEach((resource) => {
      const apiResource = api.root.addResource(resource.path);
      apiResource.addMethod(resource.method, resource.lambdaIntegration);
    });

    const apiGWURLSpace = new cdk.CfnOutput(this, "apiGWURLSpace", {
      value: api.url + "spaces",
    });

    const apiGWURLS3 = new cdk.CfnOutput(this, "apiGWURLS3", {
        value: api.url + "s3",
        });
  }
}
