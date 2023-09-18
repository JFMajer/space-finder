import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import {
  DynamoDBClient,
  ScanCommand,
  GetItemCommand,
  GetItemCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

async function getSpaces(
  event: APIGatewayProxyEvent,
  ddbclient: DynamoDBClient
): Promise<APIGatewayProxyResultV2> {
  const queryParams = event.queryStringParameters;

  if (!queryParams) {
    try {
      const scanResult = await ddbclient.send(
        new ScanCommand({
          ReturnConsumedCapacity: "TOTAL",
          TableName: process.env.TABLE_NAME,
        })
      );

      const result = scanResult.Items;
      const unmarshalledItems = result?.map((item) => unmarshall(item));
      if (!unmarshalledItems) {
        return {
          statusCode: 404,
          body: JSON.stringify({
            message: "No items found",
            consumedCapacity: scanResult.ConsumedCapacity,
          }),
        };
      }

      console.log("result", result);
      const consumedCapacity = scanResult.ConsumedCapacity;
      console.log("consumedCapacity", consumedCapacity);

      return {
        statusCode: 200,
        body: JSON.stringify({
          result: unmarshalledItems,
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
  } else if (queryParams && queryParams.id) {
    const id = queryParams.id;
    try {
      const getItemResult = await ddbclient.send(
        new GetItemCommand({
          TableName: process.env.TABLE_NAME,
          Key: {
            id: { S: id },
          },
          ReturnConsumedCapacity: "TOTAL",
        })
      );
      const consumedCapacity = getItemResult.ConsumedCapacity;
      

      if (!getItemResult.Item) {
        return {
          statusCode: 404,
          body: JSON.stringify({
            message: "Not Found",
            consumedCapacity: consumedCapacity,
          }),
        };
      } else {
        const unmarshalledItem = unmarshall(getItemResult.Item);
        return {
          statusCode: 200,
          body: JSON.stringify({
            result: unmarshalledItem,
            consumedCapacity: consumedCapacity,
          }),
        };
      }
    } catch (error: any) {
      console.log("error", error);
      return {
        statusCode: 500,
        body: JSON.stringify(error.message),
      };
    }
  }
  return {
    statusCode: 400,
    body: JSON.stringify("Bad Request"),
  };
}

export { getSpaces };
