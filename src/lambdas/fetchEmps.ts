import { APIGatewayProxyHandler } from "aws-lambda";
import { fetchAllFromDB } from "src/services/dynamodb";
import { typeEmpResponse } from "@libs/interfaces";

const fetchEmps: APIGatewayProxyHandler = async () => {

    const res = await fetchAllFromDB();
    const emps: typeEmpResponse[] = res.Items;

    return {
        statusCode: 200,
        body: JSON.stringify(emps)
    }
}

module.exports = {
    handler: fetchEmps
}