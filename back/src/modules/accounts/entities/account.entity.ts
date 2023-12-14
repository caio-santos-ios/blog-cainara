export class Account {
    constructor(token: string) {
        token = this.token
    }

    name: string;
    email: string;
    password: string;
    isAdmin: boolean = false;
    token: string
    isValidated: boolean = false
}
