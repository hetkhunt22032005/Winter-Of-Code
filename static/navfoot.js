// Dynamically load navbar and footer
document.addEventListener('DOMContentLoaded', () => {
    // Load navbar
    fetch('../views/navbar.html')
      .then(response => {
        if (!response.ok) throw new Error("Failed to load navbar");
        return response.text();
      })
      .then(data => {
        document.getElementById('navbar').innerHTML = data;
      })
      .catch(error => console.error("Error loading navbar:", error));
  });
  