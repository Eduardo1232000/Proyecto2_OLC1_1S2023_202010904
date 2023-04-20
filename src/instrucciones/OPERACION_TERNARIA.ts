import { AST } from "../arbol/AST";
import { TABLA_FUNCIONES_Y_VARIABLES } from "../arbol/TABLA_FUNCIONES_Y_VARIABLES";
import { Expresion } from "../arbol/EJECUCION";
import { Tipo } from "../arbol/Tipo";
import { TIPO_DATO } from "../arbol/Tipo";


export class OPERACION_TERNARIA extends Expresion {
    condicion: Expresion;
    valor2: Expresion;
    valor3: Expresion;
    constructor(condicion: Expresion, valor2: Expresion,valor3: Expresion, linea:number, columna:number)
    {
        super(linea, columna,"OPERACIONTERNARIA");
        this.condicion = condicion;
        this.valor2 = valor2;
        this.valor3 = valor3;
    }

    public obtener_valor(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST)
    {
        let valor_1    = this.condicion.obtener_valor(actual,global,ast);
        let valor_2    = this.valor2.obtener_valor(actual,global,ast);
        let valor_3    = this.valor3.obtener_valor(actual,global,ast);
        let tipo_valor1:TIPO_DATO = this.condicion.tipo.obtener_tipo_de_dato();
        let tipo_valor2:TIPO_DATO = this.valor2.tipo.obtener_tipo_de_dato();
        let tipo_valor3:TIPO_DATO = this.valor3.tipo.obtener_tipo_de_dato();
        
        let respuesta;
        //ES COMO UN IF, SOLO VALIDA SI ES TRUE O FALSE Y SE ASIGNAN LOS VALORES      

        //SI LOS TIPOS DEL VALOR 2 Y 3 SON DISTINTOS HAY ERROR
        //if(tipo_valor2 != tipo_valor3)
        //{
        //    console.log("LOS TIPOS NO SON IGUALES");
        //    //ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ ") VALORES DE DIFERENTE TIPO");
        //    this.tipo = new Tipo(TIPO_DATO.ERROR);
        //    respuesta = 0;
        //    return respuesta;
        //}
        //SI ES BOOLEANA LA CONDICION SE PUEDE REALIZAR
        if(tipo_valor1 == TIPO_DATO.BOOLEAN)
        {
            //console.log("LA CONDICION ES BOOLEANA");
            let condicion_actual
            condicion_actual = this.condicion.obtener_valor(actual, global,ast);
            this.tipo = this.valor2.tipo
            if(condicion_actual == true)
            {
                return(this.valor2.obtener_valor(actual,global,ast));
            }
            else
            {
                return(this.valor3.obtener_valor(actual,global,ast))
            }
        }
        //SI NO ES BOOLEANO ES ERROR
        else
        {
            ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ ") CONDICION NO VALIDA");
        }

        
    

    }
    
}
