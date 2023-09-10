import { APIGatewayProxyEvent, APIGatewayProxyResultV2, Context } from "aws-lambda";
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";


const s3Client = new S3Client({ region: "eu-north-1" });

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResultV2> {
    
    const command = new ListBucketsCommand({});
    const lsbucketsResponse = await s3Client.send(command);
    const bucketNames = lsbucketsResponse.Buckets?.map((bucket) => bucket.Name);

    const response: APIGatewayProxyResultV2 = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hello from lambda, here are your bucket names:',
            buckets: bucketNames,
        })
    }

    return response;
   
}

export { handler };