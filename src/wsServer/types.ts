export enum eventType {
    registration = 'reg',
    updateWinners = 'update_winners',
    createRoom = 'create_room',
    addUserToRoom = 'add_user_to_room',
    createGame = 'create_game',
    updateRoom = 'update_room',
    addShips = 'add_ships',
    startGame = 'start_game',
    attack = 'attack',
    randomAttack = 'randomAttack',
    turn = 'turn',
    finish = 'finish',
}

export interface ReqResTemplate {
    type: string;
    data: string;
    id: number;
}

export type Handler = (data: ReqResTemplate) => ReqResTemplate | undefined;

export interface User {
    name: string;
    password: string;
    index: number;
}

export interface Room {
    id: number;
    user1?: { name: string; index: string };
    user2?: { name: string; index: string };
}
