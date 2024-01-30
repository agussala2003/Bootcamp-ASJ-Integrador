import { Location } from "./Location";
import { Supplier } from "./Supplier";

export interface Address {
    id: string;
    streetName: string;
    streetNumber: number;
    postalCode: string;
    createdAt?: string;
    updatedAt?: string;
    supplier: Supplier;
    location: Location;
}