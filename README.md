# Delilah-Resto-JMZ
Proyecto Final de Acamica Desarrollo web full stack

**Una API para administrar tu propio Restaurante**

El proyecto consiste en una API Rest, que permite al usuario administrar una lista de usuarios, productos y pedidos de un restaurante.
La API permite la conexión con una base de datos MySQL para almacenar y administrar los datos de Resto.

Funcionalidades:

- Registro de usuarios e inicio de sesión.
- Validación de roles (administrador o no)
- Funciones CRUD de productos
- Funciones CRUD de pedidos

## Especificaciones del OPEN API 

- [Open API Docs](/Documentacion.yml)

## Para empezar

### Clonar el repositorio:

```
$ git clone https://github.com/JacquelineMZ/Delilah-Resto-JMZ.git
```
o  descargar desde Github

## Activar servidor

- Abrir la terminal desde esa carpeta (ctrl + click derecho -> Abrir terminal desde aqui)
- Ejecutar npm init
- Enter a todo
- Ejecutar npm i express
- Ejecutar npm i mysql2
- Ejecutar npm i sequelize
- Ejecutar npx nodemon endpoints.js
- Verificar que quede ¨Server corriendo¨

## Crear Base de datos
1. Inicialice el servidor MySQL.
2. Crear la base de datos llamada ** DELILAH_RESTO ** desde la línea de comandos o la utilidad de escritorio.
3. Crear el esquema y las tablas e inserte los datos manualmente, utilizando los queries existentes en `query_pruebas.sql`.

Esto creará el esquema de la base de datos, las tablas


En caso de que hayan problemas verificar
1. El host de la base de datos y el puerto al que debe conectarse la API ( puerto 3306 )
2. Nombre de la base de datos.
3. Usuario y contraseña de la base de datos para conectarse en caso de que tenga (user:root pw:123456)

## Ejecuta la API
*En caso de necesitarse se  tiene el archivo	"Bodies para las peticiones" para tener el formato de hacer peticiones
