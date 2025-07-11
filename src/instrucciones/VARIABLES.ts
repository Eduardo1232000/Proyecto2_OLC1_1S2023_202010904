import { AST } from "../arbol/AST";
import { FUNCION, PARAMETRO, TABLA_FUNCIONES_Y_VARIABLES } from "../arbol/TABLA_FUNCIONES_Y_VARIABLES";
import { Expresion } from "../arbol/EJECUCION";
import { Instruccion } from "../arbol/EJECUCION";
import { TIPO_DATO } from "../arbol/Tipo";

import { Tipo } from "../arbol/Tipo";
import { VARIABLE } from "../arbol/TABLA_FUNCIONES_Y_VARIABLES";
import { VECTOR } from "../arbol/TABLA_FUNCIONES_Y_VARIABLES";
import { LISTA } from "../arbol/TABLA_FUNCIONES_Y_VARIABLES";
import { METODO } from "../arbol/TABLA_FUNCIONES_Y_VARIABLES";
import { LISTA_EJECUCIONES } from "../arbol/LISTA_EJECUCIONES";

export class ASIGNACION_VARIABLE extends Instruccion 
{
    id:     string;
    expresion:    Expresion;

    constructor(id: string, expresion: Expresion, linea: number, columna: number) 
    {
        super(linea, columna,"ASIGNACIONVARIABLE");
        this.id = id;
        this.expresion = expresion;
    }

    public ejecutar(tabla: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        try {
            let variable = tabla.obtener_variable(this.id);
            if(variable === undefined) 
            {
                ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): VARIABLE "+this.id+" NO DEFINIDA.");
                
            }else{
                let valor_asig = this.expresion.obtener_valor(tabla, global, ast);
                if(variable.obtener_tipo().obtener_tipo_de_dato() != this.expresion.tipo.obtener_tipo_de_dato()) 
                {
                    /*if(variable.obtener_tipo().obtener_tipo_de_dato()==TIPO_DATO.DOUBLE && this.expresion.tipo.obtener_tipo_de_dato()== TIPO_DATO.INT)
                    {
                        variable.modificar_valor(valor_asig);
                        console.log("EXITO variable modificada.Nuevo valor: "+valor_asig);
                    }*/
                    ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): EL VALOR NO COINCIDE CON EL TIPO.");
                }else{
                    variable.modificar_valor(valor_asig);
                    console.log("EXITO variable modificada.Nuevo valor: "+valor_asig);
                }
            } 
        } catch {}
    }
    
}
export class DECLARACION_VARIABLE extends Instruccion 
{
    tipo:   Tipo;
    id:     string;
    expresion:    Expresion;

    constructor(tipo: Tipo, id: string, exp: Expresion, linea: number, columna: number) 
    {
        super(linea, columna,"DECLARACIONVARIABLE");
        this.tipo = tipo;
        this.id = id;
        this.expresion = exp;
    }

    public ejecutar(tabla: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        try {
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
                        //PARA ACEPTAR ENTEROS EN DOUBLE
                        /*
                        if(this.expresion.tipo.obtener_tipo_de_dato() === TIPO_DATO.INT && this.tipo.obtener_tipo_de_dato() == TIPO_DATO.DOUBLE)
                        {
                            let nueva_var = new VARIABLE(this.tipo, this.id, res);
                            console.log("EXITO: variable "+this.id +": creada con valor: "+res);
                            tabla.agregar_variable_tabla(this.id,nueva_var);
                        }
                        */
                        if(this.expresion.tipo.obtener_tipo_de_dato() === TIPO_DATO.ERROR){
                            ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ ") TIPO DE DATO INCORRECTO O NO EXISTE VARIABLE ");
                        }else{
                            ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): EL TIPO NO COINCIDE CON LA EXPRESION.");
                        }
                        
                    }else{
                        let nueva_var = new VARIABLE(this.tipo, this.id, res);
                        let tipo_tabla_de_simbolos;
                        if(this.tipo.obtener_tipo_de_dato() == TIPO_DATO.INT){
                            tipo_tabla_de_simbolos = "Int";
                        }
                        else if(this.tipo.obtener_tipo_de_dato() == TIPO_DATO.DOUBLE){
                            tipo_tabla_de_simbolos = "Double";
                        }
                        else if (this.tipo.obtener_tipo_de_dato() == TIPO_DATO.CHAR){
                            tipo_tabla_de_simbolos = "Char";
                        }
                        else if (this.tipo.obtener_tipo_de_dato() == TIPO_DATO.BOOLEAN){
                            tipo_tabla_de_simbolos = "Boolean";
                        }
                        else if (this.tipo.obtener_tipo_de_dato() == TIPO_DATO.STRING){
                            tipo_tabla_de_simbolos = "String";
                        }

                        ast.guardar_en_tabla_simbolos(this.id,"Variable",tipo_tabla_de_simbolos,tabla.nombre_ambito,this.linea, this.columna)
                        console.log("EXITO: variable "+this.id +": creada con valor: "+res);
                        tabla.agregar_variable_tabla(this.id,nueva_var);
                    }
                } 
                //SI LA EXPRESION ES VACIO
                else 
                {
                    let tipo_valor_tabla_simbolo;
                    if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.INT)
                    {
                        res = 0;
                        tipo_valor_tabla_simbolo = "Int";
                    }
                    else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.DOUBLE)
                    {
                        res = 0.0;
                        tipo_valor_tabla_simbolo = "Double";
                    } 
                    else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.BOOLEAN)
                    {
                        res = true;
                        tipo_valor_tabla_simbolo = "Boolean";
                    } 
                    else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.CHAR) 
                    {
                        res = '0';  //no se si es 0 porque el que esta en el enunciado me sale como un punto
                        tipo_valor_tabla_simbolo = "Char";
                    } 
                    else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.STRING) 
                    {
                        res = "";
                        tipo_valor_tabla_simbolo = "String";
                    } 
                    let nueva_var = new VARIABLE(this.tipo, this.id, res);
                    console.log("EXITO: variable "+this.id +" creada con valor: "+res);
                    tabla.agregar_variable_tabla(this.id,nueva_var);
                    ast.guardar_en_tabla_simbolos(this.id,"Variable",tipo_valor_tabla_simbolo,tabla.nombre_ambito,this.linea, this.columna)
                }
            }
        } catch {}
        
    }
    
}
export class VALIDAR_EXISTE_VARIABLE extends Expresion
{
    nombreVar  : string;
    constructor(nombreVar : string, linea : number, columna : number) 
    {
        super(linea,columna,"VALIDAREXISTEVARIABLE");
        this.nombreVar = nombreVar;
    }
    
    public obtener_valor(tabla: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        try {
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
        } catch (error) {
            return undefined
        }
        
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
        super(linea, columna,"DECLARACIONVECTOR");
        this.tipo = tipo;
        this.id = id;
        this.expresion = exp;
        this.size = size
    }

    public ejecutar(tabla: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        try {
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
                            console.log("EXITO: vector "+this.id +" creada con valor: "+res);
                            tabla.agregar_variable_tabla(this.id,nuevo_vec);

                            ast.guardar_en_tabla_simbolos(this.id,"Vector","Int",tabla.nombre_ambito,this.linea, this.columna);
                        }
                        else{
                            console.log("VECTOR ERROR")
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
                            console.log("EXITO: vector "+this.id +" creada con valor: "+res);
                            tabla.agregar_variable_tabla(this.id,nuevo_vec);
                            ast.guardar_en_tabla_simbolos(this.id,"Vector","Double",tabla.nombre_ambito,this.linea, this.columna);
                        }
                        else{
                            console.log("VECTOR ERROR")
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
                            console.log("EXITO: vector "+this.id +" creada con valor: "+res);
                            tabla.agregar_variable_tabla(this.id,nuevo_vec);
                            ast.guardar_en_tabla_simbolos(this.id,"Vector","Boolean",tabla.nombre_ambito,this.linea, this.columna);
                        }
                        else{
                            console.log("VECTOR ERROR")
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
                            console.log("EXITO: vector "+this.id +" creada con valor: "+res);
                            tabla.agregar_variable_tabla(this.id,nuevo_vec);
                            ast.guardar_en_tabla_simbolos(this.id,"Vector","Char",tabla.nombre_ambito,this.linea, this.columna);
                        }
                        else{
                            console.log("VECTOR ERROR")
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
                            console.log("EXITO: vector "+this.id +" creada con valor: "+res);
                            tabla.agregar_variable_tabla(this.id,nuevo_vec);
                            ast.guardar_en_tabla_simbolos(this.id,"Vector","String",tabla.nombre_ambito,this.linea, this.columna);
                        }
                        else{
                            console.log("VECTOR ERROR")
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
                        console.log("EXITO: vector "+this.id +" creada con valor: "+res);
                        tabla.agregar_variable_tabla(this.id,nuevo_vec);
                        ast.guardar_en_tabla_simbolos(this.id,"Vector","Int",tabla.nombre_ambito,this.linea, this.columna);
                    }
                    else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.DOUBLE)
                    {
                        let res: number[] = [];
                        for(let i=0;i<(cantidad);i++){
                            res.push(0.0);
                        }
                        let nuevo_vec = new VECTOR(this.tipo, this.id, res);
                        console.log("EXITO: vector "+this.id +" creada con valor: "+res);
                        tabla.agregar_variable_tabla(this.id,nuevo_vec);
                        ast.guardar_en_tabla_simbolos(this.id,"Vector","Double",tabla.nombre_ambito,this.linea, this.columna);
                    } 
                    else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.BOOLEAN)
                    {
                        let res: boolean[] = [];
                        for(let i=0;i<(cantidad);i++){
                            res.push(true);
                        }
                        let nuevo_vec = new VECTOR(this.tipo, this.id, res);
                        console.log("EXITO: vector "+this.id +" creada con valor: "+res);
                        tabla.agregar_variable_tabla(this.id,nuevo_vec);
                        ast.guardar_en_tabla_simbolos(this.id,"Vector","Boolean",tabla.nombre_ambito,this.linea, this.columna);
                    } 
                    else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.CHAR) 
                    {
                        let res: String[] = [];
                        for(let i=0;i<(cantidad);i++){
                            res.push("0");
                        }
                        let nuevo_vec = new VECTOR(this.tipo, this.id, res);
                        console.log("EXITO: vector "+this.id +" creada con valor: "+res);
                        tabla.agregar_variable_tabla(this.id,nuevo_vec);
                        ast.guardar_en_tabla_simbolos(this.id,"Vector","Char",tabla.nombre_ambito,this.linea, this.columna);
                    } 
                    else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.STRING) 
                    {
                        let res: String[] = [];
                        for(let i=0;i<(cantidad);i++){
                            res.push("");
                        }
                        let nuevo_vec = new VECTOR(this.tipo, this.id, res);
                        console.log("EXITO: vector "+this.id +" creada con valor: "+res);
                        tabla.agregar_variable_tabla(this.id,nuevo_vec);
                        ast.guardar_en_tabla_simbolos(this.id,"Vector","String",tabla.nombre_ambito,this.linea, this.columna);
                    } 
                }
            }
        } catch {}
        
    }
    
}
export class ASIGNACION_VECTOR extends Instruccion 
{
    id:     string;
    posicion:  Expresion;
    expresion:    Expresion;

    constructor(id: string, posicion: Expresion, expresion: Expresion, linea: number, columna: number) 
    {
        super(linea, columna,"ASIGNACIONVECTOR");
        this.id = id;
        this.posicion = posicion
        this.expresion = expresion;
    }

    public ejecutar(tabla: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        try {
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
                            console.log("EXITO variable modificada. Nuevo valor: "+vect);
                        }
                        
                    }

                }
                
            }
        } catch {}
        
    }
    
}
export class VALIDAR_EXISTE_VECTOR extends Expresion
{
    nombrevector  : string;
    posicion   : Expresion;
    constructor(nombreVar : string, posicion:Expresion, linea : number, columna : number) 
    {
        super(linea,columna,"VALIDAREXISTEVECTOR");
        this.nombrevector = nombreVar;
        this.posicion = posicion;
    }
    
    public obtener_valor(tabla: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        try {
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
        } catch {}
        
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
        super(linea, columna,"DECLARACIONMETODO");
        this.tipo = tipo;
        this.id = id;
        this.parametros = parametros;
        this.instrucciones = instrucciones
    }

    public ejecutar(tabla: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        try {
            let res;
            let nueva_var = new FUNCION(this.tipo,this.id,this.parametros,this.instrucciones);
            console.log("EXITO: metodo "+this.id +": creada");
            tabla.agregar_funcion_tabla(this.id,nueva_var);
            
            let tipo_func = this.tipo.obtener_tipo_de_dato();
                let tipo_funcion_tabla;
                if(tipo_func == TIPO_DATO.INT){
                    tipo_funcion_tabla = "Int"
                    ast.guardar_en_tabla_simbolos(this.id,"Funcion",tipo_funcion_tabla,tabla.nombre_ambito,this.linea, this.columna);
                }
                else if(tipo_func == TIPO_DATO.DOUBLE){
                    tipo_funcion_tabla = "Double"
                    ast.guardar_en_tabla_simbolos(this.id,"Funcion",tipo_funcion_tabla,tabla.nombre_ambito,this.linea, this.columna);
                }
                else if(tipo_func == TIPO_DATO.CHAR){
                    tipo_funcion_tabla = "Char"
                    ast.guardar_en_tabla_simbolos(this.id,"Funcion",tipo_funcion_tabla,tabla.nombre_ambito,this.linea, this.columna);
                }
                else if(tipo_func == TIPO_DATO.BOOLEAN){
                    tipo_funcion_tabla = "Boolean"
                    ast.guardar_en_tabla_simbolos(this.id,"Funcion",tipo_funcion_tabla,tabla.nombre_ambito,this.linea, this.columna);
                }
                else if(tipo_func == TIPO_DATO.STRING){
                    tipo_funcion_tabla = "String"
                    ast.guardar_en_tabla_simbolos(this.id,"Funcion",tipo_funcion_tabla,tabla.nombre_ambito,this.linea, this.columna);
                }
                else if(tipo_func == TIPO_DATO.VOID){
                    tipo_funcion_tabla = "Void"
                    ast.guardar_en_tabla_simbolos(this.id,"Metodo",tipo_funcion_tabla,tabla.nombre_ambito,this.linea, this.columna);
                }
            //GUARDAR PARAMETROS EN LA TABLA DE SIMBOLOS
            for(let i =0;i<this.parametros.length;i++){
                let param_actual = this.parametros[i];
                let param_tipo = param_actual.obtener_tipo();
                let param_id = param_actual.obtener_nombre();
                let param_linea = param_actual.obtener_linea();
                let param_columna = param_actual.obtener_columna();
                let param_tipo_actual = param_tipo.obtener_tipo_de_dato();
                let tipo_tabla ="";
                if(param_tipo_actual == TIPO_DATO.INT){
                    tipo_tabla = "Int"
                }else if(param_tipo_actual == TIPO_DATO.DOUBLE){
                    tipo_tabla = "Double"
                }else if(param_tipo_actual == TIPO_DATO.BOOLEAN){
                    tipo_tabla = "Boolean"
                }else if(param_tipo_actual == TIPO_DATO.CHAR){
                    tipo_tabla = "Char"
                }else if(param_tipo_actual == TIPO_DATO.STRING){
                    tipo_tabla = "String"
                }
                ast.guardar_en_tabla_simbolos(param_id,"variable",tipo_tabla,"funcion "+this.id,this.linea,param_columna)
            }   
                
            
            
        } catch {}
    }
    
}
export class LLAMADA_METODO extends Instruccion 
{
    id:     string;
    parametros:    Expresion[];

    constructor(id: string, parametros: Expresion[], linea: number, columna: number) 
    {
        super(linea, columna,"LLAMADAMETODO");
        this.id = id;
        this.parametros = parametros;
    }

    public ejecutar(tabla: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        try {
            let funci = tabla.obtener_funcion(this.id);
            if(funci ===undefined){
                funci = global.obtener_funcion(this.id);
            }
            if(funci === undefined)
            {
                ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): FUNCION O METODO "+this.id+" NO DEFINIDO.");
            }
            else{
                let param = funci.obtener_parametros();
                let instru = funci.obtener_sentencias();
                let error_crear = 0;//0 = todo bien, 1= no crear
                //ast.escribir_en_consola("SI EXISTE LA FUNCION: "+funci.obtener_nombre());
                //ASIGNACION DE PARAMETROS
                if(param.length == this.parametros.length){
                    //CREAMOS NUESTRO NUEVO AMBITO
                    let TABLA_FUNC_Y_VAR_FUNCION = new TABLA_FUNCIONES_Y_VARIABLES(tabla,("funcion "+this.id));  //CREAMOS AMBITO PARA FUNCION
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
                        else{
                            error_crear = 1;
                        }

                    }
                    if(error_crear ==1){
                        ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): PARAMETRO DE TIPO INCORRECTO");
                        return
                    }
                    for(let i=0;i<instru.length;i++){
                        let sent = instru[i];
                        //ES UNA INSTRUCCION COMO :(IF, WHILE, DECLARACIONES ETC)
                        if(sent instanceof Instruccion) 
                        {
                            sent.ejecutar(TABLA_FUNC_Y_VAR_FUNCION, global, ast);
                            if(sent.nombre_in_ex =="IF"){
                                //ast.escribir_en_consola("RETURN IF: "+sent.ejecuto_return.obtener_valor(TABLA_FUNC_Y_VAR_FUNCION,global,ast))
                                if(sent.ejecuto_return!=undefined){
                                    return sent.ejecuto_return;
                                }
                                
                            }
                            if(sent.nombre_in_ex=="RETURN"){
                                //ast.escribir_en_consola("DEBO FINALIZAR");
                                return sent.ejecuto_return;
                                
                            }
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
        } catch {}
    }   
}
export class LLAMADA_METODO_EXPRESION extends Expresion 
{
    id:     string;
    parametros:    Expresion[];

    constructor(id: string, parametros: Expresion[], linea: number, columna: number) 
    {
        super(linea, columna,"LLAMADAMETODO");
        this.id = id;
        this.parametros = parametros;
    }

    public obtener_valor(tabla: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        try {
            let funci = tabla.obtener_funcion(this.id);
            if(funci ===undefined){
                funci = global.obtener_funcion(this.id);
            }
            if(funci === undefined)
            {
                ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): FUNCION O METODO "+this.id+" NO DEFINIDO.");
            }
            else{
                let param = funci.obtener_parametros();
                let instru = funci.obtener_sentencias();
                //ast.escribir_en_consola(""+instru.length);
                let error_crear = 0;//0 = todo bien, 1= no crear
                //ast.escribir_en_consola("SI EXISTE LA FUNCION: "+funci.obtener_nombre());
                //ASIGNACION DE PARAMETROS
                if(param.length == this.parametros.length){
                    //CREAMOS NUESTRO NUEVO AMBITO
                    let TABLA_FUNC_Y_VAR_FUNCION = new TABLA_FUNCIONES_Y_VARIABLES(tabla,("funcion "+this.id));  //CREAMOS AMBITO PARA FUNCION
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
                        else{
                            error_crear = 1;
                        }

                    }
                    if(error_crear ==1){
                        ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): PARAMETRO DE TIPO INCORRECTO");
                        return
                    }
                    for(let i=0;i<instru.length;i++){
                        let sent = instru[i];
                        //ast.escribir_en_consola("a")
                        //ES UNA INSTRUCCION COMO :(IF, WHILE, DECLARACIONES ETC)
                        if(sent instanceof Instruccion) 
                        {
                            sent.ejecutar(TABLA_FUNC_Y_VAR_FUNCION, global, ast);
                            //ast.escribir_en_consola(""+sent.ejecuto_return) 
                            if(sent.nombre_in_ex=="RETURN" && sent.ejecuto_return !=undefined){
                                ast.escribir_en_consola("DEBO FINALIZAR con: "+sent.ejecuto_return.obtener_valor(TABLA_FUNC_Y_VAR_FUNCION,global,ast));
                                this.tipo = funci.tipo;
                                this.ejecuto_return = sent.ejecuto_return
                                let respuesta = sent.ejecuto_return.obtener_valor(TABLA_FUNC_Y_VAR_FUNCION,global,ast);
                                //ast.escribir_en_consola("R: "+respuesta);
                                return respuesta
                                
                            } 

                            else if(sent.nombre_in_ex =="IF" && sent.ejecuto_return !=undefined){
                                
                                //ast.escribir_en_consola("RETURN IF: "+sent.ejecuto_return.obtener_valor(TABLA_FUNC_Y_VAR_FUNCION,global,ast))
                                
                                this.tipo = funci.tipo;
                                let respuesta = sent.ejecuto_return.obtener_valor(TABLA_FUNC_Y_VAR_FUNCION,global,ast);
                                //ast.escribir_en_consola("RIF: "+respuesta);
                                return respuesta
                            }
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
            return(2);
            this.tipo = new Tipo(TIPO_DATO.ERROR);
            let respuesta = 0;
            return respuesta
        } catch {}
        
        
        
    }
    
}
export class LLAMADA_MAIN extends Instruccion 
{
    id:     string;
    parametros:    Expresion[];

    constructor(id: string, parametros: Expresion[], linea: number, columna: number) 
    {
        super(linea, columna,"MAIN");
        this.id = id;
        this.parametros = parametros;
    }

    public ejecutar(tabla: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        try {
            let funci = tabla.obtener_funcion(this.id);
            if(funci === undefined)
            {
                ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): FUNCION O METODO "+this.id+" NO DEFINIDO.");
            }
            else{
                let param = funci.obtener_parametros();
                let instru = funci.obtener_sentencias();
                let error_crear = 0;//0 = todo bien, 1= no crear
                //ast.escribir_en_consola("SI EXISTE LA FUNCION: "+funci.obtener_nombre());
                //ASIGNACION DE PARAMETROS
                if(param.length == this.parametros.length){
                    
                    //CREAMOS NUESTRO NUEVO AMBITO
                    let TABLA_FUNC_Y_VAR_FUNCION = new TABLA_FUNCIONES_Y_VARIABLES(tabla,("funcion "+this.id));  //CREAMOS AMBITO PARA FUNCION
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
                        else{
                            error_crear = 1;
                        }
                    }
                    if(error_crear ==1){
                        ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): PARAMETRO DE TIPO INCORRECTO");
                        return
                    }
                    for(let i=0;i<instru.length;i++){
                        let sent = instru[i];
                        //ES UNA INSTRUCCION COMO :(IF, WHILE, DECLARACIONES ETC)
                        if(sent instanceof Instruccion) 
                        {
                            sent.ejecutar(TABLA_FUNC_Y_VAR_FUNCION, global, ast);
                            //ast.escribir_en_consola(""+sent.nombre_in_ex)
                            if (sent.ejecuto_return!=undefined){
                                this.ejecuto_return = sent.ejecuto_return;
                                return this.ejecuto_return;
                            }
                            if(sent.nombre_in_ex =="IF"){
                                this.ejecuto_return = sent.ejecuto_return;  //SI TIENE ALGUN RETURN LO VA A PASAR
                                //ast.escribir_en_consola("RETURN IF: "+sent.ejecuto_return.obtener_valor(TABLA_FUNC_Y_VAR_FUNCION,global,ast))
                                
                                if(sent.ejecuto_return !=undefined){
                                    return this.ejecuto_return;
                                }
                                
                            }
                            if(sent.nombre_in_ex=="RETURN"){
                                this.ejecuto_return = sent.ejecuto_return
                                //ast.escribir_en_consola("DEBO FINALIZAR");
                                return this.ejecuto_return
                            }
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
        } catch {}
    }
    
}
export class VALIDAR_EXISTE_FUNCION extends Expresion
{
    nombre_funcion  : string;
    constructor(nombre_funcion : string, linea : number, columna : number) 
    {
        super(linea,columna,"VALIDAREXISTEFUNCION");
        this.nombre_funcion = nombre_funcion;
    }
    
    public obtener_valor(tabla: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        try {
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
        } catch {}
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
        try {
            //SI LA VARIABLE NO EXISTE
            let nueva_var = new PARAMETRO(this.tipo, this.id, this.linea, this.columna);
            return nueva_var;//CREO QUE RETORNA EL PARAMETRO (OBJETO)
        } catch {}
    }
}
export class DECLARACION_LISTA_TIPO1 extends Instruccion 
{
    tipo:   Tipo;
    id:     string;
    expresion:    Expresion[];
    tipo_confirmacion:  Tipo;

    constructor(tipo: Tipo, id: string, expresion: Expresion[],tipo_confirmacion:Tipo, linea: number, columna: number) 
    {
        super(linea, columna,"DECLARACIONLISTA");
        this.tipo = tipo;
        this.id = id;  
        this.expresion = expresion;
        this.tipo_confirmacion = tipo_confirmacion;      
    }

    public ejecutar(tabla: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        try {
            //SI LA VARIABLE EXISTE NO SE CREA NADA
            if(this.tipo.obtener_tipo_de_dato() == this.tipo_confirmacion.obtener_tipo_de_dato())
            {
                if( tabla.variable_existe(this.id) ) 
                {
                    ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): VARIABLE YA EXISTE.");
                }
                //SI LA VARIABLE NO EXISTE
                else
                {
                    //VALIDAR LA EXPRESION
                    if(this.expresion.length==0){
                        if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.INT)
                        {
                            let res: number[] = [];
                            let nuevo_vec = new LISTA(this.tipo, this.id, res);
                            console.log("EXITO: lista "+this.id +" creada con valor: "+res);
                            tabla.agregar_variable_tabla(this.id,nuevo_vec);
                            ast.guardar_en_tabla_simbolos(this.id,"Lista","Int",tabla.nombre_ambito,this.linea, this.columna);
                        }
                        else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.DOUBLE)
                        {
                            let res: number[] = [];
                            let nuevo_vec = new LISTA(this.tipo, this.id, res);
                            console.log("EXITO: lista "+this.id +" creada con valor: "+res);
                            tabla.agregar_variable_tabla(this.id,nuevo_vec);
                            ast.guardar_en_tabla_simbolos(this.id,"Lista","Double",tabla.nombre_ambito,this.linea, this.columna);
                        } 
                        else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.BOOLEAN)
                        {
                            let res: boolean[] = [];
                            let nuevo_vec = new LISTA(this.tipo, this.id, res);
                            console.log("EXITO: lista "+this.id +" creada con valor: "+res);
                            tabla.agregar_variable_tabla(this.id,nuevo_vec);
                            ast.guardar_en_tabla_simbolos(this.id,"Lista","Boolean",tabla.nombre_ambito,this.linea, this.columna);
                        } 
                        else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.CHAR) 
                        {
                            let res: String[] = [];
                            let nuevo_vec = new LISTA(this.tipo, this.id, res);
                            console.log("EXITO: lista "+this.id +" creada con valor: "+res);
                            tabla.agregar_variable_tabla(this.id,nuevo_vec);
                            ast.guardar_en_tabla_simbolos(this.id,"Lista","Char",tabla.nombre_ambito,this.linea, this.columna);
                        } 
                        else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.STRING) 
                        {
                            let res: String[] = [];
                            let nuevo_vec = new LISTA(this.tipo, this.id, res);
                            console.log("EXITO: lista "+this.id +" creada con valor: "+res);
                            tabla.agregar_variable_tabla(this.id,nuevo_vec);
                            ast.guardar_en_tabla_simbolos(this.id,"Lista","String",tabla.nombre_ambito,this.linea, this.columna);
                        }
                    }
                    else{
                        //ast.escribir_en_consola("ES CON TOCHARARRAY");

                        let lista_tochararray = this.expresion[0].obtener_valor(tabla, global,ast);
                        let tipo_lista = this.expresion[0].tipo.obtener_tipo_de_dato();
                        if(tipo_lista == TIPO_DATO.STRING){
                            let res: String[] = lista_tochararray;
                            let nuevo_vec = new LISTA(this.expresion[0].tipo, this.id, res);
                            console.log("EXITO: lista "+this.id +" creada con valor: "+res);
                            tabla.agregar_variable_tabla(this.id,nuevo_vec);
                            ast.guardar_en_tabla_simbolos(this.id,"Lista","String",tabla.nombre_ambito,this.linea, this.columna);
                        }
                        
                    }
                    
                }
            }
            else{
                ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): TIPOS DE LISTA NO COINCIDEN.");
            }
        } catch {}
        
    }  
}
export class AGREGAR_A_LISTA extends Instruccion 
{
    id:     string;
    expresion:    Expresion;

    constructor(id: string, expresion: Expresion, linea: number, columna: number) 
    {
        super(linea, columna,"AGREGAR A LISTA");
        this.id = id;
        this.expresion = expresion;
    }

    public ejecutar(tabla: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        try {
            let variable = tabla.obtener_lista(this.id);
            if(variable === undefined) 
            {
                ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): LISTA "+this.id+" NO DEFINIDA.");    
            }else{
                let valor_asig = this.expresion.obtener_valor(tabla, global, ast);
                if(variable.obtener_tipo().obtener_tipo_de_dato() != this.expresion.tipo.obtener_tipo_de_dato()) 
                {
                    ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): EL VALOR NO COINCIDE CON EL TIPO DE LA LISTA.");
                }else{
                    let lista = variable.obtener_valor();    //obtiene el vector
                    lista.push(valor_asig);
                    console.log("EXITO variable modificada. Nuevo valor: "+lista);
                }  
            }
        } catch {}
        
    } 
}
export class VALIDAR_EXISTE_LISTA extends Expresion
{
    nombrelista  : string;
    posicion   : Expresion;
    constructor(nombreVar : string, posicion:Expresion, linea : number, columna : number) 
    {
        super(linea,columna,"VALIDAREXISTELISTA");
        this.nombrelista = nombreVar;
        this.posicion = posicion;
    }
    
    public obtener_valor(tabla: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        try {
            //VALIDA SI EXISTE LA VARIABLE
            let variable = tabla.obtener_lista(this.nombrelista);
            if(variable === undefined) 
            {
                ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): VECTOR "+this.nombrelista+" NO DEFINIDO.");
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
                    let tipo_vector = variable.obtener_tipo();
                    this.tipo = tipo_vector
                    ;return(valor_var[pos])
                }

            }
        } catch {}
        
    }
    
}
export class ASIGNACION_LISTA extends Instruccion 
{
    id:     string;
    posicion:  Expresion;
    expresion:    Expresion;

    constructor(id: string, posicion: Expresion, expresion: Expresion, linea: number, columna: number) 
    {
        super(linea, columna,"ASIGNACIONLISTA");
        this.id = id;
        this.posicion = posicion
        this.expresion = expresion;
    }

    public ejecutar(tabla: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        try {
            let variable = tabla.obtener_lista(this.id);
            if(variable === undefined) 
            {
                ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): LISTA "+this.id+" NO DEFINIDA.");
                
            }else{
                let pos = this.posicion.obtener_valor(tabla,global,ast);
                let pos_tipo = this.posicion.tipo.obtener_tipo_de_dato();
                if (pos_tipo != TIPO_DATO.INT){
                    ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): POSICION LISTA NO VALIDA.");
                }
                else{
                    let valor_asig = this.expresion.obtener_valor(tabla, global, ast);
                    if(variable.obtener_tipo().obtener_tipo_de_dato() != this.expresion.tipo.obtener_tipo_de_dato()) 
                    {
                        ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): EL VALOR NO COINCIDE CON EL TIPO DE LA LISTA.");
                    }else{
                        let vect = variable.obtener_valor();    //obtiene el vector
                        if((vect.length-1) < pos){
                            ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): POSICION EXCEDE A LONGITUD DE LISTA");
                        }
                        else{
                            vect[pos] = valor_asig;                 //modifica el valor
                            variable.modificar_valor(vect)          //modifica el vector
                            console.log("EXITO variable modificada. Nuevo valor: "+vect);
                        }
                        
                    }

                }
                
            }
        } catch {}
        
    }
    
}
export class DECLARACION_LISTA_TIPO2 extends Instruccion 
{
    tipo:   Tipo;
    id:     string;
    expresion:    Expresion[];
    tipo_confirmacion:  Tipo;

    constructor(tipo: Tipo, id: string,tipo_confirmacion:Tipo, linea: number, columna: number) 
    {
        super(linea, columna,"DECLARACIONLISTA");
        this.tipo = tipo;
        this.id = id;  
        this.expresion = [];
        this.tipo_confirmacion = tipo_confirmacion;      
    }

    public ejecutar(tabla: TABLA_FUNCIONES_Y_VARIABLES, global: TABLA_FUNCIONES_Y_VARIABLES, ast: AST) 
    {
        try {
            //ast.escribir_en_consola("TENGO QUE DECLARAR VECTORES CON VALOR.");
            //SI LA VARIABLE EXISTE NO SE CREA NADA
            if(this.tipo.obtener_tipo_de_dato() == this.tipo_confirmacion.obtener_tipo_de_dato())
            {
                if( tabla.variable_existe(this.id) ) 
                {
                    ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): VARIABLE YA EXISTE.");
                }
                //SI LA VARIABLE NO EXISTE
                else
                {
                    if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.INT)
                    {
                        let res: number[] = [];
                        let nuevo_vec = new LISTA(this.tipo, this.id, res);
                        console.log("EXITO: lista "+this.id +" creada con valor: "+res);
                        tabla.agregar_variable_tabla(this.id,nuevo_vec);
                        tabla.agregar_variable_tabla(this.id,nuevo_vec);
                        ast.guardar_en_tabla_simbolos(this.id,"Lista","Int",tabla.nombre_ambito,this.linea, this.columna);
                    }
                    else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.DOUBLE)
                    {
                        let res: number[] = [];
                        let nuevo_vec = new LISTA(this.tipo, this.id, res);
                        console.log("EXITO: lista "+this.id +" creada con valor: "+res);
                        tabla.agregar_variable_tabla(this.id,nuevo_vec);
                        tabla.agregar_variable_tabla(this.id,nuevo_vec);
                        ast.guardar_en_tabla_simbolos(this.id,"Lista","Double",tabla.nombre_ambito,this.linea, this.columna);
                    } 
                    else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.BOOLEAN)
                    {
                        let res: boolean[] = [];
                        let nuevo_vec = new LISTA(this.tipo, this.id, res);
                        console.log("EXITO: lista "+this.id +" creada con valor: "+res);
                        tabla.agregar_variable_tabla(this.id,nuevo_vec);
                        tabla.agregar_variable_tabla(this.id,nuevo_vec);
                        ast.guardar_en_tabla_simbolos(this.id,"Lista","Boolean",tabla.nombre_ambito,this.linea, this.columna);
                    } 
                    else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.CHAR) 
                    {
                        let res: String[] = [];
                        let nuevo_vec = new LISTA(this.tipo, this.id, res);
                        console.log("EXITO: lista "+this.id +" creada con valor: "+res);
                        tabla.agregar_variable_tabla(this.id,nuevo_vec);
                        tabla.agregar_variable_tabla(this.id,nuevo_vec);
                        ast.guardar_en_tabla_simbolos(this.id,"Lista","Char",tabla.nombre_ambito,this.linea, this.columna);
                    } 
                    else if(this.tipo.obtener_tipo_de_dato() === TIPO_DATO.STRING) 
                    {
                        let res: String[] = [];
                        let nuevo_vec = new LISTA(this.tipo, this.id, res);
                        console.log("EXITO: lista "+this.id +" creada con valor: "+res);
                        tabla.agregar_variable_tabla(this.id,nuevo_vec);
                        tabla.agregar_variable_tabla(this.id,nuevo_vec);
                        ast.guardar_en_tabla_simbolos(this.id,"Lista","String",tabla.nombre_ambito,this.linea, this.columna);
                    } 
                }
            }
            else{
                ast.escribir_en_consola("ERROR EN ("+ this.linea + " , " + this.columna+ "): TIPOS DE LISTA NO COINCIDEN.");
            }
        } catch {}
        
    }  
}