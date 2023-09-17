import {
  APIGatewayProxyEvent,
  APIGatewayProxyResultV2,
  Context,
} from "aws-lambda";

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResultV2> {
  let message: string;

  switch (event.httpMethod) {
    case "GET":
      message = "Method is GET";
      break;
    case "POST":
      message = "Method is POST";
      break;
    default:
      message = "Method is not GET or POST";
      break;
  }

  const response: APIGatewayProxyResultV2 = {
    statusCode: 200,
    body: JSON.stringify(message),
  };
  console.log("event", event);
  return response;
}

export { handler };
