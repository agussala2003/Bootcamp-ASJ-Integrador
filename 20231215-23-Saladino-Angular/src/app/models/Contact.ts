import { Supplier } from "./Supplier";

export interface Contact {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
    supplier: Supplier;
}