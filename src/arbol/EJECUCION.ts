import { TABLA_FUNCIONES_Y_VARIABLES } from "./TABLA_FUNCIONES_Y_VARIABLES";
import { AST } from "./AST";
import { LISTA_EJECUCIONES } from "./LISTA_EJECUCIONES";
import { Tipo } from "./Tipo";


export abstract class Instruccion extends LISTA_EJECUCIONES
{
    ejecuto_break:number
    ejecuto_continue:number
    ejecuto_return:Expresion
    constructor(linea : number , columna : number, nombre_in_ex: string)
    {
        super(linea,columna,nombre_in_ex);
        this.ejecuto_break = 0;
        this.ejecuto_continue = 0;
        this.ejecuto_return = undefined;
    }
    public abstract ejecutar(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST): any;
}

export abstract class Expresion extends LISTA_EJECUCIONES
{
    public tipo : Tipo;
    ejecuto_return:Expresion
    constructor(linea:number,columna:number, nombre_in_ex: string)
    {
        super(linea,columna,nombre_in_ex);
        this.tipo = undefined;
        this.ejecuto_return = undefined;
    }
    public abstract obtener_valor(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) : any;
}
