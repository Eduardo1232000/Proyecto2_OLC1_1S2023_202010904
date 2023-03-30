import express 		from 'express';
import path 		from 'path';
const router = express.Router();
//ARCHIVOS PARA ANALIZADOR
import Parser from '../../grammar';
import { AST } from '../arbol/AST';

router.get('/', (req, res) => {
	res.render('index.ejs', { title: 'TipeWize'});
});

router.get('/editor', (req, res) =>{
    res.render('editor.ejs', { title: 'TipeWize', salida: '', codigo:""});
});

router.get('/compilador', (req, res) =>{
    res.render('compilador.ejs', { title: 'TipeWize', salida: '', codigo:""});
});

router.get('/reportes', (req, res) =>{
    res.render('reportes.ejs', { title: 'TipeWize', salida: '', codigo:""});
});

router.post('/ejecutar', (req, res) => {
    
    let cadena_codigo = req.body.codigo;
    //let analizador = new Analizador(cadena_codigo, "editor");
    //let ast: AST = analizador.Analizar();
    let archivo = "editar"
    let parser:any 	= Parser.parser;        
    let arbol:AST   = undefined;            //CREAMOS UNO INDEFINIDO

    try{
        arbol = new AST(parser.parse(cadena_codigo));  //CREA UN ARBOL SINTACTICO CON LA LISTA DE EJECUCIONES DE LA ENTRADA
        arbol.ejecutar();                               //ANALIZA EL ARBOL SINTACTICO
        //AGREGAR GRAFICAS Y REPORTES
    }catch(e){
        console.log(e);                                 //ERROR EN LA CREACION DEL ARBOL
    }


    if(arbol != undefined) {
        res.render('compilador.ejs', { title: 'TipeWize', salida: arbol.obtener_salida(), codigo: cadena_codigo});
    } else{
        res.render('compilador.ejs', { title: 'TipeWize', salida: 'ERROR al procesar cadena', codigo: cadena_codigo});
    }
});

module.exports = router;