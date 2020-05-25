const express = require('express');
const server = express();
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root@localhost:3307/delilah_resto');

server.listen(3000,()=>{
    console.log("Server corriendo");
});