require('dotenv').config();
const express = require('express');
const app = express();
const log = require('./controllers/logcontroller');
const sequelize = require('./db');
const user = require('./controllers/usercontroller');


sequelize.sync();
app.use(express.json());

app.use(require('./middleware/headers'));

app.use('/auth', user);
app.use('/log', log);

app.listen(process.env.PORT, function(){
    console.log(`App is listening on ${process.env.PORT} sucka.`)
});

