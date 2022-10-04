# Juan Andrés Díaz Ibáñez - Prueba técnica Hiberus

La prueba técnica consiste en realizar login y CRUD contra una API de la que tenemos disponible un Swagger

## Creación del proyecto y librerias utilizadas

_Proyecto_:

### `npx create-react-app technical-test --template typescript`

_React-Redux-Toolkit_:

### `npm install @reduxjs/toolkit`

_Redux-Persist_:

### `npm install redux-persist`

_Axios_:

### `npm install axios`

_React-Bootstrap_:

### `npm install react-bootstrap bootstrap`

## Arrancar la aplicación

En el directorio del proyecto ejecutar:

### `npm install`

### `npm start`

Para instalar los paquetes necesarios y arrancar la aplicacion

Abre en el navegador [http://localhost:3000]

## Estrategia de trabajo

1. Visualización y prueba del Swagger para comprobar su funcionamiento
2. Identificación de la necesidad de tener un estado global
3. Identificación y esquema de las páginas principales y distintos componentes de la aplicación
4. Instalación de las distintas librerias necesarias para poder desarrollar la aplicación
5. Creación de la estructura de carpetas
6. Creación de las distintas rutas, páginas, componentes, servicios y store de redux
7. Revisión y limpieza de código

## Framework utilizado

Para realizar esta aplicación he utilizado _ReactJs+TypeScript_, ya que es el framework con el que he trabajado más y por lo tanto conozco más, para este proyecto he incluido TypeScript para tener mejor controlados los tipos de las variables y evitar errores.

## Estructura de carpetas

Para organizar las carpetas y asignarle nombre a los distintos archivos he seguido la siguiente estructura:

```.
├── src
│ ├── components => componentes a usar por las distintas páginas
│ │ │──navbar => barra de navegación cuando el usuario esta autentificado
│ │ └──userForm => formulario del usuario para ser reutilizado en distintas páginas
│ │
│ ├── hooks => hooks necesarios para usar redux toolkit
│ │
│ ├── navigation => componente para las rutas de las páginas
│ │
│ ├── pages => páginas a mostrar dependiendo del routing
│ │ │──createUser => página para crear un usuario
│ │ │──login => página para que el usuario haga login
│ │ │──signup => página para registrar un usuario cuando no tiene credenciales
│ │ │──updateUser => página para editar los datos del usuario
│ │ └──users => página con el listado de usuarios
│ │
│ ├── services => servicios de peticiones a la API
│ │ │──auth => servicios relacionados con la autentificación
│ │ └──users => servicios relacionados con la entidad usuario
│ │
│ ├── store => store de redux
│ │ └──session => slice para guardar la info de sesión del usuario
│ │
│ └── types => declaración de tipos de la aplicación
└── App.tsx => componente principal
```

## Estado global

Para poder gestionar la autorización de un usuario y así poder ver las distintas páginas a las que tendría acceso una vez estuviera logado he utilizado un estado global con _Redux-Toolkit_, para poder tener más accesible y centralizada esa información y utilizarla de una manera mas sencilla y limpia. La información necesaria para este estado global son los datos del usuario logado junto con un token que me devuelve la API una vez se verifican los datos del usuario y son correctos.

## Estilos

Para diseñar el estilo de la aplicación de una manera rapida he utilizado _React-Bootstrap_, es una librería con bastantes plantillas y estilos predefinidos.

## Tiempo dedicado al desarrollo de la prueba

Realizar el proyecto me llevó aproximadamente 2 días

## Problemas/Dificultades encontradas y soluciones implementadas

-   Actualizacion de la información de usuario: el problema que encontré era como llevar los datos del usuario que queria editar al formulario, para ello utilicé el hook useLocation que me facilita toda la información que es enviada a través de la función "navigate" de "react-router-dom" entre la que se encuentra el state de ese momento, que es la información del usuario a modificar, ya que cada usuario tiene su card donde esta toda su información junto con el boton de editar y eliminar.

-   Eliminar usuarios y ver la lista actualizada: para poder eliminar los usuarios y ver la lista actualizada me di cuenta que tenia que volver a llamar a la API para recuperar el listado de usuarios, para hacer la aplicación mas eficiente, controlo el mensaje de "ok" cuando lanzo la petición a la API de eliminar un usuario, y lo elimino en la lista que tengo en el state del componente para evitar realizar otra llamada a la API de manera innecesaria.

-   Buscar un usuario: para realizar la busqueda de un usuario finalmente me cree una copia del listado de usuarios (searchList) y sobre esta copia hacer las modificaciones necesarias en funcion de la palabra buscada y que se mostraran al instante, en caso de no tener ninguna palabra en el input del buscador seteo searchList con la lista de usuarios que tengo userList, y volverían a mostrarse todos. Obviamente tendría más sentido si esto se implementara con un endpoint diseñado para aceptar la query, pero pensé que podría ser un buen detalle para darle más valor a la aplicación.

-   Persistencia del token al actualizar la página: el problema que encontré era que al actualizar la página me hacía logout porque el token no era persistente en el navegador y para realizar la persistencia de los datos del login he utilizado _Redux-Persist_ y así poder recargar la página e incluso cerrar el navegador y volver a abrirlo y seguir teniendo la sesión iniciada.
