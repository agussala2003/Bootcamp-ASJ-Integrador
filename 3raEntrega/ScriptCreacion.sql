CREATE DATABASE integradorFinal7
GO
USE integradorFinal7

CREATE TABLE Rubros (
    rub_id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    rubro VARCHAR(50) NOT NULL,
    creado_en DATETIME NOT NULL,
    actualizado_en DATETIME NULL
);
CREATE TABLE Categorias (
    cat_id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    creado_en DATETIME NOT NULL,
    actualizado_en DATETIME NULL
);
CREATE TABLE Ordenes (
    ord_id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    num_orden VARCHAR(20) NOT NULL,
    emision DATETIME NOT NULL,
    entrega DATETIME NOT NULL,
    info_recepcion TEXT NOT NULL,
    proveedor INT NOT NULL,
    activo BIT NOT NULL,
    estado INT NOT NULL,
	usuario INT NOT NULL,
    creado_en DATETIME NOT NULL,
    actualizado_en DATETIME NULL
);
CREATE TABLE Productos (
    prod_id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    sku VARCHAR(20) NOT NULL,
    proveedor INT NOT NULL,
    categoria INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL,
    imagen TEXT NOT NULL,
    activo BIT NOT NULL,
    precio FLOAT NOT NULL,
    creado_en DATETIME NOT NULL,
    actualizado_en DATETIME NULL
);
CREATE TABLE Localidades (
    loc_id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    localidad VARCHAR(50) NOT NULL,
    provincia INT NOT NULL
);
CREATE TABLE Contactos (
    cont_id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    telefono VARCHAR(50) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    proveedor INT NOT NULL,
    creado_en DATETIME NOT NULL,
    actualizado_en DATETIME NULL
);
CREATE TABLE Direcciones (
    direc_id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    calle VARCHAR(50) NOT NULL,
    num INT NOT NULL,
    localidad INT NOT NULL,
    proveedor INT NOT NULL,
    codigo_postal VARCHAR(10) NOT NULL,
    creado_en DATETIME NOT NULL,
    actualizado_en DATETIME NULL
);
CREATE TABLE Proveedores (
    prov_id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    prov_cod VARCHAR(8) NOT NULL,
    razon_social VARCHAR(50) NOT NULL,
    rubro INT NOT NULL,
    email VARCHAR(50) NOT NULL,
    sitio_web TEXT NOT NULL,
    telefono VARCHAR(50) NOT NULL,
    imagen TEXT NOT NULL,
    activo BIT NOT NULL,
    cuit VARCHAR(15) NOT NULL,
    cond_iva INT NOT NULL,
    creado_en DATETIME NOT NULL,
    actualizado_en DATETIME NULL
);
CREATE TABLE Estado (
    est_id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    estado VARCHAR(50) NOT NULL
);
CREATE TABLE Condiciones_Iva (
    cond_id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    cond VARCHAR(50) NOT NULL
);
CREATE TABLE Paises (
    pais_id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    pais VARCHAR(50) NOT NULL
);
CREATE TABLE Provincias (
    provin_id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    provincias VARCHAR(50) NOT NULL,
    pais INT NOT NULL
);
CREATE TABLE Detalles_Orden (
    det_id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    producto INT NOT NULL,
    cant INT NOT NULL,
    subtotal FLOAT NOT NULL,
    orden INT NOT NULL,
    creado_en DATETIME NOT NULL,
    actualizado_en DATETIME NULL
);
CREATE TABLE Usuarios (
    usu_id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    pass VARCHAR(50) NOT NULL,
	rol	INT NOT NULL,
    creado_en DATETIME NOT NULL,
    actualizado_en DATETIME NULL
);
CREATE TABLE Roles (
    rol_id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    creado_en DATETIME NOT NULL,
    actualizado_en DATETIME NULL
);

-- Adding Foreign Key Constraints

ALTER TABLE Ordenes ADD CONSTRAINT ordenes_proveedor_foreign FOREIGN KEY (proveedor) REFERENCES Proveedores(prov_id);
ALTER TABLE Ordenes ADD CONSTRAINT ordenes_estado_foreign FOREIGN KEY (estado) REFERENCES Estado(est_id);
ALTER TABLE Ordenes ADD CONSTRAINT ordenes_usuario_foreign FOREIGN KEY (usuario) REFERENCES Usuarios(usu_id);
ALTER TABLE Usuarios ADD CONSTRAINT usuarios_rol_foreign FOREIGN KEY (rol) REFERENCES Roles(rol_id);
ALTER TABLE Productos ADD CONSTRAINT productos_proveedor_foreign FOREIGN KEY (proveedor) REFERENCES Proveedores(prov_id);
ALTER TABLE Productos ADD CONSTRAINT productos_categoria_foreign FOREIGN KEY (categoria) REFERENCES Categorias(cat_id);
ALTER TABLE Localidades ADD CONSTRAINT localidades_provincia_foreign FOREIGN KEY (provincia) REFERENCES Provincias(provin_id);
ALTER TABLE Contactos ADD CONSTRAINT contactos_proveedor_foreign FOREIGN KEY (proveedor) REFERENCES Proveedores(prov_id);
ALTER TABLE Direcciones ADD CONSTRAINT direcciones_localidad_foreign FOREIGN KEY (localidad) REFERENCES Localidades(loc_id);
ALTER TABLE Direcciones ADD CONSTRAINT direcciones_proveedor_foreign FOREIGN KEY (proveedor) REFERENCES Proveedores(prov_id);
ALTER TABLE Proveedores ADD CONSTRAINT proveedores_rubro_foreign FOREIGN KEY (rubro) REFERENCES Rubros(rub_id);
ALTER TABLE Proveedores ADD CONSTRAINT proveedores_cond_iva_foreign FOREIGN KEY (cond_iva) REFERENCES Condiciones_Iva(cond_id);
ALTER TABLE Provincias ADD CONSTRAINT provincias_pais_foreign FOREIGN KEY (pais) REFERENCES Paises(pais_id);
ALTER TABLE Detalles_Orden ADD CONSTRAINT detalles_orden_producto_foreign FOREIGN KEY(producto) REFERENCES Productos(prod_id);
ALTER TABLE Detalles_Orden ADD CONSTRAINT detalles_orden_orden_foreign FOREIGN KEY(orden) REFERENCES Ordenes(ord_id);

-- Inserts

INSERT INTO Paises(pais)
VALUES 
('Argentina'),
('Brasil'),
('Chile'),
('Colombia'),
('Paraguay'),
('Uruguay'),
('Venezuela')

INSERT INTO Provincias(provincias,pais)
VALUES 
('Buenos Aires', 1),
('Catamarca', 1),
('Chaco', 1),
('Chubut', 1),
('Ciudad de Buenos Aires', 1),
('Cordoba', 1),
('Corrientes', 1),
('Entre Rios', 1),
('Formosa', 1),
('Jujuy', 1),
('La Pampa', 1),
('La Rioja', 1),
('Mendoza', 1),
('Misiones', 1),
('Neuquen', 1),
('Rio Negro', 1),
('Salta', 1),
('San Juan', 1),
('San Luis', 1),
('Santa Cruz', 1),
('Santa Fe', 1),
('Santiago del Estero', 1),
('Tierra del Fuego', 1),
('Tucuman', 1),
('Acre – Rio Branco', 2),
('Alagoas – Maceio', 2),
('Amapa – Macapa', 2),
('Amazonas – Manaus', 2),
('Bahia – Salvador de Bahia', 2),
('Ceara – Fortaleza', 2),
('Distrito Federal – Brasilia', 2),
('Goias – Goiania', 2),
('Maranhão – São Luis do Maranhão', 2),
('Mato Grosso – Cuiaba', 2),
('Mato Grosso del Sur – Campo Grande', 2),
('Minas Gerais – Belo Horizonte', 2),
('Para – Belem do Para', 2),
('Paraiba – João Pessoa', 2),
('Parana – Curitiba', 2),
('Pernambuco – Recife', 2),
('Piaui – Teresina', 2),
('Rio de Janeiro – Rio de Janeiro', 2),
('Rio Grande del Norte – Natal', 2),
('Rio Grande del Sur – Porto Alegre', 2),
('Rondonia – Porto Velho', 2),
('Roraima – Boa Vista', 2),
('Santa Catarina – Florianopolis', 2),
('São Paulo – São Paulo', 2),
('Sergipe – Aracaju', 2),
('Tocantins – Palmas', 2),
('Antartica Chilena', 3),
('Antofagasta', 3),
('Arauco', 3),
('Arica', 3),
('Aysen', 3),
('Bio-Bio', 3),
('Cachapoal', 3),
('Capitan Prat', 3),
('Cardenal Caro', 3),
('Cauquenes', 3),
('Cautin', 3),
('Chacabuco', 3),
('Chanaral', 3),
('Chiloe', 3),
('Choapa', 3),
('Colchagua', 3),
('Concepcion', 3),
('Copiapo', 3),
('Cordillera', 3),
('Coyhaique', 3),
('Curico', 3),
('Diguillin', 3),
('El Loa', 3),
('Elqui', 3),
('General Carrera', 3),
('Huasco', 3),
('Iquique', 3),
('Isla de Pascua', 3),
('Itata', 3),
('Limari', 3),
('Linares', 3),
('Llanquihue', 3),
('Los Andes', 3),
('Magallanes', 3),
('Maipo', 3),
('Malleco', 3),
('Marga Marga', 3),
('Melipilla', 3),
('Osorno', 3),
('Palena', 3),
('Parinacota', 3),
('Petorca', 3),
('Punilla', 3),
('Quillota', 3),
('Ranco', 3),
('San Antonio', 3),
('San Felipe de Aconcagua', 3),
('Santiago', 3),
('Talagante', 3),
('Talca', 3),
('Tamarugal', 3),
('Tierra del Fuego', 3),
('Tocopilla', 3),
('Ultima Esperanza', 3),
('Valdivia', 3),
('Valparaiso', 3),
('Amazonas', 4),
('Antioquia', 4),
('Arauca', 4),
('Atlantico', 4),
('Bolivar', 4),
('Boyaca', 4),
('Caldas', 4),
('Caqueta', 4),
('Casanare', 4),
('Cauca', 4),
('Cesar', 4),
('Choco', 4),
('Cordoba', 4),
('Cundinamarca', 4),
('Guainia', 4),
('Guaviare', 4),
('Huila', 4),
('La Guajira', 4),
('Magdalena', 4),
('Meta', 4),
('Narino', 4),
('Norte de Santander', 4),
('Putumayo', 4),
('Quindio', 4),
('Risaralda', 4),
('San Andres y Providencia', 4),
('Santander', 4),
('Sucre', 4),
('Tolima', 4),
('Valle del Cauca', 4),
('Vaupes', 4),
('Vichada', 4),
('Alto Paraguay', 5),
('Alto Parana', 5),
('Amambay', 5),
('Asuncion', 5),
('Boqueron', 5),
('Caaguazu', 5),
('Caazapa', 5),
('Canindeyu', 5),
('Central', 5),
('Concepcion', 5),
('Cordillera', 5),
('Guaira', 5),
('Itapua', 5),
('Misiones', 5),
('Ñeembucu', 5),
('Paraguari', 5),
('Presidente Hayes', 5),
('San Pedro', 5),
('Artigas', 6),
('Canelones', 6),
('Cerro Largo', 6),
('Colonia', 6),
('Durazno', 6),
('Flores', 6),
('Florida', 6),
('Lavalleja', 6),
('Maldonado', 6),
('Montevideo', 6),
('Paysandu', 6),
('Rio Negro', 6),
('Rivera', 6),
('Rocha', 6),
('Salto', 6),
('San Jose', 6),
('Soriano', 6),
('Tacuarembo', 6),
('Treinta y Tres', 6),
('Amazonas', 7),
('Anzoategui', 7),
('Apure', 7),
('Aragua', 7),
('Barinas', 7),
('Bolivar', 7),
('Carabobo', 7),
('Cojedes', 7),
('Delta Amacuro', 7),
('Distrito Capital', 7),
('Falcon', 7),
('Guarico', 7),
('Lara', 7),
('Merida', 7),
('Miranda', 7),
('Monagas', 7),
('Nueva Esparta', 7),
('Portuguesa', 7),
('Sucre', 7),
('Tachira', 7),
('Trujillo', 7),
('Vargas', 7),
('Yaracuy', 7),
('Zulia', 7);

INSERT INTO Localidades (localidad,provincia)
VALUES
('Ciudad Autonoma de Buenos Aires', 1),
('La Plata', 1),
('Belgrano', 1),
('Palermo', 1),
('Cordoba', 6),
('Rio Branco', 26),
('Maceio', 27),
('Santiago', 54),
('Valparaiso', 65),
('Asuncion', 142),
('Encarnacion', 13),
('Montevideo', 166),
('Maracaibo', 25),
('Ushuaia', 23),
('Mercedes', 23),
('Jurere', 25);

INSERT INTO Condiciones_Iva (cond)
VALUES 
('IVA Responsable Inscripto'),
('IVA Responsable no Inscripto'),
('IVA no Responsable'),
('IVA Sujeto Exento'),
('Consumidor Final'),
('Responsable Monotributo'),
('Sujeto no Categorizado'),
('Proveedor del Exterior'),
('Cliente del Exterior'),
('IVA Liberado – Ley Nº 19.640'),
('IVA Responsable Inscripto – Agente de Percepcion'),
('Pequeño Contribuyente Eventual'),
('Monotributista Social'),
('Pequeño Contribuyente Eventual Social');

INSERT INTO Rubros (rubro,creado_en,actualizado_en)
VALUES 
('Ropa', '2023-01-01 09:30:00', NULL),
('Electrodomesticos', '2023-02-05 15:45:00', '2023-02-05 16:10:00'),
('Ferreteria', '2023-03-10 11:20:00', NULL),
('Deportes', '2023-04-15 17:30:00', '2023-04-15 17:45:00'),
('Libreria', '2023-05-20 14:00:00', '2023-05-20 14:30:00'),
('Muebles', '2023-06-25 10:45:00', '2023-06-25 11:00:00'),
('Joyeria', '2023-07-30 16:20:00', NULL),
('Tecnologia', '2023-08-05 12:10:00', '2023-08-05 12:30:00'),
('Arte y Antigüedades', '2023-09-10 18:00:00', '2023-09-10 18:15:00'),
('Hogar', '2023-10-15 13:45:00', '2023-10-15 14:00:00'),
('Alimentos', '2023-02-01 09:30:00', NULL);

INSERT INTO Categorias (categoria, creado_en, actualizado_en)
VALUES 
('Electrodomesticos de Cocina', '2023-01-01 09:30:00', NULL),
('Ropa de Mujer', '2023-02-05 15:45:00', '2023-02-05 16:10:00'),
('Zapatillas', '2023-03-10 11:20:00', NULL),
('Electronica de Consumo', '2023-04-15 17:30:00', '2023-04-15 17:45:00'),
('Accesorios de Deportes', '2023-05-20 14:00:00', '2023-05-20 14:30:00'),
('Joyas de Oro', '2023-06-25 10:45:00', '2023-06-25 11:00:00'),
('Libros Infantiles', '2023-07-30 16:20:00', NULL),
('Dispositivos Portatiles', '2023-08-05 12:10:00', '2023-08-05 12:30:00'),
('Alimentos Organicos', '2023-09-10 18:00:00', '2023-09-10 18:15:00'),
('Sillas y Sillones', '2023-10-15 13:45:00', '2023-10-15 14:00:00'),
('Electrodomesticos de Limpieza', '2023-09-10 18:00:00', '2023-09-10 18:15:00'),
('Gaseosas o bebidas', '2023-09-10 18:00:00', '2023-09-10 18:15:00');

INSERT INTO Estado (estado)
VALUES 
('Aprobado'),
('Cancelado'),
('Cerrado'),
('En suspenso'),
('En progreso'),
('Revision pendiente'),
('Revisado'),
('En espera de aprobacion');

INSERT INTO Roles (rol,creado_en,actualizado_en)
VALUES
('Administrador', '2023-02-05 15:45:00', NULL),
('Cliente', '2023-02-05 15:45:00', NULL),
('Proveedor', '2023-02-05 15:45:00', '2023-02-05 16:10:00'),
('Usuario', '2023-02-05 15:45:00', '2023-02-05 16:10:00');

INSERT INTO Usuarios (nombre,apellido,email,pass,rol,creado_en,actualizado_en)
VALUES
('Agustin','Saladino','agussalalala@gmail.com','contrasena',1,'2023-02-05 15:45:00', NULL),
('Juan','Perez','juanperez@gmail.com','contrasena',1,'2023-11-05 15:45:00', '2023-03-05 15:45:00'),
('Fernando','Martinez','fermart@gmail.com','contrasena',2,'2023-02-05 15:45:00', '2023-10-05 15:45:00'),
('Leandro','Sosa','leasosa@gmail.com','contrasena',3,'2023-02-05 15:45:00', '2024-01-01 15:45:00'),
('Gustavo','Lamberti','guslamber@gmail.com','contrasena',4,'2023-10-05 15:45:00', NULL);

INSERT INTO Proveedores (prov_cod,razon_social,rubro,email,sitio_web,telefono,imagen,activo,cuit,cond_iva,creado_en,actualizado_en)
VALUES 
('1A45','Fravega',2,'fravega@gmail.com','https://www.fravega.com.ar','+54 9 11 22334354','https://www.fravega.com/static/logo-fravega@3x.png',1,'12-12246341-1',1,'2023-02-28 15:45:00', NULL),
('1A46','Samsung',8,'samsung@gmail.com','https://www.samsung.com','+54 9 11 2345634','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkIMeYLOW8fdN4XkxQNdZPcVMk_wjf0TOTA&usqp=CAU',1,'23-21233112-2',1,'2023-07-26 15:45:00', '2023-09-11 15:45:00'),
('1A47','La Serenisima',11,'laserenisima@gmail.com','https://www.laserenisima.com.ar','+54 9 11 34653456','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6QLIv5-dxveCXz0IR1oZefTqKWxNbRbyayw&usqp=CAU',1,'23-21633112-1',1,'2023-07-27 15:45:00', '2023-09-04 15:45:00'),
('1A48','Intel',8,'intel@gmail.com','https://www.intel.com','+54 9 11 23423424','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ_LLNP84ALnIS3YGTYt7vtC1hFW_dtiYlSA&usqp=CAU',0,'12-12325221-2',1,'2023-07-27 15:45:00', '2023-11-04 15:45:00'),
('1A49','Paladini',11,'paladini@gmail.com','https://www.paladini.com','+54 9 11 23435652','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ4PQ9eXFk6wxvNkUhZRGthJKQZh32J3SLGA&usqp=CAU',1,'21-33452421-3',1,'2023-07-27 15:45:00', NULL),
('1A50','Nike',4,'nike@gmail.com','https://www.nike.com','+54 351 742237541 ','https://thumbs.dreamstime.com/b/ilustraci%C3%B3n-vectorial-del-logotipo-nike-en-fondo-blanco-editorial-de-aislada-192037117.jpg',1,'23-21233112-2',1,'2023-08-27 15:45:00', '2023-09-27 15:45:00'),
('1A51','Coca Cola',11,'cocacola@gmail.com','https://www.cocacola.com','+54 9 11 2345623','https://andinacocacolaar.vtexassets.com/assets/vtex/assets-builder/andinacocacolaar.store-theme/0.0.7/images/brands/logosMarcas_cocacola___4beb5a1e63d6be6b05f8d63a9ab6c767.png',1,'23-21241112-3',1,'2023-08-18 15:45:00', '2023-09-17 15:45:00'),
('1A52','Converse',1,'converse@gmail.com','https://www.converse.com','+54 9 11 2345643','https://i.pinimg.com/736x/72/8f/17/728f177c3f194df007bf1adff15ba9b9.jpg',1,'23-21246412-3',1,'2023-08-18 15:45:00', '2023-09-17 15:45:00'),
('1A53','Adidas',4,'adidas@gmail.com','https://www.adidas.com','+54 9 11 2345687','https://i.pinimg.com/236x/18/bf/85/18bf85249110d44cb9090d0789e403f0.jpg',1,'23-21248742-3',1,'2023-08-18 15:45:00', NULL),
('1A54','Apple',8,'apple@gmail.com','https://www.apple.com','+54 9 11 2615623','https://i.pinimg.com/236x/05/38/a2/0538a2166b0ee8ba45e5ffb38aceb8c8.jpg',1,'23-21854112-3',1,'2023-08-18 15:45:00', NULL),
('1A55','Vans',1,'vans@gmail.com','https://www.vans.com','+54 9 11 2615983','https://i.pinimg.com/236x/dc/ad/30/dcad305ab83176767a094da4e63955ac.jpg',0,'23-21764112-3',1,'2023-08-18 15:45:00','2024-01-01 15:45:00'),
('1A56','La Orchilla',7,'orchilla@gmail.com','https://www.orchilla.com','+54 9 11 2125623','https://i.pinimg.com/236x/3f/52/e5/3f52e51111dd51ed1d534fbfb5fc24ca.jpg',1,'23-21854762-3',1,'2023-09-15 15:45:00', '2023-09-25 15:45:00'),
('1A57','CopArt',5,'copart@gmail.com','https://www.copart.com','+54 9 11 2345623','https://i.pinimg.com/236x/16/7a/80/167a80f3f6a82745205a1ae5120e52e2.jpg',1,'23-21845112-3',1,'2023-02-18 15:45:00','2023-03-18 15:45:00');

INSERT INTO Contactos (nombre,apellido,email,telefono,rol,proveedor,creado_en,actualizado_en)
VALUES 
('Francisco','Perez','franperez@gmail.com','+54 9 115477823','Gerente de ventas',1,'2023-02-28 15:45:00', NULL),
('Juan','Fernandez','juanfer@gmail.com','+54 9 115477653','Director de campo',2,'2023-02-28 15:45:00', '2023-04-28 15:45:00'),
('María', 'López', 'marialopez@gmail.com', '+54 9 115488765', 'Analista de compras', 3, '2023-03-15 12:30:00', NULL),
('Luis', 'González', 'luisgonzalez@gmail.com', '+54 9 115499876', 'Coordinador logístico', 4, '2023-03-15 12:30:00', '2023-05-20 09:15:00'),
('Ana', 'Martínez', 'anamartinez@gmail.com', '+54 9 115410987', 'Especialista en marketing', 5, '2023-04-02 09:00:00', NULL),
('Martín', 'Rodríguez', 'martinrodriguez@gmail.com', '+54 9 115411234', 'Supervisor de calidad', 6, '2023-04-02 09:00:00', '2023-06-10 14:20:00'),
('Laura', 'Gómez', 'lauragomez@gmail.com', '+54 9 115422345', 'Analista financiero', 7, '2023-05-10 18:45:00', NULL),
('Pedro', 'Díaz', 'pedrodiaz@gmail.com', '+54 9 115433456', 'Ingeniero de soporte técnico', 8, '2023-05-10 18:45:00', '2023-07-05 11:30:00'),
('Carla', 'Sánchez', 'carlasanchez@gmail.com', '+54 9 115444567', 'Coordinador de recursos humanos', 9, '2023-06-20 14:00:00', NULL),
('Roberto', 'Lima', 'robertolima@gmail.com', '+54 9 115455678', 'Analista de sistemas', 10, '2023-06-20 14:00:00', '2023-08-15 16:45:00'),
('Mateo', 'Lara', 'matelara@gmail.com', '+54 9 115345678', 'Developer Fullstack', 11, '2023-06-21 14:00:00', '2023-08-22 16:45:00'),
('Emiliano', 'Pinaro', 'emipinaro@gmail.com', '+54 9 115875678', 'Emprendedor', 12, '2023-06-10 14:00:00', '2023-08-20 16:45:00'),
('Roberto', 'Fernandez', 'robfer@gmail.com', '+54 9 110955678', 'Ayudante', 13, '2023-06-12 14:00:00', '2023-08-14 16:45:00');

INSERT INTO Direcciones (calle,num,localidad,codigo_postal,proveedor,creado_en,actualizado_en)
VALUES
('Cerrito',504,1,'1782',1,'2023-02-28 15:45:00', NULL),
('Bernardo Fernandez',344,2,'1532',2,'2023-02-12 15:45:00','2023-05-15 15:45:00'),
('Avenida Corrientes', 123, 3, '1424', 3, '2023-03-10 10:30:00', NULL),
('Rivadavia', 567, 4, '1650', 4, '2023-03-10 10:30:00', '2023-06-25 08:15:00'),
('San Martín', 789, 5, '1832', 5, '2023-04-05 14:00:00', NULL),
('Belgrano', 101, 6, '1765', 6, '2023-04-05 14:00:00', '2023-07-18 16:45:00'),
('Defensa', 234, 16, '1950', 7, '2023-05-22 17:45:00', NULL),
('Lavalle', 876, 13, '1602', 8, '2023-05-22 17:45:00', '2023-08-30 12:30:00'),
('Piedras', 543, 15, '1701', 9, '2023-06-15 09:30:00', NULL),
('Tucumán', 321, 14, '1880', 10, '2023-06-15 09:30:00', '2023-09-12 14:20:00');

INSERT INTO Productos (sku, proveedor, categoria, nombre, descripcion, imagen, activo, precio, creado_en, actualizado_en)
VALUES 
('71233457', 1, 11, 'Lavarropas', 'Lava en 1 segundo', 'https://i.pinimg.com/236x/5c/b4/68/5cb468b7f7c69a9846ec1f3a027b1745.jpg', 1, 456799.99, '2023-12-10 15:45:00', '2023-12-25 15:45:00'),
('81234567', 1, 1, 'Microondas', 'Calienta tus alimentos rápidamente', 'https://i.pinimg.com/236x/b5/49/86/b54986d5b7d3ecda56bb8c6d74d27d30.jpg', 1, 349999.99, '2023-12-11 10:30:00', '2023-12-26 10:30:00'),
('91234568', 2, 8, 'Smartphone Galaxy A54', 'Pantalla HD, cámara de alta resolución', 'https://i.pinimg.com/236x/23/de/25/23de25b3cdb2f365f0aa4901ff618e1a.jpg', 1, 899999.99, '2023-07-28 11:15:00', '2023-08-12 11:15:00'),
('101234569', 2, 8, 'Laptop GalaxyBook', 'Potente laptop para tus necesidades diarias', 'https://i.pinimg.com/236x/3d/36/a0/3d36a08117feacef00fd7c0be9572d82.jpg', 1, 1299999.99, '2023-07-28 12:30:00', '2023-08-12 12:30:00'),
('111234570', 3, 9, 'Queso Gouda', 'Queso gouda de alta calidad', 'https://i.pinimg.com/236x/8d/36/c3/8d36c366287f089cf7d92b2ab170f9d2.jpg', 1, 799.99, '2023-07-29 14:45:00', '2023-08-13 14:45:00'),
('121234571', 3, 9, 'Leche Entera', 'Leche fresca y nutritiva', 'https://i.pinimg.com/236x/ab/d6/f6/abd6f6e4ee9c0c2294306a11b3310941.jpg', 1, 299.49, '2023-07-29 16:00:00', '2023-08-13 16:00:00'),
('131234572', 4, 8, 'Procesador Core i7', 'Potente procesador para tu PC', 'https://i.pinimg.com/236x/dd/19/d2/dd19d2dd4bc915cddd851ea343530c11.jpg', 0, 499999.99, '2023-07-30 17:15:00', '2023-08-14 17:15:00'),
('141234573', 4, 8, 'Procesador Core i5', 'Gran procesador Calidad precio', 'https://i.pinimg.com/236x/ff/34/33/ff34339cc48564c324a6eeebbc0e6ec8.jpg', 0, 299999.99, '2023-07-30 18:30:00', '2023-08-14 18:30:00'),
('151234574', 5, 9, 'Salame Italiano', 'Delicioso salame con auténtico sabor italiano', 'https://i.pinimg.com/236x/dd/b8/d1/ddb8d1ec36878bfef4abea1fe73b5945.jpg', 1, 899.99, '2023-07-31 20:45:00', '2023-08-15 20:45:00'),
('161234575', 5, 9, 'Jamon Cocido', 'Jamon cocido de alta calidad', 'https://i.pinimg.com/236x/f4/d6/47/f4d647fe8e4947c05fd8e205b5ecb5c0.jpg', 1, 699.99, '2023-07-31 22:00:00', '2023-08-15 22:00:00'),
('171234576', 6, 3, 'Zapatillas Air Max', 'Zapatillas deportivas con estilo', 'https://i.pinimg.com/236x/52/fd/7f/52fd7f01745ffda6a65281f3ac3e406d.jpg', 1, 129999.99, '2023-08-01 23:15:00', '2023-08-16 23:15:00'),
('181234577', 6, 5, 'Bolso Deportivo', 'Bolso espacioso para tus pertenencias deportivas', 'https://i.pinimg.com/236x/7e/27/0b/7e270b0fc3f36ee8c3bcc9d81aec9165.jpg', 1, 49999.99, '2023-08-02 00:30:00', '2023-08-17 00:30:00'),
('191234578', 7, 12, 'Coca Cola Original', 'Refresco clásico y refrescante', 'https://i.pinimg.com/236x/ef/75/7a/ef757a0d9322a1259bf17838bfe84126.jpg', 1, 1999.99, '2023-08-02 01:45:00', '2023-08-17 01:45:00'),
('201234579', 7, 12, 'Agua Mineral', 'Agua mineral natural y saludable', 'https://i.pinimg.com/236x/75/5e/39/755e39a478af5f611b8214ffa9cb4f17.jpg', 1, 990.99, '2023-08-02 03:00:00', '2023-08-17 03:00:00'),
('211234580', 8, 3, 'Zapatillas Chuck Taylor', 'Zapatillas clásicas y versátiles', 'https://i.pinimg.com/236x/cd/0e/fb/cd0efbe259385263d30bc0e218477050.jpg', 1, 7999.99, '2023-08-03 04:15:00', '2023-08-18 04:15:00'),
('221234581', 8, 5, 'Gorra Converse', 'Gorra con estilo y comodidad', 'https://i.pinimg.com/236x/a8/51/d9/a851d9abb5a8910383733d26f906ec02.jpg', 1, 2999.99, '2023-08-03 05:30:00', '2023-08-18 05:30:00'),
('231234582', 9, 3, 'Zapatillas Ultraboost', 'Zapatillas para un rendimiento máximo', 'https://i.pinimg.com/236x/64/d8/a7/64d8a75ae06a7d2346f495d0cf0fa9cd.jpg', 1, 159999.99, '2023-08-03 06:45:00', '2023-08-18 06:45:00'),
('241234583', 9, 5, 'Mochila Adidas', 'Mochila resistente y espaciosa', 'https://i.pinimg.com/236x/f7/b8/e7/f7b8e7b9af3b6256542c2284fec29710.jpg', 1, 49999.99, '2023-08-03 08:00:00', '2023-08-18 08:00:00'),
('251234584', 10, 8, 'iPhone 13', 'Teléfono inteligente de última generación', 'https://i.pinimg.com/236x/8e/e6/c6/8ee6c665954cb903cd2c6a5f5b763c01.jpg', 1, 1099999.99, '2023-08-04 09:15:00', '2023-08-19 09:15:00'),
('261234585', 10, 8, 'MacBook Air', 'Laptop ligera y potente', 'https://i.pinimg.com/236x/2d/2f/9f/2d2f9fb285d27584c966f39dbd249ce7.jpg', 1, 1099999.99, '2023-08-04 09:15:00', '2023-08-19 09:15:00'),
('171234512', 6, 3, 'Zapatillas Jordan', 'Zapatillas de alta gama con estilo', 'https://i.pinimg.com/236x/7a/2a/ad/7a2aad3d2b74cd90690feb124a454d94.jpg', 1, 229999.99, '2023-08-01 23:15:00', '2023-08-16 23:15:00');

INSERT INTO Ordenes (num_orden, emision, entrega, info_recepcion, proveedor, activo, estado, usuario, creado_en, actualizado_en)
VALUES 
('23546-6', '2023-07-02 03:00:00', '2023-07-15 03:00:00', 'Debe entregarse en cajas de carton', 1, 1, 1, 1, '2023-06-02 03:00:00', '2023-06-17 03:00:00'),
('23547-6', '2023-07-03 04:00:00', '2023-07-16 04:00:00', 'Entregar en horario comercial', 2, 0, 2, 2, '2023-06-03 04:00:00', '2023-06-18 04:00:00'),
('23548-6', '2023-07-04 05:00:00', '2023-07-17 05:00:00', 'Entrega urgente', 3, 1, 3, 3, '2023-06-04 05:00:00', '2023-06-19 05:00:00'),
('23549-6', '2023-07-05 06:00:00', '2023-07-18 06:00:00', 'Favor manejar con cuidado', 4, 1, 4, 4, '2023-06-05 06:00:00', '2023-06-20 06:00:00'),
('23550-6', '2023-07-06 07:00:00', '2023-07-19 07:00:00', 'Entregar en la recepción', 5, 1, 5, 1, '2023-06-06 07:00:00', '2023-06-21 07:00:00'),
('23551-6', '2023-07-07 08:00:00', '2023-07-20 08:00:00', 'Manejar con cuidado los productos', 6, 1, 6, 2, '2023-06-07 08:00:00', '2023-06-22 08:00:00'),
('23552-6', '2023-07-08 09:00:00', '2023-07-21 09:00:00', 'Favor entregar en la oficina 301', 7, 1, 7, 3, '2023-06-08 09:00:00', '2023-06-23 09:00:00'),
('23553-6', '2023-07-09 10:00:00', '2023-07-22 10:00:00', 'Verificar el estado de los productos antes de entregar', 8, 1, 8, 4, '2023-06-09 10:00:00', '2023-06-24 10:00:00'),
('23554-6', '2023-07-10 11:00:00', '2023-07-23 11:00:00', 'Entrega programada', 9, 1, 1, 1, '2023-06-10 11:00:00', '2023-06-25 11:00:00'),
('23555-6', '2023-07-11 12:00:00', '2023-07-24 12:00:00', 'Entregar en la recepción del edificio', 10, 0, 2, 2, '2023-06-11 12:00:00', '2023-06-26 12:00:00');

INSERT INTO Detalles_Orden (producto,cant,subtotal,orden,creado_en,actualizado_en)
VALUES
(1,1,456799.99,1,'2023-06-11 12:00:00', '2023-06-26 12:00:00'),
(2,1,349999.99,1,'2023-06-11 12:00:00', '2023-06-26 12:00:00'),
(3,2,899999.99,2,'2023-06-11 12:00:00', '2023-06-26 12:00:00'),
(4,1,1299999.99,2,'2023-06-11 12:00:00', '2023-06-26 12:00:00'),
(5,3,799.99,3,'2023-06-11 12:00:00', '2023-06-26 12:00:00'),
(6,5,299.99,3,'2023-06-11 12:00:00', '2023-06-26 12:00:00'),
(7,1,499999.99,4,'2023-06-11 12:00:00', '2023-06-26 12:00:00'),
(8,1,299999.99,4,'2023-06-11 12:00:00', '2023-06-26 12:00:00'),
(9,10,899.99,5,'2023-06-11 12:00:00', '2023-06-26 12:00:00'),
(10,15,699.99,5,'2023-06-11 12:00:00', '2023-06-26 12:00:00'),
(11,2,129999.99,6,'2023-06-11 12:00:00', '2023-06-26 12:00:00'),
(12,2,49999.99,6,'2023-06-11 12:00:00', '2023-06-26 12:00:00'),
(13,10,1999.99,7,'2023-06-11 12:00:00', '2023-06-26 12:00:00'),
(14,17,990.99,7,'2023-06-11 12:00:00', '2023-06-26 12:00:00'),
(15,8,7999.99,8,'2023-06-11 12:00:00', '2023-06-26 12:00:00'),
(16,8,2999.99,8,'2023-06-11 12:00:00', '2023-06-26 12:00:00'),
(17,1,159999.99,9,'2023-06-11 12:00:00', '2023-06-26 12:00:00'),
(18,3,49999.99,9,'2023-06-11 12:00:00', '2023-06-26 12:00:00'),
(19,1,1099999.99,10,'2023-06-11 12:00:00', '2023-06-26 12:00:00'),
(20,1,1099999.99,10,'2023-06-11 12:00:00', '2023-06-26 12:00:00'),
(21,1,229999.99,6,'2023-06-11 12:00:00', '2023-06-26 12:00:00');