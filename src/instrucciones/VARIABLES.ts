import { AST } from "../arbol/AST";
import { FUNCION, PARAMETRO, TABLA_FUNCIONES_Y_VARIABLES } from "../arbol/TABLA_FUNCIONES_Y_VARIABLES";
import { Expresion } from "../arbol/EJECUCION";
import { Instruccion } from "../arbol/EJECUCION";
import { TIPO_DATO } from "../arbol/Tipo";

import { Tipo } from "../arbol/Tipo";
import { VARIABLE } from "../arbol/TABLA_FUNCIONES_Y_VARIABLES";
import { VECTOR } from "../arbol/TABLA_FUNCIONES_Y_VARIABLES";
import { METODO } from "../arbol/TABLA_FUNCIONES_Y_VARIABLES";
import { LISTA_EJECUCIONES } from "../arbol/LISTA_EJECUCIONES";

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
                    res = '0';  //no se si es 0 porque el que esta en el enunciado me sale como un punto
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

export class DECLARACION_VECTOR_TIPO1 extends Instruccion 
{
    tipo:   Tipo;
    id:     string;
    expresion:    Expresion[];
    size: Expresion;

    constructor(tipo: Tipo, id: string, exp: Expresion[],size:Expresion, linea: number, columna: number) 
    {
        super(linea, columna);
        this.tipo = tipo;
        this.id = id;
        this.expresion = exp;
        this.size = size
    }

    public ejecutar(tabla: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        //ast.escribir_en_consola("TENGO QUE DECLARAR VECTORES CON VALOR.");
         //SI LA VARIABLE EXISTE NO SE CREA NADA
         if( tabla.variable_existe(this.id) ) 
         {
             ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): VARIABLE YA EXISTE.");
         }
         //SI LA VARIABLE NO EXISTE
         else
         {
            
            
            //let res: number[] = [];
            //SI EL VECTOR TIENE VALORES
            if(this.expresion.length != 0)
            {
                let cantidad = this.expresion.length
                let bandera_validar = false
                if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.INT)
                {
                    let res: number[] = [];
                    for(let i = 0; i<cantidad;i++){
                        let val = this.expresion[i]
                        //console.log(val);
                        let valvalor = val.obtener_valor(tabla,global,ast)
                        let valtipo = val.tipo.obtener_tipo_de_dato()
                        if(valtipo != this.tipo.obtener_tipo_de_dato())
                        {
                            bandera_validar = true;
                        }
                        if(bandera_validar == false){
                            res.push(valvalor)
                        }
                    }
                    if(bandera_validar == false){
                        let nuevo_vec = new VECTOR(this.tipo, this.id, res);
                        ast.escribir_en_consola("EXITO: vector "+this.id +" creada con valor: "+res);
                        tabla.agregar_variable_tabla(this.id,nuevo_vec);
                    }
                    else{
                        ast.escribir_en_consola("VECTOR ERROR")
                    }
                }
                else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.DOUBLE)
                {
                    let res: number[] = [];
                    for(let i = 0; i<cantidad;i++){
                        let val = this.expresion[i]
                        let valvalor = val.obtener_valor(tabla,global,ast)
                        let valtipo = val.tipo.obtener_tipo_de_dato()
                        if(valtipo != this.tipo.obtener_tipo_de_dato())
                        {
                            bandera_validar = true;
                        }
                        if(bandera_validar == false){
                            res.push(valvalor)
                        }
                    }
                    if(bandera_validar == false){
                        let nuevo_vec = new VECTOR(this.tipo, this.id, res);
                        ast.escribir_en_consola("EXITO: vector "+this.id +" creada con valor: "+res);
                        tabla.agregar_variable_tabla(this.id,nuevo_vec);
                    }
                    else{
                        ast.escribir_en_consola("VECTOR ERROR")
                    }

                } 
                else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.BOOLEAN)
                {
                    let res: boolean[] = [];
                    for(let i = 0; i<cantidad;i++){
                        let val = this.expresion[i]
                        let valvalor = val.obtener_valor(tabla,global,ast)
                        let valtipo = val.tipo.obtener_tipo_de_dato()
                        if(valtipo != this.tipo.obtener_tipo_de_dato())
                        {
                            bandera_validar = true;
                        }
                        if(bandera_validar == false){
                            res.push(valvalor)
                        }
                    }
                    if(bandera_validar == false){
                        let nuevo_vec = new VECTOR(this.tipo, this.id, res);
                        ast.escribir_en_consola("EXITO: vector "+this.id +" creada con valor: "+res);
                        tabla.agregar_variable_tabla(this.id,nuevo_vec);
                    }
                    else{
                        ast.escribir_en_consola("VECTOR ERROR")
                    }
                } 
                else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.CHAR) 
                {
                    let res: String[] = [];
                    for(let i = 0; i<cantidad;i++){
                        let val = this.expresion[i]
                        let valvalor = val.obtener_valor(tabla,global,ast)
                        let valtipo = val.tipo.obtener_tipo_de_dato()
                        if(valtipo != this.tipo.obtener_tipo_de_dato())
                        {
                            bandera_validar = true;
                        }
                        if(bandera_validar == false){
                            res.push(valvalor)
                        }
                    }
                    if(bandera_validar == false){
                        let nuevo_vec = new VECTOR(this.tipo, this.id, res);
                        ast.escribir_en_consola("EXITO: vector "+this.id +" creada con valor: "+res);
                        tabla.agregar_variable_tabla(this.id,nuevo_vec);
                    }
                    else{
                        ast.escribir_en_consola("VECTOR ERROR")
                    }
                } 
                else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.STRING) 
                {
                    let res: String[] = [];
                    for(let i = 0; i<cantidad;i++){
                        let val = this.expresion[i]
                        let valvalor = val.obtener_valor(tabla,global,ast)
                        let valtipo = val.tipo.obtener_tipo_de_dato()
                        if(valtipo != this.tipo.obtener_tipo_de_dato())
                        {
                            bandera_validar = true;
                        }
                        if(bandera_validar == false){
                            res.push(valvalor)
                        }
                    }
                    if(bandera_validar == false){
                        let nuevo_vec = new VECTOR(this.tipo, this.id, res);
                        ast.escribir_en_consola("EXITO: vector "+this.id +" creada con valor: "+res);
                        tabla.agregar_variable_tabla(this.id,nuevo_vec);
                    }
                    else{
                        ast.escribir_en_consola("VECTOR ERROR")
                    }
                }
                
                
 
            }
            else//VECTOR VACIO
            {
                let cantidad = this.size.obtener_valor(tabla,global,ast); //SOLO PARA VECTORES VACIOS
                if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.INT)
                {
                    let res: number[] = [];
                    for(let i=0;i<(cantidad);i++){
                        res.push(0);
                    }
                    let nuevo_vec = new VECTOR(this.tipo, this.id, res);
                    ast.escribir_en_consola("EXITO: vector "+this.id +" creada con valor: "+res);
                    tabla.agregar_variable_tabla(this.id,nuevo_vec);
                }
                else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.DOUBLE)
                {
                    let res: number[] = [];
                    for(let i=0;i<(cantidad);i++){
                        res.push(0.0);
                    }
                    let nuevo_vec = new VECTOR(this.tipo, this.id, res);
                    ast.escribir_en_consola("EXITO: vector "+this.id +" creada con valor: "+res);
                    tabla.agregar_variable_tabla(this.id,nuevo_vec);
                } 
                else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.BOOLEAN)
                {
                    let res: boolean[] = [];
                    for(let i=0;i<(cantidad);i++){
                        res.push(true);
                    }
                    let nuevo_vec = new VECTOR(this.tipo, this.id, res);
                    ast.escribir_en_consola("EXITO: vector "+this.id +" creada con valor: "+res);
                    tabla.agregar_variable_tabla(this.id,nuevo_vec);
                } 
                else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.CHAR) 
                {
                    let res: String[] = [];
                    for(let i=0;i<(cantidad);i++){
                        res.push("0");
                    }
                    let nuevo_vec = new VECTOR(this.tipo, this.id, res);
                    ast.escribir_en_consola("EXITO: vector "+this.id +" creada con valor: "+res);
                    tabla.agregar_variable_tabla(this.id,nuevo_vec);
                } 
                else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.STRING) 
                {
                    let res: String[] = [];
                    for(let i=0;i<(cantidad);i++){
                        res.push("");
                    }
                    let nuevo_vec = new VECTOR(this.tipo, this.id, res);
                    ast.escribir_en_consola("EXITO: vector "+this.id +" creada con valor: "+res);
                    tabla.agregar_variable_tabla(this.id,nuevo_vec);
                } 
            }
        }
    }
    
}

export class ASIGNACION_VECTOR extends Instruccion 
{
    id:     string;
    posicion:  Expresion;
    expresion:    Expresion;

    constructor(id: string, posicion: Expresion, expresion: Expresion, linea: number, columna: number) 
    {
        super(linea, columna);
        this.id = id;
        this.posicion = posicion
        this.expresion = expresion;
    }

    public ejecutar(tabla: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        let variable = tabla.obtener_variable(this.id);
        if(variable === undefined) 
        {
            ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): VECTOR "+this.id+" NO DEFINIDO.");
            
        }else{
            let pos = this.posicion.obtener_valor(tabla,global,ast);
            let pos_tipo = this.posicion.tipo.obtener_tipo_de_dato();
            if (pos_tipo != TIPO_DATO.INT){
                ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): POSICION VECTOR NO VALIDA.");
            }
            else{
                let valor_asig = this.expresion.obtener_valor(tabla, global, ast);
                if(variable.obtener_tipo().obtener_tipo_de_dato() != this.expresion.tipo.obtener_tipo_de_dato()) 
                {
                    ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): EL VALOR NO COINCIDE CON EL TIPO DEL VECTOR.");
                }else{
                    let vect = variable.obtener_valor();    //obtiene el vector
                    if((vect.length-1) < pos){
                        ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): POSICION EXCEDE A LONGITUD DE VECTOR");
                    }
                    else{
                        vect[pos] = valor_asig;                 //modifica el valor
                        variable.modificar_valor(vect)          //modifica el vector
                        ast.escribir_en_consola("EXITO variable modificada. Nuevo valor: "+vect);
                    }
                    
                }

            }
            
        }
    }
    
}

export class VALIDAR_EXISTE_VECTOR extends Expresion
{
    nombrevector  : string;
    posicion   : Expresion;
    constructor(nombreVar : string, posicion:Expresion, linea : number, columna : number) 
    {
        super(linea,columna);
        this.nombrevector = nombreVar;
        this.posicion = posicion;
    }
    
    public obtener_valor(tabla: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        //VALIDA SI EXISTE LA VARIABLE
        let variable = tabla.obtener_variable(this.nombrevector);
        if(variable === undefined) 
        {
            ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): VECTOR "+this.nombrevector+" NO DEFINIDO.");
            let valor_var = "ERROR";
            this.tipo = new Tipo(TIPO_DATO.ERROR) ;
            return valor_var;
        }   
        
        let valor_var = variable.obtener_valor();
        
        
        //this.tipo = variable.obtener_tipo();
        let pos = this.posicion.obtener_valor(tabla,global,ast)
        let tipo_pos = this.posicion.tipo.obtener_tipo_de_dato();
        //ast.escribir_en_consola("."+tipo_pos)

        if (tipo_pos != TIPO_DATO.INT){
            ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): POSICION DE VECTOR NO VALIDA");
            let valor_var = "ERROR";
            this.tipo = new Tipo(TIPO_DATO.ERROR) ;
            return valor_var;
        }
        else
        {
            
            if((valor_var.length -1) < pos){
                ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): POSICION EXCEDE A LONGITUD DE VECTOR");
                let valor_var = "ERROR";
                this.tipo = new Tipo(TIPO_DATO.ERROR) ;
                return valor_var;
            }
            else{
                
                let val_res = valor_var[pos]
                let tipo_vector = variable.obtener_tipo();
                this.tipo = tipo_vector
                ;return(valor_var[pos])
            }

        }
    }
    
}

export class DECLARACION_METODO extends Instruccion 
{
    tipo:   Tipo;
    id:     string;
    parametros:    PARAMETRO[];
    instrucciones: LISTA_EJECUCIONES[];

    constructor(tipo: Tipo, id: string, parametros: PARAMETRO[],instrucciones:LISTA_EJECUCIONES[], linea: number, columna: number) 
    {
        super(linea, columna);
        this.tipo = tipo;
        this.id = id;
        this.parametros = parametros;
        this.instrucciones = instrucciones
    }

    public ejecutar(tabla: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        let res
        let nueva_var = new FUNCION(this.tipo,this.id,this.parametros,this.instrucciones);
        ast.escribir_en_consola("EXITO: metodo "+this.id +": creada");
        tabla.agregar_funcion_tabla(this.id,nueva_var);
    }
    
}
export class LLAMADA_METODO extends Instruccion 
{
    id:     string;
    parametros:    Expresion[];

    constructor(id: string, parametros: Expresion[], linea: number, columna: number) 
    {
        super(linea, columna);
        this.id = id;
        this.parametros = parametros;
    }

    public ejecutar(tabla: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        let funci = tabla.obtener_funcion(this.id);
        if(funci === undefined)
        {
            ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): FUNCION O METODO "+this.id+" NO DEFINIDO.");
        }
        else{
            let param = funci.obtener_parametros();
            let instru = funci.obtener_sentencias();
            //ast.escribir_en_consola("SI EXISTE LA FUNCION: "+funci.obtener_nombre());
            //ASIGNACION DE PARAMETROS
            if(param.length == this.parametros.length){
                //CREAMOS NUESTRO NUEVO AMBITO
                let TABLA_FUNC_Y_VAR_FUNCION = new TABLA_FUNCIONES_Y_VARIABLES(tabla);  //CREAMOS AMBITO PARA FUNCION
                //ast.escribir_en_consola("SI CUMPLE CON EL NUMERO DE PARAMETROS");
                for(let i=0;i<param.length;i++){
                    let parametro = param[i];
                    let id_parametro= parametro.obtener_nombre();
                    let tipo_parametro = parametro.obtener_tipo().obtener_tipo_de_dato();
                    let comparar = this.parametros[i]
                    let valor_comparar = comparar.obtener_valor(tabla,global,ast);
                    let tipo_comparar = comparar.tipo.obtener_tipo_de_dato();
                    if(tipo_comparar == tipo_parametro){//SI LOS TIPOS COINCIDEN ENTRE PARAMETRO FUNCION Y PARAMETRO ENTRADA
                        let vari = new VARIABLE(parametro.tipo,id_parametro,valor_comparar);             //CREAMOS UNA VARIABLE CON EL VALOR DE ENTRADA
                        TABLA_FUNC_Y_VAR_FUNCION.agregar_variable_tabla(id_parametro,vari);             //LO AGREGAMOS AL AMBITO DE LA FUNCION
                    }
                }
                for(let i=0;i<instru.length;i++){
                    let sent = instru[i];
                    //ES UNA INSTRUCCION COMO :(IF, WHILE, DECLARACIONES ETC)
                    if(sent instanceof Instruccion) 
                    {
                        sent.ejecutar(TABLA_FUNC_Y_VAR_FUNCION, global, ast);
                    }
                    //ES UNA EXPRESION (SUMA, RESTA ETC)
                    else if(sent instanceof Expresion) 
                    {
                        sent.obtener_valor(TABLA_FUNC_Y_VAR_FUNCION, global, ast);
                    }
                }
            }else{
                ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): CANTIDAD DE PARAMETROS INCORRECTO");
            }
        
        }
        
        
    }
    
}
export class VALIDAR_EXISTE_FUNCION extends Expresion
{
    nombre_funcion  : string;
    constructor(nombre_funcion : string, linea : number, columna : number) 
    {
        super(linea,columna);
        this.nombre_funcion = nombre_funcion;
    }
    
    public obtener_valor(tabla: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        //VALIDA SI EXISTE LA VARIABLE
        let variable = tabla.obtener_variable(this.nombre_funcion);

        
        if(variable === undefined) 
        {
            ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): METODO "+this.nombre_funcion+" NO DEFINIDO.");
            let valor_var = "ERROR";
            this.tipo = new Tipo(TIPO_DATO.ERROR) ;
            return valor_var;
        }   
        
        let valor_var = variable.obtener_valor();
        this.tipo = variable.obtener_tipo();
        return valor_var;
        
        

    
    }
    
}
export class DECLARACION_PARAMETRO  
{
    tipo:   Tipo;
    id:     string;
    linea:  number;
    columna: number;
    constructor( tipo: Tipo,id: string, linea: number, columna: number) 
    {
        this.tipo = tipo;
        this.id = id;
        this.linea = linea;
        this.columna = columna;
    }

    public ejecutar() 
    {
        //SI LA VARIABLE NO EXISTE
        let nueva_var = new PARAMETRO(this.tipo, this.id, this.linea, this.columna);
        return nueva_var;//CREO QUE RETORNA EL PARAMETRO (OBJETO)
    }
    
}