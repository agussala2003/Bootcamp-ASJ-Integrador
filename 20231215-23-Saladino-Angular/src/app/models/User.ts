import { Role } from "./Role";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password:string;
    createdAt?: string;
    updatedAt?: string;
    role: Role;
}