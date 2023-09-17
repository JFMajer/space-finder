import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

async function getSpaces(
  event: APIGatewayProxyEvent,
  ddbclient: DynamoDBClient
): Promise<APIGatewayProxyResultV2> {
  const result = await ddbclient.send(
    new ScanCommand({
      ReturnConsumedCapacity: "TOTAL",
      TableName: process.env.TABLE_NAME,
    })
  );

  console.log("result", result);

  const consumedCapacity = result.ConsumedCapacity;
  console.log("consumedCapacity", consumedCapacity);

  const response: APIGatewayProxyResultV2 = {
    statusCode: 201,
    body: JSON.stringify({
      result: result.Items,
      consumedCapacity: consumedCapacity,
    }),
  };

  return response;
}

export { getSpaces };
