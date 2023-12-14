import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor() {
        super()
    }

    validatedToken(payload){
        return { id: payload.id, email: payload.email, isAdmin: payload.IsAdmin }
    }
}