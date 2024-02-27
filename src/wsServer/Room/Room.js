import { v4 as uuidv4 } from 'uuid';

export class Room {
    constructor() {
        this.id = uuidv4()
        this.user1 = null
        this.user2 = null
        this.isFull = false
    }

    addUser = (user) => {
        if (this.user1 === null) {
            this.user1 = user
            return
        }

        if (this.user2 === null) {
            this.user2 = user
        }

        if (this.user1 !== null && this.user2 !== null) {
            this.isFull = true
        }
    }
}