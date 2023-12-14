import { IsBoolean, IsString } from "class-validator";

export class CreateAccountDto {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string;
    
    @IsBoolean()
    isAdmin: boolean = false;

    @IsString()
    token: string
    
    @IsBoolean()
    isValidated: boolean = false
}
