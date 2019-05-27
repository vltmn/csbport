const AWS = require('aws-sdk');
const db = require('./db');

const DOOR_OPENED = 'DOOR_OPENED';


const notifyDoorOpened = async (username) => {
    const items = await db.getConnectionsByNamespace(username);
    const data = JSON.stringify({
        action: DOOR_OPENED
    });
    console.log('Notifying ' + items.length + ' clients');
    const promises = items.map((item) => {
        const client = new AWS.ApiGatewayManagementApi({
            apiVersion: "2018-11-29",
            endpoint: `https://${item.domain}/${item.stage}`
        })
        return client.postToConnection({
            ConnectionId: item.connectionId,
            Data: data
        }).promise()
    })
    const returns = await Promise.all(promises);
    return returns;
}

module.exports = {
    notifyDoorOpened
}