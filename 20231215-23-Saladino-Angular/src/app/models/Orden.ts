export type Orden = {
  id: string;
  Emision: string;
  Entrega: string;
  InfoRecepcion: string;
  Proveedor: string;
  Productos: CalcOrden [];
  Activo: boolean;
  Total: string;
};
export interface CalcOrden {
  Sku:string;
  Nombre:string;
  Cantidad:string;
  Subtotal:string;
}
