import { eventType, type Handler } from './types';
import { registration } from './handlers/registration.ts';
import { createRoom } from './handlers/createRoom.ts';

export function getEventHandler(type: string): Handler | null {
    console.log('type', type);

    switch (type) {
        case eventType.registration: {
            return registration;
        }

        case eventType.createRoom: {
            return createRoom;
        }

        default: {
            return null;
        }
    }
}
