import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 } from "uuid";

async function postSpaces(
  event: APIGatewayProxyEvent,
  ddbclient: DynamoDBClient
): Promise<APIGatewayProxyResultV2> {
  const randomId = v4();
  const item = JSON.parse(event.body || "{}");

  const result = await ddbclient.send(
    new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: {
        id: {
          S: randomId,
        },
        location: {
          S: item.location,
        },
      },
    })
  );

  console.log("result", result);

  const response: APIGatewayProxyResultV2 = {
    statusCode: 201,
    body: JSON.stringify(randomId),
  };

  return response;
}

export { postSpaces };
