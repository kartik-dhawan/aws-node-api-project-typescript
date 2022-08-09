import { DynamoDB } from 'aws-sdk';
import { typeEmpResponse } from '@libs/interfaces';

const db = new DynamoDB.DocumentClient();

export const saveToDB: any = (newEmp: typeEmpResponse) => {
    return db.put({
        TableName: "TSEmployees",
        Item: newEmp
    }).promise();
}

export const fetchAllFromDB: any = () => {
    return db.scan({
        TableName: "TSEmployees"
    }).promise();
}

export const fetchOneFromDB: any = (id: String) => {
    return db.get({
        TableName: "TSEmployees",
        Key: {
            empId: id,
        },
        ProjectionExpression: "empId, empName, empAddress",
    }).promise()
}

export const updateInDB: any = (id: String, completed: boolean) => {
    return db.update({
        TableName: "TSEmployees",
        Key: {
            empId: id
        },
        UpdateExpression: "set completed = :completed",
        ExpressionAttributeValues: {
            ":completed": completed,
        },
        ReturnValues: "UPDATED_NEW"
    }).promise();
}

export const deleteOneInDB: any = (id: String) => {
    return db.delete({
        TableName: "TSEmployees",
        Key: {
            empId: id
        }
    }).promise();
}