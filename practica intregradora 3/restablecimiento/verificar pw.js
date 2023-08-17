document.getElementById("reset-password-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    
    if (newPassword !== confirmPassword) {
      // Mostrar mensaje de error: las contraseñas no coinciden
      document.getElementById("error-message").textContent = "Las contraseñas no coinciden.";
      return;
    }
    
    if (newPassword === userOldPassword) {
      // Mostrar mensaje de error: no se puede usar la misma contraseña
      document.getElementById("error-message").textContent = "No puedes usar la misma contraseña.";
      return;
    }
    
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ newPassword, token })
      });
      
      if (response.ok) {
        // Mostrar mensaje de éxito al usuario
      } else {
        // Mostrar mensaje de error al usuario
      }
    } catch (error) {
      // Manejar errores de conexión o solicitud
    }
  });
  