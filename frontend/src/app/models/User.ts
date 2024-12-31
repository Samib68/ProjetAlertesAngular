import {Role} from "./Role";

export interface User {
    id: number;
    username: string;
    email: string;
    roles: Role[];
    // Ajoutez d'autres propriétés d'utilisateur si nécessaire
}