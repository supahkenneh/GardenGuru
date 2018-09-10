const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8008;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('smoke test');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})