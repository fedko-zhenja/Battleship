import { type ReqResTemplate } from '../types.ts';
import { rooms } from '../database/database.ts';

export function createRoom(data: ReqResTemplate): ReqResTemplate | undefined {
    const resData = [
        {
            roomId: 1,
            roomUsers: [{}],
        },
    ];

    const resalt = {
        type: 'update_room',
        data: JSON.stringify(resData),
        id: 0,
    };

    if (!rooms.length) {
        rooms.push({ id: rooms.length + 1 });
        console.log(resalt);

        return resalt;
    } else {
        for (let i = 0; i < rooms.length; i++) {
            if (!('user1' in rooms[i]) && 'user2' in rooms[i]) {
                resData[0].roomId = rooms[i].id;

                const userInRoom = {
                    name: rooms[i].user2?.name,
                    index: rooms[i].user2?.index,
                };

                resData[0].roomUsers.splice(0, 1, userInRoom);
                // resData[0].roomUsers.push(userInRoom);
            } else if ('user1' in rooms[i] && !('user2' in rooms[i])) {
                resData[0].roomId = rooms[i].id;

                const userInRoom = {
                    name: rooms[i].user1?.name,
                    index: rooms[i].user1?.index,
                };

                resData[0].roomUsers.splice(0, 1, userInRoom);
                // resData[0].roomUsers.push(userInRoom);
            } else {
                resData[0].roomId = rooms.length + 1;
            }
        }

        return resalt;
    }
}
