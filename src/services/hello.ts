import { APIGatewayProxyEvent, APIGatewayProxyResultV2, Context } from "aws-lambda";
import { v4 } from 'uuid';


async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResultV2> {
    const response: APIGatewayProxyResultV2 = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda! This is some id: ' + v4()),
    }
    console.log('event', event);
    return response;
}

export { handler };