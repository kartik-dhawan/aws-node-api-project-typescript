import { APIGatewayProxyHandler } from "aws-lambda";
import { updateInDB } from "src/services/dynamodb";

const updateEmp: APIGatewayProxyHandler = async (event) => {

    const { id } = event.pathParameters;
    const { completed } = JSON.parse(event.body)

    await updateInDB(id, completed);


    return {
        statusCode: 200,
        body: JSON.stringify({
            msg: "Record updated"
        })
    }
}

module.exports = {
    handler: updateEmp
}