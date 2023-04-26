//POSIBLES ACCIONES
import { Expresion } from "./EJECUCION";
import { Instruccion } from "./EJECUCION";

import { TABLA_FUNCIONES_Y_VARIABLES } from "./TABLA_FUNCIONES_Y_VARIABLES";//TABLA NOMBRES EXISTENTES
import { LISTA_EJECUCIONES } from "./LISTA_EJECUCIONES";                    //LISTA GENERAL
import { NODO_TABLA_SIMBOLOS } from "./NODO_TABLA_SIMBOLOS";
import { NODO_REPORTE_ERROR } from "./NODO_REPORTE_ERROR";


export class AST {

    /*  LISTA_EJECUCIONES Raiz de ejecucion */
    private EJECUCIONES:   LISTA_EJECUCIONES[];            //LA RAIZ ES EJECUCION[0]
    private salida_cadena:  string;
    private codigo_grafica: string;
    private tabla_simbolos: NODO_TABLA_SIMBOLOS[];

    constructor (EJECUCIONES:LISTA_EJECUCIONES[]) 
    {
        this.EJECUCIONES = EJECUCIONES;                     //EJECUCIONES SON LAS INSTRUCCIONES Y EXPRESIONES QUE HAY EN LA ENTRADA
        this.salida_cadena = "";
        this.codigo_grafica = "";
        this.tabla_simbolos = [];
    }

    public ejecutar() 
    {
        try
        {
            let cantidad_main=0;//para verificar que solo exista 1 main
            let TABLA_FUNCIONES_Y_VARIABLES_global:TABLA_FUNCIONES_Y_VARIABLES = new TABLA_FUNCIONES_Y_VARIABLES(undefined,"global");
            let TABLA_FUNCIONES_Y_VARIABLES_actual:TABLA_FUNCIONES_Y_VARIABLES = TABLA_FUNCIONES_Y_VARIABLES_global;
            //RECORRER PARA DECLARAR FUNCIONES
            //console.log("------------ DECLARACION DE METODOS ------------");
            for(let x = 0; x < this.EJECUCIONES.length ; x++)
            {
                let sent = this.EJECUCIONES[x];
                //ES UNA INSTRUCCION COMO :(IF, WHILE, DECLARACIONES ETC)
                if(sent instanceof Instruccion) 
                {
                    if(sent.nombre_in_ex=="DECLARACIONMETODO")
                    {
                        console.log("instruccion: "+sent.nombre_in_ex);
                        sent.ejecutar(TABLA_FUNCIONES_Y_VARIABLES_actual, TABLA_FUNCIONES_Y_VARIABLES_global, this);
                    }
                    else if(sent.nombre_in_ex=="MAIN")
                    {
                        cantidad_main+=1;
                    }
                    
                    
                }
            } 
            //SI NO ES NINGUNO DE LOS ANTERIORES
            if(cantidad_main <2){
                //console.log("------------ EJECUCION DE INSTRUCCIONES  ------------");
                for(let x = 0; x < this.EJECUCIONES.length ; x++)
                {
                    let sent = this.EJECUCIONES[x];
                    //ES UNA INSTRUCCION COMO :(IF, WHILE, DECLARACIONES ETC)
                    if(sent instanceof Instruccion) 
                    {
                        if(sent.nombre_in_ex!="DECLARACIONMETODO")
                        {
                            //SOLO EJECUTA DECLARACION DE VARIABLES Y EL MAIN (QUITAR ESTE IF SI QUIERO QUE EJECUTE TODO)
                            if(sent.nombre_in_ex=="DECLARACIONVARIABLE"||sent.nombre_in_ex=="MAIN") 
                            {
                                console.log(sent.nombre_in_ex);
                                sent.ejecutar(TABLA_FUNCIONES_Y_VARIABLES_actual, TABLA_FUNCIONES_Y_VARIABLES_global, this);
                            }
                        }
                    }
                    //ES UNA EXPRESION (SUMA, RESTA ETC)
                    else if(sent instanceof Expresion) 
                    {
                        if(sent.nombre_in_ex!="DECLARACIONMETODO")
                        {
                            console.log(sent.nombre_in_ex);
                            sent.obtener_valor(TABLA_FUNCIONES_Y_VARIABLES_actual, TABLA_FUNCIONES_Y_VARIABLES_global, this);
                        }
                    }
                }

            }
            else{
                this.escribir_en_consola("ERROR. HAY MAS DE 1 MAIN");
            }
              
        }catch(ex){
            this.escribir_en_consola("ERROR => " + ex.message);
            console.log(ex);
        }
    }

    public escribir_en_consola(cadena: string) 
    {
        this.salida_cadena += cadena + "\n"; 
    }

    public obtener_salida() 
    {
        return this.salida_cadena;
    }
    public graficar(nodos:string)
    {
        //this.escribir_en_consola("_____________________________________")
        //this.escribir_en_consola("      INTENTO DE GRAFICA")
        //this.escribir_en_consola("_____________________________________")
        let codigo = "digraph AST {\n";
        codigo += "node [shape=box, style=rounded];\n";
        codigo += nodos +"\n";
        codigo += "}";
        //this.escribir_en_consola(codigo);
        return codigo
    }
    public guardar_en_tabla_simbolos (identificador:string,tipo_variable:string,tipo:string,entorno:string,linea:number,columna:number )
    {
        let nodo = new NODO_TABLA_SIMBOLOS(identificador,tipo_variable,tipo,entorno,linea,columna);
        this.tabla_simbolos.push(nodo)
    }
    public graficar_tabla_de_simbolos(){
        //this.escribir_en_consola("<<<<<< TABLA DE SIMBOLOS >>>>>>");



        let cod = ""
        cod += "digraph G{ \n";
        cod += "graph [ dpi = 50 ];\n";
        cod += "a0 [shape=none label=<\n";
        cod += "<TABLE border=\"0\" cellspacing=\"5\" cellpadding=\"1\" style=\"rounded\" bgcolor=\"/rdylgn11/11:/rdylgn11/8\">\n";
        cod += "<TR>\n";
        cod += "<TD  colspan=\"1\" bgcolor=\"#66C5DA\">Identificador </TD>\n";
        cod += "<TD  colspan=\"1\" bgcolor=\"#66C5DA\">Tipo </TD>\n";
        cod += "<TD  colspan=\"1\" bgcolor=\"#66C5DA\">Tipo </TD>\n";
        cod += "<TD  colspan=\"1\" bgcolor=\"#66C5DA\">Entorno </TD>\n";
        cod += "<TD  colspan=\"1\" bgcolor=\"#66C5DA\">Linea</TD>\n";
        cod += "<TD  colspan=\"1\" bgcolor=\"#66C5DA\">Columna </TD>\n";
        cod += "</TR>\n";    

        for(let i=0;i<this.tabla_simbolos.length;i++){
            let nodo_actual = this.tabla_simbolos[i];
            let identificador = nodo_actual.obtener_identificador();
            let tipo1 = nodo_actual.obtener_tipo1();
            let tipo2 = nodo_actual.obtener_tipo2();
            let entorno = nodo_actual.obtener_entorno();
            let linea = nodo_actual.obtener_linea();
            let columna = nodo_actual.obtener_columna();

            cod += "<TR>\n";
            cod += "<TD  colspan=\"1\" bgcolor=\"#66C5DA\">"+identificador+" </TD>\n";
            cod += "<TD  colspan=\"1\" bgcolor=\"#66C5DA\">"+tipo1+" </TD>\n";
            cod += "<TD  colspan=\"1\" bgcolor=\"#66C5DA\">"+tipo2+" </TD>\n";
            cod += "<TD  colspan=\"1\" bgcolor=\"#66C5DA\">"+entorno+" </TD>\n";
            cod += "<TD  colspan=\"1\" bgcolor=\"#66C5DA\">"+linea+"</TD>\n";
            cod += "<TD  colspan=\"1\" bgcolor=\"#66C5DA\">"+columna+" </TD>\n";
            cod += "</TR>\n"; 
            //this.escribir_en_consola(identificador+","+tipo1+","+tipo2+","+entorno+","+linea+","+columna);
        }
        cod += "</TABLE>>];\n";
        cod += "}\n";
        //this.escribir_en_consola(cod);
        //this.escribir_en_consola("<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>");
        return cod
    }
    public graficar_reporte_errores(lista_reporte:NODO_REPORTE_ERROR[]){
        //this.escribir_en_consola("<<<<<< TABLA DE SIMBOLOS >>>>>>");
        let cod = ""
        cod += "digraph G{ \n";
        cod += "graph [ dpi = 50 ];\n";
        cod += "a0 [shape=none label=<\n";
        cod += "<TABLE border=\"0\" cellspacing=\"5\" cellpadding=\"1\" style=\"rounded\" bgcolor=\"/rdylgn11/11:/rdylgn11/1\">\n";
        cod += "<TR>\n";
        cod += "<TD  colspan=\"1\" bgcolor=\"#EFC8B2\"># </TD>\n";
        cod += "<TD  colspan=\"1\" bgcolor=\"#EFC8B2\">Tipo </TD>\n";
        cod += "<TD  colspan=\"1\" bgcolor=\"#EFC8B2\">Descripcion </TD>\n";
        cod += "<TD  colspan=\"1\" bgcolor=\"#EFC8B2\">Linea</TD>\n";
        cod += "<TD  colspan=\"1\" bgcolor=\"#EFC8B2\">Columna </TD>\n";
        cod += "</TR>\n";    

        for(let i=0;i<lista_reporte.length;i++){
            let nodo_actual = lista_reporte[i];
            let tipo = nodo_actual.obtener_tipo();
            let descripcion = nodo_actual.obtener_descripcion();
            let linea = nodo_actual.obtener_linea();
            let columna = nodo_actual.obtener_columna();

            cod += "<TR>\n";
            cod += "<TD  colspan=\"1\" bgcolor=\"#ffffd4\">"+(i+1)+" </TD>\n";
            cod += "<TD  colspan=\"1\" bgcolor=\"#ffffd4\">"+tipo+" </TD>\n";
            cod += "<TD  colspan=\"1\" bgcolor=\"#ffffd4\">"+descripcion+" </TD>\n";
            cod += "<TD  colspan=\"1\" bgcolor=\"#ffffd4\">"+linea+"</TD>\n";
            cod += "<TD  colspan=\"1\" bgcolor=\"#ffffd4\">"+columna+" </TD>\n";
            cod += "</TR>\n"; 
            //this.escribir_en_consola(identificador+","+tipo1+","+tipo2+","+entorno+","+linea+","+columna);
        }
        cod += "</TABLE>>];\n";
        cod += "}\n";
        //this.escribir_en_consola(cod);
        //this.escribir_en_consola("<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>");
        return cod
    }
}


