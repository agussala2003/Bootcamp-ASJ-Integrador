import { Category } from "./Category";
import { Supplier } from "./Supplier";

export interface Product {
    id: string;
    sku: string;
    productName: string;
    description: string;
    imageUrl: string;
    active: boolean;
    price: number;
    createdAt?: string;
    updatedAt?: string;
    supplier: Supplier;
    category: Category;
}