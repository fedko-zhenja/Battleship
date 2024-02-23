import { type ReqResTemplate } from '../types.ts';
import { database } from '../database/database.ts';

export function registration(data: ReqResTemplate): ReqResTemplate {
    const regData = JSON.parse(data.data);

    const newUser = {
        name: regData.name,
        password: regData.password,
        index: database.length + 1,
    };

    const resData = {
        name: newUser.name,
        index: newUser.index,
        error: false,
        errorText: '',
    };

    const resalt = {
        type: 'reg',
        data: JSON.stringify(resData),
        id: 0,
    };

    return resalt;
}
