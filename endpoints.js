const express = require('express');
const server = express();
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root@localhost:3307/delilah_resto');

server.use(express.json());
//Endpoint GET Usuarios
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

// INSERT INTO ROLES (
//         ID_ROL,
//         DESCRIPCION
//     ) 
//     VALUES (
//     1,
//     'Administrador'
//     );
// INSERT INTO USUARIOS (
//         ID_USUARIO,
//         USUARIO,
//         CONTRASENA_USUARIO,
//         NOMBRES,
//         APELLIDOS,
//         CORREO,
//         DIRECCION,
//         CELULAR,
//         ID_ROL
//     ) VALUES (
//     1,
//     'JACQUIE',
//     '123',
//     'Jacqueline',
//     'Mendez Zualuaga',
//     'jacqueline.mndez@gmail.com',
//     'Calle falsa 123',
//     '3192065788',
//     1
//     );

server.listen(3000,()=>{
    console.log("Server corriendo");
});