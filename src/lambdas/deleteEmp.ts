import { APIGatewayProxyHandler } from "aws-lambda";
import { deleteOneInDynamo } from "src/services/dynamodb";

const deleteEmp: APIGatewayProxyHandler = async (event) => {

    const { id } = event.pathParameters;
    await deleteOneInDynamo(id);


    return {
        statusCode: 200,
        body: JSON.stringify({
            msg: "Record deleted"
        })
    }
}

module.exports = {
    handler: deleteEmp
}