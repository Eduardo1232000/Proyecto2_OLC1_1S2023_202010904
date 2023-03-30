import { TABLA_FUNCIONES_Y_VARIABLES } from "./TABLA_FUNCIONES_Y_VARIABLES";
import { AST } from "./AST";
import { LISTA_EJECUCIONES } from "./LISTA_EJECUCIONES";
import { Tipo } from "./Tipo";


export abstract class Instruccion extends LISTA_EJECUCIONES
{
    constructor(linea : number , columna : number)
    {
        super(linea,columna);
    }
    public abstract ejecutar(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST): any;
}

export abstract class Expresion extends LISTA_EJECUCIONES
{
    public tipo : Tipo;
    constructor(linea:number,columna:number)
    {
        super(linea,columna);
        this.tipo = undefined;
    }
    public abstract obtener_valor(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) : any;
}
