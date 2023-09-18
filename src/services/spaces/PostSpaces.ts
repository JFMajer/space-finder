import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { v4 } from "uuid";

async function postSpaces(
  event: APIGatewayProxyEvent,
  ddbclient: DynamoDBClient
): Promise<APIGatewayProxyResultV2> {
  const randomId = v4();
  const item = JSON.parse(event.body || "{}");
  item.id = randomId;

  const result = await ddbclient.send(
    new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: marshall(item),
    })
  );

  console.log("result", result);

  const consumedCapacity = result.ConsumedCapacity;
  console.log("consumedCapacity", consumedCapacity);

  const response: APIGatewayProxyResultV2 = {
    statusCode: 201,
    body: JSON.stringify({
        addedItem: item,
        consumedCapacity: consumedCapacity,
    }),
  };

  return response;
}

export { postSpaces };
