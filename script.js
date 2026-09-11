function agregarEstudiante() {
    // 1. Obtener elementos del DOM
    const inputNombre = document.getElementById("nombre");
    const inputApellido = document.getElementById("apellido");
    const inputNota1 = document.getElementById("nota1");
    const inputNota2 = document.getElementById("nota2");
    const inputNota3 = document.getElementById("nota3");

    const errorNombre = document.getElementById("errorNombre");
    const errorApellido = document.getElementById("errorApellido");
    const errorNota1 = document.getElementById("errorNota1");
    const errorNota2 = document.getElementById("errorNota2");
    const errorNota3 = document.getElementById("errorNota3");

    // 2. Limpiar mensajes de error y clases de error previas
    const inputs = [inputNombre, inputApellido, inputNota1, inputNota2, inputNota3];
    const errores = [errorNombre, errorApellido, errorNota1, errorNota2, errorNota3];

    errores.forEach(error => error.textContent = "");
    inputs.forEach(input => input.classList.remove("input-error"));

    // 3. Obtener valores procesados
    const nombre = inputNombre.value.trim();
    const apellido = inputApellido.value.trim();
    const nota1Val = inputNota1.value;
    const nota2Val = inputNota2.value;
    const nota3Val = inputNota3.value;

    const nota1 = parseFloat(nota1Val);
    const nota2 = parseFloat(nota2Val);
    const nota3 = parseFloat(nota3Val);

    let esValido = true;

    // 4. Validaciones individuales
    if (nombre === "") {
        errorNombre.textContent = "Introduce tu nombre";
        inputNombre.classList.add("input-error");
        esValido = false;
    }

    if (apellido === "") {
        errorApellido.textContent = "Introduce tu apellido";
        inputApellido.classList.add("input-error");
        esValido = false;
    }

    if (nota1Val === "" || isNaN(nota1) || nota1 < 1.0 || nota1 > 7.0) {
        errorNota1.textContent = "Introduce una nota entre 1.0 y 7.0";
        inputNota1.classList.add("input-error");
        esValido = false;
    }

    if (nota2Val === "" || isNaN(nota2) || nota2 < 1.0 || nota2 > 7.0) {
        errorNota2.textContent = "Introduce una nota entre 1.0 y 7.0";
        inputNota2.classList.add("input-error");
        esValido = false;
    }

    if (nota3Val === "" || isNaN(nota3) || nota3 < 1.0 || nota3 > 7.0) {
        errorNota3.textContent = "Introduce una nota entre 1.0 y 7.0";
        inputNota3.classList.add("input-error");
        esValido = false;
    }

    // Detener la ejecución si el formulario no es válido
    if (!esValido) {
        return;
    }

    // 5. Calcular promedio ponderado (30% + 40% + 30%)
    const promedio = (nota1 * 0.30) + (nota2 * 0.40) + (nota3 * 0.30);
    const estado = promedio >= 4.0 ? "Aprobado" : "Reprobado";

    // 6. Insertar fila en la tabla
    const tabla = document.getElementById("tablaEstudiantes");
    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${nombre}</td>
        <td>${apellido}</td>
        <td>${nota1.toFixed(1)}</td>
        <td>${nota2.toFixed(1)}</td>
        <td>${nota3.toFixed(1)}</td>
        <td class="${promedio < 4.0 ? 'promedio-reprobado' : ''}">${promedio.toFixed(1)}</td>
        <td class="${estado === 'Aprobado' ? 'aprobado' : 'reprobado'}">${estado}</td>
    `;

    tabla.appendChild(fila);

    // 7. Limpiar formulario tras el éxito
    document.getElementById("formEstudiante").reset();
}