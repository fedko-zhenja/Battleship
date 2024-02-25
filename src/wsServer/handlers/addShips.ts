import { type ReqResTemplate, type WS, eventType } from '../types.ts';
import { rooms } from '../database/database.ts';

// let callNum = 0;

export function addShips(data: ReqResTemplate, wsConnection: WS): void {
    const shipsData = JSON.parse(data.data);
    // console.log('addShips data', data);
    // console.log(rooms, 'rooms');
    // callNum++;

    // if (callNum === 2) {
    //     console.log(callNum, 'callNun');
    //     callNum = 0;
    // }

    const gameId = shipsData.gameId;
    const indexPlayer = shipsData.indexPlayer;
    const shipsForUser = shipsData.ships;

    const room = rooms[gameId - 1];

    // console.log(room, gameId);

    if (room.user1) {
        if (room.user1.index === indexPlayer) {
            room.user1.ships = shipsForUser;
        }
    }

    if (room.user2) {
        if (room.user2.index === indexPlayer) {
            room.user2.ships = shipsForUser;
        }
    }

    // console.log(rooms, 'rooms');

    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].user1?.ships && rooms[i].user2?.ships) {
            const resDataShips = rooms[i].user1?.ships;
            const resDataCurPlayerInd = rooms[i].user1?.index;

            const resData = {
                ships: resDataShips,
                currentPlayerIndex: resDataCurPlayerInd,
            };

            const resalt = {
                type: eventType.startGame,
                data: JSON.stringify(resData),
                id: 0,
            };

            console.log('resalt1', resalt);

            rooms[i].user1?.ws?.send(JSON.stringify(resalt));

            const resDataShips2 = rooms[i].user2?.ships;
            const resDataCurPlayerInd2 = rooms[i].user2?.index;

            const resData2 = {
                ships: resDataShips2,
                currentPlayerIndex: resDataCurPlayerInd2,
            };

            const resalt2 = {
                type: eventType.startGame,
                data: JSON.stringify(resData2),
                id: 0,
            };

            // console.log('resDataShips2', rooms[i].user2);
            console.log('resalt2', resalt2);
            rooms[i].user2?.ws?.send(JSON.stringify(resalt2));
        }
    }
}
