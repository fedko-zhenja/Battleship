import { type ReqResTemplate, type WS } from '../types.ts';
import { rooms, usersDatabase, players } from '../database/database.ts';
import { eventType } from '../types.ts';

let numPlayersInRoom = 0;

export function createRoom(data: ReqResTemplate, wsConnection: WS): void {
    let user = usersDatabase[usersDatabase.length - 1];

    if (user) {
        if (players.length === 1) {
            const newRoom = {
                id: rooms.length + 1,
                user1: {
                    name: user.name,
                    index: user.index,
                },
            };

            rooms.push(newRoom);
            numPlayersInRoom++;

            const resData = [
                {
                    roomId: newRoom.id,
                    roomUsers: [
                        {
                            name: newRoom.user1.name,
                            index: newRoom.user1.index,
                        },
                    ],
                },
            ];

            const resalt = {
                type: eventType.updateRoom,
                data: JSON.stringify(resData),
                id: 0,
            };

            wsConnection.send(JSON.stringify(resalt));
        } else if (players.length === 2) {
            if (numPlayersInRoom === 1) {
                const resData = [
                    {
                        roomId: rooms[rooms.length - 1].id,
                        roomUsers: [
                            {
                                name: rooms[0].user1?.name,
                                index: rooms[0].user1?.index,
                            },
                        ],
                    },
                ];

                const resalt = {
                    type: eventType.updateRoom,
                    data: JSON.stringify(resData),
                    id: 0,
                };

                wsConnection.send(JSON.stringify(resalt));
            } else {
                user = usersDatabase[usersDatabase.length - 2];

                const newRoom = {
                    id: rooms.length + 1,
                    user1: {
                        name: user.name,
                        index: user.index,
                    },
                };

                rooms.push(newRoom);

                const resData = [
                    {
                        roomId: newRoom.id,
                        roomUsers: [
                            {
                                name: newRoom.user1.name,
                                index: newRoom.user1.index,
                            },
                        ],
                    },
                ];

                const resalt = {
                    type: eventType.updateRoom,
                    data: JSON.stringify(resData),
                    id: 0,
                };

                wsConnection.send(JSON.stringify(resalt));
            }

            numPlayersInRoom = 0;
        } else {
            const resData = [
                {
                    roomId: rooms[rooms.length - 1].id,
                    roomUsers: [
                        {
                            name: rooms[0].user1?.name,
                            index: rooms[0].user1?.index,
                        },
                    ],
                },
            ];

            const resalt = {
                type: eventType.updateRoom,
                data: JSON.stringify(resData),
                id: 0,
            };

            wsConnection.send(JSON.stringify(resalt));
        }
    } else {
        const resData = {
            error: true,
            errorText: 'Users not found in the database',
        };

        const resalt = {
            type: eventType.updateRoom,
            data: JSON.stringify(resData),
            id: 0,
        };

        wsConnection.send(JSON.stringify(resalt));
    }
}
