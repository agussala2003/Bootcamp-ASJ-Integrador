import { Country } from "./Country";

export interface Province {
    id: string;
    provinceName: string;
    country: Country;
}