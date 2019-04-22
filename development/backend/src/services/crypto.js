const nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');
const {PRIVATE_KEY, PUBLIC_KEY} = require('../config');
const privateKey = nacl.util.decodeBase64(PRIVATE_KEY);
const publicKey = nacl.util.decodeBase64(PUBLIC_KEY);


const encrypt = async (message, secret) => {
    const nonce = getNonce();
    const box = nacl.box(nacl.util.decodeUTF8(message), nonce, publicKey, secret);
    const b64Box = nacl.util.encodeBase64(box);
    const b64Nonce = nacl.util.encodeBase64(nonce);
    return nacl.util.encodeBase64(JSON.stringify({box: b64Box, nonce: b64Nonce}));
}

const getNonce = () => {
    return nacl.randomBytes(24);
}
const decrypt = (encrypted, pubKey) => {
    const utf8 = nacl.util.encodeUTF8(
        nacl.util.decodeBase64(encrypted)
    );
    const publicKey = nacl.util.decodeBase64(pubKey);
    const data = JSON.parse(
        utf8
    );
    const nonce = nacl.util.decodeBase64(data.nonce);
    const msgEnc = nacl.util.decodeBase64(data.box);
    const payload = nacl.box.open(msgEnc, nonce, publicKey, privateKey);
    return nacl.util.encodeUTF8(payload);
}

const getKeyPair = async () => {
    return nacl.box.keyPair();
}

module.exports = {
    encrypt,
    decrypt,
    getKeyPair
}