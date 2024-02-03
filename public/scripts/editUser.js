document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('editUserForm');

  form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const userData = {};

      formData.forEach((value, key) => {
          userData[key] = value;
      });

      const userId = '6567deffb8733e0a5cc7584b';

      try {
          const response = await fetch(`http://localhost:3000/editUser/${userId}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ ...userData, userId })
          });

          if (response.ok) {
              window.location.href = '/';
          } else {
              console.error('Error al editar el usuario');
          }
      } catch (error) {
          console.error(error);
      }
  });

  // Obtener detalles del usuario y llenar los campos del formulario
  const userId = '65667e8b975122e079faeecb';

  fetch(`http://localhost:3000/getUserDetails/${userId}`)
      .then(response => response.json())
      .then(userDetails => {
          // Actualizar valores de los campos en el formulario
          document.getElementById('username').value = userDetails.username;
          document.getElementById('country').value = userDetails.country;
          document.getElementById('city').value = userDetails.city;
          document.getElementById('password').value = ''; // Puedes decidir si deseas mostrar la contraseña actual o no
          document.getElementById('namecomplet').value = userDetails.name;
          document.getElementById('street').value = userDetails.street;
          document.getElementById('email').value = userDetails.email;
          document.getElementById('phone').value = userDetails.telephone;
      })
      .catch(error => console.error('Error:', error));
});