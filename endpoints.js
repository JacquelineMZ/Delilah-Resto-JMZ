const express = require('express');
const jwt = require('jsonwebtoken');
const server = express();
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root@localhost:3307/delilah_resto');
const firma = "Jacqui-Delilah-Resto-LfdgfAsKsdhJsfhFsfGjhNFshthD34jt9N90GKaJbLkjFD"; 

server.use(express.json());
//Endpoints 

///////////             USUARIO             ///////////

//1. GET un solo usuario Swagger /usuario/listaruno/ Parametro ID_USUARIO
server.get('/usuario/listaruno/:ID_USUARIO',(req,res)=>{
    const ID_USUARIO = req.params.ID_USUARIO;
    sequelize.query('SELECT * FROM USUARIOS where ID_USUARIO = :ID_USUARIO limit 1', 
    { replacements: {ID_USUARIO: ID_USUARIO}, type: sequelize.QueryTypes.SELECT }
    ).then(resultados => res.json(resultados)
    ).catch(function (error) {
        res.status(401);
        res.json({error_presentado:error});
    });
});

//2. GET un todos los usuarios Swagger /usuario/listartodos/
server.get('/usuario/listartodos/',(req,res)=>{
    sequelize.query('SELECT * FROM USUARIOS', 
    { type: sequelize.QueryTypes.SELECT }
    ).then(resultados => res.json(resultados)
    ).catch(function (error) {
        res.status(401);
        res.json({error_presentado:error});
    });
});

//3. POST de registro usuario /usuario/registrar
server.post('/usuario/registrar',(req,res)=>{
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
    const token = jwt.sign({USUARIO},firma);
    res.json({token});
    console.log(token);
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
            console.log(resultados);
            if(resultados[0].ID_USUARIO != '')
                resolve(true);
            else 
                resolve(false);
        }).catch(function (error) {
                resolve(false);
        });
    });
}

//5. POST para editar usuarios
server.post('/usuario/editar',(req,res)=>{
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
server.delete('/usuario/eliminar/:ID_USUARIO',(req,res)=>{
    const ID_USUARIO = req.params.ID_USUARIO;
    sequelize.query('DELETE FROM USUARIOS WHERE ID_USUARIO =:ID_USUARIO', 
    { replacements: { ID_USUARIO:ID_USUARIO }}
    ).then(resultados => res.json(resultados)
    ).catch(function (error) {
        res.status(401);
        res.json({error_presentado:error});
    });
});

///////////             USUARIO             ///////////

//1. GET un solo producto Swagger /producto/listauno/ Parametro ID_PRODUCTO
server.get('/producto/listauno/:ID_PRODUCTO',(req,res)=>{
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
server.get('/producto/listartodos/',(req,res)=>{
    sequelize.query('SELECT * FROM PRODUCTOS', 
    { type: sequelize.QueryTypes.SELECT }
    ).then(resultados => res.json(resultados)
    ).catch(function (error) {
        res.status(401);
        res.json({error_presentado:error});
    });
});

//3. POST de registro usuario /producto/crear
server.post('/producto/crear',(req,res)=>{
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

//4. POST de adicionar un producto a una orden /productos/adicionar
server.post('/productos/adicionar/',(req,res)=>{
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

server.listen(3000,()=>{
    console.log("Server corriendo");
});