import { AST } from "../arbol/AST";
import { TABLA_FUNCIONES_Y_VARIABLES } from "../arbol/TABLA_FUNCIONES_Y_VARIABLES";
import { Expresion } from "../arbol/EJECUCION";
import { Tipo } from "../arbol/Tipo";
import { TIPO_DATO } from "../arbol/Tipo";


export class OPERACIONES extends Expresion {
    valor1: Expresion;
    operacion: string;
    valor2: Expresion;
    constructor(valor1: Expresion,operacion: string, valor2:Expresion, linea:number, columna:number)
    {
        super(linea, columna,"OPERACION");
        this.valor1 = valor1;
        this.operacion = operacion;
        this.valor2 = valor2;
    }

    public obtener_valor(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST)
    {
        try {
            let respuesta;
            //VALIDAR TIPOS DE DATOS        
            let valor_1    = this.valor1.obtener_valor(actual,global,ast);
            let valor_2    = this.valor2.obtener_valor(actual,global,ast);
            let tipo_valor1:TIPO_DATO = this.valor1.tipo.obtener_tipo_de_dato();
            let tipo_valor2:TIPO_DATO = this.valor2.tipo.obtener_tipo_de_dato();
            switch(this.operacion) 
            {
    //OPERACIONES ARITMETICAS
                case "+" :
                    {   //RESPUESTA INT
                        if((tipo_valor1 == TIPO_DATO.INT &&(tipo_valor2 ==TIPO_DATO.INT || tipo_valor2== TIPO_DATO.BOOLEAN || tipo_valor2 ==TIPO_DATO.CHAR))||
                            (tipo_valor2 == TIPO_DATO.INT&&(tipo_valor1 ==TIPO_DATO.INT || tipo_valor1== TIPO_DATO.BOOLEAN || tipo_valor1 ==TIPO_DATO.CHAR)))
                        {
                            if(tipo_valor1 == TIPO_DATO.CHAR ||tipo_valor2 == TIPO_DATO.CHAR){
                                if(tipo_valor1 == TIPO_DATO.CHAR){
                                    var i =this.valor1.obtener_valor(actual,global,ast).charCodeAt(0);
                                    respuesta = i + this.valor2.obtener_valor(actual,global,ast)
                                }else{
                                    var i =this.valor2.obtener_valor(actual,global,ast).charCodeAt(0);
                                    respuesta = i + this.valor1.obtener_valor(actual,global,ast)
                                }
                                this.tipo = new Tipo(TIPO_DATO.INT);
                                return respuesta;
                            }
                            else//SOLO ENTRE ENTEROS
                            {
                                this.tipo = new Tipo(TIPO_DATO.INT);
                                respuesta = this.valor1.obtener_valor(actual,global,ast) + this.valor2.obtener_valor(actual,global,ast)
                                return respuesta;
                            }

                        }
                        //RESPUESTA DOUBLE
                        else if((tipo_valor1 == TIPO_DATO.DOUBLE &&(tipo_valor2 ==TIPO_DATO.INT ||tipo_valor2== TIPO_DATO.DOUBLE || tipo_valor2== TIPO_DATO.BOOLEAN || tipo_valor2 ==TIPO_DATO.CHAR))||
                                (tipo_valor2 == TIPO_DATO.DOUBLE &&(tipo_valor1 ==TIPO_DATO.INT ||tipo_valor1== TIPO_DATO.DOUBLE || tipo_valor1== TIPO_DATO.BOOLEAN || tipo_valor1 ==TIPO_DATO.CHAR)))
                        {   
                            if(tipo_valor1 == TIPO_DATO.CHAR ||tipo_valor2 == TIPO_DATO.CHAR){
                                if(tipo_valor1 == TIPO_DATO.CHAR){
                                    var i =this.valor1.obtener_valor(actual,global,ast).charCodeAt(0);
                                    respuesta = i + this.valor2.obtener_valor(actual,global,ast)
                                }else{
                                    var i =this.valor2.obtener_valor(actual,global,ast).charCodeAt(0);
                                    respuesta = i + this.valor1.obtener_valor(actual,global,ast)
                                }
                                this.tipo = new Tipo(TIPO_DATO.DOUBLE);
                                return respuesta;
                            }
                            else//SI ES ENTERO O DOUBLE
                            {
                                this.tipo = new Tipo(TIPO_DATO.DOUBLE);
                                respuesta = this.valor1.obtener_valor(actual,global,ast) + this.valor2.obtener_valor(actual,global,ast)
                                return respuesta;
                            }                    
                        }
                        
                        //RESPUESTA STRING
                        else if(((tipo_valor1 == TIPO_DATO.STRING || tipo_valor1 == TIPO_DATO.CHAR) &&(tipo_valor2 ==TIPO_DATO.INT ||tipo_valor2== TIPO_DATO.DOUBLE || tipo_valor2== TIPO_DATO.BOOLEAN || tipo_valor2 ==TIPO_DATO.CHAR || tipo_valor2 ==TIPO_DATO.STRING))||
                                ((tipo_valor2 == TIPO_DATO.STRING || tipo_valor2 == TIPO_DATO.CHAR) &&(tipo_valor1 ==TIPO_DATO.INT ||tipo_valor1== TIPO_DATO.DOUBLE || tipo_valor1== TIPO_DATO.BOOLEAN || tipo_valor1 ==TIPO_DATO.CHAR|| tipo_valor1 ==TIPO_DATO.STRING)))
                        {
                            this.tipo = new Tipo(TIPO_DATO.STRING);
                            respuesta = this.valor1.obtener_valor(actual,global,ast) + this.valor2.obtener_valor(actual,global,ast)
                            return respuesta;
                        }
                        else//SI LLEGA AQUI ES ERROR PORQUE NO CUMPLE CON LOS REQUISITOS
                        {
                            this.tipo = new Tipo(TIPO_DATO.ERROR);
                            respuesta = 0;
                            return respuesta;
                        }
                    }
                case "-" :
                    {
                        //RESPUESTA INT
                        if((tipo_valor1 == TIPO_DATO.INT &&(tipo_valor2 ==TIPO_DATO.INT || tipo_valor2== TIPO_DATO.BOOLEAN || tipo_valor2 ==TIPO_DATO.CHAR))||
                            (tipo_valor2 == TIPO_DATO.INT&&(tipo_valor1 ==TIPO_DATO.INT || tipo_valor1== TIPO_DATO.BOOLEAN || tipo_valor1 ==TIPO_DATO.CHAR)))
                        {
                            if(tipo_valor1 == TIPO_DATO.CHAR ||tipo_valor2 == TIPO_DATO.CHAR){
                                if(tipo_valor1 == TIPO_DATO.CHAR){
                                    var i =this.valor1.obtener_valor(actual,global,ast).charCodeAt(0);
                                    respuesta = i - this.valor2.obtener_valor(actual,global,ast)
                                }else{
                                    var i =this.valor2.obtener_valor(actual,global,ast).charCodeAt(0);
                                    respuesta = this.valor1.obtener_valor(actual,global,ast) - i 
                                }
                                this.tipo = new Tipo(TIPO_DATO.INT);
                                return respuesta;
                            }
                            else//SOLO ENTRE ENTEROS
                            {
                                this.tipo = new Tipo(TIPO_DATO.INT);
                                respuesta = this.valor1.obtener_valor(actual,global,ast) - this.valor2.obtener_valor(actual,global,ast)
                                return respuesta;
                            }

                        }
                        //RESPUESTA DOUBLE
                        else if((tipo_valor1 == TIPO_DATO.DOUBLE &&(tipo_valor2 ==TIPO_DATO.INT ||tipo_valor2== TIPO_DATO.DOUBLE || tipo_valor2== TIPO_DATO.BOOLEAN || tipo_valor2 ==TIPO_DATO.CHAR))||
                                (tipo_valor2 == TIPO_DATO.DOUBLE &&(tipo_valor1 ==TIPO_DATO.INT ||tipo_valor1== TIPO_DATO.DOUBLE || tipo_valor1== TIPO_DATO.BOOLEAN || tipo_valor1 ==TIPO_DATO.CHAR)))
                        {   
                            if(tipo_valor1 == TIPO_DATO.CHAR ||tipo_valor2 == TIPO_DATO.CHAR){
                                if(tipo_valor1 == TIPO_DATO.CHAR){
                                    var i =this.valor1.obtener_valor(actual,global,ast).charCodeAt(0);
                                    respuesta = i - this.valor2.obtener_valor(actual,global,ast)
                                }else{
                                    var i =this.valor2.obtener_valor(actual,global,ast).charCodeAt(0);
                                    respuesta = this.valor1.obtener_valor(actual,global,ast) - i 
                                }
                                this.tipo = new Tipo(TIPO_DATO.DOUBLE);
                                return respuesta;
                            }
                            else//SI ES ENTERO O DOUBLE
                            {
                                this.tipo = new Tipo(TIPO_DATO.DOUBLE);
                                respuesta = this.valor1.obtener_valor(actual,global,ast) - this.valor2.obtener_valor(actual,global,ast)
                                return respuesta;
                            }                    
                        }
                        else//SI LLEGA AQUI ES ERROR PORQUE NO CUMPLE CON LOS REQUISITOS
                        {
                            this.tipo = new Tipo(TIPO_DATO.ERROR);
                            respuesta = 0;
                            return respuesta;
                        }
                    }
                case "*" :
                    {
                        //RESPUESTA INT
                        if((tipo_valor1 == TIPO_DATO.INT &&(tipo_valor2 ==TIPO_DATO.INT || tipo_valor2 ==TIPO_DATO.CHAR))||
                            (tipo_valor2 == TIPO_DATO.INT&&(tipo_valor1 ==TIPO_DATO.INT || tipo_valor1 ==TIPO_DATO.CHAR)))
                        {
                            if(tipo_valor1 == TIPO_DATO.CHAR ||tipo_valor2 == TIPO_DATO.CHAR){
                                if(tipo_valor1 == TIPO_DATO.CHAR){
                                    var i =this.valor1.obtener_valor(actual,global,ast).charCodeAt(0);
                                    respuesta = i * this.valor2.obtener_valor(actual,global,ast)
                                }else{
                                    var i =this.valor2.obtener_valor(actual,global,ast).charCodeAt(0);
                                    respuesta = this.valor1.obtener_valor(actual,global,ast) * i 
                                }
                                this.tipo = new Tipo(TIPO_DATO.INT);
                                return respuesta;
                            }
                            else//SOLO ENTRE ENTEROS
                            {
                                this.tipo = new Tipo(TIPO_DATO.INT);
                                respuesta = this.valor1.obtener_valor(actual,global,ast) * this.valor2.obtener_valor(actual,global,ast)
                                return respuesta;
                            }

                        }
                        //RESPUESTA DOUBLE
                        else if((tipo_valor1 == TIPO_DATO.DOUBLE &&(tipo_valor2 ==TIPO_DATO.INT ||tipo_valor2== TIPO_DATO.DOUBLE || tipo_valor2 ==TIPO_DATO.CHAR))||
                                (tipo_valor2 == TIPO_DATO.DOUBLE &&(tipo_valor1 ==TIPO_DATO.INT ||tipo_valor1== TIPO_DATO.DOUBLE || tipo_valor1 ==TIPO_DATO.CHAR)))
                        {   
                            if(tipo_valor1 == TIPO_DATO.CHAR ||tipo_valor2 == TIPO_DATO.CHAR){
                                if(tipo_valor1 == TIPO_DATO.CHAR){
                                    var i =this.valor1.obtener_valor(actual,global,ast).charCodeAt(0);
                                    respuesta = i * this.valor2.obtener_valor(actual,global,ast)
                                }else{
                                    var i =this.valor2.obtener_valor(actual,global,ast).charCodeAt(0);
                                    respuesta = this.valor1.obtener_valor(actual,global,ast) * i 
                                }
                                this.tipo = new Tipo(TIPO_DATO.DOUBLE);
                                return respuesta;
                            }
                            else//SI ES ENTERO O DOUBLE
                            {
                                this.tipo = new Tipo(TIPO_DATO.DOUBLE);
                                respuesta = this.valor1.obtener_valor(actual,global,ast) * this.valor2.obtener_valor(actual,global,ast)
                                return respuesta;
                            }                    
                        }
                        else//SI LLEGA AQUI ES ERROR PORQUE NO CUMPLE CON LOS REQUISITOS
                        {
                            this.tipo = new Tipo(TIPO_DATO.ERROR);
                            respuesta = 0;
                            return respuesta;
                        }
                    }
                case "/" :
                    {
                        //RESPUESTA DOUBLE
                        if(((tipo_valor1 == TIPO_DATO.INT ||tipo_valor1 == TIPO_DATO.DOUBLE) &&(tipo_valor2 ==TIPO_DATO.INT ||tipo_valor2== TIPO_DATO.DOUBLE || tipo_valor2 ==TIPO_DATO.CHAR))||
                                ((tipo_valor2 == TIPO_DATO.INT ||tipo_valor2 == TIPO_DATO.DOUBLE) &&(tipo_valor1 ==TIPO_DATO.INT ||tipo_valor1== TIPO_DATO.DOUBLE || tipo_valor1 ==TIPO_DATO.CHAR)))
                        {   
                            if(tipo_valor1 == TIPO_DATO.CHAR ||tipo_valor2 == TIPO_DATO.CHAR){
                                if(tipo_valor1 == TIPO_DATO.CHAR){
                                    var i =this.valor1.obtener_valor(actual,global,ast).charCodeAt(0);
                                    respuesta = i / this.valor2.obtener_valor(actual,global,ast)
                                }else{
                                    var i =this.valor2.obtener_valor(actual,global,ast).charCodeAt(0);
                                    respuesta = this.valor1.obtener_valor(actual,global,ast) / i 
                                }
                                this.tipo = new Tipo(TIPO_DATO.DOUBLE);
                                return respuesta;
                            }
                            else//SI ES ENTERO O DOUBLE
                            {
                                this.tipo = new Tipo(TIPO_DATO.DOUBLE);
                                respuesta = this.valor1.obtener_valor(actual,global,ast) / this.valor2.obtener_valor(actual,global,ast)
                                return respuesta;
                            }                    
                        }
                        else//SI LLEGA AQUI ES ERROR PORQUE NO CUMPLE CON LOS REQUISITOS
                        {
                            this.tipo = new Tipo(TIPO_DATO.ERROR);
                            respuesta = 0;
                            return respuesta;
                        }
                    }
                case "^":
                    {
                        //RESPUESTA INT
                        if(tipo_valor1 == TIPO_DATO.INT &&tipo_valor2 ==TIPO_DATO.INT)
                        {   
                            this.tipo = new Tipo(TIPO_DATO.INT);
                            respuesta = this.valor1.obtener_valor(actual,global,ast) ** this.valor2.obtener_valor(actual,global,ast) 
                            return respuesta;             
                        }
                        //RESPUESTA DOUBLE
                        else if((tipo_valor1 == TIPO_DATO.DOUBLE &&(tipo_valor2 ==TIPO_DATO.INT||tipo_valor2 == TIPO_DATO.DOUBLE))||
                                (tipo_valor2 == TIPO_DATO.DOUBLE &&(tipo_valor1 ==TIPO_DATO.INT||tipo_valor1 == TIPO_DATO.DOUBLE)))
                        {
                            this.tipo = new Tipo(TIPO_DATO.DOUBLE);
                            respuesta = this.valor1.obtener_valor(actual,global,ast) ** this.valor2.obtener_valor(actual,global,ast)
                            
                            
                            return respuesta; 
                        }
                        else//SI LLEGA AQUI ES ERROR PORQUE NO CUMPLE CON LOS REQUISITOS
                        {
                            this.tipo = new Tipo(TIPO_DATO.ERROR);
                            respuesta = 0;
                            return respuesta;
                        }
                    }
                case "%":
                    {
                        //RESPUESTA DOUBLE
                        if(((tipo_valor1 == TIPO_DATO.INT ||tipo_valor1 == TIPO_DATO.DOUBLE) &&(tipo_valor2 ==TIPO_DATO.INT ||tipo_valor2== TIPO_DATO.DOUBLE))||
                                ((tipo_valor2 == TIPO_DATO.INT ||tipo_valor2 == TIPO_DATO.DOUBLE) &&(tipo_valor1 ==TIPO_DATO.INT ||tipo_valor1== TIPO_DATO.DOUBLE)))
                        {   
                            this.tipo = new Tipo(TIPO_DATO.DOUBLE);
                            respuesta = this.valor1.obtener_valor(actual,global,ast) % this.valor2.obtener_valor(actual,global,ast)
                            return respuesta;                     
                        }
                    }
    //OPERACIONES RELACIONALES            
                case "==":
                    {
                            this.tipo = new Tipo(TIPO_DATO.BOOLEAN);
                            //SI EL TIPO DEBE SER IGUAL ENTONCES SOLO SE AGREGA === EN LUGAR DE ==

                            if(tipo_valor1 == TIPO_DATO.CHAR || tipo_valor2 == TIPO_DATO.CHAR){
                                var i  = this.valor1.obtener_valor(actual,global,ast)
                                var j =  this.valor2.obtener_valor(actual,global,ast)
                                if(tipo_valor1 == TIPO_DATO.CHAR){
                                    i =i.charCodeAt(0);
                                }
                                if(tipo_valor2 == TIPO_DATO.CHAR){
                                    j =j.charCodeAt(0);
                                }
                                if(i == j){
                                    respuesta = true;
                                }
                                else
                                {
                                    respuesta = false;
                                }
                                return respuesta;
                            }else{
                                if(this.valor1.obtener_valor(actual,global,ast) == this.valor2.obtener_valor(actual,global,ast)){
                                    respuesta = true;
                                }
                                else
                                {
                                    respuesta = false;
                                }
                                return respuesta; 
                            }
                                                
                    }
                case "!=":
                    {
                            this.tipo = new Tipo(TIPO_DATO.BOOLEAN);
                            //SI EL TIPO DEBE SER IGUAL ENTONCES SOLO SE AGREGA === EN LUGAR DE ==
                            if(tipo_valor1 == TIPO_DATO.CHAR || tipo_valor2 == TIPO_DATO.CHAR){
                                var i  = this.valor1.obtener_valor(actual,global,ast)
                                var j =  this.valor2.obtener_valor(actual,global,ast)
                                if(tipo_valor1 == TIPO_DATO.CHAR){
                                    i =i.charCodeAt(0);
                                }
                                if(tipo_valor2 == TIPO_DATO.CHAR){
                                    j =j.charCodeAt(0);
                                }
                                if(i == j){
                                    respuesta = false;
                                }
                                else
                                {
                                    respuesta = true;
                                }
                                return respuesta;
                            }else{
                                if(this.valor1.obtener_valor(actual,global,ast) == this.valor2.obtener_valor(actual,global,ast)){
                                    respuesta = false;
                                }
                                else
                                {
                                    respuesta = true;
                                }
                                return respuesta;
                            }
                                                
                    }
                case "<":
                    {
                        if((tipo_valor1 == TIPO_DATO.INT ||tipo_valor1 == TIPO_DATO.DOUBLE || tipo_valor1 == TIPO_DATO.CHAR ||tipo_valor1 == TIPO_DATO.BOOLEAN) &&(tipo_valor2 ==TIPO_DATO.INT ||tipo_valor2== TIPO_DATO.DOUBLE || tipo_valor2 == TIPO_DATO.CHAR || tipo_valor2 == TIPO_DATO.BOOLEAN))
                        {   
                            this.tipo = new Tipo(TIPO_DATO.BOOLEAN);
                            
                            if(tipo_valor1 == TIPO_DATO.CHAR || tipo_valor2 == TIPO_DATO.CHAR){
                                var i  = this.valor1.obtener_valor(actual,global,ast)
                                var j =  this.valor2.obtener_valor(actual,global,ast)
                                if(tipo_valor1 == TIPO_DATO.CHAR){
                                    i =i.charCodeAt(0);
                                }
                                if(tipo_valor2 == TIPO_DATO.CHAR){
                                    j =j.charCodeAt(0);
                                }
                                if(i < j){
                                    respuesta = true;
                                }
                                else
                                {
                                    respuesta = false;
                                }
                                return respuesta;
                            }else{

                                if(this.valor1.obtener_valor(actual,global,ast) < this.valor2.obtener_valor(actual,global,ast)){
                                    respuesta = true;
                                }
                                else
                                {
                                    respuesta = false;
                                }
                                return respuesta;
                            }                     
                        }
                    }
                case "<=":
                    {
                        if((tipo_valor1 == TIPO_DATO.INT ||tipo_valor1 == TIPO_DATO.DOUBLE || tipo_valor1 == TIPO_DATO.CHAR ||tipo_valor1 == TIPO_DATO.BOOLEAN) &&(tipo_valor2 ==TIPO_DATO.INT ||tipo_valor2== TIPO_DATO.DOUBLE || tipo_valor2 == TIPO_DATO.CHAR || tipo_valor2 == TIPO_DATO.BOOLEAN))
                        {   
                            this.tipo = new Tipo(TIPO_DATO.BOOLEAN);

                            if(tipo_valor1 == TIPO_DATO.CHAR || tipo_valor2 == TIPO_DATO.CHAR){
                                var i  = this.valor1.obtener_valor(actual,global,ast)
                                var j =  this.valor2.obtener_valor(actual,global,ast)
                                if(tipo_valor1 == TIPO_DATO.CHAR){
                                    i =i.charCodeAt(0);
                                }
                                if(tipo_valor2 == TIPO_DATO.CHAR){
                                    j =j.charCodeAt(0);
                                }
                                if(i <= j){
                                    respuesta = true;
                                }
                                else
                                {
                                    respuesta = false;
                                }
                                return respuesta;
                            }else{
                                if(this.valor1.obtener_valor(actual,global,ast) <= this.valor2.obtener_valor(actual,global,ast)){
                                    respuesta = true;
                                }
                                else
                                {
                                    respuesta = false;
                                }
                                return respuesta; 
                            }                    
                        }
                    }
                case ">":
                    {
                        if((tipo_valor1 == TIPO_DATO.INT ||tipo_valor1 == TIPO_DATO.DOUBLE || tipo_valor1 == TIPO_DATO.CHAR ||tipo_valor1 == TIPO_DATO.BOOLEAN) &&(tipo_valor2 ==TIPO_DATO.INT ||tipo_valor2== TIPO_DATO.DOUBLE || tipo_valor2 == TIPO_DATO.CHAR || tipo_valor2 == TIPO_DATO.BOOLEAN))
                        {   
                            this.tipo = new Tipo(TIPO_DATO.BOOLEAN);

                            if(tipo_valor1 == TIPO_DATO.CHAR || tipo_valor2 == TIPO_DATO.CHAR){
                                var i  = this.valor1.obtener_valor(actual,global,ast)
                                var j =  this.valor2.obtener_valor(actual,global,ast)
                                if(tipo_valor1 == TIPO_DATO.CHAR){
                                    i =i.charCodeAt(0);
                                }
                                if(tipo_valor2 == TIPO_DATO.CHAR){
                                    j =j.charCodeAt(0);
                                }
                                if(i > j){
                                    respuesta = true;
                                }
                                else
                                {
                                    respuesta = false;
                                }
                                return respuesta;
                            }else{
                                if(this.valor1.obtener_valor(actual,global,ast) > this.valor2.obtener_valor(actual,global,ast)){
                                    respuesta = true;
                                }
                                else
                                {
                                    respuesta = false;
                                }
                                return respuesta;
                            }                     
                        }
                    }
                case ">=":
                    {
                        if((tipo_valor1 == TIPO_DATO.INT ||tipo_valor1 == TIPO_DATO.DOUBLE || tipo_valor1 == TIPO_DATO.CHAR ||tipo_valor1 == TIPO_DATO.BOOLEAN) &&(tipo_valor2 ==TIPO_DATO.INT ||tipo_valor2== TIPO_DATO.DOUBLE || tipo_valor2 == TIPO_DATO.CHAR || tipo_valor2 == TIPO_DATO.BOOLEAN))
                        {   
                            this.tipo = new Tipo(TIPO_DATO.BOOLEAN);
                            if(tipo_valor1 == TIPO_DATO.CHAR || tipo_valor2 == TIPO_DATO.CHAR){
                                var i  = this.valor1.obtener_valor(actual,global,ast)
                                var j =  this.valor2.obtener_valor(actual,global,ast)
                                if(tipo_valor1 == TIPO_DATO.CHAR){
                                    i =i.charCodeAt(0);
                                }
                                if(tipo_valor2 == TIPO_DATO.CHAR){
                                    j =j.charCodeAt(0);
                                }
                                if(i >= j){
                                    respuesta = true;
                                }
                                else
                                {
                                    respuesta = false;
                                }
                                return respuesta;
                            }else{
                                if(this.valor1.obtener_valor(actual,global,ast) >= this.valor2.obtener_valor(actual,global,ast)){
                                    respuesta = true;
                                }
                                else
                                {
                                    respuesta = false;
                                }
                                return respuesta;     
                            }                
                        }
                    }
    //OPERACIONES LOGICAS
                case "||":
                    {
                        //SOLO TRABAJA CON BOOLEANOS
                        if(tipo_valor1 == TIPO_DATO.BOOLEAN &&tipo_valor2 == TIPO_DATO.BOOLEAN)
                        {   
                            this.tipo = new Tipo(TIPO_DATO.BOOLEAN);
                            if(this.valor1.obtener_valor(actual,global,ast) == true || this.valor2.obtener_valor(actual,global,ast) == true){
                                respuesta = true;
                            }
                            else
                            {
                                respuesta = false;
                            }
                            return respuesta;                     
                        }
                    }  
                case "&&":
                    {
                        //SOLO TRABAJA CON BOOLEANOS
                        if(tipo_valor1 == TIPO_DATO.BOOLEAN &&tipo_valor2 == TIPO_DATO.BOOLEAN)
                        {   
                            this.tipo = new Tipo(TIPO_DATO.BOOLEAN);
                            if(this.valor1.obtener_valor(actual,global,ast) == true && this.valor2.obtener_valor(actual,global,ast) == true){
                                respuesta = true;
                            }
                            else
                            {
                                respuesta = false;
                            }
                            return respuesta;                     
                        }
                    }
            }
        } catch {}
        
    }
    
}
