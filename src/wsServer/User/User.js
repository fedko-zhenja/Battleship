import { v4 as uuidv4 } from 'uuid';

export class User {
    constructor({ name, password }) {
        this.id = uuidv4()
        this.name = name
        this.password = password
        this.ships = null
    }

    addShips = (ships) => {
        this.ships = ships
    }
}