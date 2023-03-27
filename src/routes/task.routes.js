const express = require('express');
const router = express.Router();
const path = require('path');

//router.use(express.static(path.join(__dirname,'../public')))
//Abrir el login 
router.get('/', (req,res) => { 
    res.sendFile(path.join(__dirname, '../public/index.html'));
});


router.post('/ejecutar',(req,res) => {
    let cadena_codigo = req.body.codigo

    var fs = require('fs');
    //var parser = require('./grammar');  //LEE LA GRAMATICA EN LA CARPETA DE ROUTES
    var parser = require('../../grammar');      //.. SALE A CARPETA SRC, OTROS .. SALE DE LA CARPETA SRC A CARPETA SERVIDOR

    var lis = [];
    var respuesta = lis[0];
    var separado = "";
    parser.parse(cadena_codigo);

    lis = parser.respuestas;
    
    //RECORRER LISTA 
    for (let i = 0; i < (lis.length); i++) {
        separado += lis[i];
        separado += '\n';
      }
    res.json({status: 1, message: separado});

    //fs.readFile('./entrada.txt' , (err, data) =>{
    //    if (err) throw err;
    //    parser.parse(data.toString());  //analiza las cadenas aqui debo guardar todo en listas o algo
        
    //    respuesta = lis;
    //    res.json({status: 1, message: respuesta});  //retorna a consola la respuesta
    //});



    
    //res.sendFile(path.join(__dirname, '../public/index.html'));
    //res.render('index.html',{title: 'prueba'});

    
})

//HOME
router.get('/home', (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/home.html'));
    
});



module.exports = router;
