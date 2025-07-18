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
        super(linea, columna,"VALOR");
        this.valor = valor;
        this.tipo_valor = tipo_valor;
    }
    
    public obtener_valor(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        try {
            switch(this.tipo_valor) 
            {
                case "INT" :
                {
                    this.tipo = new Tipo(TIPO_DATO.INT);
                    return parseInt(this.valor);
                }
                case "DOUBLE" :
                {
                    this.tipo = new Tipo(TIPO_DATO.DOUBLE);
                    return parseFloat(this.valor);
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
                case "CHAR" :
                {
                    this.tipo = new Tipo(TIPO_DATO.CHAR);
                    return this.valor;
                }
                case "STRING" :
                {
                    this.tipo = new Tipo(TIPO_DATO.STRING);
                    return this.valor;
                }  
            }
        } catch (error) {
            ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ ") NO SE PUEDE OBTENER EL VALOR");
        }
        
    }
    
}