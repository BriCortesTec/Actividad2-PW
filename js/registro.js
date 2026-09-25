const formulario = document.getElementById("formRegistro");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const telefono = document.getElementById("telefono").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value;

    const mensaje = document.getElementById("mensaje");
    const palabras = nombre.split(/\s+/);// Validar nombre

    const nombreValido =palabras.length >= 2 && palabras.every(palabra => soloLetras(palabra));
    
    // Verificar si todos los campos están vacíos y cuales faltan por llenar
    const campos = [
        { id: "nombre", label: "Nombre completo" },
        { id: "fechaNacimiento", label: "Fecha de nacimiento" },
        { id: "telefono", label: "Teléfono" },
        { id: "correo", label: "Correo electrónico" },
        { id: "password", label: "Contraseña" }
    ];

    const faltantes = campos.filter(c => document.getElementById(c.id).value.trim() === "");

    // Quita el resaltado de todos antes de volver a marcar
    campos.forEach(c => document.getElementById(c.id).classList.remove("campo-error"));

    if (faltantes.length > 0) {
        faltantes.forEach(c => document.getElementById(c.id).classList.add("campo-error"));
        mensaje.textContent = faltantes.length === 1
            ? `Falta 1 campo: ${faltantes[0].label}`
            : `Faltan ${faltantes.length} campos: ${faltantes.map(c => c.label).join(", ")}`;
        return;
    }
    if (!nombreValido) {
        mensaje.textContent = "El nombre debe contener únicamente letras y tener nombre y apellido";
        return;
    }

    // Formatear nombre usando función propia desde la utileria
    const nombreFormateado = formatearNombre(nombre);

    // Validar fecha
    if (!fechaNacimiento) {
        mensaje.textContent = "Selecciona tu fecha de nacimiento.";
        return;
    }

    // Validar mayoría de edad
    if (!esMayorDeEdad(fechaNacimiento)) {
        mensaje.textContent = "Debes ser mayor de edad para registrarte.";
        return;
    }

    // Validar teléfono
    if (!validarTelefono(telefono)) {
        mensaje.textContent = "El teléfono debe contener exactamente 10 dígitos.";
        return;
    }

    // Demostración de validarLongitud
    if (!validarLongitud(telefono, 10)) {
        mensaje.textContent = "El teléfono no puede superar los 10 dígitos.";
        return;
    }

    // Validar correo
    if (!validarCorreo(correo)) {
        mensaje.textContent = "Ingresa un correo electrónico válido.";
        return;
    }

    // Validar contraseña
    if (!validarPassword(password)) {
        mensaje.textContent = "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";
        return;
    }

    // Calcular edad
    const edad = calcularEdad(fechaNacimiento);

    // Guardar datos para demostración del login
    localStorage.setItem(
        "usuarioCorreo",
        correo
    );

    localStorage.setItem(
        "usuarioPassword",
        password
    );

    localStorage.setItem(
        "usuarioNombre",
        nombreFormateado
    );

    // Mostrar edad en el modal
    document.getElementById("resultadoEdad").textContent =
        `${nombreFormateado}, tienes ${edad} años y tu registro fue exitoso.`;

    document.getElementById("modalEdad").style.display = "flex";

    mensaje.textContent = "";
});


// Cerrar modal
document.getElementById("cerrarModal").addEventListener("click", function() {
    document.getElementById("modalEdad").style.display = "none";
});


// Botón aceptar
document.getElementById("aceptarModal").addEventListener("click", function() {
    document.getElementById("modalEdad").style.display = "none";
});