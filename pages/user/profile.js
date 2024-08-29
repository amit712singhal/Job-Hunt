const editButton = document.getElementById("editButton");
const saveButton = document.getElementById("saveButton");
const inputs = document.querySelectorAll("#profileForm input");

// Edit and save buttons
editButton.addEventListener("click", function () {
  inputs.forEach((input) => input.removeAttribute("readonly"));
  saveButton.style.display = "inline-block";
  editButton.style.display = "none";
});

saveButton.addEventListener( "click", function ()
{
  const profileData = new FormData();
  profileData.append( 'name', document.getElementById( 'name' ).value.trim() );
  profileData.append( 'email', document.getElementById( 'email' ).value.trim() );
  profileData.append( 'contactNo', document.getElementById( 'contactNo' ).value.trim() );
  profileData.append( 'profession', document.getElementById( 'profession' ).value.trim() );
  profileData.append( 'experience', document.getElementById( 'experience' ).value.trim() );
  profileData.append( 'field', document.getElementById( 'field' ).value.trim() );

  // Append the profile picture if a new one was selected
  const profilePicInput = document.getElementById( 'profilePicInput' );
  if ( profilePicInput.files[ 0 ] )
  {
    profileData.append( 'profilePicInput', profilePicInput.files[ 0 ] );
  }

  console.log( "Sending profile data:", profileData ); // Check data being sent

  fetch( 'save_profile.php', {
    method: 'POST',
    body: profileData
  } )
    .then( response => response.text() ) // Check raw response
    .then( text =>
    {
      console.log( "Response text:", text );
      try
      {
        const data = JSON.parse( text );
        if ( data.success )
        {
          inputs.forEach( ( input ) => input.setAttribute( "readonly", true ) );
          saveButton.style.display = "none";
          editButton.style.display = "inline-block";
          console.log( "Profile updated successfully:", data.message );
        } else
        {
          console.error( "Error updating profile:", data.error );
          alert( `Error: ${ data.error }` );
        }
      } catch ( e )
      {
        console.error( 'Error parsing response:', e );
        alert( 'Error saving profile data.' );
      }
    } )
    .catch( error =>
    {
      console.error( 'Error saving profile data:', error );
      alert( 'Error saving profile data.' );
    } );
} );

// Fetch profile data
document.addEventListener("DOMContentLoaded", function () {
  console.log("Fetching profile data...");

  function fetchProfileData() {
    fetch('fetch_profile.php')
      .then(response => {
        console.log("Response received:", response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.error) {
          console.error("Error:", data.error);
          alert(`Error fetching profile data: ${data.error}`);
        } else {
          console.log("Data received:", data);
          document.getElementById('name').value = data.name || '';
          document.getElementById('email').value = data.email || '';
          document.getElementById('contactNo').value = data.contactNo || '';
          document.getElementById('profession').value = data.profession || '';
          document.getElementById('experience').value = data.experience || '';
          document.getElementById( 'field' ).value = data.field || '';
          document.getElementById( 'profileImg' ).src = data.profile_pic || '../../assets/images/default-pfp.jpg';

        }
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
        alert('Error fetching profile data.');
      });
  }

  fetchProfileData();
});

// Profile picture
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

// Cropper.js
const imageToCrop = document.getElementById("imageToCrop");
const cropperModal = $("#cropperModal");
let cropper;

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

document.getElementById( "cropButton" ).addEventListener( "click", function ()
{
  const canvas = cropper.getCroppedCanvas( {
    width: 150,
    height: 150,
  } );

  profileImg.src = canvas.toDataURL();
  document.getElementById( 'croppedImage' ).value = canvas.toDataURL();
  cropperModal.modal( "hide" );
} );
