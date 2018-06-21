const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const db 			 = require('./config/db');
require('dotenv').config();
app.use(bodyParser.json({ type: 'application/json' }));

var routes = require("./app/routes/index");

app.use('/api', routes);

const port = 8000;

app.listen(port, () => {
	console.log("Online em: localhost:" + port);
});


