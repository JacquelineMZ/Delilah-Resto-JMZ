const express = require('express');
const server = express();
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root@localhost:3307/delilah_resto');

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
    sequelize.query('INSERT INTO USUARIOS (\
            ID_USUARIO,\
            USUARIO,\
            CONTRASENA_USUARIO,\
            NOMBRES,\
            APELLIDOS,\
            CORREO,\
            DIRECCION,\
            CELULAR,\
            ID_ROL\
        )VALUES (\
            :ID_USUARIO, \
            :USUARIO, \
            :CONTRASENA_USUARIO, \
            :NOMBRES, \
            :APELLIDOS, \
            :CORREO, \
            :DIRECCION, \
            :CELULAR, \
            :ID_ROL)', 
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