"use strict";

import GeneradorContrasena from "./algt.pingoo.js";

const genl = {
  view: function () {
    return m("input", {
      id: "intl_pingoo",
      type: "text",
      max: "71",
      readonly: true,
    });
  },
};

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#intl_pingoo")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        window.location.reload();
      }
    });

    document.querySelector("#intl_pingoo").value = new GeneradorContrasena().generarContrasena({
    longitud: 71,
    minMayusculas: 2,
    minMinusculas: 2,
    minNumeros: 2,
    minEspeciales: 2,
  });
});

export default genl;
