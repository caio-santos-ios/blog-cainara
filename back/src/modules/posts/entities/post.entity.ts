export interface IcoverPhoto {
    id: string;
    url: string;
}

export class Post {
    title: string;
    description: string;
    coverPhoto: IcoverPhoto;
    photos: IcoverPhoto[];
    readonly created_at: Date
    readonly updated_at: Date
}
