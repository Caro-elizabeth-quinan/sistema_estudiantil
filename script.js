function agregarEstudiante() {
    // 1. Obtener elementos del DOM
    const inputNombre = document.getElementById("nombre");
    const inputApellido = document.getElementById("apellido");
    const inputNota1 = document.getElementById("nota1");
    const inputNota2 = document.getElementById("nota2");
    const inputNota3 = document.getElementById("nota3");
    const inputAsistencia = document.getElementById("asistencia");

    const errorNombre = document.getElementById("errorNombre");
    const errorApellido = document.getElementById("errorApellido");
    const errorNota1 = document.getElementById("errorNota1");
    const errorNota2 = document.getElementById("errorNota2");
    const errorNota3 = document.getElementById("errorNota3");
    const errorAsistencia = document.getElementById("errorAsistencia");

    // 2. Limpiar mensajes y estilos de error previos
    const inputs = [inputNombre, inputApellido, inputNota1, inputNota2, inputNota3, inputAsistencia];
    const errores = [errorNombre, errorApellido, errorNota1, errorNota2, errorNota3, errorAsistencia];

    errores.forEach(error => error.textContent = "");
    inputs.forEach(input => input.classList.remove("input-error"));

    // 3. Obtener valores
    const nombre = inputNombre.value.trim();
    const apellido = inputApellido.value.trim();
    const nota1Val = inputNota1.value;
    const nota2Val = inputNota2.value;
    const nota3Val = inputNota3.value;
    const asistenciaVal = inputAsistencia.value;

    const nota1 = parseFloat(nota1Val);
    const nota2 = parseFloat(nota2Val);
    const nota3 = parseFloat(nota3Val);
    const asistencia = parseFloat(asistenciaVal);

    let esValido = true;

    // 4. Validaciones del formulario
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

    if (asistenciaVal === "" || isNaN(asistencia) || asistencia < 0 || asistencia > 100) {
        errorAsistencia.textContent = "Introduce un porcentaje entre 0% y 100%";
        inputAsistencia.classList.add("input-error");
        esValido = false;
    }

    if (!esValido) {
        return;
    }

    // 5. Cálculo del promedio ponderado (30% + 40% + 30%)
    const promedio = (nota1 * 0.30) + (nota2 * 0.40) + (nota3 * 0.30);

    // 6. Lógica detallada para el Estado y la Clase CSS
    let estado = "";
    let claseEstado = "";

    if (asistencia < 60) {
        if (promedio >= 4.0) {
            estado = "Aprobado por notas y Reprobado por inasistencia";
            claseEstado = "reprobado-inasistencia"; // Badge Amarillo
        } else {
            estado = "Reprobado por notas e inasistencia";
            claseEstado = "reprobado"; // Badge Rojo
        }
    } else if (asistencia >= 60 && asistencia < 70) {
        if (promedio >= 5.0) {
            estado = "Aprobado";
            claseEstado = "aprobado"; // Badge Verde
        } else if (promedio >= 4.0) {
            estado = "Reprobado por exigenia de asistencia";
            claseEstado = "reprobado-inasistencia"; // Badge Amarillo
        } else {
            estado = "Reprobado por notas";
            claseEstado = "reprobado"; // Badge Rojo
        }
    } else { // Asistencia >= 70%
        if (promedio >= 4.0) {
            estado = "Aprobado";
            claseEstado = "aprobado"; // Badge Verde
        } else {
            estado = "Reprobado por notas";
            claseEstado = "reprobado"; // Badge Rojo
        }
    }

    // 7. Insertar fila en la tabla
    const tabla = document.getElementById("tablaEstudiantes");
    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${nombre}</td>
        <td>${apellido}</td>
        <td>${nota1.toFixed(1)}</td>
        <td>${nota2.toFixed(1)}</td>
        <td>${nota3.toFixed(1)}</td>
        <td class="${promedio < 4.0 ? 'promedio-reprobado' : ''}">${promedio.toFixed(1)}</td>
        <td>${asistencia.toFixed(0)}%</td>
        <td><span class="${claseEstado}">${estado}</span></td>
    `;

    tabla.appendChild(fila);

    // 8. Resetear el formulario
    document.getElementById("formEstudiante").reset();
}