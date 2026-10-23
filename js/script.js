function mostrarInformacion() {
    const seccionPersonajes = document.getElementById('personajes');

    if (!seccionPersonajes) {
        return;
    }

    if (seccionPersonajes.classList.contains('oculto')) {
        seccionPersonajes.classList.remove('oculto');
        console.log('Información de personajes mostrada');
    } else {
        seccionPersonajes.classList.add('oculto');
        console.log('Información de personajes ocultada');
    }
}

function irASeccion(idSeccion) {
    const seccion = document.getElementById(idSeccion);

    if (seccion) {
        seccion.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        console.warn('No se encontró la sección:', idSeccion);
    }
}

function procesarFormulario(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (nombre === '' || email === '' || mensaje === '') {
        alert('Por favor, completa todos los campos del formulario');
        return;
    }

    if (!validarEmail(email)) {
        alert('Por favor, ingresa un email válido');
        return;
    }

    mostrarMensajeExito(nombre);

    document.getElementById('formularioContacto').reset();

    console.log('Datos enviados:', {
        nombre,
        email,
        mensaje
    });
}

function validarEmail(email) {
    const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionRegular.test(email);
}

function mostrarMensajeExito(nombre) {
    const mensajeDiv = document.getElementById('mensajeExito');

    if (!mensajeDiv) {
        return;
    }

    mensajeDiv.textContent =
        `¡Gracias ${nombre}! Tu mensaje ha sido enviado correctamente.`;

    mensajeDiv.classList.remove('oculto');

    setTimeout(function() {
        mensajeDiv.classList.add('oculto');
    }, 4000);
}

function cambiarTema(tema) {
    const root = document.documentElement;

    if (tema === 'oscuro') {
        root.style.setProperty('--color-primary', '#FF6D00');
        root.style.setProperty('--color-secondary', '#00BCD4');
    } else if (tema === 'neon') {
        root.style.setProperty('--color-primary', '#fffb00');
        root.style.setProperty('--color-secondary', '#FF00FF');
    } else if (tema === 'clasico') {
        root.style.setProperty('--color-primary', '#FFD700');
        root.style.setProperty('--color-secondary', '#FF6347');
    }
}

function animarTarjetas() {
    const tarjetas = document.querySelectorAll('.tarjeta-personaje');

    tarjetas.forEach((tarjeta, index) => {
        tarjeta.style.opacity = '0';
        tarjeta.style.transform = 'translateY(20px)';

        setTimeout(() => {
            tarjeta.style.transition = 'all 0.5s ease';
            tarjeta.style.opacity = '1';
            tarjeta.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function aplicarEstilosAlternos() {
    const features = document.querySelectorAll('.feature');

    features.forEach((feature, index) => {
        if (index % 2 === 0) {
            feature.style.background = 'rgba(255, 109, 0, 0.1)';
            feature.style.borderLeftColor = '#FF6D00';
        }
    });
}

function agregarScrollSuave() {
    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {
            anchor.addEventListener('click', function(event) {
                event.preventDefault();

                const target = document.querySelector(
                    this.getAttribute('href')
                );

                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
}

function agregarEfectosHover() {
    const links = document.querySelectorAll('.nav-links a');

    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('¡Página de Futurama cargada!');

    const btnMostrar = document.getElementById('btnMostrar');

    if (btnMostrar) {
        btnMostrar.addEventListener('click', function() {
            irASeccion('caracteristicas');
        });
    }

    const btnPersonajes = document.getElementById('btnPersonajes');

    if (btnPersonajes) {
        btnPersonajes.addEventListener('click', function() {
            irASeccion('personajes');
        });
    }

    const formulario = document.getElementById('formularioContacto');

    if (formulario) {
        formulario.addEventListener('submit', procesarFormulario);
    }

    animarTarjetas();
    aplicarEstilosAlternos();
    agregarScrollSuave();
    agregarEfectosHover();
});

window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});