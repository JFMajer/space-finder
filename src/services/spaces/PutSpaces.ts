import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

async function putSpaces(
  event: APIGatewayProxyEvent,
  ddbclient: DynamoDBClient
): Promise<APIGatewayProxyResultV2> {
  const queryParams = event.queryStringParameters;
  if (!queryParams || !queryParams.id || !event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "No id or body provided",
      }),
    };
  } else {
    try {
      const parsedBody = JSON.parse(event.body);
      console.log("event body", event.body);
      const id = queryParams.id;
      // get first key from body
      const requestBodyKey = Object.keys(parsedBody)[0];
      console.log("requestBodyKey", requestBodyKey);
      // get first value associated with first key from body
      const requestBodyValue = parsedBody[requestBodyKey];

      const updateResult = await ddbclient.send(
        new UpdateItemCommand({
          TableName: process.env.TABLE_NAME,
          Key: {
            id: { S: id },
          },
          UpdateExpression: "set #attrName = :attrValue",
          ExpressionAttributeValues: {
            ":attrValue": { S: requestBodyValue },
          },
          ExpressionAttributeNames: {
            "#attrName": requestBodyKey,
          },
          ReturnValues: "UPDATED_NEW",
          ReturnConsumedCapacity: "TOTAL",
        })
      );

      const consumedCapacity = updateResult.ConsumedCapacity;

      return {
        statusCode: 200,
        body: JSON.stringify({
          updatedItem: updateResult,
          consumedCapacity: consumedCapacity,
        }),
      };
    } catch (error: any) {
      console.log("error", error);
      return {
        statusCode: 500,
        body: JSON.stringify(error.message),
      };
    }
  }
}

export { putSpaces };
