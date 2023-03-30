import { TABLA_FUNCIONES_Y_VARIABLES } from "../arbol/TABLA_FUNCIONES_Y_VARIABLES";
import { AST } from "../arbol/AST";
import { Expresion } from "../arbol/EJECUCION";
import { Tipo } from "../arbol/Tipo";
import { TIPO_DATO } from "../arbol/Tipo";

export class Valor extends Expresion 
{
    valor       : string;
    tipo_valor  : string;

    constructor(valor :string, tipo_valor :string, linea :number, columna :number ) 
    {
        super(linea, columna);
        this.valor = valor;
        this.tipo_valor = tipo_valor;
    }
    
    public obtener_valor(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        switch(this.tipo_valor) 
        {
            case "INT" :
                {
                    this.tipo = new Tipo(TIPO_DATO.INT);
                    return parseInt(this.valor);
                }
            case "STRING" :
                {
                    this.tipo = new Tipo(TIPO_DATO.STRING);
                    return this.valor;
                }
            case "DOUBLE" :
                {
                    this.tipo = new Tipo(TIPO_DATO.DOUBLE);
                    return parseFloat(this.valor);
                }
            case "CHAR" :
                {
                    this.tipo = new Tipo(TIPO_DATO.CHAR);
                    return this.valor;
                }
            case "true" :
                {   
                    this.tipo = new Tipo(TIPO_DATO.BOOLEAN);
                    return true;
                }
            case "false" :
                {
                    this.tipo = new Tipo(TIPO_DATO.BOOLEAN);
                    return false;
                }
        }
    }
}