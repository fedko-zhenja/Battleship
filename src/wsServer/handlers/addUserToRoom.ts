import { type ReqResTemplate, type WS, type Room, eventType } from '../types.ts';
import { rooms, players } from '../database/database.ts';

export function addUserToRoom(data: ReqResTemplate, wsConnection: WS): void {
    // console.log('addUserToRoom!!!!!!!!!!!');
    // console.log('rooms', rooms);
    // console.log('usersDatabase', usersDatabase);
    // console.log('players', players);
    // console.log('numberGames', numberGames);

    const { indexRoom } = JSON.parse(data.data);
    const room = rooms.find((r: Room) => r.id === indexRoom);

    // console.log('indexRoom', indexRoom);
    // console.log('room', room);

    if (room) {
        room.user2 = {
            name: players[1].name,
            index: players[1].index,
        };

        if (players.length === 2) {
            for (let i = 0; i < players.length; i++) {
                const resaltData = {
                    idGame: indexRoom,
                    idPlayer: players[i].index,
                };

                const resalt = {
                    type: 'create_game',
                    data: JSON.stringify(resaltData),
                    id: 0,
                };

                players[i].ws?.send(JSON.stringify(resalt));
            }

            players.splice(0, players.length);

            // console.log('rooms', rooms);
        }
    } else {
        const resData = {
            error: true,
            errorText: 'Unable to add user to room',
        };

        const resalt = {
            type: eventType.createGame,
            data: JSON.stringify(resData),
            id: 0,
        };

        wsConnection.send(JSON.stringify(resalt));
    }
}
