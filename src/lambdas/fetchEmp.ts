import { APIGatewayProxyHandler } from "aws-lambda";
import { fetchOneFromDB } from "src/services/dynamodb";
import { typeEmpResponse } from "@libs/interfaces";

const fetchEmp: APIGatewayProxyHandler = async (event) => {

    const { id } = event.pathParameters;

    const result = await fetchOneFromDB(id)
    const emp: typeEmpResponse = result.Item;

    return {
        statusCode: 200,
        body: JSON.stringify(emp)
    }
}

module.exports = {
    handler: fetchEmp
}