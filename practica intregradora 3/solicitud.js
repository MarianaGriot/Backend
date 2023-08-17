document.getElementById("recovery-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    
    try {
      const response = await fetch("/api/send-recovery-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
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
  