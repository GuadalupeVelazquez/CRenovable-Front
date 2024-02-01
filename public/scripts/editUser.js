  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('editUserForm');
    form.addEventListener('submit', async (event) => {
      console.log('SUBMIT')
      event.preventDefault();

      const formData = new FormData(form);
      const userData = {};

      formData.forEach((value, key) => {
        userData[key] = value;
      });
      console.log('userdata',userData)
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
          window.location.href = 'http://localhost:3001';
        } else {
          console.error('Error al editar el usuario');
        }
      } catch (error) {
        console.error(error);
      }
    });
  });
