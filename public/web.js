const express = require('require');
const parser = require('body-parser');
const static = require('serve-static');
const app = express();

app.use(express.static('./public'));
app.use(express.parser());
/* Ajout de routes */
app.get('/hello', function(req, res) {
res.send('Hello World');
});
app.listen(8080);
