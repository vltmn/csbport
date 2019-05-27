const db = require('./services/db');
const csb = require('./services/csb');
const notifier = require('./services/notifier');
const {decrypt} = require('./services/crypto');

const createRequest = async (user, pw, doorCode, pwEncrypted, pubKey) => {
    //validate the user
    await csb.login(user, pw);
    //create the request in the db
    const requestId = await db.createRequest(user, pwEncrypted, pubKey, doorCode);

    return requestId;
}

const getDoors = async (user, pw) => {
    await csb.login(user, pw);
    const aptusLoginUrl = await csb.getAptusLoginUrl();
    await csb.loginAptus(aptusLoginUrl);
    const data = await csb.getDoors();
    return data;
}

const useRequest = async (requestId) => {
    const obj = await db.getRequest(requestId);
    console.log("Got data from db: ", obj);
    const userName = obj.username;
    let pw = obj.pw;
    if(!pw) {
        const {pwEncrypted, pubKey} = obj;
        if(!pwEncrypted || !pubKey) {
          throw 'Server error';
        }
        pw = decrypt(pwEncrypted, pubKey);
    }
    const doorCode = obj.doorCode;
    await csb.login(userName, pw);
    const aptusLoginUrl = await csb.getAptusLoginUrl();
    console.log("Got a aptus log in url: ", aptusLoginUrl);
    await csb.loginAptus(aptusLoginUrl);
    await csb.openDoor(doorCode);
    console.log("Deleting request with id: " + requestId + " from the db");
    await db.deleteRequest(requestId);
    await notifier.notifyDoorOpened(userName);
    return;
}
const validateRequest = async (requestId) => {
    const obj = await db.getRequest(requestId);
    let pw = obj.pw;
    if(!pw) {
        const {pwEncrypted, pubKey} = obj;
        if(!pwEncrypted || !pubKey) {
            throw 'Server error';
        }
        
        pw = decrypt(pwEncrypted, pubKey);
    }
    await csb.login(obj.username, pw);
    const name = await csb.getName();
    return {
        id: obj.id,
        name,
        doorCode: obj.doorCode
    };
}

module.exports = {
    createRequest, useRequest, validateRequest, getDoors
}