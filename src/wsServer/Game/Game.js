import { Room } from "../Room/Room"

export class Controller {
    constructor() {
        this.users = []
        this.rooms = []
    }

    addUser = (user) => {
        this.users.push(user)
        this.addUserIntoRoom(user)
    }

    getUserById = (id) => {
        return this.users.find((user) => user.id === id)
    }

    addUserIntoRoom = (user) => {
        this.createEmptyRoomIfNeeded()

        const room = this.rooms[this.rooms.length - 1]
        room.addUser(user)
    }

    createEmptyRoomIfNeeded = () => {
        if (this.rooms.length === 0 ) {
            this.rooms.push(new Room())
        } else {
            const lastRoom = this.rooms[this.rooms.length - 1]

            if (lastRoom.isFull === true) {
                this.rooms.push(new Room())
            }
        }
    }

}