import { Orden } from '../app/models/Orden';
export const ordenes: Orden[] = [
  {
    Orden: '1',
    Emision: '2023-03-05',
    Entrega: '2023-03-12',
    InfoRecepcion: 'Sujeto alto y musculoso',
    Proveedor: 'Empresa A S.A.',
    Productos: [
      {
        Sku: '101',
        Cantidad: '3',
        Subtotal: '499.99',
      }
    ],
    Activo: true,
    Total: '999',
  },
  {
    Orden: '2',
    Emision: '2023-02-01',
    Entrega: '2023-02-10',
    InfoRecepcion: 'Casa duplex',
    Proveedor: 'Compañía B S.R.L.',
    Productos: [
      {
        Sku: '202',
        Cantidad: '3',
        Subtotal: '129.99',
      },
    ],
    Activo: true,
    Total: '999',
  },
  {
    Orden: '3',
    Emision: '2023-03-05',
    Entrega: '2023-03-12',
    InfoRecepcion: 'Los recibe el encargado',
    Proveedor: 'Tienda C E.I.R.L.',
    Productos: [
      {
        Sku: '303',
        Cantidad: '3',
        Subtotal: '79.99',
      },
    ],
    Activo: true,
    Total: '999',
  },
];
