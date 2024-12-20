class GeneradorContrasena {
  constructor() {
    this.mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.minusculas = "abcdefghijklmnopqrstuvwxyz";
    this.numeros = "0123456789";
    this.especiales = "!@#$%^&*()_-+=[]{}|;:,.<>/?";
  }

  obtenerBytesAleatorios(length) {
    return window.crypto.getRandomValues(new Uint8Array(length));
  }

  caracterAleatorioSeguro(str) {
    const bytes = this.obtenerBytesAleatorios(1);
    return str.charAt(bytes[0] % str.length);
  }

  mezclarCadena(str) {
    const array = str.split("");
    for (let i = array.length - 1; i > 0; i--) {
      const j = this.obtenerBytesAleatorios(1)[0] % (i + 1);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");
  }

  generarContrasena({
    longitud = 20,
    incluirMayusculas = true,
    incluirMinusculas = true,
    incluirNumeros = true,
    incluirEspeciales = true,
    minMayusculas = 1,
    minMinusculas = 1,
    minNumeros = 1,
    minEspeciales = 1,
  } = {}) {
    if (longitud < 8)
      throw new Error("La longitud mínima debe ser 8 caracteres");

    const minCaracteresRequeridos =
      (incluirMayusculas ? minMayusculas : 0) +
      (incluirMinusculas ? minMinusculas : 0) +
      (incluirNumeros ? minNumeros : 0) +
      (incluirEspeciales ? minEspeciales : 0);

    if (minCaracteresRequeridos > longitud) {
      throw new Error(
        "La suma de caracteres mínimos requeridos excede la longitud total"
      );
    }

    let contraseña = "";

    if (incluirMayusculas) {
      for (let i = 0; i < minMayusculas; i++) {
        contraseña += this.caracterAleatorioSeguro(this.mayusculas);
      }
    }

    if (incluirMinusculas) {
      for (let i = 0; i < minMinusculas; i++) {
        contraseña += this.caracterAleatorioSeguro(this.minusculas);
      }
    }

    if (incluirNumeros) {
      for (let i = 0; i < minNumeros; i++) {
        contraseña += this.caracterAleatorioSeguro(this.numeros);
      }
    }

    if (incluirEspeciales) {
      for (let i = 0; i < minEspeciales; i++) {
        contraseña += this.caracterAleatorioSeguro(this.especiales);
      }
    }

    let caracteresPermitidos = "";
    if (incluirMayusculas) caracteresPermitidos += this.mayusculas;
    if (incluirMinusculas) caracteresPermitidos += this.minusculas;
    if (incluirNumeros) caracteresPermitidos += this.numeros;
    if (incluirEspeciales) caracteresPermitidos += this.especiales;

    const caracteresRestantes = longitud - contraseña.length;
    for (let i = 0; i < caracteresRestantes; i++) {
      contraseña += this.caracterAleatorioSeguro(caracteresPermitidos);
    }

    return this.mezclarCadena(contraseña);
  }

  verificarFortaleza(contraseña) {
    const tieneMayusculas = /[A-Z]/.test(contraseña);
    const tieneMinusculas = /[a-z]/.test(contraseña);
    const tieneNumeros = /[0-9]/.test(contraseña);
    const tieneEspeciales = /[!@#$%^&*()_\-+=\[\]{}|;:,.<>/?]/.test(contraseña);

    let puntuacion = 0;
    if (tieneMayusculas) puntuacion++;
    if (tieneMinusculas) puntuacion++;
    if (tieneNumeros) puntuacion++;
    if (tieneEspeciales) puntuacion++;
    if (contraseña.length >= 12) puntuacion++;

    return {
      fortaleza: puntuacion,
      tieneMayusculas,
      tieneMinusculas,
      tieneNumeros,
      tieneEspeciales,
      longitudSuficiente: contraseña.length >= 12,
    };
  }
}


export default GeneradorContrasena;
