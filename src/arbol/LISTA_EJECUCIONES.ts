export abstract class LISTA_EJECUCIONES 
{
    public linea:       number;
    public columna:     number;
    public nombre_in_ex:string;
    constructor(linea:number, columna:number, nombre_in_ex:string)
    {
        this.linea = linea;
        this.columna = columna;
        this.nombre_in_ex = nombre_in_ex;
    }
}