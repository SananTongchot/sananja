export interface UserModel {
    id:      number;
    name:     string;
    avatar:   string;
    email:    string;
    password: string;
    type:     string;
}

export interface CatModel {
    id:   number;
    name:  string;
    image: string;
    score: number;
}

export interface VoteModel {
    id:   number;
    cid:  number;
    score_old: number;
    score_new: number;
    date: Date;
}