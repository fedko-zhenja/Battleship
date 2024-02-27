import { type ReqResTemplate, type WS, eventType, type ShipsData } from '../types.ts';
import { rooms } from '../database/database.ts';
import { generateShipState } from './generateShipState.js';


// let callNum = 0;

export function addShips(data: ReqResTemplate, wsConnection: WS): void {
    const shipsData = JSON.parse(data.data);
    const gameId = shipsData.gameId;
    const indexPlayer = shipsData.indexPlayer;
    const shipsForUser: ShipsData = shipsData.ships;

    const room = rooms[gameId - 1];

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

            rooms[i].user1?.ws?.send(JSON.stringify(resalt));
            generateShipState(resDataCurPlayerInd, resDataShips);

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

            rooms[i].user2?.ws?.send(JSON.stringify(resalt2));
            generateShipState(resDataCurPlayerInd2, resDataShips2);

            // turn

            rooms[i].idCurrentPlayer = rooms[i].user1?.index;

            const resDataTurn = { currentPlayer: rooms[i].idCurrentPlayer };

            const resaltTurn = {
                type: eventType.turn,
                data: JSON.stringify(resDataTurn),
                id: 0,
            };

            rooms[i].user1?.ws?.send(JSON.stringify(resaltTurn));
            rooms[i].user2?.ws?.send(JSON.stringify(resaltTurn));
        }
    }
}
