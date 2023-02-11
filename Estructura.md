**_ ESTRUCTURACION DEL CODIGO _**

Dentro de la carpeta src encontraremos:

- **test** (utilizado para hacer pruebas unitarias o de integracion, no a sido necesario implementar)

- assets (Aqui podras encontrar todo lo que tiene que ver con estilos, fuentes, imagenes etc )

  \*images (algunas imagenes que estan en el proyecto)

  \*scss (aqui se encuentra los estilos de todo el proyecto, es posible que no se quiera tocar mucho esto pero si lo necesitan lo explico mas a fondo)

- components (aqui ponemos todos los componentes que pueden ser posibles reutilizar en varias partes del proyecto)

- context (Posee un sistema para manejar variable globalmente como por ejemplo que en todas las pantalla se guarde que el Menu izquierdo este siempre activo)

- pages (Posee todas las pantallas existentes en el proyecto, Al entrar aqui veras que cada una tiene un nombre clave relacionado con las opciones del menu)

- routes (posee un index y un archivo Route.js)
  \*index (posee todas las rutas activas en nuestro proyecto)

  \*Rouje,js configuraciones necesarias para el manejo de las rutas

- utils (Se encarga de gestionar funciones repetitivas que requieren cierta logica, con el objetivo de mejorar la escalabilidad de ciertos procesos, por ejemplo cada que tengamos una nueva peticion a un endpoint, simplemente agregamos la url del endpoint bajo el formato que ya existe y seria todo )

- App.js (Este es el archivo base donde se monta todo el proyecto)
