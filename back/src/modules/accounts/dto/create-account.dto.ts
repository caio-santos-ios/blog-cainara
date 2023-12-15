import { IsBoolean, IsDefined, IsEmail, IsString } from "class-validator";

export class CreateAccountDto {
    @IsString()
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;
    
    @IsBoolean()
    isAdmin: boolean = false;

        token: string
    
    @IsBoolean()
    isValidated: boolean = false
}
