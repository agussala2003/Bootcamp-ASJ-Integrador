-- 1 Obtener todos los productos, mostrando nombre del producto, categoría, proveedor (razón social y codigo proveedor), precio.
SELECT prod.nombre AS NombreProd, cat.categoria AS Categoria, prov.razon_social AS RazonSocial, prov.prov_cod AS CodProv, prod.precio AS Precio
FROM Proveedores prov INNER JOIN Productos prod ON prov.prov_id = prod.proveedor INNER JOIN Categorias cat ON cat.cat_id = prod.categoria

-- 2 Obtener todos los productos, mostrando nombre del producto, categoría, proveedor (razón social y codigo proveedor), precio.
SELECT prod.nombre AS NombreProd, cat.categoria AS Categoria, prov.razon_social AS RazonSocial, prov.prov_cod AS CodProv, prod.precio AS Precio, prod.imagen AS ImagenProd
FROM Proveedores prov INNER JOIN Productos prod ON prov.prov_id = prod.proveedor INNER JOIN Categorias cat ON cat.cat_id = prod.categoria

-- 3 Mostrar los datos que se pueden modificar (en el front) del producto con ID = 2.
SELECT cat.categoria AS Categoria,prod.nombre AS NombreProd,prod.descripcion AS DescripcionProd,prod.precio AS PrecioProd,prod.imagen AS ImagenProd
FROM Proveedores prov INNER JOIN Productos prod ON prov.prov_id = prod.proveedor INNER JOIN Categorias cat ON cat.cat_id = prod.categoria
WHERE prod.prod_id = 2

-- 4 Listar todos los proveedores cuyo teléfono tenga la característica de Córdoba o que la provincia sea igual a alguna de las 3 con más proveedores.
SELECT prov.imagen AS UrlImagen,prov.prov_cod AS CodProv,prov.razon_social AS RazonSocial,prov.telefono AS TelefonoProv,prov.email AS EmailProv,prov.sitio_web AS SitioProv
FROM Proveedores prov
INNER JOIN Direcciones direc ON direc.proveedor = prov.prov_id
INNER JOIN Localidades loc ON loc.loc_id = direc.localidad
INNER JOIN Provincias provin ON provin.provin_id = loc.provincia
WHERE prov.telefono LIKE '%351%' OR provin.provin_id IN (
  SELECT TOP 3 provin_id
  FROM Proveedores provs
  INNER JOIN Direcciones direcciones ON direcciones.proveedor = provs.prov_id
  INNER JOIN Localidades localidades ON localidades.loc_id = direcciones.localidad
  INNER JOIN Provincias provincias ON provincias.provin_id = localidades.provincia
  GROUP BY provin_id
  ORDER BY COUNT(provs.prov_id) DESC
);

-- 5 Traer un listado de todos los proveedores que no hayan sido eliminados, y ordenados por razon social, codigo proveedor y fecha en que se dió de alta ASC. De este listado mostrar los datos que correspondan con su tabla del front.
SELECT prov.imagen AS UrlImagen,prov.prov_cod AS CodProv,prov.razon_social AS RazonSocial,prov.telefono AS TelefonoProv,prov.email AS EmailProv,prov.sitio_web AS SitioProv, CONCAT(cont.nombre,' ',cont.apellido) AS Contacto
FROM Proveedores prov INNER JOIN Contactos cont ON cont.proveedor = prov.prov_id
WHERE prov.activo = 1
ORDER BY prov.razon_social ASC, prov.prov_cod ASC, prov.creado_en ASC

-- 6 Obtener razon social, codigo proveedor, imagen, web, email, teléfono y los datos del contacto del proveedor con más ordenes de compra cargadas.
SELECT prov.razon_social AS RazonSocial,prov.prov_cod AS CodProv,prov.imagen AS ImgProv,prov.sitio_web AS SitioProv,prov.email AS EmailProv,prov.telefono AS TelefonoProv,cont.nombre AS NombreCont,cont.apellido AS ApellidoCont,cont.email AS EmailCont,cont.telefono AS TelefonoCont,cont.rol AS RolCont
FROM Proveedores prov INNER JOIN Contactos cont ON cont.proveedor = prov.prov_id
WHERE prov.prov_id IN (
  SELECT TOP 1 ord.proveedor
  FROM Ordenes ord INNER JOIN Detalles_Orden det ON det.orden = ord.ord_id
  GROUP BY ord.proveedor
  ORDER BY COUNT(ord.proveedor) DESC
);

-- 7 Mostrar la fecha emisión, nº de orden, razon social y codigo de proveedor, y la cantidad de productos de cada orden.
SELECT ord.emision AS FechaEmision, ord.num_orden AS NumOrden, prov.razon_social AS RazonSocial, prov.prov_cod AS CodigoProveedor, COUNT(det.orden) AS CantidadProdOrden
FROM Ordenes ord
INNER JOIN Proveedores prov ON prov.prov_id = ord.proveedor
INNER JOIN Detalles_Orden det ON det.orden = ord.ord_id
GROUP BY ord.emision, ord.num_orden, prov.razon_social, prov.prov_cod;

-- 8 En el listado anterior, diferenciar cuando una orden está Cancelada o no, y el total de la misma.
SELECT ord.emision AS FechaEmision, ord.num_orden AS NumOrden, prov.razon_social AS RazonSocial, prov.prov_cod AS CodigoProveedor, COUNT(det.orden) AS CantidadProdOrden, ROUND(SUM(det.cant * det.subtotal),2) AS Total, est.estado AS Estado
FROM Ordenes ord
INNER JOIN Proveedores prov ON prov.prov_id = ord.proveedor
INNER JOIN Detalles_Orden det ON det.orden = ord.ord_id
INNER JOIN Estado est ON est.est_id = ord.estado
GROUP BY ord.emision, ord.num_orden, prov.razon_social, prov.prov_cod , est.estado;

-- 9 Mostrar el detalle de una orden de compra del proveedor 3, trayendo: SKU del producto, nombre producto, cantidad y subtotal.
SELECT prod.sku AS Sku,prod.nombre AS NombreProd,det.cant AS Cantidad,det.subtotal AS Subtotal
FROM Ordenes ord
INNER JOIN Detalles_Orden det ON det.orden = ord.ord_id
INNER JOIN Productos prod ON prod.prod_id = det.producto
WHERE ord.proveedor = 3

-- 10 Cambiar el estado a Cancelada y la fecha de modificación a la orden de compra con ID = 4.
UPDATE Ordenes
SET actualizado_en = '2024-01-20 08:00:00', estado = 2, activo = 0
WHERE ord_id = 4

-- 11 Escribir la sentencia para eliminar el producto con id = 1 (NO EJECUTAR, SÓLO MOSTRAR SENTENCIA)
DELETE 
FROM Productos
WHERE prod_id = 1