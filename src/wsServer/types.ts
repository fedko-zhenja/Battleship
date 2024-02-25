import type WebSocket from 'ws';

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

export interface WS extends WebSocket {
    name: string;
    index: number;
    _socket?: { _server: { _connections: number } };
}

export type Handler = (data: ReqResTemplate, ws: WS) => void;

export interface User {
    name: string;
    password: string;
    index: number;
    ws?: WebSocket;
}

export interface ShipsData {
    gameId: number;
    ships: [
        {
            position: {
                x: number;
                y: number;
            };
            direction: boolean;
            length: number;
            type: 'small' | 'medium' | 'large' | 'huge';
        },
    ];
    indexPlayer: number;
}

export interface Room {
    id: number;
    user1?: { name: string; index: number; ws?: WebSocket; ships?: ShipsData };
    user2?: { name: string; index: number; ws?: WebSocket; ships?: ShipsData };
}
