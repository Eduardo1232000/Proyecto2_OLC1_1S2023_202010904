import { AST } from "../arbol/AST";
import { TABLA_FUNCIONES_Y_VARIABLES } from "../arbol/TABLA_FUNCIONES_Y_VARIABLES";
import { Expresion } from "../arbol/EJECUCION";
import { Tipo } from "../arbol/Tipo";
import { TIPO_DATO } from "../arbol/Tipo";


export class CASTEOS extends Expresion {
    tipo_val: string;
    valor1: Expresion;
    
    constructor(tipo_val: string, valor1: Expresion, linea:number, columna:number)
    {
        super(linea, columna);
        this.tipo_val = tipo_val;
        this.valor1 = valor1;
    }

    public obtener_valor(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST)
    {
        let respuesta;
        //VALIDAR TIPOS DE DATOS        
        let valor_1    = this.valor1.obtener_valor(actual,global,ast);
        let tipo_valor1:TIPO_DATO = this.valor1.tipo.obtener_tipo_de_dato();
        switch(this.tipo_val) 
        {
            case "INT":
            {
                if(tipo_valor1 == TIPO_DATO.INT || tipo_valor1 == TIPO_DATO.CHAR )
                {
                    this.tipo = new Tipo(TIPO_DATO.INT);
                    respuesta = valor_1
                    return respuesta
                }
                else if (tipo_valor1 == TIPO_DATO.DOUBLE)
                {
                    this.tipo = new Tipo(TIPO_DATO.INT);
                    respuesta = Math.trunc(valor_1);
                    return respuesta
                }
                else{
                    ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): CASTEO NO VALIDO.");
                    this.tipo = new Tipo(TIPO_DATO.ERROR);
                    respuesta = 0;
                    return respuesta;
                }
            }
            case "DOUBLE":
            {
                if(tipo_valor1 == TIPO_DATO.INT || tipo_valor1 == TIPO_DATO.DOUBLE || tipo_valor1 == TIPO_DATO.CHAR )
                {
                    this.tipo = new Tipo(TIPO_DATO.DOUBLE);
                    respuesta = valor_1
                    return respuesta
                }
                else{
                    ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): CASTEO NO VALIDO.");
                    this.tipo = new Tipo(TIPO_DATO.ERROR);
                    respuesta = 0;
                    return respuesta;
                }
            }
            case "STRING":
            {
                if(tipo_valor1 == TIPO_DATO.INT || tipo_valor1 == TIPO_DATO.DOUBLE || tipo_valor1 == TIPO_DATO.CHAR ||tipo_valor1 == TIPO_DATO.BOOLEAN||tipo_valor1 == TIPO_DATO.STRING )
                {
                    this.tipo = new Tipo(TIPO_DATO.STRING);
                    respuesta = valor_1
                    return respuesta
                }
                else{
                    ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): CASTEO NO VALIDO.");
                    this.tipo = new Tipo(TIPO_DATO.ERROR);
                    respuesta = 0;
                    return respuesta;
                }
            }
            case "CHAR":
            {
                if(tipo_valor1 == TIPO_DATO.INT)
                {
                    this.tipo = new Tipo(TIPO_DATO.CHAR);
                    respuesta = valor_1
                    return respuesta
                }
                else{
                    ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): CASTEO NO VALIDO.");
                    this.tipo = new Tipo(TIPO_DATO.ERROR);
                    respuesta = 0;
                    return respuesta;
                }
            }
        }
    }
}
