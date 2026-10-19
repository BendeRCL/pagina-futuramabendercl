
function validarFormulario(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    
    if (!nombre || !email) {
        alert('Por favor completa todos los campos');
        return false;
    }
    
    console.log('Formulario válido:', { nombre, email });
    return true;
}


function descargarCV() {
    const elemento = document.querySelector('.cv-container');
    
    if (elemento) {
        // Aquí iría la lógica para descargar como PDF
        console.log('Descargando CV...');
        alert('Función de descarga de PDF - En desarrollo');
    }
}


function imprimirCV() {
    window.print();
}

function copiarEmail() {
    const email = 'maxodiaz@gmail.com';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
            alert('Email copiado: ' + email);
        }).catch(err => {
            console.error('Error al copiar:', err);
        });
    } else {
        alert('Tu navegador no soporta copiar al portapapeles');
    }
}


function resaltarSecciones() {
    const secciones = document.querySelectorAll('section h2');
    
    secciones.forEach((seccion, index) => {
        seccion.style.transition = 'color 0.3s ease';
        
    
        seccion.addEventListener('mouseover', function() {
            this.style.color = '#FF6D00';
        });
        
        seccion.addEventListener('mouseout', function() {
            this.style.color = '#1f2937';
        });
    });
}

function animarElementos() {
    const elementos = document.querySelectorAll('section');
    
    elementos.forEach((elemento, index) => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(20px)';
        elemento.style.transition = `all 0.5s ease ${index * 0.1}s`;
        
       
        setTimeout(() => {
            elemento.style.opacity = '1';
            elemento.style.transform = 'translateY(0)';
        }, 100);
    });
}


function cambiarTema() {
    const body = document.body;
    
   
    if (body.style.backgroundColor === 'rgb(242, 244, 247)') {
        body.style.backgroundColor = '#1a1a1a';
        body.style.color = '#ffffff';
        console.log('Tema oscuro activado');
    } else {
        body.style.backgroundColor = '#f2f4f7';
        body.style.color = '#333333';
        console.log('Tema claro activado');
    }
}


function validarEmail(email) {
    const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionRegular.test(email);
}


function activarLinksPortafolio() {
    const links = document.querySelectorAll('.portfolio-link');
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            
            if (this.href === '#') {
                event.preventDefault();
                console.log('Link de portafolio no configurado');
                alert('El portafolio aún no está disponible');
            }
        });
    });
}

function inicializar() {
    console.log('🎓 Cargando Currículum Vitae...');
    
    animarElementos();
    resaltarSecciones();
    activarLinksPortafolio();

    const btnDescargar = document.querySelector('.btn-descargar');
    if (btnDescargar) {
        btnDescargar.addEventListener('click', descargarCV);
    }
    
    console.log('✅ Currículum cargado exitosamente');
}


document.addEventListener('DOMContentLoaded', inicializar);

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'p') {
        event.preventDefault();
        imprimirCV();
    }
});
