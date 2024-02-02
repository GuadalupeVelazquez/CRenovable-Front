document.addEventListener('DOMContentLoaded', function () {
    console.log('La función se está ejecutando'); // Añadido console.log

    const userId = '65667e8b975122e079faeecb';
    // const userId = forma de conseguir el id del localstorage

    fetch(`http://localhost:3000/getUserDetails/${userId}`)
        .then(response => {
            console.log('Respuesta del servidor:', response); // Verifica la respuesta del servidor
            return response.json();
        })
        .then(userDetails => {
            console.log('Detalles del usuario desde el backend:', userDetails); // Verifica qué está devolviendo el backend
            document.getElementById('nameUser').textContent = userDetails.name;
            document.getElementById('location').textContent = `${userDetails.city}, ${userDetails.country}`;
            document.getElementById('email').textContent = userDetails.email;
            document.getElementById('telephone').textContent = userDetails.telephone;
            console.log('Detalles del usuario mostrados en el frontend');
        })
        .catch(error => console.error('Error:', error));
});