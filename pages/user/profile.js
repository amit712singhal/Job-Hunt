const editButton = document.getElementById("editButton");
const saveButton = document.getElementById("saveButton");
const inputs = document.querySelectorAll( "#profileForm input" );

document.addEventListener('DOMContentLoaded', function() {
  fetch('profile.php')
    .then(response => response.json())
    .then(data => {
      document.getElementById('name').value = data.name;
      document.getElementById('contactNo').value = data.contactNo;
      document.getElementById('email').value = data.email;
      document.getElementById('profession').value = data.profession;
    });
});

function submitForm(event) {
  event.preventDefault();
  const formData = new FormData(document.getElementById('profileForm'));

  fetch('profile.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    alert(data);
  });
}

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
});
//   <!-- Cropper.js -->

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
