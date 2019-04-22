import axios from 'axios';
import {BACKEND_URI} from '@/config.js';
import {encrypt, getKeyPair} from '@/crypto.js';

const HTTP = axios.create({
    baseURL: BACKEND_URI
})
export const createRequest = async (user, password, doorCode, serverPubKey) => {
    const myKeypair = await getKeyPair();
    const crypted = await encrypt(password, serverPubKey, myKeypair.secretKey);
    const resp = await HTTP.post('/requests', {
        user: user,
        pwEncrypted: crypted,
        pubKey: myKeypair.publicKey,
        doorCode
    });
    return resp.data;
}
export const validateRequest = async (requestId) => {
    const resp = await HTTP.get(`/requests/${requestId}/info`);
    return resp.data;
}
export const useRequest = async (requestId) => {
    const resp = await HTTP.get(`/requests/${requestId}`)
    return resp.data;
}

export const getDoors = async (user, password, serverPubKey) => {
    const myKeypair = await getKeyPair();
    const crypted = await encrypt(password, serverPubKey, myKeypair.secretKey);
    const resp = await HTTP.post('/doors', {
        user: user,
        pwEncrypted: crypted,
        pubKey: myKeypair.publicKey
    });
    return resp.data;
}

export const getPubKey = async () => {
  const resp = await HTTP.get('/pubkey');
  return resp.data.data;
}
