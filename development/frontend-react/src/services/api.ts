import axios from 'axios';
import { BACKEND_URI } from './config';
import { encrypt, getKeyPair } from './crypto';

const HTTP = axios.create({
    baseURL: BACKEND_URI
});
export interface BaseResponse<T> {
    status: string;
    data: T;
}
export const createRequest = async (user: string, password: string, doorCode: string, serverPubKey: string): Promise<BaseResponse<string>> => {
    const myKeypair = await getKeyPair();
    const crypted = await encrypt(password, serverPubKey, myKeypair.secretKey);
    const resp = await HTTP.post('/requests', {
        user: user,
        pwEncrypted: crypted,
        pubKey: myKeypair.publicKey,
        doorCode
    });
    return resp.data;
};

export interface ValidatedRequest {
    name: string;
    id: string;
    doorCode: string;
}
export const validateRequest = async (requestId: string): Promise<BaseResponse<ValidatedRequest>> => {
    const resp = await HTTP.get(`/requests/${requestId}/info`);
    return resp.data;
};

export const useRequest = async (requestId: string): Promise<void> => {
    const resp = await HTTP.get(`/requests/${requestId}`);
    return resp.data;
};

export interface Door {
    text: string;
    code: string;
}
export const getDoors = async (user: string, password: string, serverPubKey: string): Promise<BaseResponse<Door[]>> => {
    const myKeypair = await getKeyPair();
    const crypted = await encrypt(password, serverPubKey, myKeypair.secretKey);
    const resp = await HTTP.post('/doors', {
        user: user,
        pwEncrypted: crypted,
        pubKey: myKeypair.publicKey
    });
    return resp.data;
};

interface PubKeyResponse {
    data: string;
    status: string;
}
export const getPubKey = async (): Promise<BaseResponse<string>> => {
    const resp = await HTTP.get('/pubkey');
    return resp.data;
};
