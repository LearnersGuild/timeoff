const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const config = require('../config/config.js').getConfig();

const app = express();


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', routes);

app.use((req, res) => {
  res.status(404).json({message:'not_found'});
});

const port = config.get("server").get("port");
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`);
});
