import { APIGatewayProxyHandler } from "aws-lambda";
import { deleteOneInDB } from "src/services/dynamodb";

const deleteEmp: APIGatewayProxyHandler = async (event) => {

    const { id } = event.pathParameters;
    await deleteOneInDB(id);


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