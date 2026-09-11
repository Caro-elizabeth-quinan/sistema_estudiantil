function agregarEstudiante() {
    const nombreInput = document.getElementById("nombre");
    const apellidoInput = document.getElementById("apellido");
    const promedioInput = document.getElementById("promedio");

    const errorNombre = document.getElementById("errorNombre");
    const errorApellido = document.getElementById("errorApellido");
    const errorPromedio = document.getElementById("errorPromedio");

    // Limpiar errores previos y quitar borde rojo de los inputs
    errorNombre.textContent = "";
    errorApellido.textContent = "";
    errorPromedio.textContent = "";
    
    nombreInput.classList.remove("input-error");
    apellidoInput.classList.remove("input-error");
    promedioInput.classList.remove("input-error");

    const nombre = nombreInput.value.trim();
    const apellido = apellidoInput.value.trim();
    const promedio = parseFloat(promedioInput.value);

    let esValido = true;

    // Validar nombre
    if (nombre === "") {
        errorNombre.textContent = "Es obligatorio Introudcir el nombre, por favor registralo";
        nombreInput.classList.add("input-error");
        esValido = false;
    }

    // Validar apellido
    if (apellido === "") {
        errorApellido.textContent = "Es obligatorio Introudcir el apellido, por favor registralo";
        apellidoInput.classList.add("input-error");
        esValido = false;
    }

    // Validar promedio
    if (isNaN(promedio) || promedio < 1.0 || promedio > 7.0) {
        errorPromedio.textContent = "Introduce un promedio válido entre 1.0 y 7.0";
        promedioInput.classList.add("input-error");
        esValido = false;
    }

    // Si hay algún error, detener ejecución
    if (!esValido) {
        return;
    }

    // Determinar estado
    const estado = promedio >= 4.0 ? "Aprobado" : "Reprobado";

    // Obtener la tabla
    const tabla = document.getElementById("tablaEstudiantes");

    // Crear fila y celdas
    const fila = document.createElement("tr");

    const celdaNombre = document.createElement("td");
    const celdaApellido = document.createElement("td");
    const celdaPromedio = document.createElement("td");
    const celdaEstado = document.createElement("td");

    // Asignar valores
    celdaNombre.textContent = nombre;
    celdaApellido.textContent = apellido;
    celdaPromedio.textContent = promedio.toFixed(1);
    celdaEstado.textContent = estado;

    // Aplicar clase de estado
    celdaEstado.classList.add(
        estado === "Aprobado" ? "aprobado" : "reprobado"
    );

    if (promedio < 4.0) {
        celdaPromedio.classList.add("promedio-reprobado");
    }

    // Agregar celdas a la fila
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaApellido);
    fila.appendChild(celdaPromedio);
    fila.appendChild(celdaEstado);

    // Agregar fila a la tabla
    tabla.appendChild(fila);

    // Limpiar formulario
    document.getElementById("formEstudiante").reset();
}