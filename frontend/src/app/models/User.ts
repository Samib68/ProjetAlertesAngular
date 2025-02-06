import {Role} from "./Role";

export interface User {
    id: number;
    username: string;
    email: string;
    roles: Role[];

}