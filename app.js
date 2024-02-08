const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const tablenames = require('./model/data');
const sequelize = require('./helper/database');
const cors = require('cors');
const app = express();
const dataRoutes = require('./routes/data');
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({origin:'*'}))

app.use(dataRoutes);
sequelize.sync().then(()=>{
    app.listen(3000);
})
