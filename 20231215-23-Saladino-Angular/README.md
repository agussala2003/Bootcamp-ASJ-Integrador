# Proyecto Integrador Final

Desarrollo de un *Sistema de Gestión Compras* para manejar información de Proveedores, Productos y Órdenes de compra.

## Ejecutar localmente

Pasos necesarios para correr el proyecto localmente

- Crear una base de datos llamada

```sql
  CREATE DATABASE miProyecto;
```

- Crear la(s) siguiente(s) tabla(s)

```sql
CREATE TABLE countries (
  id INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
  country_name VARCHAR(255)
);

CREATE TABLE provinces (
  id INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
  province_name VARCHAR(255),
  country_id INT,
  FOREIGN KEY (country_id) REFERENCES countries(id)
);

CREATE TABLE locations (
  id INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
  location_name VARCHAR(255),
  province_id INT,
  FOREIGN KEY (province_id) REFERENCES provinces(id)
);

CREATE TABLE tax_conditions (
  id INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
  tax_condition VARCHAR(255)
);

CREATE TABLE industries (
  id INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
  industry_name VARCHAR(255),
  active BIT,
  created_at DATETIME NULL,
  updated_at DATETIME NULL
);

CREATE TABLE categories (
  id INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
  category_name VARCHAR(255),
  active BIT,
  created_at DATETIME NULL,
  updated_at DATETIME NULL
);

CREATE TABLE status (
  id INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
  status_name VARCHAR(255)
);

CREATE TABLE roles (
  id INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
  role_name VARCHAR(255),
  created_at DATETIME NULL,
  updated_at DATETIME NULL
);

CREATE TABLE users (
  id INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  created_at DATETIME NULL,
  updated_at DATETIME NULL,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE providers (
  id INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
  supplier_code VARCHAR(255),
  business_name VARCHAR(255),
  email VARCHAR(255),
  website VARCHAR(255),
  phone_number VARCHAR(255),
  image TEXT,
  active BIT,
  cuit VARCHAR(255),
  created_at DATETIME NULL,
  updated_at DATETIME NULL,
  industry_id INT,
  iva_condition_id INT,
  FOREIGN KEY (industry_id) REFERENCES industries(id),
  FOREIGN KEY (iva_condition_id) REFERENCES tax_conditions(id)
);

CREATE TABLE contacts (
  id INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  phone_number VARCHAR(255),
  role VARCHAR(255),
  created_at DATETIME NULL,
  updated_at DATETIME NULL,
  supplier_id INT,
  FOREIGN KEY (supplier_id) REFERENCES providers(id)
);

CREATE TABLE addresses (
  id INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
  street_name VARCHAR(255),
  street_number INT,
  postal_code VARCHAR(255),
  created_at DATETIME NULL,
  updated_at DATETIME NULL,
  supplier_id INT,
  location_id INT,
  FOREIGN KEY (location_id) REFERENCES locations(id),
  FOREIGN KEY (supplier_id) REFERENCES providers(id)
);

CREATE TABLE products (
  id INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
  sku VARCHAR(255),
  product_name VARCHAR(255),
  description TEXT,
  image_url TEXT,
  active BIT,
  price DECIMAL(10,2),
  created_at DATETIME NULL,
  updated_at DATETIME NULL,
  supplier_id INT,
  category_id INT,
  FOREIGN KEY (supplier_id) REFERENCES providers(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE orders (
  id INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
  order_number VARCHAR(255),
  issuance_date DATETIME NOT NULL,
  delivery_date DATETIME NOT NULL,
  active BIT,
  reception_info TEXT,
  created_at DATETIME NULL,
  updated_at DATETIME NULL,
  user_id INT,
  supplier_id INT,
  status_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (supplier_id) REFERENCES providers(id),
  FOREIGN KEY (status_id) REFERENCES status(id)
);

CREATE TABLE order_details (
  id INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
  quantity INT,
  subtotal DECIMAL(10,2),
  created_at DATETIME NULL,
  updated_at DATETIME NULL,
  order_id INT,
  product_id INT,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

- Insertar **Paises**

```sql
INSERT INTO countries (country_name) VALUES 
    ('Argentina'),
    ('Brasil'),
    ('Chile'),
    ('Colombia'),
    ('Paraguay'),
    ('Uruguay'),
    ('Venezuela');
```

- Insertar  **Provincias**

```sql
INSERT INTO provinces (province_name, country_id) VALUES
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
('Capitan Prat', 3)
,('Cardenal Caro', 3),
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
```

- Insertar **Localidades**
```sql
INSERT INTO locations (location_name, province_id) VALUES 
('CABA', 1),
('CABA', 1),
('Jurere Internacional', 25),
('Coquimbo', 52),
('CABA', 1),
('CABA', 1),
('La isla', 166),
('CABA', 1),
('Jurere Internacional', 42),
('Cordoba', 6),
('Colon', 8),
('Fortaleza', 48),
('El frio', 51),
('Darwin', 167),
('CABA', 1),
('CABA', 1),
('CABA', 1),
('Diego', 157),
('James', 107),
('Alexis', 52),
('CABA', 1),
('Pele', 40),
('Jason', 176);
```

- Insertar **Condiciones Iva**
```sql
INSERT INTO tax_conditions (tax_condition) VALUES
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
```

- Insertar **Rubros**
```sql
INSERT INTO industries (industry_name, active, created_at, updated_at) VALUES
('Tecnologia',1,'2023-01-01 09:30:00', NULL),
('Ropa',1, '2023-02-05 15:45:00', '2023-02-05 16:10:00'),
('Deportes',1, '2023-03-10 11:20:00', NULL),
('Electrodomesticos',1, '2023-04-15 17:30:00', '2023-04-15 17:45:00'),
('Construccion',1, '2023-05-20 14:00:00', '2023-05-20 14:30:00'),
('Sin rubro',1, '2023-06-25 10:45:00', '2023-06-25 11:00:00'),
('Aeronautica',1, '2023-07-30 16:20:00', NULL),
('Relojes y joyas',1, '2023-08-05 12:10:00', '2023-08-05 12:30:00'),
('Mecanica',1, '2023-09-10 18:00:00', '2023-09-10 18:15:00'),
('Inmuebles',1, '2023-10-15 13:45:00', '2023-10-15 14:00:00'),
('Libreria y biblioteca',1, '2023-02-01 09:30:00', NULL);
```

- Insertar **Categorias**
```sql
INSERT INTO categories (category_name, active, created_at, updated_at) VALUES 
('Electrodomesticos de Cocina',1, '2023-01-01 09:30:00', NULL),
('Celulares Samsung',1, '2023-02-05 15:45:00', '2023-02-05 16:10:00'),
('Auriculares',1, '2023-03-10 11:20:00', NULL),
('Zapatillas',1, '2023-04-15 17:30:00', '2023-04-15 17:45:00'),
('Remeras',1, '2023-05-20 14:00:00', '2023-05-20 14:30:00'),
('Perfumes',1, '2023-06-25 10:45:00', '2023-06-25 11:00:00'),
('Sweater',1, '2023-07-30 16:20:00', NULL),
('Reloj',1, '2023-08-05 12:10:00', '2023-08-05 12:30:00'),
('Musculosas de verano',1, '2023-09-10 18:00:00', '2023-09-10 18:15:00'),
('Gorras',1, '2023-10-15 13:45:00', '2023-10-15 14:00:00'),
('Ropa de invierno',1, '2023-09-10 18:00:00', '2023-09-10 18:15:00'),
('Mochilas',1, '2023-09-10 18:00:00', '2023-09-10 18:15:00'),
('Camperas',1, '2023-09-10 18:00:00', '2023-09-10 18:15:00'),
('Carteras',1, '2023-09-10 18:00:00', '2023-09-10 18:15:00');
```

- Insertar **Estados**
```sql
INSERT INTO status (status_name) VALUES
('Aprobado'),
('Cancelado'),
('Cerrado'),
('En suspenso'),
('En progreso'),
('Revision pendiente'),
('Revisado'),
('En espera de aprobacion');
```

- Insertar **Roles**
```sql
INSERT INTO roles (role_name, created_at, updated_at) VALUES
('Administrador', '2023-02-05 15:45:00', NULL),
('Cliente', '2023-02-05 15:45:00', NULL),
('Proveedor', '2023-02-05 15:45:00', '2023-02-05 16:10:00'),
('Usuario', '2023-02-05 15:45:00', '2023-02-05 16:10:00');
```

- Insertar **Usuarios**
```sql
INSERT INTO users (first_name, last_name, email, password, role_id, created_at, updated_at) VALUES
('Agustin', 'Saladino', 'agussalalala@gmail.com', 'contrasena', 1, '2023-02-05 15:45:00', NULL),
('Juan', 'Perez', 'juanperez@gmail.com', 'contrasena', 1, '2023-11-05 15:45:00', '2023-03-05 15:45:00'),
('Fernando', 'Martinez', 'fermart@gmail.com', 'contrasena', 2, '2023-02-05 15:45:00', '2023-10-05 15:45:00'),
('Leandro', 'Sosa','leasosa@gmail.com', 'contrasena', 3, '2023-02-05 15:45:00', '2024-01-01 15:45:00'),
('Gustavo', 'Lamberti', 'guslamber@gmail.com', 'contrasena', 4, '2023-10-05 15:45:00', NULL);
```

- Insertar **Proveedores**
```sql
INSERT INTO providers (supplier_code, business_name, industry_id, email, website, phone_number, image, active, cuit, iva_condition_id, created_at, updated_at) VALUES
('1A410', 'Fravega', 4, 'fravega@yahoo.com', 'https://www.fravega.com.ar', '+54-11-12927878', 'https://www.fravega.com/static/logo-fravega@3x.png', 1, '12-44358242-3', 1, '2023-07-26 15:45:00', NULL),
('1A46', 'Lacoste', 2, 'lacoste@gmail.com', 'https://www.lacoste.com', '+54-11-13902192','https://i.pinimg.com/236x/3e/61/85/3e618566c193683b5db603932abae87f.jpg' ,1,'12-53422323-1',1,'2023-07-26 15:45:00','2023-09-11 15:45:00'),
('1A47', 'Vans', 2, 'vans@gmail.com', 'https://www.vans.com', '+54-11-2392827','https://i.pinimg.com/236x/a9/fa/37/a9fa3789bd9283a662ddee811f62b2c3.jpg' ,1,'12-39491923-2',1,'2023-07-27 15:45:00','2023-09-04 15:45:00'),
('1A47AYRT', 'Zara', 2, 'zara@gmail.com', 'https://www.zara.com', '+54-11-2398421','https://i.pinimg.com/236x/6a/4b/60/6a4b60afd7c1482dac8f864e4e37cd8c.jpg' ,1,'82-28392922-1',1,'2023-07-27 15:45:00','2023-11-04 15:45:00'),
('HAS9128A', 'Converse', 2, 'converse@gmail.com', 'https://www.converse.com', '"+54-11-23918832','https://i.pinimg.com/236x/ff/4c/5a/ff4c5a19b622789f4bc2c9a352a1f1fc.jpg' ,1,'12-21229322-2',1,'2023-07-27 15:45:00',NULL),
('1JKSJF01', 'Nike', 2, 'nike@gmail.com', 'https://www.nike.com', '+54-11-2398421', 'https://i.pinimg.com/236x/e7/65/04/e7650458fe434cd647eafb289a569fe2.jpg', 1, '23-21544575-2', 1, '2023-07-26 15:45:00', '2023-07-26 15:45:00'),
('1ASJ230J', 'Apple', 1, 'apple@icloud.com', 'https://www.apple.com', '+54-11-39138172', 'https://i.pinimg.com/236x/54/0d/da/540ddae1e22dadbd2e574ed511eba6aa.jpg', 1, '12-53126436-1', 1, '2023-07-26 15:45:00', '2023-07-26 15:45:00'),
('23JASN02', 'Levis', 2, 'levis@gmail.com', 'https://www.levis.com', '+54-11-91827362', 'https://i.pinimg.com/236x/85/55/ba/8555baba1580d63cb3a52a1033ea4ef9.jpg', 1, '13-58372632-1', 1,'2023-07-26 15:45:00', NULL),
('1BA92', 'Rolex', 8, 'rolex@gmail.com', 'https://www.rolex.com', '+53-111-2398177', 'https://i.pinimg.com/236x/2d/82/4b/2d824bb5224584d605974f0c18005170.jpg', 1, '92-29838273-1', 1, '2023-07-26 15:45:00', NULL),
('123ASDFV', 'Givenchy', 2, 'givenchy@gmail.com', 'https://www.givenchy.com', '+54-11-23928419', 'https://i.pinimg.com/736x/f2/c3/6d/f2c36d14b653418d2eafb66130e70462.jpg', 1, '41-28329182-4', 1, '2023-07-26 15:45:00','2023-07-26 15:45:00'),
('KAJ012L', 'Tommy Hilfiger', 2, 'tommyg@gmail.com', 'https://www.tommyhilfiger.com', '+54-11-99284782', 'https://i.pinimg.com/736x/49/e3/69/49e3693454bf774606235902d852182a.jpg', 1, '51-85294812-1', 1, '2023-07-26 15:45:00', NULL),
('AS90KAA', 'Prada', 2, 'prada@icloud.com', 'https://www.prada.com', '+54-11-32871827', 'https://i.pinimg.com/736x/3a/b4/2b/3ab42b163bf2459918bc37c41355812b.jpg', 1, '42-92839182-1', 1, '2023-07-26 15:45:00', NULL),
('AIRE9123', 'Rip Curl', 2, 'ripcurl@gmail.com', 'https://www.ripcurl.com', '+54-11-92826581', 'https://i.pinimg.com/736x/86/d4/0a/86d40aaafe0dc474128952e6264edcda.jpg', 0, '62-58711923-1', 1, '2023-07-26 15:45:00', '2023-07-26 15:45:00'),
('AFJ9213A', 'Dolce Gabbana', 2, 'dolcegabanna@gmail.com', 'https://www.dolcegabanna.com', '+54-11-48189182', 'https://i.pinimg.com/736x/b7/be/fa/b7befa6ec53bf0b367077b52470bd7ec.jpg', 1, '87-56817641-2', 1, '2023-07-26 15:45:00', '2023-07-26 15:45:00'),
('23ASD092', 'The North Face', 7, 'thenorthface@gmail.com', 'https://www.northface.com', '+51-11-94121029', 'https://i.pinimg.com/736x/03/36/cc/0336ccf967d5f9cc121db02c5845fbc4.jpg', 1, '61-58174781-1', 1, '2023-07-26 15:45:00', NULL);

```

- Insertar **Contactos**
```sql
INSERT INTO contacts (first_name, last_name, email, phone_number, role, supplier_id, created_at, updated_at) VALUES
('Fernando', 'Lopez Blanco', 'ferlopez@icloud.com', '+54-11-23452687', 'Gerente', 1, '2023-07-26 15:45:00', '2023-07-26 15:45:00'),
('Ricardo', 'Quaresma', 'ricardoquaresma@gmail.com', '+54-11-23452687', 'CEO', 2, '2023-07-26 15:45:00', '2023-07-26 15:45:00'),
('Juan', 'Perez', 'juanperez@gmail.com', '+54-11-29322322', 'CTO', 3, '2023-07-26 15:45:00', NULL),
('Santiago', 'Espina', 'santiespina@icloud.com', '+54-11-28419210', 'Administrativo', 4, '2023-07-26 15:45:00', '2023-07-26 15:45:00'),
('Ricardo', 'Palinha', 'riquipalinha@gmail.com', '+54-129-2932212', 'MAC', 5, '2023-07-26 15:45:00', '2023-07-26 15:45:00'),
('Flavio', 'Vargas', 'falvaragas@icloud.com', '+54-11-22391122', 'Gerente de IT', 6, '2023-07-26 15:45:00', '2023-07-26 15:45:00'),
('Hugo', 'Benitez', 'hugobenitez@gmail.com', '+54-11-82736291', 'Gerente', 7, '2023-07-26 15:45:00', '2023-07-26 15:45:00'),
('Miguel', 'Fernandez', 'miguefernandez@gmail.com', '+54-11-23452687', 'Familiar', 8, '2023-07-26 15:45:00', NULL),
('Lionel', 'Messi', 'liomessi@icloud.com', '+51-11-28739293', 'Manager', 9, '2023-07-26 15:45:00', NULL),
('Florencia', 'Torres', 'flortorres@icloud.com', '+54-11-29315812', 'CTO', 10, '2023-07-26 15:45:00', NULL),
('Nicolas', 'Miguel', 'nicomiguel@gmail.com', '+54-11-95192031', 'Administracion', 11, '2023-07-26 15:45:00', NULL),
('Ignacio', 'Mendez', 'ignimendez@gmail.com', '+53-123-8518238', 'Ayudante', 12, '2023-07-26 15:45:00', NULL),
('Emiliano', 'Rodriguez', 'emirodriguez@gmail.com', '+54-11-89228591', 'CEO', 13, '2023-07-26 15:45:00', NULL),
('Tite', 'Fernandez', 'titefer@icloud.com', '+51-981-91920491', 'Tecnico', 14, '2023-07-26 15:45:00', '2023-07-26 15:45:00'),
('Monica', 'Gutierrez', 'monigutierrez@gmail.com', '+53-11-85129561', 'Secretaria', 15, '2023-07-26 15:45:00', NULL);
```

- Insertar **Direcciones**
```sql
INSERT INTO addresses (street_name, street_number, location_id, postal_code, supplier_id, created_at, updated_at) VALUES
('Cerrito', 504, 1, '1782', 1, '2023-02-28 15:45:00', NULL),
('Bernardo Fernandez', 344, 2, '1532', 2, '2023-02-12 15:45:00', '2023-05-15 15:45:00'),
('Avenida Corrientes', 123, 3, '1424', 3, '2023-03-10 10:30:00', NULL),
('Rivadavia', 567, 4, '1650', 4, '2023-03-10 10:30:00', '2023-06-25 08:15:00'),
('San Martín', 789, 5, '1832', 5, '2023-04-05 14:00:00', NULL),
('Belgrano', 101, 6, '1765', 6, '2023-04-05 14:00:00', '2023-07-18 16:45:00'),
('Defensa', 234, 7, '1950', 7, '2023-05-22 17:45:00', NULL),
('Lavalle', 876, 8, '1602', 8, '2023-05-22 17:45:00', '2023-08-30 12:30:00'),
('Piedras', 543, 9, '1701', 9, '2023-06-15 09:30:00', NULL),
('Tucumán', 321, 10, '1880', 10, '2023-06-15 09:30:00', '2023-09-12 14:20:00'),
('Camino', 221, 11, '1760', 11, '2023-06-15 09:30:00', '2023-09-12 14:20:00'),
('Juan Manuel de Rosas', 321, 12, '1928', 12, '2023-06-15 09:30:00', '2023-09-12 14:20:00'),
('Caminito', 321, 13, '1780', 13, '2023-06-15 09:30:00', '2023-09-12 14:20:00'),
('Pou', 659, 14, '8211', 14, '2024-01-31 14:13:31', '2024-02-02 14:18:54'),
('Neymar Jr', 289, 15, '2932', 15, '2024-01-31 15:37:15', '2024-02-05 17:34:15');
```

- Insertar **Productos**
```sql
INSERT INTO products (sku, supplier_id, category_id, product_name, description, image_url, active, price, created_at, updated_at) VALUES 
('59810231', 1, 1, 'Horno electrico', 'Un gran horno para salir de los apuros', 'https://i.pinimg.com/236x/46/79/15/4679153e6438a3fe70942cb2f40194ed.jpg', 1, 199999.0, '2023-07-26 15:45:00', '2023-07-26 15:45:00'),
('24642121', 1, 2, 'Samsung Galaxy A53 5G', 'Uno de los mejores calidad precio', 'https://i.pinimg.com/564x/4f/36/25/4f3625c2351226716851bf7f63d06fa8.jpg', 1, 399999.0, '2023-07-26 15:45:00', '2023-07-26 15:45:00'),
('12349182', 3, 4, 'Vans Old Skool', 'Las zapatillas de Skater\n', 'https://i.pinimg.com/236x/58/68/dd/5868dd6d549714b426835b9ee21149c6.jpg', 1, 99999.0, '2023-07-26 15:45:00', '2023-05-15 15:45:00'),
('12462343', 3, 4, 'Alpargatas Vans', 'Estas son re comodas', 'https://i.pinimg.com/474x/e8/4b/69/e84b6988c3013863d0abfffbdd0f9d44.jpg', 1, 79999.0, '2023-05-15 15:45:00', '2023-05-15 15:45:00'),
('72345634', 2, 5, 'Chomba Blanca', 'Te va a quedar pintada', 'https://i.pinimg.com/236x/ae/d7/08/aed708802eef315186a9e7a251650ae2.jpg', 1, 59999.0, '2023-05-15 15:45:00', '2023-05-15 15:45:00'),
('83453546', 2, 6, 'Perfume Hombre Suave', 'El mejor perfume de lacoste', 'https://i.pinimg.com/236x/da/4e/d6/da4ed625f06cb43efabe89d488d9255f.jpg', 1, 89999.0, '2023-05-15 15:45:00', NULL),
('65434234', 4, 5, 'Remera mujer', 'Remera clasica para el dia', 'https://i.pinimg.com/236x/43/68/fd/4368fd68ea8e8eb47d4de79a0716845f.jpg', 1, 25999.0, '2023-05-15 15:45:00', '2023-05-15 15:45:00'),
('53523452', 4, 7, 'Sweater negro', 'Super abrigado para invierno', 'https://i.pinimg.com/236x/f4/a3/28/f4a3285210cc4cefdb2913a8e13b7734.jpg', 1, 49999.0, '2023-05-15 15:45:00', '2023-05-15 15:45:00'),
('45243423', 4, 4, 'Zapatillas Blancas', 'Zapatillas blancas clasicas', 'https://i.pinimg.com/564x/7b/15/65/7b1565a0d4be3fb99c39ad15ac8ff6ce.jpg', 1, 49999.0, '2023-05-15 15:45:00', '2023-05-15 15:45:00');

```

- Insertar **Ordenes**
```sql
INSERT INTO orders (order_number, issuance_date, delivery_date, reception_info, supplier_id, active, status_id, user_id, created_at, updated_at) VALUES
('9', '2023-05-15 15:45:00', '2023-05-16 15:45:00', 'Es un regalo de cumpleaños para mi hermanito que le gusta cocinar, falta que se apruebe la tarjeta\n', 1, 1, 1, 1, '2023-05-15 15:45:00', '2023-05-15 15:45:00'),
('2', '2023-05-15 15:45:00', '2023-05-16 15:45:00', 'Esperando a la tarjeta', 2, 1, 3, 1, '2023-05-15 15:45:00', '2023-05-15 15:45:00'),
('3', '2023-05-15 15:45:00', '2023-05-16 15:45:00', 'Parece que hubo problemas con esta', 3, 1, 3, 1, '2023-05-15 15:45:00', '2023-05-15 15:45:00'),
('4', '2023-05-15 15:45:00', '2023-05-16 15:45:00', 'Lo vi bastante barato Si', 4, 1, 1, 1, '2023-05-15 15:45:00', '2023-05-15 15:45:00');
```

- Insertar **Detalles de orden**
```sql
INSERT INTO order_details (product_id, quantity, subtotal, order_id, created_at, updated_at) VALUES 
(1, 1, 199999.99, 1, '2023-06-11 12:00:00', '2023-06-26 12:00:00'),
(2, 1, 399999.99, 1, '2023-06-11 12:00:00', '2023-06-26 12:00:00'),
(3, 2, 199999.98, 2, '2023-06-11 12:00:00', '2023-06-26 12:00:00'),
(4, 2, 159998.98, 2, '2023-06-11 12:00:00', '2023-06-26 12:00:00'),
(5, 3, 179997.97, 3, '2023-06-11 12:00:00', '2023-06-26 12:00:00'),
(6, 5, 269997.97, 3, '2023-06-11 12:00:00', '2023-06-26 12:00:00'),
(7, 1, 103996.96, 4, '2023-06-11 12:00:00', '2023-06-26 12:00:00'),
(8, 1, 199996.96, 4, '2023-06-11 12:00:00', '2023-06-26 12:00:00'),
(9, 10, 199996.96, 4, '2023-06-11 12:00:00', '2023-06-26 12:00:00'); 
```

- Ejecutar el servidor de Angular (*puerto 4300*)

```bash
  ng start -o
```

- Ejecutar el servidor de Java (*puerto 8080*)

- Iniciar sesion con alguno de los usuarios creados previamente o registrar un usuario nuevo

- Insertar algunas **Categorías** desde el FRONT

- Insertar algunas **Rubros** desde el FRONT

- Insertar algunas **Proveedores** desde el FRONT

- Insertar algunas **Productos** desde el FRONT

- Insertar algunas **Ordenes de Compra** desde el FRONT

## API Reference

### Proveedores

#### Obtener todos los proveedores

```http
  GET /suppliers
```

#### Obtener un proveedor

```http
  GET /suppliers/${id}
```

| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Integer` | **Obligatorio**. ID del Proveedor a buscar |

#### Obtener proveedores activos

```http
  GET /suppliers/active
```

#### Obtener proveedores inactivos

```http
  GET /suppliers/deleted
```

#### Obtener proveedores ordenados por nombre de empresa de forma ascendente

```http
  GET /suppliers/businessNameAsc
```

#### Obtener proveedores ordenados por nombre de empresa de forma descendente

```http
  GET /suppliers/businessNameDesc
```

#### Crear un proveedor

```http
  POST /suppliers
```

#### Actualizar un proveedor

```http
  PUT /suppliers/${id}
```

| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Integer` | **Obligatorio**. ID del Proveedor a actualizar |

#### Eliminar un proveedor

```http
  DELETE /suppliers/${id}
```

| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Integer` | **Obligatorio**. ID del Proveedor a eliminar |

#### Restaurar un proveedor eliminado

```http
  PUT /suppliers/${id}/undelete
```

| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Integer` | **Obligatorio**. ID del Proveedor a restaurar |

### Productos

#### Obtener todos los productos

```http
  GET /products
```

#### Obtener un producto

```http
  GET /products/${id}
```

| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Integer` | **Obligatorio**. ID del Producto a buscar |


#### Obtener productos activos

```http
  GET /products/active
```

#### Obtener productos inactivos

```http
  GET /products/deleted
```

#### Obtener productos ordenados por precio de forma ascendente

```http
  GET /products/priceAsc
```

#### Obtener productos ordenados por precio de forma descendente

```http
  GET /products/priceDesc
```

#### Obtener productos por ID de proveedor

```http
  GET /products/supplier/${id}
```

| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Integer` | **Obligatorio**. ID del Proveedor a buscar |

#### Obtener producto por ID de categoria

```http
  GET /products/category/${id}
```

| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Integer` | **Obligatorio**. ID de la Categoria a buscar |

#### Crear un producto

```http
  POST /products
```

#### Actualizar un producto

```http
  PUT /products/${id}
```

| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Integer` | **Obligatorio**. ID del Producto a actualizar |

#### Eliminar un producto

```http
  DELETE /products/${id}
```

| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Integer` | **Obligatorio**. ID del Producto a eliminar |

#### Restaurar un producto eliminado

```http
  PUT /products/${id}/undelete
```

| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Integer` | **Obligatorio**. ID del Producto a restaurar |

### Ordenes

#### Obtener todas las ordenes

```http
  GET /orders
```

#### Obtener una orden

```http
  GET /orders/${id}
```

| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Integer` | **Obligatorio**. ID de la Orden a buscar |

#### Obtener ordenes activas

```http
  GET /orders/active
```

#### Obtener ordenes inactivas

```http
  GET /orders/deleted
```

#### Obtener los 3 proveedores principales

```http
  GET /orders/top-suppliers
```

#### Obtener órdenes por ID de estado

```http
  GET /orders/status/${id}
```

| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Integer` | **Obligatorio**. ID del Estado a buscar |

#### Crear una orden

```http
  POST /orders
```

#### Actualizar una orden

```http
  PUT /orders/${id}
```

| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Integer` | **Obligatorio**. ID de la Orden a actualizar |

#### Eliminar una orden

```http
  DELETE /orders/${id}
```

| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Integer` | **Obligatorio**. ID de la Orden a eliminar |

#### Restaurar una orden eliminada

```http
  PUT /orders/${id}/undelete
```

| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Integer` | **Obligatorio**. ID de la Orden a restaurar |

### Detalles de Orden

#### Obtener todos los detalles de orden

```http
  GET /order-details
```

#### Obtener un detalle de orden

```http
  GET /order-details/${id}
```

| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Integer` | **Obligatorio**. ID del Detalle de Orden a buscar |

#### Obtener detalles de orden por ID de orden

```http
  GET /order-details/order/${id}
```

| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Integer` | **Obligatorio**. ID de la Orden a buscar |

#### Obtener top 3 productos solicitados

```http
  GET /order-details/top-products
```

#### Crear un detalle de orden

```http
  POST /order-details
```

#### Eliminar un detalle de orden

```http
  DELETE /order-details/${id}
```

| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Integer` | **Obligatorio**. ID del Detalle de Orden a eliminar |



## Desarrollado por

Este proyecto fue desarrollado por: **Agustin Saladino**