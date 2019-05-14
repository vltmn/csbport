const AWS = require('aws-sdk');
const shortid = require('shortid');
const PORTREQUESTS_TABLE_NAME = require('../config').PORTREQUESTS_TABLE_NAME;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const createRequest = async (username, pwEncrypted, pubKey, doorCode) => {
    const id = shortid.generate();
    const putItem = {
        TableName: PORTREQUESTS_TABLE_NAME,
        Item: {
            requestId: id,
            username, pwEncrypted, pubKey,
            doorCode
        }
    }
    return dynamoDb.put(putItem).promise().then(() => {
        console.log(`Saved a request with ID: ${id} to db`)
        return id;
    });
}

const deleteRequest = async (id) => {
    const deleteItem = {
        TableName: PORTREQUESTS_TABLE_NAME,
        Key: {
            requestId: id
        },
        ReturnConsumedCapacity: "TOTAL",
        ReturnValues: "ALL_OLD"
    };
    return dynamoDb.delete(deleteItem).promise().then((data) => {
        if(!data.Attributes) {
            throw 'NOT_FOUND';
        }
        console.log(`Deleted a request with ID: ${id} from db`);
        return data;
    });
}
const getRequest = (id) => {
    const getItem = {
        TableName: PORTREQUESTS_TABLE_NAME,
        Key: {
            requestId: id
        }
    };
    return dynamoDb.get(getItem).promise().then(resp => {
        if(!resp.Item) {
            throw 'NOT_FOUND';
        }
        return resp.Item;
    });
}

module.exports = {createRequest, deleteRequest, getRequest};