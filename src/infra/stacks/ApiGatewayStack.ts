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
        methods: ["GET"],
        lambdaIntegration: props.lambdaIntegration[0],
      },
      {
        path: "s3",
        methods: ["GET"],
        lambdaIntegration: props.lambdaIntegration[1],
      },
      {
        path: "spaces",
        methods: ["GET", "POST", "PUT", "DELETE"],
        lambdaIntegration: props.lambdaIntegration[2],
      },
    ];

    resources.forEach((resourceConfig) => {
      const { path, methods, lambdaIntegration } = resourceConfig;
      const resource = api.root.addResource(path);

     if (Array.isArray(methods)) {
        methods.forEach((method) => {
          resource.addMethod(method, lambdaIntegration);
        });
      }

      console.log(`Added path "${path}" with methods: ${methods?.join(', ')}`);

    });

    const apiGWURLSpace = new cdk.CfnOutput(this, "apiGWURLSpace", {
      value: api.url + "spaces",
    });

    const apiGWURLS3 = new cdk.CfnOutput(this, "apiGWURLS3", {
        value: api.url + "s3",
        });

    const apiGWURLHello = new cdk.CfnOutput(this, "apiGWURLHello", {
        value: api.url + "hello",
        });
  }
}
