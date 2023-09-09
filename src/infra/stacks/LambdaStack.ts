import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Function as LambdaFunction } from "aws-cdk-lib/aws-lambda";
import { Runtime, Code } from "aws-cdk-lib/aws-lambda";
import { join } from "path";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { ITable } from "aws-cdk-lib/aws-dynamodb";

interface LamdaStackProps extends cdk.StackProps {
    spacesTable: ITable;
}

export class LambdaStack extends cdk.Stack{

    public readonly lambdaIntegration: LambdaIntegration;

    constructor(scope: Construct, id: string, props: LamdaStackProps) {
        super(scope, id, props);

        const lambda = new LambdaFunction(this, 'HelloLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: "hello.handler",
            code: Code.fromAsset(join(__dirname, '..', '..', 'services')),
            environment: {
                TABLE_NAME: props.spacesTable.tableName,
            },
        })

        this.lambdaIntegration = new LambdaIntegration(lambda);

    }

}