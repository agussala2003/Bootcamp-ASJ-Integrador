-- 1 Obtener todos los productos, mostrando nombre del producto, categoría, proveedor (razón social y codigo proveedor), precio.
SELECT prod.nombre       AS NombreProd,
       cat.categoria     AS Categoria,
       prov.razon_social AS RazonSocial,
       prov.prov_cod     AS CodProv,
       prod.precio       AS Precio
FROM   proveedores prov
       INNER JOIN productos prod
               ON prov.prov_id = prod.proveedor
       INNER JOIN categorias cat
               ON cat.cat_id = prod.categoria

-- 2 En el listado anterior, además de los datos mostrados, traer el campo imagen aunque el producto NO tenga una. Sino tiene imagen, mostrar "-".
SELECT prod.nombre       AS NombreProd,
       cat.categoria     AS Categoria,
       prov.razon_social AS RazonSocial,
       prov.prov_cod     AS CodProv,
       prod.precio       AS Precio,
       ISNULL(prod.imagen, '-') AS ImagenProd
FROM   proveedores prov
       INNER JOIN productos prod
               ON prov.prov_id = prod.proveedor
       INNER JOIN categorias cat
               ON cat.cat_id = prod.categoria

-- 3 Mostrar los datos que se pueden modificar (en el front) del producto con ID = 2.
SELECT cat.categoria    AS Categoria,
       prod.nombre      AS NombreProd,
       prod.descripcion AS DescripcionProd,
       prod.precio      AS PrecioProd,
       prod.imagen      AS ImagenProd
FROM   proveedores prov
       INNER JOIN productos prod
               ON prov.prov_id = prod.proveedor
       INNER JOIN categorias cat
               ON cat.cat_id = prod.categoria
WHERE  prod.prod_id = 2

-- 4 Listar todos los proveedores cuyo teléfono tenga la característica de Córdoba o que la provincia sea igual a alguna de las 3 con más proveedores.
SELECT prov.imagen       AS UrlImagen,
       prov.prov_cod     AS CodProv,
       prov.razon_social AS RazonSocial,
       prov.telefono     AS TelefonoProv,
       prov.email        AS EmailProv,
       prov.sitio_web    AS SitioProv
FROM   proveedores prov
       INNER JOIN direcciones direc
               ON direc.proveedor = prov.prov_id
       INNER JOIN localidades loc
               ON loc.loc_id = direc.localidad
       INNER JOIN provincias provin
               ON provin.provin_id = loc.provincia
WHERE  prov.telefono LIKE '%351%'
        OR provin.provin_id IN (SELECT TOP 3 provin_id
                                FROM   proveedores provs
                                       INNER JOIN direcciones direcciones
                                               ON direcciones.proveedor =
                                                  provs.prov_id
                                       INNER JOIN localidades localidades
                                               ON localidades.loc_id =
                                                  direcciones.localidad
                                       INNER JOIN provincias provincias
                                               ON provincias.provin_id =
                                                  localidades.provincia
                                GROUP  BY provin_id
                                ORDER  BY Count(provs.prov_id) DESC);

-- 5 Traer un listado de todos los proveedores que no hayan sido eliminados, y ordenados por razon social, codigo proveedor y fecha en que se dió de alta ASC. De este listado mostrar los datos que correspondan con su tabla del front.
SELECT prov.imagen                             AS UrlImagen,
       prov.prov_cod                           AS CodProv,
       prov.razon_social                       AS RazonSocial,
       prov.telefono                           AS TelefonoProv,
       prov.email                              AS EmailProv,
       prov.sitio_web                          AS SitioProv,
       Concat(cont.nombre, ' ', cont.apellido) AS Contacto
FROM   proveedores prov
       INNER JOIN contactos cont
               ON cont.proveedor = prov.prov_id
WHERE  prov.activo = 1
ORDER  BY prov.razon_social ASC,
          prov.prov_cod ASC,
          prov.creado_en ASC

-- 6 Obtener razon social, codigo proveedor, imagen, web, email, teléfono y los datos del contacto del proveedor con más ordenes de compra cargadas.
SELECT prov.razon_social AS RazonSocial,
       prov.prov_cod     AS CodProv,
       prov.imagen       AS ImgProv,
       prov.sitio_web    AS SitioProv,
       prov.email        AS EmailProv,
       prov.telefono     AS TelefonoProv,
       cont.nombre       AS NombreCont,
       cont.apellido     AS ApellidoCont,
       cont.email        AS EmailCont,
       cont.telefono     AS TelefonoCont,
       cont.rol          AS RolCont
FROM   proveedores prov
       INNER JOIN contactos cont
               ON cont.proveedor = prov.prov_id
WHERE  prov.prov_id IN (SELECT TOP 1 ord.proveedor
                        FROM   ordenes ord
                               INNER JOIN detalles_orden det
                                       ON det.orden = ord.ord_id
                        GROUP  BY ord.proveedor
                        ORDER  BY Count(ord.proveedor) DESC);

-- 7 Mostrar la fecha emisión, nº de orden, razon social y codigo de proveedor, y la cantidad de productos de cada orden.
SELECT ord.emision       AS FechaEmision,
       ord.num_orden     AS NumOrden,
       prov.razon_social AS RazonSocial,
       prov.prov_cod     AS CodigoProveedor,
       Sum(det.cant)     AS CantidadProdOrden
FROM   ordenes ord
       INNER JOIN proveedores prov
               ON prov.prov_id = ord.proveedor
       INNER JOIN detalles_orden det
               ON det.orden = ord.ord_id
GROUP  BY ord.emision,
          ord.num_orden,
          prov.razon_social,
          prov.prov_cod;

-- 8 En el listado anterior, diferenciar cuando una orden está Cancelada o no, y el total de la misma.
SELECT ord.emision                            AS FechaEmision,
       ord.num_orden                          AS NumOrden,
       prov.razon_social                      AS RazonSocial,
       prov.prov_cod                          AS CodigoProveedor,
       Count(det.orden)                       AS CantidadProdOrden,
       Round(Sum(det.cant * det.subtotal), 2) AS Total,
       est.estado                             AS Estado
FROM   ordenes ord
       INNER JOIN proveedores prov
               ON prov.prov_id = ord.proveedor
       INNER JOIN detalles_orden det
               ON det.orden = ord.ord_id
       INNER JOIN estado est
               ON est.est_id = ord.estado
GROUP  BY ord.emision,
          ord.num_orden,
          prov.razon_social,
          prov.prov_cod,
          est.estado;

-- 9 Mostrar el detalle de una orden de compra del proveedor 3, trayendo: SKU del producto, nombre producto, cantidad y subtotal.
SELECT prod.sku     AS Sku,
       prod.nombre  AS NombreProd,
       det.cant     AS Cantidad,
       det.subtotal AS Subtotal
FROM   ordenes ord
       INNER JOIN detalles_orden det
               ON det.orden = ord.ord_id
       INNER JOIN productos prod
               ON prod.prod_id = det.producto
WHERE  ord.proveedor = 3

-- 10 Cambiar el estado a Cancelada y la fecha de modificación a la orden de compra con ID = 4.
UPDATE ordenes
SET    actualizado_en = '2024-01-20 08:00:00',
       estado = 2,
       activo = 0
WHERE  ord_id = 4

-- 11 Escribir la sentencia para eliminar el producto con id = 1 (NO EJECUTAR, SÓLO MOSTRAR SENTENCIA)
DELETE FROM productos
WHERE  prod_id = 1 