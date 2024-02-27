import WebSocket from 'ws';
import { getEventHandler } from './getEventHandler';
import { type ReqResTemplate, type WS } from './types';

export function wsServer(httpPort: number): void {
    const portNumber = 3000;

    const ws = new WebSocket.Server({ port: portNumber }, () => {
        console.log(`Websocket running on port ${portNumber}!\n`);
        console.log('\x1b[36m%s\x1b[0m', `To play, go to "http://localhost:${httpPort}"!\n`);
    });

    ws.on('connection', (wsConnection: WS) => {
        wsConnection.on('message', (event: string) => {
            const data: ReqResTemplate = JSON.parse(event);
            const handler = getEventHandler(data.type);

            if (handler) {
                handler(data, wsConnection);
            }
        });

        wsConnection.on('error', console.error);

        wsConnection.on('close', () => {
            console.log('disconnected');
        });
    });
}
