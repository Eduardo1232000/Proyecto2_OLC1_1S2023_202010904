import express 		from 'express';
import path 		from 'path';
const router = express.Router();
//ARCHIVOS PARA ANALIZADOR
import Parser from '../../grammar';
import { AST } from '../arbol/AST';
import { Valor } from '../instrucciones/Valor';
import { NODO_GRAFICA } from '../arbol/NODO_GRAFICA';

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
    
    let cadena_codigo = req.body.codigo //CODIGO ENVIADO DESDE NAVEGADOR
    //let analizador = new Analizador(cadena_codigo, "editor");
    //let ast: AST = analizador.Analizar();
    let archivo = "editar"
    let parser:any 	= Parser.parser;        
    let arbol:AST   = undefined;            //CREAMOS UNO INDEFINIDO
    let NODOS:NODO_GRAFICA;
    let RESPUESTA_PARSER = [];

    try{

        //PODRIA HACER QUE EL PARSE RETORNE UNA LISTA DE 2 ELEMENTOS, EL PRIMERO EL CODIGO PARA EL AST, Y EL SEGUNDO EL CODIGO PARA EL ARBOL
        //let lst_TOTAL = parser.parse(cadena_codigo);
        RESPUESTA_PARSER = parser.parse(cadena_codigo)
        arbol = new AST(RESPUESTA_PARSER[0]);  //CREA UN ARBOL SINTACTICO CON LA LISTA DE EJECUCIONES DE LA ENTRADA

        arbol.ejecutar();                               //ANALIZA EL ARBOL SINTACTICO
        let NODOS = RESPUESTA_PARSER[1];
        
        let codigo_nodos = NODOS.obtener_grafica_nodos();
        arbol.graficar(codigo_nodos);
        //AGREGAR GRAFICAS Y REPORTES
    }catch(e){
        console.log(e);                                 //ERROR EN LA CREACION DEL ARBOL
    }


    if(arbol != undefined) {
        res.json({respuesta: arbol.obtener_salida()});
        //res.render('compilador.ejs', { title: 'TipeWize', salida: arbol.obtener_salida(), codigo: cadena_codigo});
    } else{
        //res.render('compilador.ejs', { title: 'TipeWize', salida: 'ERROR al procesar cadena', codigo: cadena_codigo});
        res.json({respuesta: "ERROR al procesar cadena"});
    }
});

module.exports = router;