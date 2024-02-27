import { ShipStatus } from '../types.ts';
import { shipsStateDB } from '../database/database.ts';

export function generateShipState(userId, shipsData) {
    const result = []

    for (let i = 0; i < shipsData.length; i++) {
        const shipCoordinatesRecord = {
            userId,
            shipStatus: ShipStatus.alive,
            shipCoordinates: [],
        };

        for (let j = 0; j < shipsData[i].length; j++) {
            const shipCoordinate = { x: 0, y: 0, isShooted: false };

            if (shipsData[i].direction === true) {
                shipCoordinate.x = shipsData[i].position.x;
                shipCoordinate.y = shipsData[i].position.y + j;
            } else {
                shipCoordinate.x = shipsData[i].position.x + j;
                shipCoordinate.y = shipsData[i].position.y;
            }

            shipCoordinatesRecord.shipCoordinates.push(shipCoordinate)
        }

        result.push(shipCoordinatesRecord);
    }

    shipsStateDB.push(...result);
}
