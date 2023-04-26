export class NODO_TABLA_SIMBOLOS{
    identificador: string;
    tipo1: string;
    tipo2: string;
    entorno: string;
    linea:number;
    columna:number;
    

    constructor(identificador:string,tipo1:string,tipo2:string,entorno:string,linea:number,columna:number){
        this.identificador = identificador;
        this.tipo1 = tipo1;
        this.tipo2 = tipo2;
        this.entorno = entorno;
        this.linea = linea;
        this.columna = columna;
    }
    public obtener_identificador(){
        return this.identificador;
    }
    public obtener_tipo1(){
        return this.tipo1;
    }
    public obtener_tipo2(){
        return this.tipo2;
    }
    public obtener_entorno(){
        return this.entorno;
    }
    public obtener_linea(){
        return this.linea;
    }
    public obtener_columna(){
        return this.columna;
    }
}