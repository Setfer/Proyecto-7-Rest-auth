# Proyecto 7
## _API REST AUTH_


# Base de datos.
La base de datos estará compuesta de tres colecciones: **users**, **stores** y **products**.
Cada **user** tendrá los siguientes atributos: 
*Los elementos en negrita seran obligatorios*
- **userName**: String 
- **password** :Number
- shopping: [ObjectId]
- admin: Boolean

Cada **store** tendrá los siguientes atributos: 
- **storeName**: String
- **address** :String
- items: [ObjectId]

Cada **product** tendrá los siguientes atributos: 
- **productName**: String
- **price** :Number
- **stock**: Number

# Rutas y controladores
*El servidor está creado en el puerto 3000*

Dispondremos de 3 rutas principales, una para cada coleccion, las cuales seran:
- /api/v1/products
- /api/v1/stores
- /api/v1/users

En **/api/v1/products** tendremos los siguientes controladores:
- get: obetener la lista de productos: */api/v1/products*
- get: obetener producto por id: */api/v1/products/**id***
- post: añadir producto: */api/v1/products*
- put: actualizar producto: */api/v1/**id***
- delete: Eliminar producto: */api/v1/products/**id***

En **/api/v1/stores** tendremos los siguientes controladores:
- get: obetener la lista de tiendas: */api/v1/stores*
- get: obetener tienda por id: */api/v1/stores/**id***
- post: añadir tienda: */api/v1/stores*
- put: actualizar tienda: */api/v1/stores/**id***
- delete: Eliminar tienda: */api/v1/stores/**id***

En **/api/v1/users** tendremos los siguientes controladores, algunos requieren autorizaciones especiales, dependiendo de si estas registrado, de si es tu propio usuario, o si eres administrador

Los usuarios **no logados**, puede realizar las siguientes funciones:
- post : registrarse :*/api/v1/users/register*
- post : Iniciar sesion :*/api/v1/users/login*

Los usuarios **logados**, podran realizar las siguientes funciones:

- get : ver lista de usuarios :*/api/v1/users/*

Ademas tambien podran hacer las siguientes modificaciones sobre su **propio usuario**:
- delete: borrar mi usuario :*/api/v1/users/**idMyUser***
- put: añadir compra al carrito: */api/v1/users/**idMyUser***
- put: eleminar un objeto del carrito: */api/v1/users/deleteshopping/**idMyUser***

Los usuarios **admin** tendran las siguientes funciones: 
- delete: borrar cualquier usuario :*/api/v1/users/admin/**idUser***
- put: modificacion total de cualquier usuario, tambien puede modificar un usuario a administrador :*/api/v1/users/admin/**idUser***

# Librerias y utilidades
Las librerias necesarias para la ejecucion del codigo son: **bcrypt, dotenv, express, jsonwebtoken, mongoose**

Se deja un usuario creado con permisos de administrador creado en BD, los datos de acceso son: 
**UserName**: admin
**Password**: admin123

Tambien hay varios usuarios estandar creados, la contraseña dichos usuarios sera:
*usuario123*

Hay dos semillas creadas, tanto para stores, como para prodcuts, podremos ejecutarlas de forma individual con:

```
npm run storesSeed
npm run productsSeed
```
o de forma conjunta con 
```
npm run seedAll
```