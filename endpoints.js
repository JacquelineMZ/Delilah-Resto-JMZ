const express = require('express');
const jwt = require('jsonwebtoken');
const server = express();
const Sequelize = require('sequelize');
const config = require('./config')
const sequelize = new Sequelize('mysql://root@localhost:3307/delilah_resto');
// const sequelize = new Sequelize(config.conf_db_name, config.conf_user, config.conf_password, {
//     host: config.host,
//     dialect: config.conf_dialect,
//     port: config.conf_port
//   });
var firma='';

server.use(express.json());

//Funciones para verificar el token del usuario y saber su rol
//Hay tres funciones porque la firma cambia dependiendo del rol (Usuario, Administrador y todos)
const AutenticarTokenUsuario = express.Router(); 
AutenticarTokenUsuario.use((req, res, next) => {
    const token = req.headers['token_accion'];
	console.log(token);
    if (token) {
      jwt.verify(token, config.conf_user_signature , (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
 });
 const AutenticarTokenAdministrador = express.Router(); 
 AutenticarTokenAdministrador.use((req, res, next) => {
    const token = req.headers['token_accion'];
	console.log(token);
    if (token) {
      jwt.verify(token, config.conf_admin_signature , (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida o permisos insuficientes' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Usuario sin Token' 
      });
    }
 });
 const AutenticarTokenTodos = express.Router(); 
 AutenticarTokenAdministrador.use((req, res, next) => {
    const token = req.headers['token_accion'];
	console.log(token);
    if (token) {
      jwt.verify(token, firma , (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
 });
//Endpoints 
//////////////////////////////////////////////////////
///////////             USUARIO             //////////
//////////////////////////////////////////////////////

//1. GET un solo usuario Swagger /usuario/listaruno/ Parametro ID_USUARIO
server.get('/usuario/listaruno/:ID_USUARIO',AutenticarTokenTodos,(req,res)=>{
    const ID_USUARIO = req.params.ID_USUARIO;
    sequelize.query('SELECT * FROM USUARIOS where ID_USUARIO = :ID_USUARIO limit 1', 
    { replacements: {ID_USUARIO: ID_USUARIO}, type: sequelize.QueryTypes.SELECT }
    ).then(resultados => res.json(resultados)
    ).catch(function (error) {
        res.status(401);
        res.json({error_presentado:error});
    });
});

//2. GET todos los usuarios Swagger /usuario/listartodos/
server.get('/usuario/listartodos/', AutenticarTokenAdministrador ,(req,res)=>{
    sequelize.query('SELECT * FROM USUARIOS', 
    { type: sequelize.QueryTypes.SELECT }
    ).then(resultados => res.json(resultados)
    ).catch(function (error) {
        res.status(401);
        res.json({error_presentado:error});
    });
});

//3. POST de registro usuario /usuario/registrar
server.post('/usuario/registrar',AutenticarTokenAdministrador,(req,res)=>{
    const {
        USUARIO,
        CONTRASENA_USUARIO,
        NOMBRES,
        APELLIDOS,
        CORREO,
        DIRECCION,
        CELULAR,
        ID_ROL
    } = req.body
    sequelize.query('INSERT INTO USUARIOS (\
            USUARIO,\
            CONTRASENA_USUARIO,\
            NOMBRES,\
            APELLIDOS,\
            CORREO,\
            DIRECCION,\
            CELULAR,\
            ID_ROL\
        )VALUES (\
            :USUARIO, \
            :CONTRASENA_USUARIO, \
            :NOMBRES, \
            :APELLIDOS, \
            :CORREO, \
            :DIRECCION, \
            :CELULAR, \
            :ID_ROL)', 
    { replacements: { 
        USUARIO:USUARIO, 
        CONTRASENA_USUARIO:CONTRASENA_USUARIO, 
        NOMBRES:NOMBRES, 
        APELLIDOS:APELLIDOS,
        CORREO:CORREO,
        DIRECCION:DIRECCION,
        CELULAR:CELULAR,
        ID_ROL:ID_ROL,}}
    ).then(resultados => res.json(resultados)
    ).catch(function (error) {
        res.status(401);
        res.json({error_presentado:error});
    });
});

//4. POST para verificar si un usuario existe LOGIN y crear un token
server.post('/usuario/login', async function (req,res){
    console.log('calling');
    const {USUARIO,CONTRASENA_USUARIO} = req.body;
    const validado = await validarUsuarioContrasena(USUARIO,CONTRASENA_USUARIO);
    console.log(validado);
    if(!validado){
        res.status(401);
        res.json({error:'Usuario o contraseña erroneos'});
        return;
    }
    const token = jwt.sign({USUARIO},firma,{expiresIn: 600 }); //Se expira en 10 minutos
    res.json({token,mensaje:"Autenticacion correcta"});
});
// Funcion conectada al POST de login
function validarUsuarioContrasena(USUARIOF,CONTRASENA_USUARIOF){
    return new Promise(resolve =>{
        sequelize.query('SELECT * FROM USUARIOS WHERE USUARIO=:USUARIO AND CONTRASENA_USUARIO=:CONTRASENA_USUARIO', 
        { replacements: { 
            USUARIO:USUARIOF, 
            CONTRASENA_USUARIO:CONTRASENA_USUARIOF }
        , type: sequelize.QueryTypes.SELECT }
        ).then( function (resultados){
            console.log(resultados[0].ID_ROL);
            if (resultados[0].ID_ROL === 1)
                firma=config.conf_admin_signature;
            else
                firma=config.conf_user_signature;
            if(resultados)
                resolve(true);
        }).catch(function (error) {
                resolve(false);
        });
    });
}

//5. POST para editar usuarios
server.post('/usuario/editar',AutenticarTokenAdministrador,(req,res)=>{
    const {
        ID_USUARIO,
        USUARIO,
        CONTRASENA_USUARIO,
        NOMBRES,
        APELLIDOS,
        CORREO,
        DIRECCION,
        CELULAR,
        ID_ROL
    } = req.body
    sequelize.query('UPDATE USUARIOS \
        SET \
            USUARIO=:USUARIO, \
            CONTRASENA_USUARIO=:CONTRASENA_USUARIO, \
            NOMBRES=:NOMBRES, \
            APELLIDOS=:APELLIDOS, \
            CORREO=:CORREO, \
            DIRECCION=:DIRECCION, \
            CELULAR=:CELULAR, \
            ID_ROL=:ID_ROL\
        WHERE ID_USUARIO=:ID_USUARIO', 
    { replacements: { 
        ID_USUARIO:ID_USUARIO,
        USUARIO:USUARIO, 
        CONTRASENA_USUARIO:CONTRASENA_USUARIO, 
        NOMBRES:NOMBRES, 
        APELLIDOS:APELLIDOS,
        CORREO:CORREO,
        DIRECCION:DIRECCION,
        CELULAR:CELULAR,
        ID_ROL:ID_ROL,}}
    ).then(resultados => res.json(resultados)
    ).catch(function (error) {
        res.status(401);
        res.json({error_presentado:error});
    });
});

//6. DELETE para eliminar un usuario
server.delete('/usuario/eliminar/:ID_USUARIO',AutenticarTokenAdministrador,(req,res)=>{
    const ID_USUARIO = req.params.ID_USUARIO;
    sequelize.query('DELETE FROM USUARIOS WHERE ID_USUARIO =:ID_USUARIO', 
    { replacements: { ID_USUARIO:ID_USUARIO }}
    ).then(resultados => res.json(resultados)
    ).catch(function (error) {
        res.status(401);
        res.json({error_presentado:error});
    });
});
//////////////////////////////////////////////////////
///////////             PRODUCTO             /////////
//////////////////////////////////////////////////////

//1. GET un solo producto Swagger /producto/listauno/ Parametro ID_PRODUCTO
server.get('/producto/listauno/:ID_PRODUCTO',AutenticarTokenAdministrador,(req,res)=>{ //Condición 5: CRUD de productos (Administrador)
    const ID_PRODUCTO = req.params.ID_PRODUCTO;
    sequelize.query('SELECT * FROM PRODUCTOS where ID_PRODUCTO = :ID_PRODUCTO limit 1', 
    { replacements: {ID_PRODUCTO: ID_PRODUCTO}, type: sequelize.QueryTypes.SELECT }
    ).then(resultados => res.json(resultados)
    ).catch(function (error) {
        res.status(401);
        res.json({error_presentado:error});
    });
});

//2. GET un todos los productos Swagger /producto/listartodos/
server.get('/producto/listartodos/',AutenticarTokenAdministrador,(req,res)=>{//Condición 5: CRUD de productos (Administrador)
    sequelize.query('SELECT * FROM PRODUCTOS', 
    { type: sequelize.QueryTypes.SELECT }
    ).then(resultados => res.json(resultados)
    ).catch(function (error) {
        res.status(401);
        res.json({error_presentado:error});
    });
});

//3. POST de registro usuario /producto/crear
server.post('/producto/crear',AutenticarTokenAdministrador,(req,res)=>{//Condición 5: CRUD de productos (Administrador)
    const {
        NOMBRE_PRODUCTO,
        PRECIO,
        FOTO_PRODUCTO
    } = req.body
    sequelize.query('INSERT INTO PRODUCTOS (\
            NOMBRE_PRODUCTO,\
            PRECIO,\
            FOTO_PRODUCTO\
        )VALUES (\
            :NOMBRE_PRODUCTO, \
            :PRECIO, \
            :FOTO_PRODUCTO)', 
    { replacements: { 
        NOMBRE_PRODUCTO:NOMBRE_PRODUCTO, 
        PRECIO:PRECIO, 
        FOTO_PRODUCTO:FOTO_PRODUCTO,}}
    ).then(resultados => res.json(resultados)
    ).catch(function (error) {
        res.status(401);
        res.json({error_presentado:error});
    });
});

//4. POST de adicionar un producto a una orden /producto/adicionar
server.post('/producto/adicionar/',AutenticarTokenAdministrador,(req,res)=>{//Condición 5: CRUD de productos (Administrador)
    const {
        ID_ORDEN,
        ID_PRODUCTO,
        CANTIDAD_PRODUCTO
    } = req.body
    sequelize.query('INSERT INTO PRODUCTO_ORDENES (\
            ID_PRODUCTO,\
            ID_ORDEN,\
            CANTIDAD_PRODUCTO\
        )VALUES (\
            :ID_PRODUCTO, \
            :ID_ORDEN, \
            :CANTIDAD_PRODUCTO)', 
    { replacements: { 
        ID_PRODUCTO:ID_PRODUCTO, 
        ID_ORDEN:ID_ORDEN, 
        CANTIDAD_PRODUCTO:CANTIDAD_PRODUCTO,}}
    ).then(resultados => res.json(resultados)
    ).catch(function (error) {
        res.status(401);
        res.json({error_presentado:error});
    });
});
//5. POST para editar productos
server.post('/producto/editar',AutenticarTokenAdministrador,(req,res)=>{//Condición 5: CRUD de productos (Administrador)
    const {
        ID_PRODUCTO,
        NOMBRE_PRODUCTO,
        PRECIO,
        FOTO_PRODUCTO
    } = req.body
    sequelize.query('UPDATE PRODUCTOS \
        SET \
        NOMBRE_PRODUCTO=:NOMBRE_PRODUCTO, \
        PRECIO=:PRECIO, \
        FOTO_PRODUCTO=:FOTO_PRODUCTO, \
        WHERE ID_PRODUCTO=:ID_PRODUCTO', 
    { replacements: { 
        ID_PRODUCTO:ID_PRODUCTO,
        NOMBRE_PRODUCTO:NOMBRE_PRODUCTO, 
        PRECIO:PRECIO, 
        FOTO_PRODUCTO:FOTO_PRODUCTO}
    }
    ).then(resultados => res.json(resultados)
    ).catch(function (error) {
        res.status(401);
        res.json({error_presentado:error});
    });
});

//6. DELETE para eliminar un producto
server.delete('/producto/eliminar/:ID_PRODUCTO',AutenticarTokenAdministrador,(req,res)=>{//Condición 6: Control de acciones usuario no Administrador, No se completa la eliminación de pedidos, falta implementar. Dicha acción la pueden realizar únicamente administradores
    const ID_PRODUCTO = req.params.ID_PRODUCTO;
    sequelize.query('DELETE FROM PRODUCTOS WHERE ID_PRODUCTO =:ID_PRODUCTO', 
    { replacements: { ID_PRODUCTO:ID_PRODUCTO }}
    ).then(resultados => res.json(resultados)
    ).catch(function (error) {
        res.status(401);
        res.json({error_presentado:error});
    });
});
//////////////////////////////////////////////////////
///////////      PEDIDO  / ORDENES         ///////////
//////////////////////////////////////////////////////

//1. GET un solo pedido/orden Swagger /pedido/listaruno/ Parametro ID_ORDEN
server.get('/pedido/listaruno/:ID_ORDEN',AutenticarTokenTodos,(req,res)=>{ // Condición 3: Generar pedido Autenticar usuario OK
    const ID_ORDEN = req.params.ID_ORDEN;
    sequelize.query('SELECT * FROM ORDENES where ID_ORDEN = :ID_ORDEN limit 1', 
    { replacements: {ID_ORDEN: ID_ORDEN}, type: sequelize.QueryTypes.SELECT }
    ).then(resultados => res.json(resultados)
    ).catch(function (error) {
        res.status(401);
        res.json({error_presentado:error});
    });
});

//2. GET un todos los pedidos/ordenes Swagger /pedido/listartodos/
server.get('/pedido/listartodos/',AutenticarTokenTodos,(req,res)=>{
    sequelize.query('SELECT * FROM ORDENES', 
    { type: sequelize.QueryTypes.SELECT }
    ).then(resultados => res.json(resultados)
    ).catch(function (error) {
        res.status(401);
        res.json({error_presentado:error});
    });
});

//3. POST para editar/actualizar pedidos/ordenes
server.post('/pedido/actualizar',AutenticarTokenAdministrador,(req,res)=>{ //Condición 4: Actualizar pedido (Administrador)
    const {
        ID_ORDEN,
        ID_USUARIO,
        ID_ESTADOS,
        FECHA,
        DESCRIPCION,
        PRECIO_TOTAL
    } = req.body
    sequelize.query('UPDATE ORDENES \
        SET \
        ID_USUARIO=:ID_USUARIO, \
        ID_ESTADOS=:ID_ESTADOS, \
        FECHA=:FECHA, \
        DESCRIPCION=:DESCRIPCION,\
        PRECIO_TOTAL=:PRECIO_TOTAL\
        WHERE ID_ORDEN=:ID_ORDEN', 
    { replacements: { 
        ID_PRODUCTO:ID_PRODUCTO,
        NOMBRE_PRODUCTO:NOMBRE_PRODUCTO, 
        PRECIO:PRECIO, 
        FOTO_PRODUCTO:FOTO_PRODUCTO}
    }
    ).then(resultados => res.json(resultados)
    ).catch(function (error) {
        res.status(401);
        res.json({error_presentado:error});
    });
});

//4. POST de crear un pedido/orden 
server.post('/pedido/orden/',AutenticarTokenAdministrador,(req,res)=>{
    const {
        ID_USUARIO,
        ID_ESTADOS,
        FECHA,
        DESCRIPCION,
        PRECIO_TOTAL
    } = req.body
    sequelize.query('INSERT INTO ORDENES (\
            ID_USUARIO,\
            ID_ESTADOS,\
            FECHA,\
            DESCRIPCION,\
            PRECIO_TOTAL\
        )VALUES (\
            :ID_USUARIO, \
            :ID_ESTADOS, \
            :FECHA, \
            :DESCRIPCION, \
            :PRECIO_TOTAL)', 
    { replacements: { 
        ID_USUARIO:ID_USUARIO, 
        ID_ESTADOS:ID_ESTADOS, 
        FECHA:FECHA,
        DESCRIPCION:DESCRIPCION,
        PRECIO_TOTAL:PRECIO_TOTAL}}
    ).then(resultados => res.json(resultados)
    ).catch(function (error) {
        res.status(401);
        res.json({error_presentado:error});
    });
});
server.listen(3000,()=>{
    console.log("Server corriendo");
});
// Todas las autenticaciones requieren de su respectivo header (token_accion) con el token generado que indica cual rol es el que está ejecutando la acción
// Como se ve en las funciones middleware, este toma en cuenta el token del rol en su respectiva funcion