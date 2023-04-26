import express 		from 'express';
import path 		from 'path';
const router = express.Router();
//ARCHIVOS PARA ANALIZADOR
import Parser from '../../grammar';
import { AST } from '../arbol/AST';
import { Valor } from '../instrucciones/Valor';
import { NODO_GRAFICA } from '../arbol/NODO_GRAFICA';
import { NODO_REPORTE_ERROR } from '../arbol/NODO_REPORTE_ERROR';





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

router.post('/SIMBOLOS',(req, res) => {
    let cadena_codigoc = req.body.codigo
    let codigo_ ='digraph AST {\n'
    codigo_+='node [shape=box, style=rounded];\n'
    codigo_+='n3358665[label="PROGRAMA" color="yellow"];\n'
    codigo_+='n5461189[label="INSTRUCCION" color="white"];\n'
    codigo_+='n3358665 -> n5461189; \n'
    codigo_+='}\n'
    res.json({respuesta: codigo_});
});
router.post('/AST',(req, res) => {
    let cadena_codigoc = req.body.codigo
    let codigo_ ='digraph AST {\n'
    codigo_+='node [shape=box, style=rounded];\n'
    codigo_+='n3358665[label="PROGRAMA" color="red"];\n'
    codigo_+='n5461189[label="INSTRUCCION" color="yellowgreen"];\n'
    codigo_+='n3358665 -> n5461189; \n'
    codigo_+='}\n'
    res.json({respuesta: codigo_});
});
router.post('/ERRORES',(req, res) => {
    let cadena_codigoc = req.body.codigo
    let codigo_ ='digraph AST {\n'
    codigo_+='node [shape=box, style=rounded];\n'
    codigo_+='n3358665[label="PROGRAMA" color="SKYBLUE"];\n'
    codigo_+='n5461189[label="INSTRUCCION" color="green"];\n'
    codigo_+='n3358665 -> n5461189; \n'
    codigo_+='}\n'
    res.json({respuesta: codigo_});
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
    let reporte_errores = [];
    let codigo_de_simbolos;
    let codigo_de_ast;
    let codigo_de_errores;

    try{

        //PODRIA HACER QUE EL PARSE RETORNE UNA LISTA DE 2 ELEMENTOS, EL PRIMERO EL CODIGO PARA EL AST, Y EL SEGUNDO EL CODIGO PARA EL ARBOL
        //let lst_TOTAL = parser.parse(cadena_codigo);
        RESPUESTA_PARSER = parser.parse(cadena_codigo)
        arbol = new AST(RESPUESTA_PARSER[0]);  //CREA UN ARBOL SINTACTICO CON LA LISTA DE EJECUCIONES DE LA ENTRADA

        arbol.ejecutar();                               //ANALIZA EL ARBOL SINTACTICO
        let NODOS = RESPUESTA_PARSER[1];
        
        let codigo_nodos = NODOS.obtener_grafica_nodos();
        codigo_de_simbolos=arbol.graficar_tabla_de_simbolos();
        codigo_de_ast=arbol.graficar(codigo_nodos);
        reporte_errores = RESPUESTA_PARSER[2]
        codigo_de_errores = arbol.graficar_reporte_errores(reporte_errores)

        //console.log(codigo_de_simbolos)

        //AGREGAR GRAFICAS Y REPORTES
    }catch(e){
        console.log(e);                                 //ERROR EN LA CREACION DEL ARBOL
    }


    if(arbol != undefined) {
        res.json({respuesta: arbol.obtener_salida(),simbolos: codigo_de_simbolos,ast: codigo_de_ast,errores: codigo_de_errores});
        //res.render('compilador.ejs', { title: 'TipeWize', salida: arbol.obtener_salida(), codigo: cadena_codigo});
    } else{
        //res.render('compilador.ejs', { title: 'TipeWize', salida: 'ERROR al procesar cadena', codigo: cadena_codigo});
        res.json({respuesta: "ERROR al procesar cadena"});
    }
});

module.exports = router;