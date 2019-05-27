const { createClient, addNameSpace, removeClient} = require('./services/db');

const handleCreateClient = async (event) => {
    const connectionId = event.requestContext.connectionId;
    const domain = event.requestContext.domainName;
    const stage = event.requestContext.stage;
    return await createClient(connectionId, domain, stage);
}

const handleJoin = async (event) => {
    const body = JSON.parse(event.body);
    const nameSpace = body.namespace;
    const connectionId = event.requestContext.connectionId;
    return await addNameSpace(connectionId, nameSpace);
}

const handleDisconnect = async (event) => {
    const connectionId = event.requestContext.connectionId;
    return await removeClient(connectionId);
}
const wsHandler = async (event, context) => {
    const routeKey = event.requestContext.routeKey;
    let data;
    switch (routeKey) {
        case '$connect':
            data = await handleCreateClient(event)
            break;
        case 'join':
            data = await handleJoin(event);
            break;
        case '$disconnect': 
            data = await handleDisconnect(event);
            break;
        case '$default': 
            console.log('NO ROUTE DEFINED');
            break;
    }
    return {
        statusCode: 200
    };
}

module.exports = wsHandler;