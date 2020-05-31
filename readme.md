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

### Preparacion

> Para ejecutar este proyecto en primer lugar es necesario que tengas node js instalado en tu computador.

Primero ejecuta *node -v* en la consola de comandos, si no aparece un numero con la versión de node parecido a *v10.15.3* , por favor dirigete a esta [pagina][1] https://nodejs.org/es/download/ para descargarlo e instalarlo, solamente debes ejecutar el archivo que descargues para tu sistema operativo.

Despues de esto, descarga el repositorio dirigiendote a mi repositorio de Github [JacquelineMZ][2] https://github.com/JacquelineMZ/Delilah-Resto-JMZ y clickeando el boton de **Clone** or **Download** en verde, despues click en** download ZIP**

### Base de datos configurada

Una vez tengamos el ZIP del proyecto, es necesario abrir **MySQL Workbench**, si no lo tenemos instalado es necesario instalarlo desde esta [pagina][3] https://www.mysql.com/products/workbench/ y realizar la configuración necesaria, además de esto, es necesario tener un servidor independiente de prueba como** XAMPP**, si no lo tienes abierto, por favor descargalo desde aqui https://www.apachefriends.org/es/index.html.

Una vez iniciado *Xampp* y *MySQL* workbench, es necesario hacer click en **start** del módulo de MySQL en Xampp, despues nos dirigimos a *MySQLWorkbench* y seleccionamos **nuestro servidor de base de datos**. Despues hacemos click en la pestaña de **Schemas**, despues seleccionamos en la parte superior **New SQL** y *copiamos el contenido del archivo de **query_pruebas.sql***. Finalmente, ejecutamos el archivo haciendo click en el **icono del rayo**.

Esto nos creará un esquema de base de datos llamado delilah-resto, posteriormente procedemos a realizar las cargas masivas a la base creada, esto se logra copiando el contenido del archivo cargas.sql en un nuevo query de MySQL Workbench. Posteriormente ejecutar el query con el icono del rayo.

### Servidor de Node configurado

Luego de que tengamos la base de datos con el esquema y los datos iniciales insertados, procedemos a ejecutar el comando** npx nodemon endpoints.js** para levantar el servidor.

Finalmente abrimos postman y hacemos peticiones a los endpoins documentados en Swagger con los bodies que se encuentran en el documento Bodies para las peticiones. Y esperamos las respuestas.
[1]: https://nodejs.org/es/download/
[2]: https://github.com/JacquelineMZ/Delilah-Resto-JMZ
[3]: https://www.mysql.com/products/workbench/
