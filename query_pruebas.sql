INSERT INTO ROLES (
        ID_ROL,
        DESCRIPCION
    ) 
    VALUES (
    1,
    'Administrador'
    );
INSERT INTO USUARIOS (
        ID_USUARIO,
        USUARIO,
        CONTRASENA_USUARIO,
        NOMBRES,
        APELLIDOS,
        CORREO,
        DIRECCION,
        CELULAR,
        ID_ROL
    ) VALUES (
    1,
    'JACQUIE',
    '123',
    'Jacqueline',
    'Mendez Zualuaga',
    'jacqueline.mndez@gmail.com',
    'Calle falsa 123',
    '3192065788',
    1
    );
INSERT INTO ROLES (
    ID_ROL,
    DESCRIPCION
    ) VALUES (
    2,
    'Usuario'
    );
INSERT INTO USUARIOS (
    ID_USUARIO,
    USUARIO,
    CONTRASENA_USUARIO,
    NOMBRES,
    APELLIDOS,
    CORREO,
    DIRECCION,
    CELULAR,
    ID_ROL
) VALUES (
    2,
    'NATA',
    '1',
    'Natalia',
    'Mendez Zualuaga',
    'natalia.mndez@gmail.com',
    'Calle falsa 123',
    '3298776540',
    2
)