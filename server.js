const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const NLP = require('./NLP');

const nlp = new NLP();

app.post('/train', upload.array('files'), (req, res) => {
  const files = req.files;
  const fileContent = files[0].buffer.toString();
  const response = nlp.train(fileContent);
  res.json(response);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
