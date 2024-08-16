function changeContent(contentId) {
    const content = {
      content1: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which ',
      content2: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
      content3: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    };

    const dynamicContent = document.getElementById('dynamic-content');
    const buttons = document.querySelectorAll('.button-container .btn');
    
    // Remove 'active' class from all buttons
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Update the content and set the active button
    if (content[contentId]) {
      dynamicContent.innerHTML = `<p>${content[contentId]}</p>`;
      document.querySelector(`.button-container .btn[onclick="changeContent('${contentId}')"]`).classList.add('active');
    }
  }