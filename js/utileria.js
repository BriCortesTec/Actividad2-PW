//PURAS funciones
//login.js donde separe codigo de js 
//se puede desde el html, hay cada validacion en cada input -> 

/* Validar correo (estructura básica) */
function validarCorreo(correo){
    const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //validacion de caracteres
    return expresion.test(correo);
}

/* Solo letras, junto con vocales con tilde y letra Ñ*/
function soloLetras(texto){
    return /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ]+$/.test(texto); //validadion
}

/* Validar longitud */
function validarLongitud(numero,maxLongitud){
    const valor = String(numero);
    return  /^\d+$/.test(valor) && valor.length <= maxLongitud;//true si el numero cumple con la lomgotud minima
}

/*
 * Calcula la edad de una persona a partir de su fecha de nacimiento.
 *
 * @param {string} fechaNacimiento - Fecha en formato YYYY-MM-DD.
 * @returns {number} Edad actual de la persona.
 */

function calcularEdad(fechaNacimiento){
    const nacimiento = new Date (fechaNacimiento + "T00:00:00");
    const hoy = new Date();

    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes<0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad;
}

/* Mayor de edad */
function esMayorDeEdad(fechaNacimiento){
    return calcularEdad(fechaNacimiento ) >= 18;
}

/* Validar Password */
function validarPassword(password){
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneMinuscula = /[a-z]/.test(password);
    const tieneNumero = /[0-9]/.test(password);
    const tieneEspecial = /[^A-Za-z0-9]/.test(password);
    const tieneLongitud = password.length >= 8;

    return (
        tieneMayuscula &&
        tieneMinuscula &&
        tieneNumero &&
        tieneEspecial &&
        tieneLongitud
    );
}

/* Formatear nombre para que cada palabra empiece en mayusculas */
function formatearNombre(texto){
    return texto 
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map( palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(" ");
}

/* Validar Telefono, que solo tenga 10 digitos */
function validarTelefono(telefono){
    return /^\d{10}$/.test(telefono);
}
