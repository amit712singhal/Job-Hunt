document.querySelector("#show-login").addEventListener("click", function () {
  document.querySelector(".login-popup").classList.add("active");
});

document.querySelector("#show-signup").addEventListener("click", function () {
  document.querySelector(".signup-popup").classList.add("active");
});

document
  .querySelector(".login-popup .close-btn")
  .addEventListener("click", function () {
    document.querySelector(".login-popup").classList.remove("active");
  });

document
  .querySelector(".signup-popup .close-btn")
  .addEventListener("click", function () {
    document.querySelector(".signup-popup").classList.remove("active");
  });

document
  .getElementById("signup-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;

    // Check if form is valid
    if (!form.checkValidity()) {
      form.reportValidity(); // Show validation messages
      return;
    }

    const formData = new FormData(form);

    fetch("signup.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json()) // Expect JSON response
      .then((data) => {
        if (data.status === "success") {
          window.location.href = "../profile-page/profile.html";
        } else {
          alert(data.message);
        }
        console.log(data); // Log server response for debugging
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Signup failed. Please try again.");
      });
  });

  
