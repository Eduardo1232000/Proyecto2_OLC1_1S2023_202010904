const express = require('express');
const morgan = require('morgan');
const path = require('path');


const app = express();

// SETTINGS
//process.env.PORT es por si se sube a la nube, ya que acepta el puerto que le dan
app.set('port', process.env.PORT || 3000);

var engine = require('consolidate');

app.set('views', path.join(__dirname, 'public'));
app.engine('html', engine.mustache);
app.set('view engine', 'html');

//MIDDLEWARES
//Morgan es para ver las solicitudes en consola
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));



//RUTAS
app.use('/' ,require('./routes/task.routes'));
app.set('views',path.join(__dirname,'../public'));



//ARCHIVOS ESTATICOS
// El path.join(__dirname, 'public') abre el archivo index.html que se encuentra en la carpeta public
app.use(express.static(path.join(__dirname, 'public')))


//EMPEZANDO SERVIDOR
app.listen(app.get('port'), () =>{
    console.log(`Servidor en puerto ${app.get('port')}`);
}); 

