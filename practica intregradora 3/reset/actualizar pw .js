document.getElementById("reset-password-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    
    if (newPassword === confirmPassword) {
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
    } else {
      // Mostrar mensaje de error: las contraseñas no coinciden
    }
  });
  