import {
  APIGatewayProxyEvent,
  APIGatewayProxyResultV2,
  Context,
} from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { getSpaces } from "./GetSpaces";
import { putSpaces } from "./PutSpaces";
import { deleteSpaces } from "./DeleteSpaces";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { MissingFieldError } from "../shared/Validator";
import { JSONError } from "../shared/Utils";

const ddbClient = new DynamoDBClient({});

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResultV2> {
  let message: string = "";

  try {
    switch (event.httpMethod) {
      case "GET":
        const getResponse = await getSpaces(event, ddbClient);
        return getResponse;
      case "POST":
        const postResponse = await postSpaces(event, ddbClient);
        return postResponse;
      case "PUT":
        const putResponse = await putSpaces(event, ddbClient);
        return putResponse;
      case "DELETE":
        const deleteResponse = await deleteSpaces(event, ddbClient);
        return deleteResponse;
      default:
        message = "Method unsupported";
        break;
    }
  } catch (error: any) {
    console.log("error", error);
    if (error instanceof MissingFieldError) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: error.message,
        }),
      };
    }
    if (error instanceof JSONError) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          errorType: "Json parsing error",
          message: error.message,
        }),
      };
    }
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
