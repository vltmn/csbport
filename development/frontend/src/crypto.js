import * as nacl from 'tweetnacl';
import * as naclUtil from 'tweetnacl-util';
nacl.util = naclUtil;


const encrypt = async (message, pubKey, privKey) => {
    const nonce = getNonce();
    const publicKey = nacl.util.decodeBase64(pubKey);
    const privateKey = nacl.util.decodeBase64(privKey);
    const box = nacl.box(nacl.util.decodeUTF8(message), nonce, publicKey, privateKey);

    const b64Box = nacl.util.encodeBase64(box);
    const b64Nonce = nacl.util.encodeBase64(nonce);
    const json = JSON.stringify({box: b64Box, nonce: b64Nonce});


    return btoa(json);
}

const getNonce = () => {
    return nacl.randomBytes(24);
}

const getKeyPair = async () => {
    const data = nacl.box.keyPair();
    return {
      secretKey: nacl.util.encodeBase64(data.secretKey),
      publicKey: nacl.util.encodeBase64(data.publicKey)
    };
}

export {
    encrypt,
    getKeyPair
}
