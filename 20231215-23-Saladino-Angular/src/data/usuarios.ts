import { User } from "../app/models/User"
export const usuarios: User[] = [
    {
        username: 'NombreDeUsuario',
        firstName: 'Nombre',
        lastName: 'Apellido',
        email: 'correo@ejemplo.com',
        password: 'contrasena',
        isAdmin: true,
        isClient: false,
        isNormalUser: false,
    }
]