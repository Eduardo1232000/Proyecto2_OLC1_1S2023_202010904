import { AST } from "../arbol/AST";
import { TABLA_FUNCIONES_Y_VARIABLES } from "../arbol/TABLA_FUNCIONES_Y_VARIABLES";
import { Expresion } from "../arbol/EJECUCION";
import { Tipo } from "../arbol/Tipo";
import { TIPO_DATO } from "../arbol/Tipo";


export class OPERACION_UNARIA extends Expresion {
    valor1: Expresion;
    operacion: string;
    constructor(operacion: string,valor1: Expresion, linea:number, columna:number)
    {
        super(linea, columna,"OPERACIONUNARIA");
        this.operacion = operacion;
        this.valor1 = valor1;
        
    }

    public obtener_valor(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST)
    {
        let respuesta;
        //VALIDAR TIPOS DE DATOS        
        let valor_1    = this.valor1.obtener_valor(actual,global,ast);
        let tipo_valor1:TIPO_DATO = this.valor1.tipo.obtener_tipo_de_dato();
        switch(this.operacion) 
        {
//OPERACION ARITMETICA
            case "-" :  //NEGACION 
                {
                    //RESPUESTA INT
                    if(tipo_valor1 == TIPO_DATO.INT)
                    {

                        this.tipo = new Tipo(TIPO_DATO.INT);
                        respuesta = valor_1 *-1
                        return respuesta;
                    }
                    //RESPUESTA DOUBLE
                    else if(tipo_valor1 == TIPO_DATO.DOUBLE )
                    {   
                        this.tipo = new Tipo(TIPO_DATO.DOUBLE);
                        respuesta = valor_1 * -1
                        return respuesta;               
                    }
                    else//SI LLEGA AQUI ES ERROR PORQUE NO CUMPLE CON LOS REQUISITOS
                    {
                        this.tipo = new Tipo(TIPO_DATO.ERROR);
                        respuesta = 0;
                        return respuesta;
                    }
                }
//OPERACION LOGICA
            case "!" :  //NOT
                {
                    //RESPUESTA INT
                    if(tipo_valor1 == TIPO_DATO.BOOLEAN)
                    {

                        this.tipo = new Tipo(TIPO_DATO.BOOLEAN);
                        if (valor_1 == true)
                        {
                            respuesta = false;
                        }
                        else
                        {
                            respuesta = true
                        }
                        return respuesta;
                    }
                    else
                    {
                        this.tipo = new Tipo(TIPO_DATO.ERROR);
                        respuesta = 0;
                        return respuesta;
                    }
                }
//INCREMENTOS Y DECREMENTOS
            case "++" :  
            {
                //RESPUESTA INT
                if(tipo_valor1 == TIPO_DATO.INT ||tipo_valor1 == TIPO_DATO.DOUBLE)
                {

                    this.tipo = this.valor1.tipo;
                    respuesta = valor_1 + 1;
                    return respuesta;
                }
                else
                {
                    this.tipo = new Tipo(TIPO_DATO.ERROR);
                    respuesta = 0;
                    return respuesta;
                }
            } 
            case "--" : 
            {
                //RESPUESTA INT
                if(tipo_valor1 == TIPO_DATO.INT ||tipo_valor1 == TIPO_DATO.DOUBLE)
                {

                    this.tipo = this.valor1.tipo;
                    respuesta = valor_1 - 1;
                    return respuesta;
                }
                else
                {
                    this.tipo = new Tipo(TIPO_DATO.ERROR);
                    respuesta = 0;
                    return respuesta;
                }
            }   
        }
    }
    
}
