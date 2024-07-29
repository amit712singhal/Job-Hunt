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

document.getElementById("submit-btn").addEventListener("click", function () {
  const form = document.getElementById("signup-form");
  const formData = new FormData(form);

  fetch("signup.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      // Process the response from the server
      console.log(data);
      alert("Signup successful!");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Signup failed. Please try again.");
    });
});
