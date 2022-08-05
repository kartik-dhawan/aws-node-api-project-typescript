import { APIGatewayProxyHandler } from 'aws-lambda'
import { v4 } from 'uuid'
import { typeInput, typeEmpResponse } from '@libs/interfaces';
import { saveToDynamo } from 'src/services/dynamodb';

const addEmp: APIGatewayProxyHandler = async (event) => {

    const id: String = v4()

    const { empName, empAddress }: typeInput = JSON.parse(event.body)

    const createdAt: String = new Date().toISOString();

    const newEmp: typeEmpResponse = {
        empId: id,
        empName,
        empAddress,
        createdAt,
        completed: false
    }

    await saveToDynamo(newEmp);

    return {
        statusCode: 200,
        body: JSON.stringify(newEmp)
    }
};

module.exports = {
    handler: addEmp
};

