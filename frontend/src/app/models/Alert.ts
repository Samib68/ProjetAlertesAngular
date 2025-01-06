import {User} from "./User";

export interface Alert{
    id:number;
    title:string;
    message:string;
    type:string;
    user:User;
    timestamp: Date;
}