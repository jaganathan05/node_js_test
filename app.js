const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const tablenames = require('./model/data');

const app = express();
const dataRoutes = require('./routes/data');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(dataRoutes);
app.listen(3000);