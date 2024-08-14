function handlefaqs() {
  let elements = document.getElementsByClassName("accordion-collapse");
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }
}

const loginBtn = document.querySelector( '.login-btn' );
const signupBtn = document.querySelector( '.signup-btn' );
const popupOverlay = document.querySelector( '.popup-overlay' );
const wrapper = document.querySelector( '.wrapper' );
const loginLink = document.querySelector( '.login-link' );
const registerLink = document.querySelector('.register-link');
const iconClose = document.querySelector( '.icon-close' );

popupOverlay.addEventListener( 'click', function ()
{
  document.querySelector( '.popup-overlay' ).style.display = 'none';
  wrapper.classList.remove( 'active-popup' );
} );

registerLink.addEventListener( 'click', () =>
{
  wrapper.classList.add('active');
} );

loginLink.addEventListener('click', () => {
  wrapper.classList.remove('active');
} );

iconClose.addEventListener('click', () => {
  wrapper.classList.remove( 'active-popup' );
  wrapper.classList.remove('active');
  document.querySelector('.popup-overlay').style.display = 'none';
} );

loginBtn.addEventListener('click', function() {
    document.querySelector('.popup-overlay').style.display = 'block';
    wrapper.classList.add('active-popup');
} );


signupBtn.addEventListener('click', function() {
    document.querySelector('.popup-overlay').style.display = 'block';
    wrapper.classList.add('active-popup');
    wrapper.classList.add('active');
} );

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

    fetch("./pages/dashboard/login.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json()) // Expect JSON response
      .then((data) => {
        if (data.status === "success") {
          window.location.href = "./pages/user/profile.html";
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

    fetch("./pages/dashboard/signup.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json()) // Expect JSON response
      .then((data) => {
        if (data.status === "success") {
          window.location.href = "./pages/user/profile.html";
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
