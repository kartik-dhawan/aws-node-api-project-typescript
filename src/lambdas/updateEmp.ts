import { APIGatewayProxyHandler } from "aws-lambda";
import { updateInDynamo } from "src/services/dynamodb";

const updateEmp: APIGatewayProxyHandler = async (event) => {

    const { id } = event.pathParameters;
    const { completed } = JSON.parse(event.body)

    await updateInDynamo(id, completed);


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