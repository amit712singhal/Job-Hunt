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
  } );
  
document
  .getElementById("login-btn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const form = document.getElementById("signup-form");
    const formData = new FormData(form);

    fetch("signup.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json()) // Expect JSON response
      .then((data) => {
        if (data.status === "success") {
          alert(data.message);
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
