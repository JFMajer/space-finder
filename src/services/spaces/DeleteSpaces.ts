import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";

async function deleteSpaces(
  event: APIGatewayProxyEvent,
  ddbclient: DynamoDBClient
): Promise<APIGatewayProxyResultV2> {
  const id = event.queryStringParameters?.id;
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "No id provided",
      }),
    };
  } else {
    try {
      const deleteResult = await ddbclient.send(
        new DeleteItemCommand({
          TableName: process.env.TABLE_NAME,
          Key: {
            id: { S: id },
          },
          ReturnConsumedCapacity: "TOTAL",
        })
      );
      return {
        statusCode: 200,
        body: JSON.stringify({
          deletedItem: deleteResult,
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

export { deleteSpaces };
