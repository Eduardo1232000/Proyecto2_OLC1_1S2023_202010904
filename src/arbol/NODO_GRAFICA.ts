export class NODO_GRAFICA{
    ID:number;
    nombre: string;
    linea:number;
    columna:number;
    color:string;
    hijos:NODO_GRAFICA[]

    constructor(nombre:string,linea:number,columna:number,color:string){
        this.ID = Math.floor(Math.random()*(10000000-1+1)+1);
        this.linea = linea
        this.nombre = nombre
        this.columna = columna
        this.color = color
        this.hijos = [] 
    }//An5885837[label="raizL1C: 0" color="green"];
    obtener_grafica_nodos(){
        //console.log(this.nombre)
        let salida = 'n'+this.ID+'[label="'+this.nombre+'" color="'+this.color+'"];\n '
        for (let i = 0; i < this.hijos.length; i++){
            try {
                salida += this.hijos[i].obtener_grafica_nodos();
                salida +='n' +this.ID+' -> n'+this.hijos[i].ID+'; \n'
            } catch (error) {
                console.log("NO PUDE OBTENER EL HIJO DE ESTE NODO (CREO QUE ES DE ALGUN ERROR)");
            }
            
            
        }
        return salida
    }
    public agregar_hijo(hijo:NODO_GRAFICA){
        //console.log(hijo.nombre+" AGREGADO EN ->"+this.nombre +" con id: "+this.ID);
        this.hijos.push(hijo);
    }
}