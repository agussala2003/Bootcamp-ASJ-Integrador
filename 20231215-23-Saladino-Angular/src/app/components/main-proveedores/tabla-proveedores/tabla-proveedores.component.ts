import { Component } from '@angular/core';

@Component({
  selector: 'app-tabla-proveedores',
  templateUrl: './tabla-proveedores.component.html',
  styleUrl: './tabla-proveedores.component.css',
})
export class TablaProveedoresComponent {
  proveedores: Proveedor[] = [
    {
      Codigo: 1,
      RazonSocial: "Empresa A S.A.",
      Rubro: "Tecnología",
      Contacto: "Juan Pérez",
      Direccion: {
        CalleyN: "Av. Principal 123",
        CP: 12345,
        Localidad: "Ciudad A",
        Provincia: "Provincia A",
        Pais: "Argentina",
      },
      DatosFiscales: {
        CUIT: "30-12345678-9",
        CondiciónIVA: "Responsable Inscripto",
      },
      DatosContacto: {
        Nombre: "Carlos",
        Apellido: "Gómez",
        Telefono: "123-456789",
        Email: "carlos.gomez@empresaA.com",
        Rol: "Gerente de Compras",
    }
  },
  {
    Codigo: 2,
    RazonSocial: "Compañía B S.R.L.",
    Rubro: "Alimentación",
    Contacto: "Ana Rodríguez",
    Direccion: {
      CalleyN: "Calle Secundaria 456",
      CP: 54321,
      Localidad: "Ciudad B",
      Provincia: "Provincia B",
      Pais: "Argentina",
    },
    DatosFiscales: {
      CUIT: "30-87654321-0",
      CondiciónIVA: "Monotributo",
    },
    DatosContacto: {
      Nombre: "Lucía",
      Apellido: "Martínez",
      Telefono: "987-654321",
      Email: "lucia.martinez@companiaB.com",
      Rol: "Responsable de Ventas",
    },
  },
  {
    Codigo: 3,
    RazonSocial: "Tienda C E.I.R.L.",
    Rubro: "Moda",
    Contacto: "Luisa García",
    Direccion: {
      CalleyN: "Plaza Central 789",
      CP: 67890,
      Localidad: "Ciudad C",
      Provincia: "Provincia C",
      Pais: "Argentina",
    },
    DatosFiscales: {
      CUIT: "30-13579246-7",
      CondiciónIVA: "Exento",
    },
    DatosContacto: {
      Nombre: "Miguel",
      Apellido: "Fernández",
      Telefono: "789-123456",
      Email: "miguel.fernandez@tiendaC.com",
      Rol: "Encargado de Compras",
    },
  }
  ]
}
type Proveedor = {
  Codigo: number;
  RazonSocial: string;
  Rubro: string;
  Contacto: string;
  Direccion: {
    CalleyN: string;
    CP: number;
    Localidad: string;
    Provincia: string;
    Pais: string;
  };
  DatosFiscales: {
    CUIT: string;
    CondiciónIVA: string;
  };
  DatosContacto: {
    Nombre: string;
    Apellido: string;
    Telefono: string;
    Email: string;
    Rol: string;
  };
};
