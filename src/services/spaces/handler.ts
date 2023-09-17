import {
  APIGatewayProxyEvent,
  APIGatewayProxyResultV2,
  Context,
} from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { getSpaces } from "./GetSpaces";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const ddbClient = new DynamoDBClient({});

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResultV2> {
  let message: string = "";

  try {
    switch (event.httpMethod) {
      case "GET":
        const getResponse = getSpaces(event, ddbClient);
        return getResponse;
      case "POST":
        const postResponse = postSpaces(event, ddbClient);
        return postResponse;
      default:
        message = "Method is not GET or POST";
        break;
    }
  } catch (error: any) {
    console.log("error", error);
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }

  const response: APIGatewayProxyResultV2 = {
    statusCode: 200,
    body: JSON.stringify(message),
  };
  console.log("event", event);
  return response;
}

export { handler };
