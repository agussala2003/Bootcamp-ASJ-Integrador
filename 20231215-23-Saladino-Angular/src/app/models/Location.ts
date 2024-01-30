import { Province } from "./Province";

export interface Location {
    id: string;
    locationName: string;
    province: Province;
}