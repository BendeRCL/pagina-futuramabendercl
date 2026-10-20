# Planet Express API

Proyecto web inspirado en Futurama para visualizar personajes desde un archivo JSON local o desde una variable global en JavaScript. La vista `api.html` consume los datos, muestra tarjetas de personajes y permite filtrarlos por nombre, ocupacion y especie.

## Caracteristicas

- Interfaz visual con estilo tematico de Planet Express.
- Consumo de datos desde `json/personajes.json`.
- Compatibilidad con `window.personajes` para uso sin servidor.
- Filtros por nombre, ocupacion y especie.
- Integracion de Bootstrap en el formulario sin romper el diseno original.
- Boton para recargar los personajes desde la API local.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- JSON

## Estructura sugerida del proyecto

```text
PlanetExpress/
|-- api.html
|-- index.html
|-- curriculum.html
|-- portafolio.html
|-- css/
|   /-- styles.css
|   /-- api-styles.css
|   /-- porta-styles.css
|-- js/
|   |-- api-page.js
|   `-- personajes.js
|-- json/
|   `-- personajes.json
`-- img/
```

## Funcionamiento

La pagina `api.html` carga los personajes desde:

1. La variable global `window.personajes`, si existe.
2. El archivo `json/personajes.json`, si se esta ejecutando con servidor local.

Luego renderiza cada personaje en una tarjeta con:

- Nombre
- Especie
- Ocupacion
- Descripcion
- Imagen

## Formato esperado del JSON

El proyecto acepta claves en minuscula o mayuscula inicial:

```json
[
  {
    "nombre": "Bender Bending Rodriguez",
    "ocupacion": "Doblador",
    "especie": "Robot",
    "descripcion": "Robot doblador irreverente y sarcastico.",
    "image": "img/bender.png"
  },
  {
    "Nombre": "Philip J. Fry",
    "Ocupacion": "Repartidor",
    "Especie": "Humano",
    "Descripcion": "Joven ingenuo transportado al siglo XXXI.",
    "Image": "img/fry.png"
  }
]
```

## Filtros disponibles

- Busqueda por nombre en tiempo real.
- Selector por ocupacion.
- Selector por especie.
- Boton para limpiar todos los filtros.

- ## Autor

Desarrollado por BendeRCL.

## Proximas mejoras

- Paginacion o carga por bloques.
- Boton para mostrar u ocultar el JSON.
- Mas filtros avanzados.
- Mejoras de accesibilidad y responsive.


