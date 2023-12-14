import { Exclude } from "class-transformer";

export class Account {
    constructor(token: string) {
        token = this.token
    }

    name: string;
    email: string;
    @Exclude()
    password: string;
    isAdmin: boolean = false;
    token: string
    isValidated: boolean = false
}
