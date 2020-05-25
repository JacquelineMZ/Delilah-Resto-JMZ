const express = require('express');
const jwt = require('jsonwebtoken');
const server = express();
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root@localhost:3307/delilah_resto');
const firma = "Jacqui-Delilah-Resto-LfdgfAsKsdhJsfhFsfGjhNFshthD34jt9N90GKaJbLkjFD"; 

server.use(express.json());
//Endpoints 
// GET un solo usuario Swagger /usuario/listauno/ Parametro idfiltro
server.get('/usuario/listauno/:idfiltro',(req,res)=>{
    const filtro = req.params.idfiltro;
    sequelize.query('SELECT * FROM USUARIOS where ID_USUARIO = :filtro limit 1', 
    { replacements: {filtro: filtro}, type: sequelize.QueryTypes.SELECT }
    ).then(resultados => res.json(resultados)
    ).catch(function (error) {
        res.status(401);
        res.json({error_presentado:error});
    });
});
// GET un todos los usuarios Swagger /usuario/listatodos/
server.get('/usuario/listatodos/',(req,res)=>{
    const filtro = req.params.idfiltro;
    sequelize.query('SELECT * FROM USUARIOS', 
    { type: sequelize.QueryTypes.SELECT }
    ).then(resultados => res.json(resultados)
    ).catch(function (error) {
        res.status(401);
        res.json({error_presentado:error});
    });
});
//POST de registro usuario /usuario/registrar
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
//POST para verificar si un usuario existe LOGIN y crear un token
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

// {
// 	"USUARIO":"JACQUI",
// 	"CONTRASENA_USUARIO":"12345"
// }

// POST para editar usuarios
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

server.listen(3000,()=>{
    console.log("Server corriendo");
});