const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/register', (req, res) => {
  const login = req.body.login;

  if (login === 'admin') {
    return res.status(400).json({ message: 'Login already exists' });
  }

  return res.json({ message: 'User registered successfully' });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
