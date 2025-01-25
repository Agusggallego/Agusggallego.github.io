

//VALIDACION DE FOMULARIO -QUE SE LLENEN TODOS LOS CASILLEROS Y UNC CORRECTO GMAIL.
document.querySelector("[data-form]").addEventListener("submit", function (e) {
    const name = document.querySelector("[name='name']").value.trim();
    const email = document.querySelector("[name='email']").value.trim();
    const message = document.querySelector("[name='message']").value.trim();

    // Validar campos obligatorios
    if (name === "" || email === "" || message === "") {
        alert("Todos los campos son obligatorios.");
        e.preventDefault(); // Detener envío
        return;
    }

    // Validar formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, ingresa un email válido.");
        e.preventDefault();
    }
});
