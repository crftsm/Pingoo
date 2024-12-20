/*================================================================================================
TODOS LOS DERECHOS RESERVADOS A PINGOO © 2024.
--------------------------------------------------------------------------------------------------
Archivo creado en 19 de Diciembre de 2024.
`intl.pingoo.js` es el archivo principal de la aplicación, su HTML con Mithril se escribirá aquí.
================================================================================================*/
"use strict";
import genl from "./components/genl.pingoo.js";
import GeneradorContrasena from "./components/algt.pingoo.js";

const root = document.body;

m.mount(root, {
  view: function () {
    return m("div", {class: "intl"}, [
      m(
        "div",
        { class: "headline" },
        [
          m("div", {class: "headlinec"} ,[
            m("div", {class: "headlinexd"}, [
                m("h1", [
                    "¡La mejor ",
                    m("span", {style: "color: #089CFF;"}, "elección "),
                    "para obtener ",
                    m("span", {style: "color: #F2D600;"}, "contraseñas "),
                    m("span", {style: "color: #3AD925;"}, "fuertes "),
                    "para dispositivos ",
                    m("span", {style: "color: #FF08EA;"}, "móviles "),
                    "y ",
                    m("span", {style: "color: #FF2A2A;"}, "sitios web"),
                    "!"
                ]),
                m(genl),
                m("div", {class: "headline-bts"},[
                    m("button", {class: "bt--principal"},"¡Copiar contraseña!"),
                    m("button", {class: "bt--secondary", id: "ver--conf"},"¡Ver más configuración!")
                ])
            ]),
          ]),
        ],
      ),
      m("div", { class: "configurations"}, [
        m("div", { class: "conf--headline"}, [
          m("img", {src: "web/assets/close.png", width: "32", id: "close--conf"}),
          m("h2", "Personaliza tu contraseña"),
          m("p", "Elige las opciones que usted quierás para generar tu nueva contraseña. Las activas están resaltadas en verde; haz clic en cualquiera para desactivarlas.")
        ]),
        m("div", { class: "conf--options"}, [
          m("ul", [
            m("li", { class: "conf--opt", id: "allow-symbols"}, "Permitir símbolos"),
            m("li", { class: "conf--opt", id: "allow-numbers"}, "Permitir números"),
            m("li", { class: "conf--opt", id: "allow-mayusculas-minusculas"}, "Permitir mayusculas y minusculas"),
          ])
        ])
      ]),
    ]);
  },
});

document.querySelector(".bt--principal").addEventListener("click", function() {
  const input = document.querySelector("#intl_pingoo");
  const button = document.querySelector(".bt--principal");

  // Se o valor for a mensagem de selecionar opções
  if (input.value === "Seleccione al menos una opción para que podamos crear la mejor contraseña.") {
      button.classList.add("bt--error-en-copiar");
      input.classList.add("contrasena--no-copiado");

      button.classList.remove("bt--principal");
      button.textContent = "¡Sin contraseña para copiar!";
      
      // Timeout para restaurar o botão ao estado original
      setTimeout(() => {
          button.classList.remove("bt--error-en-copiar");
          button.classList.add("bt--principal");
          button.textContent = "¡Copiar contraseña!";
          input.classList.remove("contrasena--no-copiado");
      }, 2500);
      
      return; // Impede a execução do clipboard.writeText
  }

  // Se tiver uma senha válida para copiar
  navigator.clipboard.writeText(input.value).then(() => {
      button.classList.add("bt--copiado-con-exito");
      button.classList.remove("bt--principal");
      button.textContent = "¡Copiado exitosamente!";

      input.classList.add("contrasena--copiado");
      input.removeAttribute("id");

      setTimeout(() => {
          button.classList.remove("bt--copiado-con-exito");
          button.classList.add("bt--principal");
          button.textContent = "¡Copiar contraseña!";
          
          input.classList.remove("contrasena--copiado");
          input.setAttribute("id", "intl_pingoo");
      }, 2500);
  }).catch((error) => console.log(error));
});

document.getElementById("ver--conf").addEventListener("click", function(){
  document.querySelector(".configurations").style.display = "block";
});

document.getElementById("close--conf").addEventListener("click", function(){
  document.querySelector(".configurations").style.display = "none";
});

document.querySelectorAll(".conf--opt").forEach((opt) => {
  opt.addEventListener("click", () => {
    if (opt.classList.contains("conf--opt")) {
      opt.classList.add("opt--desactivado");
      opt.classList.remove("conf--opt");

      const todosDesactivados = 
        document.querySelector("#allow-symbols").classList.contains("opt--desactivado") &&
        document.querySelector("#allow-numbers").classList.contains("opt--desactivado") &&
        document.querySelector("#allow-mayusculas-minusculas").classList.contains("opt--desactivado");

      if (todosDesactivados) {
        document.querySelector("input").value = "Seleccione al menos una opción para que podamos crear la mejor contraseña.";
      } else {
        document.querySelector("input").value = new GeneradorContrasena().generarContrasena({
          longitud: 71,
          incluirEspeciales: !document.querySelector("#allow-symbols").classList.contains("opt--desactivado"),
          incluirNumeros: !document.querySelector("#allow-numbers").classList.contains("opt--desactivado"),
          incluirMayusculas: !document.querySelector("#allow-mayusculas-minusculas").classList.contains("opt--desactivado"),
          incluirMinusculas: !document.querySelector("#allow-mayusculas-minusculas").classList.contains("opt--desactivado")
        });
      }
    } else {
      opt.classList.add("conf--opt");
      opt.classList.remove("opt--desactivado");

      document.querySelector("input").value = new GeneradorContrasena().generarContrasena({
        longitud: 71,
        incluirEspeciales: !document.querySelector("#allow-symbols").classList.contains("opt--desactivado"),
        incluirNumeros: !document.querySelector("#allow-numbers").classList.contains("opt--desactivado"),
        incluirMayusculas: !document.querySelector("#allow-mayusculas-minusculas").classList.contains("opt--desactivado"),
        incluirMinusculas: !document.querySelector("#allow-mayusculas-minusculas").classList.contains("opt--desactivado")
      });
    }
  });
});