const apiStatus = document.getElementById('apiStatus');
const charactersContainer = document.getElementById('apiCharacters');
const charactersMessage = document.getElementById('charactersMessage');
const jsonOutput = document.getElementById('jsonOutput');
const reloadButton = document.getElementById('reloadCharacters');

const filterName = document.getElementById('filterName');
const filterOccupation = document.getElementById('filterOccupation');
const filterSpecies = document.getElementById('filterSpecies');
const clearFiltersButton = document.getElementById('clearFilters');

let personajesBase = [];

function obtenerValor(personaje, claves) {
    for (const clave of claves) {
        const valor = personaje?.[clave];
        if (valor !== undefined && valor !== null && valor !== '') {
            return valor;
        }
    }
    return '';
}

function normalizarTexto(texto = '') {
    return texto
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
}

function crearOpciones(select, valores, textoPorDefecto) {
    const valorActual = select.value;

    select.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = textoPorDefecto;
    select.append(defaultOption);

    valores.forEach((valor) => {
        const option = document.createElement('option');
        option.value = valor;
        option.textContent = valor;
        select.append(option);
    });

    select.value = valores.includes(valorActual) ? valorActual : '';
}

function poblarFiltros(personajes) {
    const ocupaciones = [
        ...new Set(
            personajes
                .map((personaje) => obtenerValor(personaje, ['ocupacion', 'Ocupacion']))
                .filter(Boolean)
        )
    ].sort((a, b) => a.localeCompare(b, 'es'));

    const especies = [
        ...new Set(
            personajes
                .map((personaje) => obtenerValor(personaje, ['especie', 'Especie']))
                .filter(Boolean)
        )
    ].sort((a, b) => a.localeCompare(b, 'es'));

    crearOpciones(filterOccupation, ocupaciones, 'Todas');
    crearOpciones(filterSpecies, especies, 'Todas');
}

function renderPersonajes(personajes) {
    charactersContainer.replaceChildren();

    if (!personajes.length) {
        const emptyState = document.createElement('div');
        emptyState.className = 'api-empty-state';
        emptyState.textContent = 'No se encontraron personajes con los filtros seleccionados.';
        charactersContainer.append(emptyState);
        return;
    }

    personajes.forEach((personaje) => {
        const nombre = obtenerValor(personaje, ['nombre', 'Nombre']) || 'Sin nombre';
        const especie = obtenerValor(personaje, ['especie', 'Especie']) || 'Desconocida';
        const ocupacion = obtenerValor(personaje, ['ocupacion', 'Ocupacion']) || 'Sin especificar';
        const descripcion = obtenerValor(personaje, ['descripcion', 'Descripcion']) || '';
        const imagen = obtenerValor(personaje, ['image', 'imagen', 'Image', 'Imagen']) || 'img/futurama-logo.png';

        const card = document.createElement('article');
        card.className = 'api-character';

        const image = document.createElement('img');
        image.src = imagen;
        image.alt = nombre;
        image.loading = 'lazy';
        image.onerror = () => {
            image.onerror = null;
            image.src = 'img/futurama-logo.png';
        };

        const body = document.createElement('div');
        body.className = 'api-character-body';

        const name = document.createElement('h3');
        name.textContent = nombre;

        const speciesText = document.createElement('p');
        speciesText.innerHTML = '<strong>Especie:</strong> ';
        speciesText.append(document.createTextNode(especie));

        const occupationText = document.createElement('p');
        occupationText.innerHTML = '<strong>Ocupación:</strong> ';
        occupationText.append(document.createTextNode(ocupacion));

        const description = document.createElement('p');
        description.textContent = descripcion;

        body.append(name, speciesText, occupationText, description);
        card.append(image, body);
        charactersContainer.append(card);
    });
}

function aplicarFiltros() {
    const nombreBuscado = normalizarTexto(filterName.value);
    const ocupacionSeleccionada = normalizarTexto(filterOccupation.value);
    const especieSeleccionada = normalizarTexto(filterSpecies.value);

    const personajesFiltrados = personajesBase.filter((personaje) => {
        const nombre = normalizarTexto(obtenerValor(personaje, ['nombre', 'Nombre']));
        const ocupacion = normalizarTexto(obtenerValor(personaje, ['ocupacion', 'Ocupacion']));
        const especie = normalizarTexto(obtenerValor(personaje, ['especie', 'Especie']));

        const coincideNombre = !nombreBuscado || nombre.includes(nombreBuscado);
        const coincideOcupacion = !ocupacionSeleccionada || ocupacion === ocupacionSeleccionada;
        const coincideEspecie = !especieSeleccionada || especie === especieSeleccionada;

        return coincideNombre && coincideOcupacion && coincideEspecie;
    });

    if (!personajesFiltrados.length) {
        charactersMessage.textContent = '0 personajes encontrados.';
    } else if (personajesFiltrados.length === personajesBase.length) {
        charactersMessage.textContent = `${personajesFiltrados.length} personajes cargados.`;
    } else {
        charactersMessage.textContent = `Mostrando ${personajesFiltrados.length} de ${personajesBase.length} personajes.`;
    }

    renderPersonajes(personajesFiltrados);
}

async function fetchPersonajes() {
    if (window.personajes && Array.isArray(window.personajes)) {
        return window.personajes;
    }

    const response = await fetch('json/personajes.json');
    if (!response.ok) {
        throw new Error(`El servidor respondió con HTTP ${response.status}`);
    }

    return await response.json();
}

async function cargarPersonajesAPI() {
    charactersMessage.textContent = 'Cargando personajes desde la API local...';
    charactersContainer.replaceChildren();
    jsonOutput.textContent = 'Consultando json/personajes.json (o variable global window.personajes)...';

    try {
        const personajes = await fetchPersonajes();
        personajesBase = Array.isArray(personajes) ? personajes : [];

        apiStatus.classList.remove('error');
        apiStatus.classList.add('connected');
        apiStatus.innerHTML = '<span class="status-dot"></span> API conectada correctamente';

        jsonOutput.textContent = JSON.stringify(personajesBase, null, 2);

        poblarFiltros(personajesBase);
        aplicarFiltros();
    } catch (error) {
        apiStatus.classList.remove('connected');
        apiStatus.classList.add('error');
        apiStatus.innerHTML = '<span class="status-dot"></span> No se pudo conectar con la API';

        if (!window.personajes) {
            charactersMessage.textContent = 'Abre esta carpeta con Live Server o sirve los archivos por HTTP, o usa la versión sin servidor.';
            jsonOutput.textContent = `${error.message}
Si deseas abrir el HTML directamente (file://), crea el archivo js/personajes.js con la variable global window.personajes.`;
        } else {
            charactersMessage.textContent = 'Error procesando los datos embebidos. Presiona "Actualizar".';
            jsonOutput.textContent = error.message;
        }
    }
}

reloadButton.addEventListener('click', cargarPersonajesAPI);
filterName.addEventListener('input', aplicarFiltros);
filterOccupation.addEventListener('change', aplicarFiltros);
filterSpecies.addEventListener('change', aplicarFiltros);

clearFiltersButton.addEventListener('click', () => {
    filterName.value = '';
    filterOccupation.value = '';
    filterSpecies.value = '';
    aplicarFiltros();
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cargarPersonajesAPI);
} else {
    cargarPersonajesAPI();
}