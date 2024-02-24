// import { type ReqResTemplate, eventType, type Room, type WS } from '../types.ts';
// import { usersDatabase, rooms } from '../database/database.ts';
// import { type ReqResTemplate } from '../types.ts';

import { type ReqResTemplate, type WS, type Room, eventType } from '../types.ts';
import { rooms, usersDatabase, players, numberGames } from '../database/database.ts';

export function addUserToRoom(data: ReqResTemplate, wsConnection: WS): void {
    console.log('addUserToRoom!!!!!!!!!!!');
    console.log('rooms', rooms);
    console.log('usersDatabase', usersDatabase);
    console.log('players', players);
    console.log('numberGames', numberGames);

    const { indexRoom } = JSON.parse(data.data);
    const room = rooms.find((r: Room) => r.id === indexRoom);

    console.log('indexRoom', indexRoom);
    console.log('room', room);

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
                    type: 'create_game', // send for both players in the room, after they are connected to the room
                    data: JSON.stringify(resaltData),
                    id: 0,
                };

                players[i].ws?.send(JSON.stringify(resalt));
            }

            // players = [];
            players.splice(0, players.length);
        }
    } else {
        // Ошибка, если комната не найдена или нет места для второго игрока
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
        // return errorResponse;
    }

    // // Получаем индекс комнаты из данных
    // const { indexRoom } = JSON.parse(data.data);

    // // Находим комнату в массиве rooms
    // const room = rooms.find((r: Room) => r.id === indexRoom);

    // // Проверяем, существует ли комната и есть ли в ней свободное место для второго игрока
    // if (room && !room.user2) {
    //     // Получаем последнего добавленного пользователя
    //     const user = usersDatabase[usersDatabase.length - 1];

    //     if (user) {
    //         // Добавляем второго пользователя в комнату
    //         room.user2 = {
    //             name: user.name,
    //             index: user.index,
    //         };

    //         const resData = {
    //             idGame: room.id,
    //             idPlayer: user.index,
    //         };
    //         // Отправляем информацию о созданной комнате
    //         const response = {
    //             type: eventType.createGame,
    //             data: JSON.stringify(resData),
    //             id: 0,
    //         };

    //         return response;
    //     } else {
    //         const resData = {
    //             error: true,
    //             errorText: 'Users not found in the database',
    //         };
    //         // Ошибка, если пользователей нет в базе данных
    //         const errorResponse = {
    //             type: eventType.createGame,
    //             data: JSON.stringify(resData),
    //             id: 0,
    //         };

    //         return errorResponse;
    //     }
    // } else {
    //     // Ошибка, если комната не найдена или нет места для второго игрока
    //     const resData = {
    //         error: true,
    //         errorText: 'Unable to add user to room',
    //     };

    //     const errorResponse = {
    //         type: eventType.createGame,
    //         data: JSON.stringify(resData),
    //         id: 0,
    //     };

    //     return errorResponse;
    // }
    // console.log(data, usersDatabase);
    // return

    // const resData = {
    //     idGame: 1,
    //     idPlayer: 1,
    // };

    // return {
    //     type: 'create_game', // send for both players in the room
    //     data: JSON.stringify(resData),
    //     id: 0,
    // };
}
