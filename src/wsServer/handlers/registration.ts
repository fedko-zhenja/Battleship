import { type ReqResTemplate, type WS } from '../types.ts';
import { usersDatabase, players } from '../database/database.ts';

export function registration(data: ReqResTemplate, wsConnection: WS): void {
    const regData = JSON.parse(data.data);

    const newUser = {
        name: regData.name,
        password: regData.password,
        index: usersDatabase.length + 1,
        ws: wsConnection,
    };

    usersDatabase.push(newUser);
    players.push(newUser);

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

    wsConnection.send(JSON.stringify(resalt));
    // console.log(usersDatabase);
    // return resalt;
}
