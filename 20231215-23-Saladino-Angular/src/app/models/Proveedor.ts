export type Proveedor = {
  Codigo: string;
  RazonSocial: string;
  Rubro: string;
  Contacto: string;
  Direccion: {
    CalleyN: string;
    CP: string;
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
