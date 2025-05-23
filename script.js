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
