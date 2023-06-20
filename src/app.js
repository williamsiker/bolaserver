const express = require('express');
const path = require('path');
const {mongoose} = require('./database');
const cors = require('cors');

const app = express();

//Config 
app.set('port', process.env.PORT || 4000);
app.use(cors({origin: true}))
//Middle
app.use(express.json());

//Rutas
app.use('/api/tasks', require('./routes/rutas'));

//Servidor
app.listen(app.get('port'), () =>{
    console.log(`Server on port  ${app.get('port')}`)
});
