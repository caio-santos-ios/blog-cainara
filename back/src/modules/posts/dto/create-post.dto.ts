import { IsString } from "class-validator";

export class CreatePostDto {
    @IsString()
    title: string;
    @IsString()
    description: string;
    readonly created_at: Date
    readonly updated_at: Date
}
