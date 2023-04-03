//PARA FUNCIONES

import { LISTA_EJECUCIONES } from "./LISTA_EJECUCIONES";

//PARA VARIABLES
import { Tipo } from "./Tipo";

export class TABLA_FUNCIONES_Y_VARIABLES 
{
    anterior: TABLA_FUNCIONES_Y_VARIABLES;
    tabla_variables: Map<string , VARIABLE>;
    tabla_funciones: Map<string , FUNCION>;

    constructor(anterior: TABLA_FUNCIONES_Y_VARIABLES) 
    {
        this.anterior = anterior;
        this.tabla_variables = new Map<string , VARIABLE>();
        this.tabla_funciones = new Map<string , FUNCION>();
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
    nombre:         string;
    parametros:     PARAMETRO[];
    sentencias:     LISTA_EJECUCIONES[];
    constructor(nombre: string, parametros: PARAMETRO[], sentencias: LISTA_EJECUCIONES[]) 
    {
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
export class PARAMETRO {
     
}