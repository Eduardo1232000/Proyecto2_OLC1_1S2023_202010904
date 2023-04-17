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
            let TABLA_FUNCIONES_Y_VARIABLES_global:TABLA_FUNCIONES_Y_VARIABLES = new TABLA_FUNCIONES_Y_VARIABLES(undefined);
            let TABLA_FUNCIONES_Y_VARIABLES_actual:TABLA_FUNCIONES_Y_VARIABLES = TABLA_FUNCIONES_Y_VARIABLES_global;
            
            //SI NO ES NINGUNO DE LOS ANTERIORES
            for(let x = 0; x < this.EJECUCIONES.length ; x++)
            {
                let sent = this.EJECUCIONES[x];
                //ES UNA INSTRUCCION COMO :(IF, WHILE, DECLARACIONES ETC)
                if(sent instanceof Instruccion) 
                {
                    sent.ejecutar(TABLA_FUNCIONES_Y_VARIABLES_actual, TABLA_FUNCIONES_Y_VARIABLES_global, this);
                }
                //ES UNA EXPRESION (SUMA, RESTA ETC)
                else if(sent instanceof Expresion) 
                {
                    sent.obtener_valor(TABLA_FUNCIONES_Y_VARIABLES_actual, TABLA_FUNCIONES_Y_VARIABLES_global, this);
                }
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
    public escribir_codigo_grafica(cadena: string)
    {
        this.codigo_grafica += cadena +"\n";
    }
    public obtener_codigo_grafica()
    {
        return this.codigo_grafica;
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
    public graficar_recursivo(ejecucion)
    {
        

    }
}


