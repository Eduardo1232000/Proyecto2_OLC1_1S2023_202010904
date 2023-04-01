export class Tipo 
{
    tipo : TIPO_DATO;
    constructor(TIPO_DATO : TIPO_DATO)
    {
        this.tipo = TIPO_DATO;
    }

    obtener_tipo_de_dato() : TIPO_DATO 
    {
        return this.tipo;
    }
}
export enum TIPO_DATO 
{
    INT,
    DOUBLE,
    BOOLEAN,
    CHAR,
    STRING,
    NULL,
    VOID,
    ERROR
}