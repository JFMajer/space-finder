import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Runtime, Code } from "aws-cdk-lib/aws-lambda";
import { join } from "path";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";

interface LamdaStackProps extends cdk.StackProps {
  spacesTable: ITable;
}

export class LambdaStack extends cdk.Stack {
  public readonly lambdaIntegration: LambdaIntegration[] = [];

  constructor(scope: Construct, id: string, props: LamdaStackProps) {
    super(scope, id, props);

    //my hello function
    const lambda = new NodejsFunction(this, "HelloLambda", {
      runtime: Runtime.NODEJS_18_X,
      handler: "handler",
      entry: join(__dirname, "..", "..", "services", "hello.ts"),
      environment: {
        TABLE_NAME: props.spacesTable.tableName,
      },
      logRetention: 1,
    });

    //function that lists s3 bucket
    const s3lambda = new NodejsFunction(this, "S3Lambda", {
      runtime: Runtime.NODEJS_18_X,
      handler: "handler",
      entry: join(__dirname, "..", "..", "services", "s3lambda.ts"),
      logRetention: 1,
    });

    s3lambda.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ["s3:ListAllMyBuckets", "s3:ListBucket"],
        resources: ["arn:aws:s3:::*"],
      })
    );

    //spaces lambda
    const spacesLambda = new NodejsFunction(this, "SpacesLambda", {
      runtime: Runtime.NODEJS_18_X,
      handler: "handler",
      entry: join(__dirname, "..", "..", "services", "spaces", "handler.ts"),
      environment: {
        TABLE_NAME: props.spacesTable.tableName,
      },
      logRetention: 1,
    });

    spacesLambda.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: [
          'dynamodb:PutItem',
          'dynamodb:GetItem',
          'dynamodb:Scan',
        ],
        resources: [props.spacesTable.tableArn],
      })
    );

    this.lambdaIntegration.push(new LambdaIntegration(lambda));
    this.lambdaIntegration.push(new LambdaIntegration(s3lambda));
    this.lambdaIntegration.push(new LambdaIntegration(spacesLambda));
  }
}
