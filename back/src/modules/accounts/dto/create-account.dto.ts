export class CreateAccountDto {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean = false;
    token: string
    isValidated: boolean = false
}
