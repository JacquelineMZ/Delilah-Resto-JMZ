const   conf_db_host = 'localhost', // host
    conf_host = 'localhost', // host of the db
    conf_dialect = 'mysql', //dialect for the commands in database administrator name
    conf_port = '3307', // port number
    conf_db_name   = 'delilah_resto', // database name
    conf_user     = 'root',           // username
    conf_password = '12345',              // password
    conf_admin_signature = 'Jacqui-Delilah-Resto-LfdgfAsKsdhJsfhFsfGjhNFshthD34jt9N90GKaJbLkjFD',  
    conf_user_signature =  'Jacqui-Delilah-Resto-KL534J4565R768G67K9L878KJ4645L767A9FS80790D9LH';   
module.exports = {
    conf_db_name   : conf_db_name,
    conf_user     : conf_user,
    conf_password : conf_password,
    conf_port     : conf_port,
    conf_dialect   : conf_dialect,
    conf_host : conf_host,
    conf_admin_signature : conf_admin_signature,
    conf_user_signature : conf_user_signature
};
//Sugerencias

//Es conveniente parametrizar toda la conexión a la base. Una forma es generando un archivo javascript