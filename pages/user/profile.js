const editButton = document.getElementById("editButton");
const saveButton = document.getElementById("saveButton");
const inputs = document.querySelectorAll( "#profileForm input" );

editButton.addEventListener("click", function () {
  inputs.forEach((input) => input.removeAttribute("readonly"));
  saveButton.style.display = "inline-block";
  editButton.style.display = "none";
});

saveButton.addEventListener("click", function () {
  inputs.forEach((input) => input.setAttribute("readonly", true));
  saveButton.style.display = "none";
  editButton.style.display = "inline-block";
} );

const profileImg = document.getElementById("profileImg");
const profilePicInput = document.getElementById("profilePicInput");

profilePicInput.addEventListener("change", function () {
  const file = profilePicInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profileImg.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
} );

document.addEventListener("DOMContentLoaded", function() {
    console.log("Fetching profile data...");

    function fetchProfileData() {
        fetch('fetch_profile.php')  // No need to change this since it's already in the same directory
            .then(response => {
                console.log("Response received:", response);
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    console.error("Error:", data.error);
                } else {
                    console.log("Data received:", data);
                    document.getElementById('name').value = data.name;
                    document.getElementById('email').value = data.email;
                }
            })
            .catch(error => console.error('Error fetching profile data:', error));
    }

    fetchProfileData();
});


// Cropper.js
const imageToCrop = document.getElementById("imageToCrop");
const cropperModal = $("#cropperModal");
let cropper;

editButton.addEventListener("click", function () {
  inputs.forEach((input) => input.removeAttribute("readonly"));
  saveButton.style.display = "inline-block";
  editButton.style.display = "none";
});

saveButton.addEventListener("click", function () {
  inputs.forEach((input) => input.setAttribute("readonly", true));
  saveButton.style.display = "none";
  editButton.style.display = "inline-block";
});

profilePicInput.addEventListener("change", function () {
  const file = profilePicInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imageToCrop.src = e.target.result;
      cropperModal.modal("show");

      if (cropper) {
        cropper.destroy();
      }
      cropper = new Cropper(imageToCrop, {
        aspectRatio: 1,
        viewMode: 2,
      });
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById("cropButton").addEventListener("click", function () {
  const canvas = cropper.getCroppedCanvas({
    width: 150,
    height: 150,
  });

  profileImg.src = canvas.toDataURL();
  cropperModal.modal("hide");
} );
