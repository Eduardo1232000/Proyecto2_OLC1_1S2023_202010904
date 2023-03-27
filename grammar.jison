 /* Definicion Lexica */
 %lex

 %options case-insensitive

 %%
"Evaluar"    return 'REVALUAR';
";"          return 'PTCOMA';
"("          return 'PARIZQ';
")"          return 'PARDER';
"["          return 'CORIZQ';
"]"          return 'CORDER';

"+"          return 'MAS';
"-"          return 'MENOS';
"*"          return 'POR';
"/"          return 'DIVIDIDO';

/* Espacios en blanco */ 
[ \r\t]+               {}
\n                     {}
[0-9]+("."[0-9]+)?\b        return 'DECIMAL';
[0-9]+\b                    return 'ENTERO';

/* End-of-file*/
<<EOF>>                     return 'EOF';


.                      { 
    console.error('Este es un error lexico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); 
    }

/lex 
/*CODIGO EN JAVASCRIPT*/
%{
    var respuestas=[];
    module.exports.respuestas = respuestas;
%}

/* Asociacion de operadores y precedencia */

/* presedencia de mayor a menor */
%left 'MAS' 'MENOS'
%left 'POR' 'DIVIDIDO'
%left UMENOS

%start ini 


%% /* Definicion de la gramatica */
ini 
    : instrucciones EOF
;

instrucciones : instrucciones instruccion
                | instruccion
;
instruccion 
    : REVALUAR CORIZQ expresion CORDER PTCOMA {
        console.log('El valor de la expresion es: ' + $3)
        respuestas.push('El valor de la expresion es: ' + $3);

    }
    | error PTCOMA {
        console.error('Este es un error lexico: ' + yytext + ', en la linea: ');
        respuestas.push('Este es un error lexico: ' + yytext);
        
        }
;


expresion
    : MENOS expresion %prec UMENOS  {$$ = $2 * -1; }
    | expresion MAS expresion       {$$ = $1 + $3; }
    | expresion MENOS expresion     {$$ = $1 - $3; }
    | expresion POR expresion       {$$ = $1 * $3; }
    | expresion DIVIDIDO expresion  {$$ = $1 / $3; }
    | ENTERO                        {$$ = Number($1);}
    | DECIMAL                       {$$ = Number($1);}
    | PARIZQ expresion PARDER       {$$ = $2;}
;

