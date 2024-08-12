// Login Popup on clicking login button
document.querySelector("#show-login").addEventListener("click", function () {
  // Close signup popup if active
  document.querySelector(".signup-popup").classList.remove("active");
  document.querySelector(".login-popup").classList.add("active");
});

// Signup Popup on clicking signup button
document.querySelector("#show-signup").addEventListener("click", function () {
  // Close login popup if active
  document.querySelector(".login-popup").classList.remove("active");
  document.querySelector(".signup-popup").classList.add("active");
});

// Close login popup
document
  .querySelector(".login-popup .close-btn")
  .addEventListener("click", function () {
    document.querySelector(".login-popup").classList.remove("active");
  });

// Close signup popup
document
  .querySelector(".signup-popup .close-btn")
  .addEventListener("click", function () {
    document.querySelector(".signup-popup").classList.remove("active");
  });

// Login form submission
document
  .getElementById("login-btn")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    fetch("./server/php/login.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json()) // Expect JSON response
      .then((data) => {
        if (data.status === "success") {
          window.location.href = "./client/src/pages/profile.html";
        } else {
          alert(data.message);
        }
        console.log(data); // Log server response for debugging
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Login failed. Please try again.");
      });
  });

// Signup form submission
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

    fetch("./server/php/signup.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json()) // Expect JSON response
      .then((data) => {
        if (data.status === "success") {
          window.location.href = "./client/src/pages/profile.html";
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

function handlefaqs() {
  let elements = document.getElementsByClassName("accordion-collapse");
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }
}