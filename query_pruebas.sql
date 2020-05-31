-- Crear la Base de Datos
create database DELILAH_RESTO;
USE DELILAH_RESTO;

-- Estructura de tabla para Productos
CREATE TABLE PRODUCTOS (
	ID_PRODUCTO INT PRIMARY KEY AUTO_INCREMENT,
    NOMBRE_PRODUCTO VARCHAR(50),
    PRECIO DECIMAL(13,2),
    FOTO_PRODUCTO BLOB
);
-- Estructura de tabla para Roles
CREATE TABLE ROLES (
	ID_ROL INT PRIMARY KEY AUTO_INCREMENT,
    DESCRIPCION VARCHAR(20)
);
-- Estructura de tabla para Estados 
CREATE TABLE ESTADOS (
	ID_ESTADOS INT PRIMARY KEY AUTO_INCREMENT,
    DESCRIPCION VARCHAR(20)
);
-- Estructura de tabla para Usuarios 
CREATE TABLE USUARIOS (
	ID_USUARIO INT PRIMARY KEY AUTO_INCREMENT,
    USUARIO VARCHAR(50),
    CONTRASENA_USUARIO VARCHAR(15),
    NOMBRES VARCHAR(100),
    APELLIDOS VARCHAR(100),
    CORREO VARCHAR(50),
    DIRECCION VARCHAR(100),
    CELULAR VARCHAR(30),
    ID_ROL INT,
    FOREIGN KEY(ID_ROL) REFERENCES ROLES(ID_ROL)
);
-- Estructura de tabla para Ordenes 
CREATE TABLE ORDENES (
	ID_ORDEN INT PRIMARY KEY AUTO_INCREMENT,
    ID_USUARIO INT,
    ID_ESTADOS INT,
    FECHA DATE,
    DESCRIPCION VARCHAR(150),
    PRECIO_TOTAL DECIMAL(13,2),
    FOREIGN KEY(ID_USUARIO) REFERENCES USUARIOS(ID_USUARIO),
    FOREIGN KEY(ID_ESTADOS) REFERENCES ESTADOS(ID_ESTADOS)
);
-- Estructura de tabla para Producto_Ordenes 
CREATE TABLE PRODUCTO_ORDENES (
	ID_PRODUCTO_ORDEN INT PRIMARY KEY AUTO_INCREMENT,
    ID_PRODUCTO INT,
    ID_ORDEN INT,
    CANTIDAD_PRODUCTO INT,
    FOREIGN KEY(ID_PRODUCTO) REFERENCES PRODUCTOS(ID_PRODUCTO),
    FOREIGN KEY(ID_ORDEN) REFERENCES ORDENES(ID_ORDEN)
);

-- Insertar Productos
INSERT INTO `PRODUCTOS` VALUES (1,'Key Lime Pie',250,'[https://www.themealdb.com/images/media/meals/qpqtuu1511386216.jpg]'),(2,'Recheado Masala Fish',480,'[https://www.themealdb.com/images/media/meals/uwxusv1487344500.jpg]'),(3,'Kentucky Fried Chicken',320,'[https://www.themealdb.com/images/media/meals/xqusqy1487348868.jpg]'),(4,'Duck Confit',390,'[https://www.themealdb.com/images/media/meals/wvpvsu1511786158.jpg]'),(5,'Apple Tarts',230,'[https://www.themealdb.com/images/media/meals/qtqwwu1511792650.jpg]'),(6,'Salmon Prawn Risotto',500,'[https://www.themealdb.com/images/media/meals/xxrxux1503070723.jpg]'),(7,'Three-cheese souffles',270,'[https://www.themealdb.com/images/media/meals/sxwquu1511793428.jpg]'),(8,'Spaghetti Bolognese',290,'[https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg]'),(9,'BBQ Pork Burger',360,'[https://www.themealdb.com/images/media/meals/atd5sh1583188467.jpg]'),(10,'Tandoori chicken',430,'[https://www.themealdb.com/images/media/meals/qptpvt1487339892.jpg]');
-- Listar Productos
SELECT * FROM PRODUCTOS;


/*Queries adicionales INSERCION DE REGISTRO, SELECCION, ALTERACION DE TABLA, ELIMINACION DE REGISTRO*/
/*INSERT INTO ROLES (
ID_ROL,
DESCRIPCION
) VALUES (
1,
'Administrador'
);
INSERT INTO USUARIOS (
	ID_USUARIO,
    USUARIO,
    CONTRASENA_USUARIO,
    NOMBRES,
    APELLIDOS,
    CORREO,
    DIRECCION,
    CELULAR,
    ID_ROL
) VALUES (
1,
'JACQUI',
'1234',
'Jacqueline',
'Mendez Zualuaga',
'jacqueline.mndez@gmail.com',
'Calle falsa 123',
'3192065788',
1
);
ALTER TABLE USUARIOS AUTO_INCREMENT = 1;
SELECT * FROM USUARIOS WHERE USUARIO='JACQUI' AND CONTRASENA_USUARIO='1234';
DROP TABLE USUARIOS;
DELETE FROM USUARIOS WHERE ID_USUARIO = 1;
SELECT * FROM USUARIOS;
*/
