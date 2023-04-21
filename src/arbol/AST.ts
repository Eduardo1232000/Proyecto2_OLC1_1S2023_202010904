//POSIBLES ACCIONES
import { Expresion } from "./EJECUCION";
import { Instruccion } from "./EJECUCION";

import { TABLA_FUNCIONES_Y_VARIABLES } from "./TABLA_FUNCIONES_Y_VARIABLES";//TABLA NOMBRES EXISTENTES
import { LISTA_EJECUCIONES } from "./LISTA_EJECUCIONES";                    //LISTA GENERAL

export class AST {

    /*  LISTA_EJECUCIONES Raiz de ejecucion */
    private EJECUCIONES:   LISTA_EJECUCIONES[];            //LA RAIZ ES EJECUCION[0]
    private salida_cadena:  string;
    private codigo_grafica: string;

    constructor (EJECUCIONES:LISTA_EJECUCIONES[]) 
    {
        this.EJECUCIONES = EJECUCIONES;                     //EJECUCIONES SON LAS INSTRUCCIONES Y EXPRESIONES QUE HAY EN LA ENTRADA
        this.salida_cadena = "";
        this.codigo_grafica = "";
    }

    public ejecutar() 
    {
        try
        {
            let cantidad_main=0;//para verificar que solo exista 1 main
            let TABLA_FUNCIONES_Y_VARIABLES_global:TABLA_FUNCIONES_Y_VARIABLES = new TABLA_FUNCIONES_Y_VARIABLES(undefined,"global");
            let TABLA_FUNCIONES_Y_VARIABLES_actual:TABLA_FUNCIONES_Y_VARIABLES = TABLA_FUNCIONES_Y_VARIABLES_global;
            //RECORRER PARA DECLARAR FUNCIONES
            console.log("------------ DECLARACION DE METODOS ------------");
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
                console.log("------------ EJECUCION DE INSTRUCCIONES  ------------");
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
        this.escribir_en_consola("_____________________________________")
        this.escribir_en_consola("      INTENTO DE GRAFICA")
        this.escribir_en_consola("_____________________________________")
        let codigo = "digraph AST {\n";
        codigo += "node [shape=box, style=rounded];\n";
        codigo += nodos +"\n";
        codigo += "}";
        this.escribir_en_consola(codigo);
    }
}


