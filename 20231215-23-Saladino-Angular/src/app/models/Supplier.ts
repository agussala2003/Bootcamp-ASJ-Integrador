import { Industry } from "./Industry";
import { IvaCondition } from "./IvaCondition";

export interface Supplier {
    id: string;
    supplierCode: string;
    businessName: string;
    email: string;
    website: string;
    phoneNumber: string;
    image: string;
    active: boolean;
    cuit: string;
    createdAt?: string;
    updatedAt?: string;
    industry: Industry;
    ivaCondition: IvaCondition;
}