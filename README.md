###NODEPOP

API de venta y busqueda de anuncios de segunda mano que da servicio a dispositivos IOS y Android.
Última versión disponible Nodepop V1

###Instrucciones de como usar Nodepop

###Instalar dependencias

Para continuar desarrollando en otro equipo será necesario instalar dependencias del módulo npm, ejecutar:

'npm install'



###Inicializar la BD

 - Desde el servidor de BD navegar por consola hasta la ruta donde se encuentre la carpeta data de mongodb
 ejecutar script **. /startMongo.sh** para *inicializar* la base de datos de nodepop



###Inicializar la BD con Script de carga

Se puede ejecutar un script de ejemplo con una carga mínima de datos, para cargalos datos por defecto ejecutar:

'npm run instalaDB'




##Modos de arranque

 - Para arrancar nodepop en modo *DEBUG* basta con lanzar

    'npm run dev'

 - Para arrancar en modo normal **Producción**

    'npm start'

 **NOTA**: en Producción habrá que modificar antes en la ruta nodepop/nodepop/bin/www la ruta y el puerto antes deseamos arrancar.


##Registro de un usuario nuevo

 - Insertar el siguiente enlace por su navegador

'http://localhost:3000/apiv1/usuarios/register'

- Con una herramienta como **Potsman** podemos probarlo insertando por body nombre, email, y clave



##Autentificacion de usuario

- Aceder al enlace

'http://localhost:3000/apiv1/usuarios/authenticate'

- Inserte parametros por **body email y clave** desde Potsman para probarlo de usuario



##Insertar token de usuario

Acceder desde:

'http://localhost:3000/apiv1/token/'

- Inyectar **token** se puede probar insertando header de tipo **x-access-token**




##Almacenar token de Push

Acceder a la ruta:

'http:localhost/apiv1/token'

- Parametros que se le pasana por el body:

 'plataforma : IOS, Android
 toke: '




##Listar Anuncios

Para Acceder:

'https:/server:port/apiv1/anuncios'

Se pueden **filtrar** por:

'- tag: mobile , motor, lifestyle
- venta: true o false
- precio:
- nombre: '



##Listar tags

Acceder desde:

'http://localhost:3000/apiv1/anuncios/tags'
