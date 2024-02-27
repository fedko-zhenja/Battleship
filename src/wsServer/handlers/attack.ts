import { ShipStatus, type ReqResTemplate, type WS } from '../types.ts';
import { shipsStateDB, rooms } from '../database/database.ts'

const checkShipIsKilled = (shipCoordinates) => {
    return shipCoordinates.every((coordinate) => coordinate.isShooted === true)
}

export function attack(data: ReqResTemplate, wsConnection: WS): void {
    const { x, y, indexPlayer: userId, gameId: roomId } = JSON.parse(data.data);

    const currentRoom = rooms.find((room) => room.id === roomId)
    const attackedUser = currentRoom?.user1?.index === userId ? currentRoom?.user2 : currentRoom?.user1

    const attackedUserShipsState = shipsStateDB.filter((shipState) => shipState.userId === attackedUser?.index)

    let shotStatus = 'miss'

    attackedUserShipsState.forEach((shipState) => {
        const attackedCoordinate = shipState.shipCoordinates.find(
            (coordinate) => coordinate.x === x && coordinate.y === y
        )

        if (attackedCoordinate) {
            attackedCoordinate.isShooted === true

            const isShipKilled = checkShipIsKilled(shipState.shipCoordinates)

            if (isShipKilled) {
                shipState.shipStatus = ShipStatus.killed
                shotStatus = 'killed' // TODO: 
                
                // TODO: check miss cell and send miss sell
            } else {
                shipState.shipStatus =ShipStatus.damaged
                shotStatus = 'shot' // TODO: enum
            }

            // TODO: check for win after isShipKilled=true
        }
    })

    const responseData = {
        position: { x, y },
        currentPlayer: userId,
        status: shotStatus,
    }

    
    const response = {
        type: "attack",
        data: JSON.stringify(responseData),
        id: 0,
    }

    attackedUser?.ws?.send(JSON.stringify(response));
    wsConnection.send(JSON.stringify(response));


// TODO: send turn!!!!
}


