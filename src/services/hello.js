exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        body: `Hello, i will read from ${process.env.TABLE_NAME}`,
    };
    return response;
};
