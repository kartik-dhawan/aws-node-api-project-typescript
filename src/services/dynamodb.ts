import { DynamoDB } from 'aws-sdk';
import { typeEmpResponse } from '@libs/interfaces';

const dynamodb = new DynamoDB.DocumentClient();

export const saveToDynamo: any = (newEmp: typeEmpResponse) => {
    return dynamodb.put({
        TableName: "TSEmployees",
        Item: newEmp
    }).promise();
}

export const fetchAllFromDynamo: any = () => {
    return dynamodb.scan({
        TableName: "TSEmployees"
    }).promise();
}

export const fetchOneFromDynamo: any = (id: String) => {
    return dynamodb.get({
        TableName: "TSEmployees",
        Key: {
            empId: id,
        },
        ProjectionExpression: "empId, empName, empAddress",
    }).promise()
}

export const updateInDynamo: any = (id: String, completed: boolean) => {
    return dynamodb.update({
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

export const deleteOneInDynamo: any = (id: String) => {
    return dynamodb.delete({
        TableName: "TSEmployees",
        Key: {
            empId: id
        }
    }).promise();
}