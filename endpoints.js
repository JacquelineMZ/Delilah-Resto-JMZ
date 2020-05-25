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

server.listen(3000,()=>{
    console.log("Server corriendo");
});