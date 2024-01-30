import { Order } from "./Order";
import { Product } from "./Product";

export interface OrderDetail {
    id: string;
    quantity: number;
    subtotal: number;
    createdAt?: string;
    updatedAt?: string;
    product: Product;
    order: Order;
}