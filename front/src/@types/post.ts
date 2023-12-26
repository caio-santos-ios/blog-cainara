export type Tpost = {
    id: number;
    title: string;
    description: string;
    coverPhoto: any;
    photos: any[];
    authorId: number;
    comments: any[];
    likes: any;
    _count: any;
}

export type TcreatePost = {
    title: string;
    description: string;
    coverPhoto: any;
    photos: any[];
}