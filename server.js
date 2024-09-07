const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())

require('./routes/index')(app);

app.listen(port);

module.exports = app;