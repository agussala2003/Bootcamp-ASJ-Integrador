
import { Status } from "./Status";
import { Supplier } from "./Supplier";
import { User } from "./User";

export interface Order {
    id: string;
    orderNumber: string;
    issuanceDate: string;
    deliveryDate: string;
    receptionInfo: string;
    active: boolean;
    createdAt?: string;
    updatedAt?: string;
    supplier: Supplier;
    status: Status;
    user: User;
}