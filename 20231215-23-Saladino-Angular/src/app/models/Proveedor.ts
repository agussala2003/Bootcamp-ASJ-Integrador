export type Proveedor = {
  id: string;
  RazonSocial: string;
  Rubro: string;
  Telefono: string;
  Email: string;
  SitioWeb: string;
  Imagen:string;
  Activo:boolean;
  Direccion: {
    Calle: string;
    Numero:string;
    CP: string;
    Localidad: string;
    Provincia: string;
    Pais: string;
  };
  DatosFiscales: {
    CUIT: string;
    CondicionIVA: string;
  };
  DatosContacto: {
    Nombre: string;
    Apellido: string;
    Telefono: string;
    Email: string;
    Rol: string;
  };
};
