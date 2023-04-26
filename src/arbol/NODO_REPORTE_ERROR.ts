export class NODO_REPORTE_ERROR{
    tipo: string;
    descripcion: string;
    linea:number;
    columna:number;
    

    constructor(tipo:string,descripcion:string,linea:number,columna:number){
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;
    }
    public obtener_tipo(){
        return this.tipo;
    }
    public obtener_descripcion(){
        return this.descripcion;
    }
    public obtener_linea(){
        return this.linea;
    }
    public obtener_columna(){
        return this.columna;
    }
}