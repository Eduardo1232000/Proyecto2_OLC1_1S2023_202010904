
import { AST } from "../arbol/AST";
import { TABLA_FUNCIONES_Y_VARIABLES } from "../arbol/TABLA_FUNCIONES_Y_VARIABLES";
import { Expresion } from "../arbol/EJECUCION";
import {Instruccion} from "../arbol/EJECUCION";
import { Tipo } from "../arbol/Tipo";
import { TIPO_DATO } from "../arbol/Tipo";
import { LISTA_EJECUCIONES } from "../arbol/LISTA_EJECUCIONES";
import { ASIGNACION_VARIABLE } from "./VARIABLES";
import { VARIABLE } from "../arbol/TABLA_FUNCIONES_Y_VARIABLES";
import exp from "constants";

export class IF extends Instruccion
{
    condicion : Expresion;
    si_cumple : LISTA_EJECUCIONES[];
    no_cumple : LISTA_EJECUCIONES[];

    constructor(condicion :Expresion, si_cumple :LISTA_EJECUCIONES[], no_cumple :LISTA_EJECUCIONES[], linea :number, columna :number) 
    {
        super(linea, columna,"IF");
        this.condicion = condicion;
        this.si_cumple = si_cumple;
        this.no_cumple = no_cumple;
    }
    public ejecutar(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) {
        let condicion_actual;
        condicion_actual = this.condicion.obtener_valor(actual, global,ast);
        //LOS IF SOLO PUEDEN EJECUTAR CUANDO CUMPLE O NO CUMPLE (TRUE O FALSE QUE SON BOOLEANOS)
        if(this.condicion.tipo.obtener_tipo_de_dato() == TIPO_DATO.BOOLEAN)
        {
            let TABLA_FUNC_Y_VAR_IF = new TABLA_FUNCIONES_Y_VARIABLES(actual,"funcion if");
            if(condicion_actual == true)//SI CUMPLE LA CONDICION
            {
                for(let i=0; i<this.si_cumple.length;i++){//RECORREMOS LA LISTA DE EJECUCIONES
                    let ejecucion = this.si_cumple[i]
                    if(ejecucion instanceof Instruccion)    //SI ES UNA INSTRUCCION (IF, PRINT ETC)
                    {
                        ejecucion.ejecutar(TABLA_FUNC_Y_VAR_IF,global,ast);
                        if(ejecucion.nombre_in_ex=="BREAK"){
                            this.ejecuto_break=1;
                            break;
                        }
                        if(ejecucion.nombre_in_ex=="CONTINUE"){
                            this.ejecuto_continue=1;
                            break;                                  //seria break porque en un if se termina el if
                        }
                        if(ejecucion.nombre_in_ex=="RETURN"){
                            
                            this.ejecuto_return = ejecucion.ejecuto_return
                            //ast.escribir_en_consola("RETURN IF: "+this.ejecuto_return.obtener_valor(actual,global,ast))
                            break;
                        }
                    }
                    else if (ejecucion instanceof Expresion)//SI ES UNA EXPRESION (SUMA, RESTA, ETC)
                    {
                        ejecucion.obtener_valor(TABLA_FUNC_Y_VAR_IF,global,ast);
                    }
                }
                
            }
            else//SI NO CUMPLE LA CONDICION
            {
                for(let i=0; i<this.no_cumple.length;i++){//RECORREMOS LA LISTA DE EJECUCIONES
                    let ejecucion = this.no_cumple[i]
                    if(ejecucion instanceof Instruccion)    //SI ES UNA INSTRUCCION (IF, PRINT ETC)
                    {
                        ejecucion.ejecutar(TABLA_FUNC_Y_VAR_IF,global,ast);
                        if(ejecucion.nombre_in_ex=="BREAK"){
                            this.ejecuto_break=1;
                            break;
                        }
                        if(ejecucion.nombre_in_ex=="CONTINUE"){
                            this.ejecuto_continue=1;
                            break;                                  //seria break porque en un if se termina el if
                        }
                        if(ejecucion.nombre_in_ex=="RETURN"){
                            this.ejecuto_return = ejecucion.ejecuto_return
                            break;
                        }
                    }
                    else if (ejecucion instanceof Expresion)//SI ES UNA EXPRESION (SUMA, RESTA, ETC)
                    {
                        ejecucion.obtener_valor(TABLA_FUNC_Y_VAR_IF,global,ast);
                    }
                }
            }
        }
        else
        {
            ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ ") CONDICION NO VALIDA");
        }   
    }
    
}
export class PRINT extends Instruccion
{
    valor : Expresion;
    

    constructor(valor :Expresion, linea :number, columna :number) 
    {
        super(linea, columna,"PRINT");
        this.valor = valor;

    }
    public ejecutar(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) {
        let respuesta = this.valor.obtener_valor(actual, global,ast);
        let tipo_valor = this.valor.tipo.obtener_tipo_de_dato();
        if(tipo_valor == TIPO_DATO.INT ||tipo_valor == TIPO_DATO.DOUBLE||tipo_valor == TIPO_DATO.CHAR||tipo_valor == TIPO_DATO.BOOLEAN||tipo_valor == TIPO_DATO.STRING ){
            respuesta = this.valor.obtener_valor(actual, global,ast);
            ast.escribir_en_consola(respuesta);
        }        
    }
    
}
export class WHILE extends Instruccion
{
    condicion : Expresion;
    instrucciones : LISTA_EJECUCIONES[]
    

    constructor(condicion :Expresion, instrucciones :LISTA_EJECUCIONES[], linea :number, columna :number) 
    {
        super(linea, columna,"WHILE");
        this.condicion = condicion;
        this.instrucciones = instrucciones

    }
    public ejecutar(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) {
        try{
            let condicion_actual = this.condicion.obtener_valor(actual,global,ast)
            let valor_condicion = this.condicion.obtener_valor(actual,global,ast)
            //ast.escribir_en_consola("."+valor_condicion)
            if(this.condicion.tipo.obtener_tipo_de_dato() == TIPO_DATO.BOOLEAN)
            {
                let TABLA_FUNC_Y_VAR_WHILE = new TABLA_FUNCIONES_Y_VARIABLES(actual,"funcion while");
                
                while(this.condicion.obtener_valor(actual,global,ast) == true){
                    if(this.ejecuto_break == 1){
                        break;
                    }
                    if(this.ejecuto_continue==1){
                        this.ejecuto_continue = 0;
                        continue;
                    }
                    for(let i=0; i<this.instrucciones.length;i++ )
                    {
                        let instruccion = this.instrucciones[i]
                        if(instruccion instanceof Instruccion)
                        {
                            instruccion.ejecutar(TABLA_FUNC_Y_VAR_WHILE,global,ast);
                            //SI ES WHILE,CONTINUE,RETURN(ES ANTES)
                            if(instruccion.nombre_in_ex=="IF"){
                                if(instruccion.ejecuto_break==1){
                                    this.ejecuto_break = 1;
                                    break;
                                }
                                if(instruccion.ejecuto_continue==1){
                                    instruccion.ejecuto_continue=0;
                                    this.ejecuto_continue = 1;
                                    break;
                                }
                            }
                            if(instruccion.nombre_in_ex=="BREAK"){
                                this.ejecuto_break = 1;
                                break;
                            }
                            if(instruccion.nombre_in_ex =="CONTINUE"){
                                this.ejecuto_continue = 1;
                                break;
                            }
                        }
                        else if (instruccion instanceof Expresion)
                        {
                            instruccion.obtener_valor(TABLA_FUNC_Y_VAR_WHILE,global,ast);
                        }
                    }
                }  
            }
            else{
                ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ ") CONDICION NO VALIDA");
            }

        }
        catch{}//SI HAY ERROR NO DEBE HACER NADA PORQUE EN LA INSTRUCCION MOSTRARA EL ERROR
        
    }
    
}
export class FOR extends Instruccion
{
    asignacion: ASIGNACION_VARIABLE
    condicion : Expresion;
    actualizacion: ASIGNACION_VARIABLE
    instrucciones : LISTA_EJECUCIONES[]
    

    constructor(asignacion: ASIGNACION_VARIABLE,condicion :Expresion,actualizacion:ASIGNACION_VARIABLE, instrucciones :LISTA_EJECUCIONES[], linea :number, columna :number) 
    {
        super(linea, columna,"FOR");
        this.asignacion = asignacion;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.instrucciones = instrucciones;

    }
    public ejecutar(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) {
        try{
            this.asignacion.ejecutar(actual,global,ast)     //PRIMERO EJECUTAR LA ASIGNACION
            let id_asig = this.asignacion.id;               //OBTENER EL ID DE LA ASIGNACION
            let id_act = this.actualizacion.id;             //OBTENER EL ID DE LA ACTUALIZACION

            let valor_condicion = this.condicion.obtener_valor(actual,global,ast)   //OBTENER VALOR DE LA CONDICION
            let tipo_valor_condicion = this.condicion.tipo.obtener_tipo_de_dato();  //OBTENER TIPO DE VALOR DE LA CONDICION
            
            if(id_asig == id_act){//SI EL ID DE ASIGNACION COINCIDE CON EL ID DE ACTUALIZACION
                if(tipo_valor_condicion == TIPO_DATO.BOOLEAN){ //SI CONDICION ES BOOLEANO
                    let TABLA_FUNC_Y_VAR_FOR = new TABLA_FUNCIONES_Y_VARIABLES(actual,"funcion for");
                    //ast.escribir_en_consola("."+this.condicion.obtener_valor(actual,global,ast))
                    
                    while(this.condicion.obtener_valor(actual,global,ast) == true){
                        if(this.ejecuto_break == 1){
                            break;
                        }
                        if(this.ejecuto_continue==1){
                            this.ejecuto_continue = 0;
                            continue;
                        }
                        for(let i=0; i<this.instrucciones.length;i++ )  //HACE 1 VEZ TODA LA LISTA DE INSTRUCCIONES
                        {
                            let instruccion = this.instrucciones[i]
                            if(instruccion instanceof Instruccion)
                            {
                                instruccion.ejecutar(TABLA_FUNC_Y_VAR_FOR,global,ast);
                                //SI ES WHILE,CONTINUE,RETURN(ES ANTES)
                            if(instruccion.nombre_in_ex=="IF"){
                                if(instruccion.ejecuto_break==1){
                                    this.ejecuto_break = 1;
                                    break;
                                }
                                if(instruccion.ejecuto_continue==1){
                                    instruccion.ejecuto_continue=0;
                                    this.ejecuto_continue = 1;
                                    break;
                                }
                            }
                            if(instruccion.nombre_in_ex=="BREAK"){
                                this.ejecuto_break = 1;
                                break;
                            }
                            if(instruccion.nombre_in_ex =="CONTINUE"){
                                this.ejecuto_continue = 1;
                                break;
                            }
                            }
                            else if (instruccion instanceof Expresion)
                            {
                                instruccion.obtener_valor(TABLA_FUNC_Y_VAR_FOR,global,ast);
                            }
                        }

                        this.actualizacion.ejecutar(TABLA_FUNC_Y_VAR_FOR, actual,ast)   //EJECUTA LA ASIGNACION EN CADA ITERACION
                    }
                }
                else{
                    ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ ") CONDICION NO VALIDA");
                }
            }
            else{
                ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ ") ACTUALIZACION TIENE DIFERENTE VARIABLE");
            }

        }
        catch{}//SI HAY ERROR NO DEBE HACER NADA PORQUE EN LA INSTRUCCION MOSTRARA EL ERROR
    }
    
}
export class DO_WHILE extends Instruccion
{
    condicion : Expresion;
    instrucciones : LISTA_EJECUCIONES[]
    

    constructor(condicion :Expresion, instrucciones :LISTA_EJECUCIONES[], linea :number, columna :number) 
    {
        super(linea, columna,"DOWHILE");
        this.condicion = condicion;
        this.instrucciones = instrucciones

    }
    public ejecutar(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) {
        try{
            let condicion_actual = this.condicion.obtener_valor(actual,global,ast)
            let valor_condicion = this.condicion.obtener_valor(actual,global,ast)
            //ast.escribir_en_consola("."+valor_condicion)
            if(this.condicion.tipo.obtener_tipo_de_dato() == TIPO_DATO.BOOLEAN)
            {
                let TABLA_FUNC_Y_VAR_WHILE = new TABLA_FUNCIONES_Y_VARIABLES(actual, "funcion do-while");
                
                do{
                    if(this.ejecuto_break == 1){
                        break;
                    }
                    if(this.ejecuto_continue==1){
                        this.ejecuto_continue = 0;
                        continue;
                    }
                    for(let i=0; i<this.instrucciones.length;i++ )
                    {
                        let instruccion = this.instrucciones[i]
                        if(instruccion instanceof Instruccion)
                        {
                            instruccion.ejecutar(TABLA_FUNC_Y_VAR_WHILE,global,ast);
                            //SI ES WHILE,CONTINUE,RETURN(ES ANTES)
                            if(instruccion.nombre_in_ex=="IF"){
                                if(instruccion.ejecuto_break==1){
                                    this.ejecuto_break = 1;
                                    break;
                                }
                                if(instruccion.ejecuto_continue==1){
                                    instruccion.ejecuto_continue=0;
                                    this.ejecuto_continue = 1;
                                    break;
                                }
                            }
                            if(instruccion.nombre_in_ex=="BREAK"){
                                this.ejecuto_break = 1;
                                break;
                            }
                            if(instruccion.nombre_in_ex =="CONTINUE"){
                                this.ejecuto_continue = 1;
                                break;
                            }
                        }
                        else if (instruccion instanceof Expresion)
                        {
                            instruccion.obtener_valor(TABLA_FUNC_Y_VAR_WHILE,global,ast);
                        }
                    }
                }
                while(this.condicion.obtener_valor(actual,global,ast) == true)
            }
            else{
                ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ ") CONDICION NO VALIDA");
            }

        }
        catch{}//SI HAY ERROR NO DEBE HACER NADA PORQUE EN LA INSTRUCCION MOSTRARA EL ERROR
        
    }
    
}
export class SWITCH extends Instruccion
{
    valor : Expresion;
    cases: CASE[];
    case_default: LISTA_EJECUCIONES[];
    

    constructor(valor :Expresion,cases: CASE[],case_default:LISTA_EJECUCIONES[], linea :number, columna :number) 
    {
        super(linea, columna,"SWITCH");
        this.valor = valor;
        this.cases = cases;
        this.case_default = case_default;

    }
    public ejecutar(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) {
        let bandera_ejecutar = false;
        let break_activo = false;
        let val_valor = this.valor.obtener_valor(actual,global,ast)
        let tipo_valor = this.valor.tipo.obtener_tipo_de_dato();

        for(let i=0;i<this.cases.length;i++){
            let case_actual = this.cases[i];
            let valor_case_actual = case_actual.valor.obtener_valor(actual,global,ast);
            let val_case = case_actual.valor.obtener_valor(actual,global,ast)
            let tipo_case = case_actual.valor.tipo.obtener_tipo_de_dato();
            if(tipo_valor == tipo_case)//VERIFICA QUE EL CASE TENGA EL MISMO TIPO QUE LO QUE SE VA A COMPARAR
            {
                if(val_valor == val_case)//SI EL VALOR COINCIDE CON EL DE ALGUN CASE
                {
                    case_actual.ejecutar(actual,global,ast);
                    //SI ES WHILE,CONTINUE,RETURN(ES ANTES)
                    //ast.escribir_en_consola(""+case_actual.ejecuto_break+""+case_actual.ejecuto_continue);
                    this.ejecuto_break = case_actual.ejecuto_break;
                    this.ejecuto_continue = case_actual.ejecuto_continue;
                    bandera_ejecutar = true;
                }
            }
            else
            {
                continue//COMO EL TIPO ES DIFERENTE ENTONCES NI LO ANALIZA
            }
            
            //ast.escribir_en_consola("."+ valor_case_actual);
            //case_actual.ejecutar(actual,global,ast);
            //ast.escribir_en_consola("ESTOY ANALIZANDO LOS CASES");
        }
        //RECORRIENDO 
        //ast.escribir_en_consola(""+this.ejecuto_break+""+this.ejecuto_continue);
        
        if(this.ejecuto_break == 0){
            if(this.case_default.length!=0){
                let TABLA_FUNC_Y_VAR_SWITCH = new TABLA_FUNCIONES_Y_VARIABLES(actual, "switch-default");
    
                for(let i=0;i<this.case_default.length;i++){
                    let instruccion = this.case_default[i];
                    if(instruccion instanceof Instruccion)
                    {
                        instruccion.ejecutar(TABLA_FUNC_Y_VAR_SWITCH,global,ast);
                        //SI ES WHILE,CONTINUE,RETURN(ES ANTES)
                        if(instruccion.nombre_in_ex=="IF"){
                            if(instruccion.ejecuto_break==1){
                                this.ejecuto_break = 1;
                                break;
                            }
                            if(instruccion.ejecuto_continue==1){
                                instruccion.ejecuto_continue=0;
                                this.ejecuto_continue = 1;
                                break;
                            }
                        }
                        if(instruccion.nombre_in_ex=="BREAK"){
                            this.ejecuto_break = 1;
                            break;
                        }
                        if(instruccion.nombre_in_ex =="CONTINUE"){
                            this.ejecuto_continue = 1;
                            break;
                        }
                    }
                    else if (instruccion instanceof Expresion)
                    {
                        instruccion.obtener_valor(TABLA_FUNC_Y_VAR_SWITCH,global,ast);
                    }
                }
                //for(let i=0;i<this.case_default.length;i++){//RECORRE INSTRUCCIONES DE DEFAULT
                //    ast.escribir_en_consola("ESTOY ANALIZANDO LOS CASES");
                //}
            }
        }
        
    }
    
}
export class CASE extends Instruccion
{
    valor : Expresion;
    instrucciones: LISTA_EJECUCIONES[];
    

    constructor(valor :Expresion,instrucciones: LISTA_EJECUCIONES[], linea :number, columna :number) 
    {
        super(linea, columna,"CASE");
        this.valor = valor;
        this.instrucciones = instrucciones

    }
    public ejecutar(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) {
        let TABLA_FUNC_Y_VAR_SWITCH = new TABLA_FUNCIONES_Y_VARIABLES(actual,"switch case");
        for(let i=0;i<this.instrucciones.length;i++){
            let instruccion = this.instrucciones[i];
            if(instruccion instanceof Instruccion)
            {
                instruccion.ejecutar(TABLA_FUNC_Y_VAR_SWITCH,global,ast);
                //SI ES WHILE,CONTINUE,RETURN(ES ANTES)
                if(instruccion.nombre_in_ex=="IF"){
                    if(instruccion.ejecuto_break==1){
                        this.ejecuto_break = 1;
                        //ast.escribir_en_consola("CASE"+this.ejecuto_break+""+this.ejecuto_continue);
                        break;
                    }
                    if(instruccion.ejecuto_continue==1){
                        instruccion.ejecuto_continue=0;
                        this.ejecuto_continue = 1;
                        //ast.escribir_en_consola("CASE"+this.ejecuto_break+""+this.ejecuto_continue);
                        break;
                    }
                }
                if(instruccion.nombre_in_ex=="BREAK"){
                    this.ejecuto_break = 1;
                    //ast.escribir_en_consola("CASE"+this.ejecuto_break+""+this.ejecuto_continue);
                    break;
                }
                if(instruccion.nombre_in_ex =="CONTINUE"){
                    this.ejecuto_continue = 1;
                    //ast.escribir_en_consola("CASE"+this.ejecuto_break+""+this.ejecuto_continue);
                    break;
                }
            }
            else if (instruccion instanceof Expresion)
            {
                instruccion.obtener_valor(TABLA_FUNC_Y_VAR_SWITCH,global,ast);
            }
        }  
    }
    
}
export class TO_LOWER extends Expresion
{
    valor : Expresion;    

    constructor(valor :Expresion, linea :number, columna :number) 
    {
        super(linea, columna,"TOLOWER");
        this.valor = valor;
    }
    public obtener_valor(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) {
        
        let valor_exp = this.valor.obtener_valor(actual,global,ast);
        let tipo_valor_exp =this.valor.tipo.obtener_tipo_de_dato();
        if(tipo_valor_exp == TIPO_DATO.STRING)
        {
            let respuesta = String(valor_exp).toLowerCase();
            //ast.escribir_en_consola("RECONOCE TO LOWER: "+respuesta);
            this.tipo = this.valor.tipo;
            return respuesta;
        }
        else 
        {
            ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ ") TIPO DE DATO NO VALIDO");
        }
    }
}
export class TO_UPPER extends Expresion
{
    valor : Expresion;    

    constructor(valor :Expresion, linea :number, columna :number) 
    {
        super(linea, columna,"TOUPPER");
        this.valor = valor;
    }
    public obtener_valor(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        let valor_exp = this.valor.obtener_valor(actual,global,ast);
        let tipo_valor_exp =this.valor.tipo.obtener_tipo_de_dato();
        if(tipo_valor_exp == TIPO_DATO.STRING)
        {
            let respuesta = String(valor_exp).toUpperCase();
            //ast.escribir_en_consola("RECONOCE TO LOWER: "+respuesta);
            this.tipo = this.valor.tipo;
            return respuesta;
        }
        else 
        {
            ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ ") TIPO DE DATO NO VALIDO");
        }
    }
}
export class LENGHT extends Expresion
{
    valor : Expresion;    

    constructor(valor :Expresion, linea :number, columna :number) 
    {
        super(linea, columna,"LENGHT");
        this.valor = valor;
    }
    public obtener_valor(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        let respuesta;
        let valor_exp = this.valor.obtener_valor(actual,global,ast);
        let tipo_valor_exp =this.valor.tipo.obtener_tipo_de_dato();
        //ast.escribir_en_consola("RECONOCE LENGTH: "+valor_exp);
        //ast.escribir_en_consola("LENGTH: "+valor_exp.length);
        let longitud;
        try {
            longitud =valor_exp.length
        } catch (error) {
            
        }
        if(longitud)
        {
            //ast.escribir_en_consola("LENGTH: "+valor_exp.length);

            respuesta = valor_exp.length;
            this.tipo = new Tipo(TIPO_DATO.INT);
            return respuesta;
        }
        else 
        {
            //ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ ") TIPO DE DATO NO VALIDO");
            this.tipo = new Tipo(TIPO_DATO.ERROR);
            respuesta = 0;
            return respuesta;
        }
    }
}
export class TRUNCATE extends Expresion
{
    valor : Expresion;    

    constructor(valor :Expresion, linea :number, columna :number) 
    {
        super(linea, columna,"TRUNCATE");
        this.valor = valor;
    }
    public obtener_valor(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        let respuesta;
        let valor_exp = this.valor.obtener_valor(actual,global,ast);
        let tipo_valor_exp =this.valor.tipo.obtener_tipo_de_dato();
        //ast.escribir_en_consola("RECONOCE LENGTH: "+valor_exp);
        //ast.escribir_en_consola("LENGTH: "+valor_exp.length);
        if(tipo_valor_exp == TIPO_DATO.INT || tipo_valor_exp == TIPO_DATO.DOUBLE)
        {
            
            respuesta = Math.trunc(valor_exp);
            ast.escribir_en_consola("TRUNCATE: "+ respuesta);
            this.tipo = new Tipo(TIPO_DATO.INT);
            return respuesta;
        }
        else 
        {
            //ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ ") TIPO DE DATO NO VALIDO");
            this.tipo = new Tipo(TIPO_DATO.ERROR);
            respuesta = 0;
            return respuesta;
        }
    }
}
export class ROUND extends Expresion
{
    valor : Expresion;    

    constructor(valor :Expresion, linea :number, columna :number) 
    {
        super(linea, columna,"ROUND");
        this.valor = valor;
    }
    public obtener_valor(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        let respuesta;
        let valor_exp = this.valor.obtener_valor(actual,global,ast);
        let tipo_valor_exp =this.valor.tipo.obtener_tipo_de_dato();
        //ast.escribir_en_consola("RECONOCE LENGTH: "+valor_exp);
        //ast.escribir_en_consola("LENGTH: "+valor_exp.length);
        if(tipo_valor_exp == TIPO_DATO.INT || tipo_valor_exp == TIPO_DATO.DOUBLE)
        {
            
            respuesta = Math.round(valor_exp);
            ast.escribir_en_consola("ROUND: "+ respuesta);
            this.tipo = new Tipo(TIPO_DATO.INT);
            return respuesta;
        }
        else 
        {
            //ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ ") TIPO DE DATO NO VALIDO");
            this.tipo = new Tipo(TIPO_DATO.ERROR);
            respuesta = 0;
            return respuesta;
        }
    }
}
export class TYPEOF extends Expresion
{
    valor : Expresion;    

    constructor(valor :Expresion, linea :number, columna :number) 
    {
        super(linea, columna,"TYPEOF");
        this.valor = valor;
    }
    public obtener_valor(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        let respuesta;
        let valor_exp = this.valor.obtener_valor(actual,global,ast);
        let tipo_valor_exp =this.valor.tipo.obtener_tipo_de_dato();
        //ast.escribir_en_consola("RECONOCE LENGTH: "+valor_exp);
        //ast.escribir_en_consola("LENGTH: "+valor_exp.length);
        if(tipo_valor_exp == TIPO_DATO.INT )
        {
            respuesta = "int"
            ast.escribir_en_consola("TYPEOF: int");
            this.tipo = new Tipo(TIPO_DATO.STRING);
            return respuesta;
        } 
        else if(tipo_valor_exp == TIPO_DATO.DOUBLE )
        {
            respuesta = "double"
            ast.escribir_en_consola("TYPEOF: double");
            this.tipo = new Tipo(TIPO_DATO.STRING);
            return respuesta;
        }
        else if(tipo_valor_exp == TIPO_DATO.CHAR )
        {
            respuesta = "char"
            ast.escribir_en_consola("TYPEOF: char");
            this.tipo = new Tipo(TIPO_DATO.STRING);
            return respuesta;
        }
        else if(tipo_valor_exp == TIPO_DATO.BOOLEAN )
        {
            respuesta = "boolean"
            ast.escribir_en_consola("TYPEOF: boolean");
            this.tipo = new Tipo(TIPO_DATO.STRING);
            return respuesta;
        }
        else if(tipo_valor_exp == TIPO_DATO.STRING )
        {
            respuesta = "string"
            ast.escribir_en_consola("TYPEOF: string");
            this.tipo = new Tipo(TIPO_DATO.STRING);
            return respuesta;
        }
        /*
        else if(tipo_valor_exp == TIPO_DATO.LIST )
        {
            respuesta = "list"
            ast.escribir_en_consola("TYPEOF: list");
            this.tipo = new Tipo(TIPO_DATO.STRING);
            return respuesta;
        }
        */
        else 
        {
            //ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ ") TIPO DE DATO NO VALIDO");
            this.tipo = new Tipo(TIPO_DATO.ERROR);
            respuesta = 0;
            return respuesta;
        }
    }
}
export class TOSTRING extends Expresion
{
    valor : Expresion;    
    
    constructor(valor :Expresion, linea :number, columna :number) 
    {
        super(linea, columna,"TOSTRING");
        this.valor = valor;
    }
    public obtener_valor(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        //ast.escribir_en_consola(actual.nombre_ambito)
        let respuesta;
        let valor_exp = this.valor.obtener_valor(actual,global,ast);
        let tipo_valor_exp =this.valor.tipo.obtener_tipo_de_dato();
        //ast.escribir_en_consola("RECONOCE LENGTH: "+valor_exp);
        //ast.escribir_en_consola("LENGTH: "+valor_exp.length);
        if(tipo_valor_exp == TIPO_DATO.INT ||tipo_valor_exp == TIPO_DATO.DOUBLE||tipo_valor_exp == TIPO_DATO.BOOLEAN)
        {
            respuesta = String(valor_exp);
            ast.escribir_en_consola("TOSTRING: "+respuesta);
            this.tipo = new Tipo(TIPO_DATO.STRING);
            return respuesta;
        } 
        
        else 
        {
            //ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ ") TIPO DE DATO NO VALIDO");
            this.tipo = new Tipo(TIPO_DATO.ERROR);
            respuesta = 0;
            return respuesta;
        }
    }
}
export class BREAK extends Instruccion
{
    constructor(linea :number, columna :number) 
    {
        super(linea, columna,"BREAK");
    }
    public ejecutar(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) {
        ast.escribir_en_consola("BREAK;")   
    }
    
}
export class CONTINUE extends Instruccion
{
    constructor(linea :number, columna :number) 
    {
        super(linea, columna,"CONTINUE");
    }
    public ejecutar(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) {
        ast.escribir_en_consola("CONTINUE;")   
    }
    
}
export class RETURN extends Instruccion
{
    expresion : Expresion;
    constructor(expresion: Expresion, linea :number, columna :number) 
    {
        super(linea, columna,"RETURN");
        this.expresion = expresion;
        
    }
    public ejecutar(actual: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) {
        //ast.escribir_en_consola("RETURN;")
        this.ejecuto_return = this.expresion;   
    }
    
}