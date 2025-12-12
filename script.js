// ==================== BUSCADOR AVANZADO ====================
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    const sections = document.querySelectorAll('.section');
    
    if (searchTerm === '') {
        // Mostrar todo si el buscador está vacío
        sections.forEach(section => {
            section.style.display = '';
            const products = section.querySelectorAll('.product-card, .carnes-list li, .acomp-list li, .bebida-list li');
            products.forEach(product => {
                product.style.display = '';
            });
        });
        
        // Eliminar mensaje de no resultados si existe
        const noResultsMsg = document.getElementById('noResultsMessage');
        if (noResultsMsg) {
            noResultsMsg.remove();
        }
        return;
    }
    
    let hasResults = false;
    
    sections.forEach(section => {
        let sectionHasResults = false;
        
        // Buscar en product-card
        const productCards = section.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const name = card.querySelector('.product-name')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.product-description')?.textContent.toLowerCase() || '';
            const price = card.querySelector('.product-price')?.textContent.toLowerCase() || '';
            
            if (name.includes(searchTerm) || description.includes(searchTerm) || price.includes(searchTerm)) {
                card.style.display = '';
                sectionHasResults = true;
                hasResults = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Buscar en carnes-list
        const carnesList = section.querySelectorAll('.carnes-list li');
        carnesList.forEach(item => {
            const name = item.querySelector('.carne-name')?.textContent.toLowerCase() || '';
            const price = item.querySelector('.carne-price')?.textContent.toLowerCase() || '';
            const fullText = item.textContent.toLowerCase();
            
            if (name.includes(searchTerm) || price.includes(searchTerm) || fullText.includes(searchTerm)) {
                item.style.display = '';
                sectionHasResults = true;
                hasResults = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Buscar en acomp-list
        const acompList = section.querySelectorAll('.acomp-list li');
        acompList.forEach(item => {
            const text = item.textContent.toLowerCase();
            
            if (text.includes(searchTerm)) {
                item.style.display = '';
                sectionHasResults = true;
                hasResults = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Buscar en bebida-list
        const bebidaList = section.querySelectorAll('.bebida-list li');
        bebidaList.forEach(item => {
            const text = item.textContent.toLowerCase();
            
            if (text.includes(searchTerm)) {
                item.style.display = '';
                sectionHasResults = true;
                hasResults = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Ocultar sección completa si no tiene resultados
        section.style.display = sectionHasResults ? '' : 'none';
    });
    
    // Mostrar mensaje si no hay resultados
    let noResultsMsg = document.getElementById('noResultsMessage');
    if (!hasResults) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.id = 'noResultsMessage';
            noResultsMsg.style.cssText = `
                text-align: center; 
                padding: 60px 20px; 
                font-size: 1.5rem; 
                color: #722F37;
                background-color: white;
                border-radius: 15px;
                margin: 30px auto;
                max-width: 600px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            `;
            noResultsMsg.innerHTML = `
                <div style="font-size: 4rem; margin-bottom: 20px;">🔍</div>
                <div style="font-weight: bold; margin-bottom: 10px;">No se encontraron resultados</div>
                <div style="font-size: 1rem; color: #666;">para "${searchTerm}"</div>
            `;
            document.querySelector('.container').insertBefore(noResultsMsg, document.querySelector('.container').firstChild);
        }
    } else {
        if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }
});

// Limpiar búsqueda con ESC
document.getElementById('searchInput').addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        this.value = '';
        this.dispatchEvent(new Event('input'));
    }
});

// ==================== NAVEGACIÓN SUAVE ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const navHeight = document.querySelector('.nav-categories').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - headerHeight - navHeight - 20;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Marcar categoría activa
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Efecto visual en la sección
            target.style.transform = 'scale(1.02)';
            target.style.transition = 'transform 0.3s';
            setTimeout(() => {
                target.style.transform = 'scale(1)';
            }, 300);
        }
    });
});

// ==================== DETECCIÓN DE SCROLL ====================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const navButtons = document.querySelectorAll('.category-btn');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPos = window.pageYOffset + 250;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('href') === '#' + currentSection) {
            btn.classList.add('active');
        }
    });
});

// ==================== MODAL ====================
function openModal() {
    document.getElementById('formularioModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Efecto de entrada
    const modalContent = document.querySelector('.modal-content');
    modalContent.style.transform = 'scale(0.7)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modalContent.style.transition = 'all 0.3s';
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
    }, 10);
}

function closeModal() {
    const modalContent = document.querySelector('.modal-content');
    modalContent.style.transform = 'scale(0.7)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        document.getElementById('formularioModal').classList.remove('active');
        document.body.style.overflow = '';
    }, 300);
}

// Cerrar modal al hacer clic fuera
document.getElementById('formularioModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('formularioModal');
        if (modal.classList.contains('active')) {
            closeModal();
        }
    }
});

// ==================== ENVIAR FORMULARIO ====================
function handleSubmit() {
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const mesa = document.getElementById('mesa').value.trim();
    const comentarios = document.getElementById('comentarios').value.trim();
    
    // Validaciones
    if (!nombre) {
        showAlert('Por favor ingresa tu nombre', 'error');
        document.getElementById('nombre').focus();
        return;
    }
    
    if (!telefono) {
        showAlert('Por favor ingresa tu teléfono', 'error');
        document.getElementById('telefono').focus();
        return;
    }
    
    // Validar formato de teléfono (solo números y espacios)
    const telefonoRegex = /^[0-9\s]+$/;
    if (!telefonoRegex.test(telefono)) {
        showAlert('El teléfono solo debe contener números', 'error');
        document.getElementById('telefono').focus();
        return;
    }
    
    const formData = {
        nombre: nombre,
        telefono: telefono,
        mesa: mesa,
        comentarios: comentarios
    };

    console.log('Datos del cliente:', formData);

    // LLAMADA A LA BASE DE DATOS
    fetch('api/guardar-cliente.php', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showAlert('¡Gracias por tu visita, ' + formData.nombre + '! Tus datos han sido registrados exitosamente.', 'success');
            
            // Limpiar formulario
            document.getElementById('nombre').value = '';
            document.getElementById('telefono').value = '';
            document.getElementById('mesa').value = '';
            document.getElementById('comentarios').value = '';
            
            // Cerrar modal después de 2 segundos
            setTimeout(() => {
                closeModal();
            }, 2000);
        } else {
            showAlert('Error: ' + (data.error || 'No se pudo guardar el registro'), 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Si no hay conexión con el servidor, mostrar simulación
        showAlert('¡Gracias por tu visita, ' + formData.nombre + '! Tus datos han sido registrados (modo demo).', 'success');
        
        // Limpiar formulario
        document.getElementById('nombre').value = '';
        document.getElementById('telefono').value = '';
        document.getElementById('mesa').value = '';
        document.getElementById('comentarios').value = '';
        
        setTimeout(() => {
            closeModal();
        }, 2000);
    });
}

// ==================== SISTEMA DE ALERTAS ====================
function showAlert(message, type) {
    // Eliminar alerta previa si existe
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alert = document.createElement('div');
    alert.className = 'custom-alert';
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        padding: 20px 30px;
        border-radius: 12px;
        font-size: 1.1rem;
        font-weight: bold;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        animation: slideDown 0.3s ease;
        max-width: 90%;
        text-align: center;
    `;
    
    if (type === 'success') {
        alert.style.backgroundColor = '#D4AF37';
        alert.style.color = '#1a1a1a';
        alert.innerHTML = '✅ ' + message;
    } else {
        alert.style.backgroundColor = '#722F37';
        alert.style.color = '#FFFFFF';
        alert.innerHTML = '❌ ' + message;
    }
    
    document.body.appendChild(alert);
    
    // Eliminar después de 4 segundos
    setTimeout(() => {
        alert.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => alert.remove(), 300);
    }, 4000);
}

// Agregar animaciones CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== VALIDACIÓN DE TELÉFONO EN TIEMPO REAL ====================
document.getElementById('telefono').addEventListener('input', function(e) {
    // Solo permitir números y espacios
    this.value = this.value.replace(/[^0-9\s]/g, '');
    
    // Agregar indicador visual de validez
    if (this.value.length > 0) {
        if (/^[0-9\s]+$/.test(this.value)) {
            this.style.borderColor = '#D4AF37';
        } else {
            this.style.borderColor = '#722F37';
        }
    }
});

// ==================== VALIDACIÓN DE NOMBRE EN TIEMPO REAL ====================
document.getElementById('nombre').addEventListener('input', function(e) {
    // Capitalizar primera letra de cada palabra
    const words = this.value.split(' ');
    const capitalized = words.map(word => {
        if (word.length > 0) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
        return word;
    });
    this.value = capitalized.join(' ');
});

// ==================== EFECTOS HOVER EN PRODUCTOS ====================
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ==================== CONTADOR DE CARACTERES EN COMENTARIOS ====================
const comentariosTextarea = document.getElementById('comentarios');
if (comentariosTextarea) {
    const maxLength = 500;
    
    const counter = document.createElement('div');
    counter.style.cssText = 'text-align: right; font-size: 0.85rem; color: #666; margin-top: 5px;';
    counter.textContent = `0 / ${maxLength} caracteres`;
    
    comentariosTextarea.parentNode.appendChild(counter);
    comentariosTextarea.setAttribute('maxlength', maxLength);
    
    comentariosTextarea.addEventListener('input', function() {
        const count = this.value.length;
        counter.textContent = `${count} / ${maxLength} caracteres`;
        
        if (count > maxLength * 0.9) {
            counter.style.color = '#722F37';
        } else {
            counter.style.color = '#666';
        }
    });
}

// ==================== BOTÓN "VOLVER ARRIBA" ====================
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 25px;
    background: linear-gradient(135deg, #D4AF37, #F4E4B5);
    color: #1a1a1a;
    width: 50px;
    height: 50px;
    border: 2px solid #722F37;
    border-radius: 50%;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    z-index: 97;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1) rotate(360deg)';
});

scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1) rotate(0deg)';
});

// ==================== HIGHLIGHT DE BÚSQUEDA ====================
function highlightSearchTerm(element, searchTerm) {
    const text = element.textContent;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const highlightedText = text.replace(regex, '<mark style="background-color: #D4AF37; color: #1a1a1a; padding: 2px 4px; border-radius: 3px;">$1</mark>');
    element.innerHTML = highlightedText;
}

// ==================== MENSAJE DE BIENVENIDA ====================
window.addEventListener('load', function() {
    setTimeout(() => {
        showAlert('¡Bienvenido a Meat House Cabeza y Cola! 🥩', 'success');
    }, 500);
});

console.log('🥩 Menú Digital Meat House Cabeza y Cola - Cargado exitosamente');
console.log('📱 Teléfono: 310 428 8493');
console.log('✨ Desarrollado con amor para la mejor experiencia gastronómica');

