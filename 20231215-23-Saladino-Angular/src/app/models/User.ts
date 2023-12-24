export interface User {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password:string;
    isAdmin: boolean;
    isClient:boolean;
    isNormalUser:boolean;
}