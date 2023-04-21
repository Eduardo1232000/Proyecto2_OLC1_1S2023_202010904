//PARA FUNCIONES

import { LISTA_EJECUCIONES } from "./LISTA_EJECUCIONES";

//PARA VARIABLES
import { Tipo } from "./Tipo";

export class TABLA_FUNCIONES_Y_VARIABLES 
{
    anterior: TABLA_FUNCIONES_Y_VARIABLES;
    tabla_variables: Map<string , VARIABLE>;
    tabla_funciones: Map<string , FUNCION>;
    nombre_ambito:string;

    constructor(anterior: TABLA_FUNCIONES_Y_VARIABLES, nombre_ambito:string) 
    {
        this.anterior = anterior;
        this.tabla_variables = new Map<string , VARIABLE>();
        this.tabla_funciones = new Map<string , FUNCION>();
        this.nombre_ambito = nombre_ambito;
    }
    public agregar_variable_tabla(id :string, variable :VARIABLE) 
    {
        this.tabla_variables.set(id, variable);
    }
    public obtener_variable(id :string): VARIABLE 
    {
        let e: TABLA_FUNCIONES_Y_VARIABLES = this;
        while (e != null) 
        {
            try 
            {
                const variable = e.tabla_variables.get(id);
                if (variable != null) 
                {
                    return variable as VARIABLE;
                }
            } 
            catch (error) 
            {
                console.log(error);
            }
            e = e.anterior;
        }
        return undefined;
    }
    public obtener_lista(id :string): LISTA 
    {
        let e: TABLA_FUNCIONES_Y_VARIABLES = this;
        while (e != null) 
        {
            try 
            {
                const variable = e.tabla_variables.get(id);
                if (variable != null) 
                {
                    return variable as LISTA;
                }
            } 
            catch (error) 
            {
                console.log(error);
            }
            e = e.anterior;
        }
        return undefined;
    }
    //VERIFICA SI EXISTE LA VARIABLE
    public variable_existe(id :string) : boolean 
    {
        return this.tabla_variables.get(id) != undefined;
    }

    public agregar_funcion_tabla(id :string, funcion : FUNCION) 
    {
        this.tabla_funciones.set(id, funcion);
    }

    public obtener_funcion(id :string): FUNCION 
    {
        return this.tabla_funciones.get(id);
    }
}

export class FUNCION
{
    tipo:           Tipo;       
    nombre:         string;
    parametros:     PARAMETRO[];
    sentencias:     LISTA_EJECUCIONES[];
    constructor(tipo: Tipo, nombre: string, parametros: PARAMETRO[], sentencias: LISTA_EJECUCIONES[]) 
    {
        this.tipo = tipo;
        this.nombre = nombre;
        this.parametros = parametros;
        this.sentencias = sentencias;
    }

    public obtener_nombre(): string 
    {
        return this.nombre;
    }

    public obtener_parametros(): PARAMETRO[] 
    {
        return this.parametros;
    }
    public obtener_sentencias(): LISTA_EJECUCIONES[]
    {
        return this.sentencias;
    }
}

export class VARIABLE 
{
    tipo:   Tipo;
    id:     string;
    valor:  any;
    constructor(tipo:Tipo, id:string, valor:any) 
    {
        this.tipo   = tipo;
        this.id     = id;
        this.valor  = valor;
    }
    public obtener_valor(): any 
    {
        return this.valor;
    }

    public modificar_valor(valor: any)
    {
        this.valor = valor;
    }

    public obtener_nombre(): string 
    {
        return this.id;
    }

    public obtener_tipo(): Tipo 
    {
        return this.tipo;
    }

    
}
export class VECTOR 
{
    tipo:   Tipo;
    id:     string;
    valor:  any[];
    constructor(tipo:Tipo, id:string, valor:any[]) 
    {
        this.tipo   = tipo;
        this.id     = id;
        this.valor  = valor;
    }
    public obtener_valor(): any 
    {
        return this.valor;
    }

    public modificar_valor(valor: any[])
    {
        this.valor = valor;
    }

    public obtener_nombre(): string 
    {
        return this.id;
    }

    public obtener_tipo(): Tipo 
    {
        return this.tipo;
    }

    
}
export class LISTA 
{
    tipo:   Tipo;
    id:     string;
    valor:  any[];
    constructor(tipo:Tipo, id:string, valor:any[]) 
    {
        this.tipo   = tipo;
        this.id     = id;
        this.valor  = valor;
    }
    public obtener_valor(): any 
    {
        return this.valor;
    }

    public modificar_valor(valor: any[])
    {
        this.valor = valor;
    }
    public agregar_valor(valor:any[])
    {
        this.valor.push(valor);
    }

    public obtener_nombre(): string 
    {
        return this.id;
    }

    public obtener_tipo(): Tipo 
    {
        return this.tipo;
    }

    
}
export class METODO 
{
    tipo:   Tipo;
    id:     string;
    parametro:  any[];
    valor: any[];
    constructor(tipo:Tipo, id:string, parametro:any[],valor: any[]) 
    {
        this.tipo   = tipo;
        this.id     = id;
        this.parametro  = parametro;
        this.valor = valor;
    }
    public obtener_valor(): any 
    {
        return this.valor;
    }
    public modificar_valor(valor: any[])
    {
        this.valor = valor;
    }

    public obtener_nombre(): string 
    {
        return this.id;
    }

    public obtener_tipo(): Tipo 
    {
        return this.tipo;
    }
    public obtener_parametros(): any
    {
        return this.parametro;
    }

    
}
export class PARAMETRO {
    tipo:   Tipo;
    id:     string;
    linea: number;
    columna: number;
    constructor(tipo:Tipo, id:string, linea:number, columna:number) 
    {
        this.tipo   = tipo;
        this.id     = id;
        this.linea = linea;
        this.columna = columna;
    }
    public obtener_nombre(): string 
    {
        return this.id;
    }

    public obtener_tipo(): Tipo
    {
        return this.tipo;
    }
    public obtener_linea(): number
    {
        return this.linea;
    }
    public obtener_columna(): number
    {
        return this.columna;
    }
}