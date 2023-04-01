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
    expresion:    Expresion;

    constructor(id: string, expresion: Expresion, linea: number, columna: number) 
    {
        super(linea, columna);
        this.id = id;
        this.expresion = expresion;
    }

    public ejecutar(tabla: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        let variable = tabla.obtener_variable(this.id);
        if(variable === undefined) 
        {
            ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): VARIABLE "+this.id+" NO DEFINIDA.");
            
        }else{
            let valor_asig = this.expresion.obtener_valor(tabla, global, ast);
            if(variable.obtener_tipo().obtener_tipo_de_dato() != this.expresion.tipo.obtener_tipo_de_dato()) 
            {
                ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): EL VALOR NO COINCIDE CON EL TIPO.");
            }else{
                variable.modificar_valor(valor_asig);
                ast.escribir_en_consola("EXITO variable modificada.Nuevo valor: "+valor_asig);
            }
        }

        

        
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

    public ejecutar(tabla: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        //SI LA VARIABLE EXISTE NO SE CREA NADA
        if( tabla.variable_existe(this.id) ) 
        {
            ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): VARIABLE YA EXISTE.");
        }
        //SI LA VARIABLE NO EXISTE
        else{
            let res
            //SI LA EXPRESION ES DIFERENTE DE VACIO
            if(this.expresion != undefined) 
            {
                res = this.expresion.obtener_valor(tabla, global, ast);
                //VALIDAR CON EL TIPO DE DATO
                if(this.tipo.obtener_tipo_de_dato() != this.expresion.tipo.obtener_tipo_de_dato())
                {
                    if(this.expresion.tipo.obtener_tipo_de_dato() === TIPO_DATO.ERROR){
                        ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ ") TIPO DE DATO INCORRECTO O NO EXISTE VARIABLE ");
                    }else{
                        ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): EL TIPO NO COINCIDE CON LA EXPRESION.");
                    }
                    
                }else{
                    let nueva_var = new VARIABLE(this.tipo, this.id, res);
                    ast.escribir_en_consola("EXITO: variable "+this.id +": creada con valor: "+res);
                    tabla.agregar_variable_tabla(this.id,nueva_var);
                }
            } 
            //SI LA EXPRESION ES VACIO
            else 
            {
                if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.INT)
                {
                    res = 0;
                }
                else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.DOUBLE)
                {
                    res = 0.0;
                } 
                else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.BOOLEAN)
                {
                    res = true;
                } 
                else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.CHAR) 
                {
                    res = "\u0000";
                } 
                else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.STRING) 
                {
                    res = "";
                } 
                let nueva_var = new VARIABLE(this.tipo, this.id, res);
                ast.escribir_en_consola("EXITO: variable "+this.id +" creada con valor: "+res);
                tabla.agregar_variable_tabla(this.id,nueva_var);
            }
        }
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
    
    public obtener_valor(tabla: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        //VALIDA SI EXISTE LA VARIABLE
        let variable = tabla.obtener_variable(this.nombreVar);
        if(variable === undefined) 
        {
            let valor_var = "ERROR";
            this.tipo = new Tipo(TIPO_DATO.ERROR) ;
            return valor_var;
        }   
        
        let valor_var = variable.obtener_valor();
        this.tipo = variable.obtener_tipo();
        return valor_var;
        

        
    }
}