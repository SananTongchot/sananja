export interface UserModel {
    uid:      number;
    name:     string;
    avatar:   string;
    email:    string;
    password: string;
    type:     string;
}

export interface CatModel {
    cid:   number;
    name:  string;
    image: string;
    score: number;
}