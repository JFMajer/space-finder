import { APIGatewayProxyEvent, APIGatewayProxyResultV2, Context } from "aws-lambda";

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResultV2> {
    const response: APIGatewayProxyResultV2 = {
        statusCode: 200,
        body: JSON.stringify('Hello from s3 Lambda!'),
    }
    console.log('event', event);
    return response;
}

export { handler };