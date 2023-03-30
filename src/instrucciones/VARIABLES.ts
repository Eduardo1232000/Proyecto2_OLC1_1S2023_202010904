import { AST } from "../arbol/AST";
import { TABLA_FUNCIONES_Y_VARIABLES } from "../arbol/TABLA_FUNCIONES_Y_VARIABLES";
import { Expresion } from "../arbol/EJECUCION";
import { Instruccion } from "../arbol/EJECUCION";
import { TIPO_DATO } from "../arbol/Tipo";

import { Tipo } from "../arbol/Tipo";
import { VARIABLE } from "../arbol/TABLA_FUNCIONES_Y_VARIABLES";

export class ASIGNACION_VARIABLE extends Instruccion 
{
    id:     string;
    exp:    Expresion;

    constructor(id: string, exp: Expresion, linea: number, columna: number) 
    {
        super(linea, columna);
        this.id = id;
        this.exp = exp;
    }

    public ejecutar(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        let variable = actual.obtener_variable(this.id);
        if(variable === undefined) 
        {
            ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): VARIABLE "+this.id+" NO DEFINIDA.");
            
        }

        let valor_asig = this.exp.obtener_valor(actual, global, ast);
        if(variable.obtener_tipo().obtener_tipo_de_dato() != this.exp.tipo.obtener_tipo_de_dato()) 
        {
            ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): EL VALOR NO COINCIDE CON EL TIPO.");
        }

        variable.modificar_valor(valor_asig);
        ast.escribir_en_consola("EXITO VARIABLE MODIFICADA.");
    }
}

export class DECLARACION_VARIABLE extends Instruccion 
{
    tipo:   Tipo;
    id:     string;
    expresion:    Expresion;

    constructor(tipo: Tipo, id: string, exp: Expresion, linea: number, columna: number) 
    {
        super(linea, columna);
        this.tipo = tipo;
        this.id = id;
        this.expresion = exp;
    }

    public ejecutar(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        //SI LA VARIABLE EXISTE
        if( actual.variable_existe(this.id) ) 
        {
            ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): VARIABLE YA EXISTE.");
        }

        let res
        if(this.expresion != undefined) 
        {
            res = this.expresion.obtener_valor(actual, global, ast);
            if(this.tipo.obtener_tipo_de_dato() != this.expresion.tipo.obtener_tipo_de_dato()) 
            {
                ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): EL TIPO NO COINCIDE CON LA EXPRESION.");
            }
        } else 
        {
            if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.INT)
            {
                res = 0;
            }else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.DOUBLE)
            {
                res = 0.0;
            } else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.STRING) 
            {
                res = "";
            } else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.STRING) 
            {
                res = "";
            }
        }
        let nueva_var = new VARIABLE(this.tipo, this.id, res);
        ast.escribir_en_consola("EXITO: variable "+this.id +": creada con valor: "+res);
        actual.agregar_variable_tabla(this.id,nueva_var);
    }
}

export class VALIDAR_EXISTE_VARIABLE extends Expresion
{
    nombreVar  : string;
    constructor(nombreVar : string, linea : number, columna : number) 
    {
        super(linea,columna);
        this.nombreVar = nombreVar;
    }
    
    public obtener_valor(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        //VALIDA SI EXISTE LA VARIABLE
        let variable = actual.obtener_variable(this.nombreVar);
        if(variable === undefined) 
        {
            ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): VARIABLE"+this.nombreVar+" NO EXISTE.");
        }

        let valor_var = variable.obtener_valor();
        this.tipo = variable.obtener_tipo();
        return valor_var;
    }
}