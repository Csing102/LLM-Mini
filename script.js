const chatLog = document.getElementById('chat-log');
const chatInput = document.getElementById('chat-input');
const chatButton = document.getElementById('chat-button');
const uploadInput = document.getElementById('upload-input');
const uploadButton = document.getElementById('upload-button');
const trainButton = document.getElementById('train-button');
const uploadStatus = document.getElementById('upload-status');

let uploadedFiles = [];

uploadButton.addEventListener('click', () => {
  const files = uploadInput.files;
  uploadedFiles = Array.from(files);
  uploadStatus.innerText = `Uploaded ${uploadedFiles.length} files`;
});

trainButton.addEventListener('click', () => {
  const formData = new FormData();
  uploadedFiles.forEach(file => {
    formData.append('files', file);
  });

  fetch('/train', {
    method: 'POST',
    body: formData
  })
.then(response => response.json())
.then(data => {
    uploadStatus.innerText = `Training complete: ${data.message}`;
  })
.catch(error => {
    uploadStatus.innerText = `Error: ${error.message}`;
  });
});

chatButton.addEventListener('click', () => {
  const message = chatInput.value.trim();
  if (message) {
    const response = fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    })
  .then(response => response.json())
  .then(data => {
      chatLog.innerHTML += `<div><b>You:</b> ${message}</div>`;
      chatLog.innerHTML += `<div><b>Chatbot:</b> ${data.response}</div>`;
      chatInput.value = '';
    })
  .catch(error => {
      chatLog.innerHTML += `<div><b>Error:</b> ${error.message}</div>`;
    });
  }
});
