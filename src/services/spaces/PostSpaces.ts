import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { v4 } from "uuid";
import { validateAsSpaceEntry } from "../shared/Validator";
import { parseJson } from "../shared/Utils";

async function postSpaces(
  event: APIGatewayProxyEvent,
  ddbclient: DynamoDBClient
): Promise<APIGatewayProxyResultV2> {
  const randomId = v4();
  const item = parseJson(event.body || "{}")
  item.id = randomId;
  validateAsSpaceEntry(item);

  const result = await ddbclient.send(
    new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: marshall(item),
      ReturnConsumedCapacity: "TOTAL",
    })
  );

  console.log("result", result);

  const consumedCapacity = result.ConsumedCapacity;
  console.log("consumedCapacity", consumedCapacity);

  const response: APIGatewayProxyResultV2 = {
    statusCode: 201,
    body: JSON.stringify({
        result: result,
        addedItem: item,
    }),
  };

  return response;
}

export { postSpaces };
