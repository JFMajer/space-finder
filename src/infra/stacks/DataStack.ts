import * as cdk from "aws-cdk-lib";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { AttributeType } from "aws-cdk-lib/aws-dynamodb";
import { generateStackSuffix } from "../Utils";
import { ITable } from "aws-cdk-lib/aws-dynamodb";

export class DataStack extends cdk.Stack {

    public readonly spacesTable: ITable;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const stackSuffix = generateStackSuffix(this);

    const dynamo = new Table(this, "SpacesTable", {
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
        tableName: `spaces-${stackSuffix}`,
        readCapacity: 1,
        writeCapacity: 1,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
    });


    this.spacesTable = dynamo;
  }
}
