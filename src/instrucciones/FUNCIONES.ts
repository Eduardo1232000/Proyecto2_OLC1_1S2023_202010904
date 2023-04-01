
import { AST } from "../arbol/AST";
import { TABLA_FUNCIONES_Y_VARIABLES } from "../arbol/TABLA_FUNCIONES_Y_VARIABLES";
import { Expresion } from "../arbol/EJECUCION";
import {Instruccion} from "../arbol/EJECUCION";
import { Tipo } from "../arbol/Tipo";
import { TIPO_DATO } from "../arbol/Tipo";
import { LISTA_EJECUCIONES } from "../arbol/LISTA_EJECUCIONES";

export class IF extends Instruccion
{
    condicion : Expresion;
    si_cumple : LISTA_EJECUCIONES[];
    no_cumple : LISTA_EJECUCIONES[];

    constructor(condicion :Expresion, si_cumple :LISTA_EJECUCIONES[], no_cumple :LISTA_EJECUCIONES[], linea :number, columna :number) 
    {
        super(linea, columna);
        this.condicion = condicion;
        this.si_cumple = si_cumple;
        this.no_cumple = no_cumple;
    }
    public ejecutar(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) {
        let condicion_actual;
        condicion_actual = this.condicion.obtener_valor(actual, global,ast);
        //LOS IF SOLO PUEDEN EJECUTAR CUANDO CUMPLE O NO CUMPLE (TRUE O FALSE QUE SON BOOLEANOS)
        if(this.condicion.tipo.obtener_tipo_de_dato() == TIPO_DATO.BOOLEAN)
        {
            let TABLA_FUNC_Y_VAR_IF = new TABLA_FUNCIONES_Y_VARIABLES(actual);
            if(condicion_actual == true)//SI CUMPLE LA CONDICION
            {
                for(let i=0; i<this.si_cumple.length;i++){//RECORREMOS LA LISTA DE EJECUCIONES
                    let ejecucion = this.si_cumple[i]
                    if(ejecucion instanceof Instruccion)    //SI ES UNA INSTRUCCION (IF, PRINT ETC)
                    {
                        ejecucion.ejecutar(TABLA_FUNC_Y_VAR_IF,global,ast);
                    }
                    else if (ejecucion instanceof Expresion)//SI ES UNA EXPRESION (SUMA, RESTA, ETC)
                    {
                        ejecucion.obtener_valor(TABLA_FUNC_Y_VAR_IF,global,ast);
                    }
                }
            }
            else//SI NO CUMPLE LA CONDICION
            {
                for(let i=0; i<this.no_cumple.length;i++){//RECORREMOS LA LISTA DE EJECUCIONES
                    let ejecucion = this.no_cumple[i]
                    if(ejecucion instanceof Instruccion)    //SI ES UNA INSTRUCCION (IF, PRINT ETC)
                    {
                        ejecucion.ejecutar(TABLA_FUNC_Y_VAR_IF,global,ast);
                    }
                    else if (ejecucion instanceof Expresion)//SI ES UNA EXPRESION (SUMA, RESTA, ETC)
                    {
                        ejecucion.obtener_valor(TABLA_FUNC_Y_VAR_IF,global,ast);
                    }
                }
            }
        }
        else
        {
            ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ ") CONDICION NO VALIDA");
        }   
    }
}
