const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", function(event) {
    event.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value;
    const mensaje = document.getElementById("mensajeLogin");

    // Verificar si no se llenó ningún campo y cuales faltan
    const campos = [
        { id: "correo", label: "Correo electrónico" },
        { id: "password", label: "Contraseña" }
    ];

    const faltantes = campos.filter(c => document.getElementById(c.id).value.trim() === "");

    campos.forEach(c => document.getElementById(c.id).classList.remove("campo-error"));

    if (faltantes.length > 0) {
        faltantes.forEach(c => document.getElementById(c.id).classList.add("campo-error"));
        mensaje.textContent = faltantes.length === 1
            ? `Falta 1 campo: ${faltantes[0].label}`
            : `Faltan ${faltantes.length} campos: ${faltantes.map(c => c.label).join(", ")}`;
        return;
    }

    // Utilizamos validarCorreo() de la librería
    if (!validarCorreo(correo)){
        mensaje.textContent = "El correo electrónico no tiene un formato válido";
        return;
    }

    // Utilizamos validarPassword() de la librería
    if (!validarPassword(password)){
        mensaje.textContent = "La contraseña no cumple los requisitos de seguridad";
        return;
    }

    // Comprobar datos registrados
    const correoGuardado = localStorage.getItem("usuarioCorreo");
    const passwordGuardada = localStorage.getItem("usuarioPassword");

    if ( correo === correoGuardado &&  password === passwordGuardada){
        const nombre = localStorage.getItem("usuarioNombre");
        document.getElementById("resultadoLogin").textContent =
            `Hola, ${nombre}. Inicio de sesión correcto.`;
        document.getElementById("modalLogin").style.display = "flex";
        mensaje.textContent = "";
    } else {
        mensaje.textContent = "Correo o contraseña incorrectos";
    }
});

// Cerrar modal
document.getElementById("cerrarModalLogin").addEventListener("click", function() {
    document.getElementById("modalLogin").style.display = "none";
});

// Botón aceptar
document.getElementById("aceptarModalLogin").addEventListener("click", function() {
    document.getElementById("modalLogin").style.display = "none";
});