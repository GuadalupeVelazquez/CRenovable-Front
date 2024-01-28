function redirigir(page) {
    window.location.href = page;
}

function realizarRegistro() {
    const nombreUsuario = document.getElementById('nombreRegistro').value;
    const correoElectronico = document.getElementById('emailRegistro').value;
    const contrasena = document.getElementById('passwordRegistro').value;
    const reingresarContrasena = document.getElementById('reingresar_passwordRegistro').value;

    // Verificar si las contraseñas coinciden
    if (contrasena !== reingresarContrasena) {
        alert('Las contraseñas no coinciden');
        return;
    }

    // Datos a enviar en la solicitud POST
    const datosRegistro = {
        username: nombreUsuario,
        email: correoElectronico,
        password: contrasena,
    };

    console.log('Datos del registro:', datosRegistro);

    // Realizar la solicitud POST al backend
    fetch('http://localhost:3000/createUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosRegistro),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else if (data.success) {
            alert(data.success);
            window.location.href = '/loginAndRegister?mode=login';
        } else {
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            window.location.href = '/loginAndRegister?mode=login';
        }
    })
    .catch(error => {
        console.error('Error en realizarRegistro:', error);
        alert(`Error al registrar usuario. Por favor, intenta nuevamente. Detalles: ${error.message}`);
        window.location.href = '/loginAndRegister?mode=register';
    });
}

function realizarLogin() {
    const nombreUsuario = document.getElementById('nombreLogin').value;
    const contrasena = document.getElementById('passwordLogin').value;

    // Datos a enviar en la solicitud POST
    const datosLogin = {
        username: nombreUsuario,
        password: contrasena,
    };

    // Realizar la solicitud POST al backend para el inicio de sesión
    fetch('http://localhost:3000/loginAndRegister', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosLogin),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            alert(`Error al iniciar sesión: ${data.error}`);
        } else {
            alert('Inicio de sesión exitoso.');
            window.location.href = '/';
        }
    })
    .catch(error => {
        console.error('Error en realizarLogin:', error);
        alert(`Error al iniciar sesión. Por favor, verifica tus credenciales e intenta nuevamente. Detalles: ${error.message}`);
    });
}
function cerrarSesion() {
    // Realizar la solicitud al backend para cerrar sesión
    fetch('http://localhost:3000/logout')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            alert(data); // Muestra el mensaje del servidor
            // Redirige a la página de inicio de sesión o a donde desees
            window.location.href = '/loginAndRegister?mode=login';
        })
        .catch(error => {
            console.error('Error al cerrar sesión:', error);
            alert('Error al cerrar sesión. Por favor, inténtalo de nuevo.');
        });
}

function toggleBoton() {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    let mostrarBoton = mode === "login" ? true : false;

    const divRegistro = document.getElementById("divRegistro");
    divRegistro.style.display = !mostrarBoton ? 'block' : 'none';
    const divLogin = document.getElementById("divLogin");
    divLogin.style.display = mostrarBoton ? 'block' : 'none';
}

toggleBoton();  