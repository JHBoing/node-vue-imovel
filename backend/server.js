const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();


require('./app/routes')(app, {});
app.use(bodyParser.urlencoded({ extended: true }));


const port = 8000;
require('./app/routes')(app);


app.listen(port, () => {
	  console.log("Online em: localhost:" + port);
});


