/* CODIGO EN JAVASCRIPT PARA ANALIZADOR LEXICO */
/* ------------------------------------------------- */
%{
    var lexico=[];
    module.exports.lexico = lexico;
    let lista_temporal = [];
    let lista_temporal_2 = [];
    let lista_temporal_3 = [];
    let nodo_graf;
    let nodo_prueba;
    let val;

    let NODO_GRAFICAS               =   require("./src/arbol/NODO_GRAFICA").NODO_GRAFICA; 
    let LISTA_EJECUCIONES           =   require("./src/arbol/LISTA_EJECUCIONES").LISTA_EJECUCIONES;
    let Tipo                        =   require("./src/arbol/Tipo").Tipo;
    let TIPO_DATO                   =   require("./src/arbol/Tipo").TIPO_DATO;
    let DECLARACION_VARIABLE        =   require("./src/instrucciones/VARIABLES").DECLARACION_VARIABLE;
    let DECLARACION_PARAMETRO       =   require("./src/instrucciones/VARIABLES").DECLARACION_PARAMETRO;
    let DECLARACION_VECTOR_TIPO1    =   require("./src/instrucciones/VARIABLES").DECLARACION_VECTOR_TIPO1; 
    let ASIGNACION_VARIABLE         =   require("./src/instrucciones/VARIABLES").ASIGNACION_VARIABLE;
    let ASIGNACION_VECTOR           =   require("./src/instrucciones/VARIABLES").ASIGNACION_VECTOR;
    let VALIDAR_EXISTE_VARIABLE     =   require("./src/instrucciones/VARIABLES").VALIDAR_EXISTE_VARIABLE;
    let VALIDAR_EXISTE_VECTOR       =   require("./src/instrucciones/VARIABLES").VALIDAR_EXISTE_VECTOR;
    let Valor                       =   require("./src/instrucciones/Valor").Valor;
    let OPERACIONES                 =   require("./src/instrucciones/OPERACIONES").OPERACIONES;
    let OPERACION_UNARIA            =   require("./src/instrucciones/OPERACION_UNARIA").OPERACION_UNARIA;
    let IF                          =   require("./src/instrucciones/FUNCIONES").IF;
    let PRINT                       =   require("./src/instrucciones/FUNCIONES").PRINT;
    let WHILE                       =   require("./src/instrucciones/FUNCIONES").WHILE;
    let FOR                         =   require("./src/instrucciones/FUNCIONES").FOR;
    let DO_WHILE                    =   require("./src/instrucciones/FUNCIONES").DO_WHILE;
    let SWITCH                      =   require("./src/instrucciones/FUNCIONES").SWITCH;
    let CASE                        =   require("./src/instrucciones/FUNCIONES").CASE;
    let OPERACION_TERNARIA          =   require("./src/instrucciones/OPERACION_TERNARIA").OPERACION_TERNARIA;
    let CASTEOS                     =   require("./src/instrucciones/CASTEOS").CASTEOS;
    let DECLARACION_METODO          =   require("./src/instrucciones/VARIABLES").DECLARACION_METODO;
    let LLAMADA_METODO              =   require("./src/instrucciones/VARIABLES").LLAMADA_METODO;
    let LLAMADA_METODO_EXP          =   require("./src/instrucciones/VARIABLES").LLAMADA_METODO_EXPRESION;
    let LLAMADA_MAIN                =   require("./src/instrucciones/VARIABLES").LLAMADA_MAIN;
    let TO_LOWER                    =   require("./src/instrucciones/FUNCIONES").TO_LOWER;
    let TO_UPPER                    =   require("./src/instrucciones/FUNCIONES").TO_UPPER;
    let LENGHT                      =   require("./src/instrucciones/FUNCIONES").LENGHT;
    let TRUNCATE                    =   require("./src/instrucciones/FUNCIONES").TRUNCATE;
    let ROUND                       =   require("./src/instrucciones/FUNCIONES").ROUND;
    let TYPEOF                      =   require("./src/instrucciones/FUNCIONES").TYPEOF;
    let TOSTRING                    =   require("./src/instrucciones/FUNCIONES").TOSTRING;
    let SENT_BREAK                  =   require("./src/instrucciones/FUNCIONES").BREAK;
    let SENT_CONTINUE               =   require("./src/instrucciones/FUNCIONES").CONTINUE;
    let SENT_RETURN                 =   require("./src/instrucciones/FUNCIONES").RETURN;
%}
/* ------------------------------------------------- */
 /* Definicion Lexica */
%lex
%options case-insensitive

digit                       [0-9]
corchete_abre               "["
corchete_cierra             "]"
doblediagonal               "\\"
int                         (?:[0-9]|[1-9][0-9]+)
EXPRESION                         (?:[eE][-+]?[0-9]+)
frac                        (?:\.[0-9]+)

%%

\s+                             {/* skip whitespace */}
<<EOF>>                         {return 'EOF';}

/* COMENTARIO SIMPLE Y MULTILINEA */
"//".*                                 {lexico.push("COMENTARIO SIMPLE: "+yytext)}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]    {lexico.push("COMENTARIO MULTILINEA: "+yytext)}

/* --------------------- PALABRAS RESERVADAS -------------------*/
"int"               {lexico.push("INT");         return 'RINT'; }
"double"            {lexico.push("DOUBLE");      return 'RDOUBLE';}
"boolean"           {lexico.push("BOOLEAN");     return 'RBOOLEAN';}
"char"              {lexico.push("CHAR");        return 'RCHAR';}
"string"            {lexico.push("STRING");      return 'RSTRING';}

"true"              {lexico.push("TRUE");        return 'RTRUE';}
"false"             {lexico.push("FALSE");       return 'RFALSE';}

"if"                {lexico.push("IF");          return 'RIF';}
"print"             {lexico.push("PRINT");       return 'RPRINT';}
"else"              {lexico.push("ELSE");        return 'RELSE';}
"void"              {lexico.push("VOID");        return 'RVOID';}
"return"            {lexico.push("RETURN");      return 'RRETURN';}
"switch"            {lexico.push("SWITCH");      return 'RSWITCH';}
"case"              {lexico.push("DCASE");       return 'RCASE';}
"default"           {lexico.push("DEFAULT");     return 'RDEFAULT';}
"while"             {lexico.push("WHILE");       return 'RWHILE';}
"for"               {lexico.push("FOR");         return 'RFOR';}
"do"                {lexico.push("DO");          return 'RDO';}
"break"             {lexico.push("BREAK");       return 'RBREAK';}
"continue"          {lexico.push("CONTINUE");    return 'RCONTINUE';}
"return"            {lexico.push("RETURN");      return 'RRETURN';}
"new"               {lexico.push("RNEW");        return 'RNEW';}

"toLower"           {lexico.push("TOLOWER");     return 'RTOLOWER';}
"toUpper"           {lexico.push("TOUPPER");     return 'RTOUPPER';}
"length"            {lexico.push("LENGHT");      return 'RLENGTH';}
"truncate"          {lexico.push("TRUNCATE");    return 'RTRUNCATE';}
"round"             {lexico.push("ROUND");       return 'RROUND';}
"typeof"            {lexico.push("TYPEOF");      return 'RTYPEOF';}
"toString"          {lexico.push("TOSTRING");    return 'RTOSTRING';}
"toCharArray"       {lexico.push("TOCHARARRAY"); return 'RTOCHARARRAY';}
"main"              {lexico.push("MAIN");        return 'RMAIN';}
/*---------------------------------------------------------------*/

/*------------------------- EXPRESIONES REGULARES ---------------*/
([a-zA-ZÑñ]|("_"[a-zA-ZÑñ]))([a-zA-ZÑñ]|[0-9]|"_")*                                 { yytext = yytext.toLowerCase();            return 'id';}
\"(?:[{corchete_abre}|{corchete_cierra}]|["\\"]["bnrt/["\\"]]|[^"["\\"])*\"         { yytext = yytext.substr(1,yyleng-2);       return 'CADENA';}
\'((\\\')|(\\\")|(\\\\)|(\\"n")|(\\"t")|[^\\\n\'])?\'	                                                            { yytext = yytext.substr(1,yyleng-2);       return 'CARACTER'; }  
{int}{frac}\b                                                                                          { return 'DECIMAL'}
{int}\b                                                                                                { return 'ENTERO' }
/*---------------------------------------------------------------*/

/*--------------------------SIGNOS-------------------------------*/
"$"                             {return '$'};
"++"                            {return '++';}
"--"                            {return '--';}
"+"                             {return '+';}
"-"                             {return '-';}
"*"                             {return '*';}
"/"                             {return '/';}
"^"                             {return '^';}
"%"                             {return '%';}
"("                             {return '(';}
")"                             {return ')';}
"=="                            {return '==';}
"="                             {return '=';}
","                             {return ',';}
":"                             {return ':';}
";"                             {return ';';}
"||"                            {return '||';}
"&&"                            {return '&&';}
"!="                            {return '!=';}
"!"                             {return '!';}
"<="                            {return '<=';}
">="                            {return '>=';}
">"                             {return '>';}
"<"                             {return '<';}
"{"                             {return '{';}
"}"                             {return '}';}
"["                             {return '[';}
"]"                             {return ']';}
"?"                             {return '?';}

"\n"                            {return 'SALTO_LINEA';}
"\'"                            {return 'COMILLA_SIMPLE';}
"\\\\"                          {return 'BARRA_INVERTIDA';}
"\""                            {return 'COMILLA_DOBLE';}
"\t"                            {return 'TABULACION';}
/*---------------------------------------------------------------*/
.                               {}

/lex

/* Asociacion de operadores y precedencia */
/*Operaciones logicas*/
%left '?' ':'
%left '++' '--'
%left '||'
%left '&&'
%left '!'
%left '==' '!=' '<' '<=' '>' '>=' 
%left '+' '-'
%left '*' '/' '%'
%left '^'
%right negativo '!' '(' 

%start ini

%% /* Definicion de la gramatica */
ini
    : instrucciones EOF {
                            console.log("Parse de Jison entrada: OK ");
                            lista_temporal =[]; let raiz = $1[0];  lista_temporal.push(raiz)
                            lista_temporal_3 = $1[1]; 
                            nodo_graf = new NODO_GRAFICAS("PROGRAMA",@1.first_line, @1.first_column, 'red');     
                            for(let i = 0; i< lista_temporal_3.length;i++){let a = lista_temporal_3[i]; nodo_graf.agregar_hijo(a);}
                            lista_temporal.push(nodo_graf)
                            $$ = lista_temporal;
                            return lista_temporal;
                        }
;

instrucciones :    instrucciones instruccion        {lista_temporal = $1;  lista_temporal_2= lista_temporal[0]; lista_temporal_2.push($2[0]);
                                                    lista_temporal_3 =lista_temporal[1];  nodo_graf = new NODO_GRAFICAS( "INSTRUCCION", @1.first_line, @1.first_column, "yellowgreen" ); lista_temporal_3.push(nodo_graf);nodo_graf.agregar_hijo($2[1])
                                                    lista_temporal = []; lista_temporal.push(lista_temporal_2); lista_temporal.push(lista_temporal_3); $$ = lista_temporal;     }
            |      instruccion {   let lstsent = [];        lstsent.push($1[0]);   
                                nodo_graf = new NODO_GRAFICAS( "INSTRUCCION", @1.first_line, @1.first_column, "yellowgreen" );
                                nodo_graf.agregar_hijo($1[1]);
                                lista_temporal_3 = []; lista_temporal_3.push(nodo_graf);
                                lista_temporal = []; lista_temporal.push(lstsent); lista_temporal.push(lista_temporal_3);  $$ = lista_temporal;      }
        
;

instruccion :                   DECLARACION_VARIABLE ';'    { lista_temporal2= $1[0];lista_temporal=[]; lista_temporal.push(lista_temporal2); nodo_graf = $1[1]; lista_temporal.push(nodo_graf); $$ = lista_temporal; }
                            |   DECLARACION_VECTORES ';'    { lista_temporal=[]; lista_temporal.push($1[0]); nodo_graf = $1[1]; lista_temporal.push(nodo_graf); $$ = lista_temporal; }
                            |   DECLARACION_METODO          { lista_temporal=[]; lista_temporal.push($1[0]); nodo_graf = $1[1]; lista_temporal.push(nodo_graf); $$ = lista_temporal; }
                            |   DECLARACION_FUNCION         { lista_temporal=[]; lista_temporal.push($1[0]); nodo_graf = $1[1]; lista_temporal.push(nodo_graf); $$ = lista_temporal; }
                            |   LLAMADA_METODOS             { lista_temporal=[]; lista_temporal.push($1[0]); nodo_graf = $1[1]; lista_temporal.push(nodo_graf); $$ = lista_temporal; }
                            |   ASIGNACION_VARIABLE  ';'    { lista_temporal=[]; lista_temporal.push($1[0]); nodo_graf = $1[1]; lista_temporal.push(nodo_graf); $$ = lista_temporal; }
                            |   ASIGNACION_VECTORES         { lista_temporal=[]; lista_temporal.push($1[0]); nodo_graf = $1[1]; lista_temporal.push(nodo_graf); $$ = lista_temporal; }
                            |   FUNCION_IF                  { lista_temporal=[]; lista_temporal.push($1[0]); nodo_graf = $1[1]; lista_temporal.push(nodo_graf); $$ = lista_temporal; }
                            |   FUNCION_PRINT ';'           { lista_temporal=[]; lista_temporal.push($1[0]); nodo_graf = $1[1]; lista_temporal.push(nodo_graf); $$ = lista_temporal; }                            
                            |   FUNCION_WHILE               { lista_temporal=[]; lista_temporal.push($1[0]); nodo_graf = $1[1]; lista_temporal.push(nodo_graf); $$ = lista_temporal; }
                            |   FUNCION_FOR                 { lista_temporal=[]; lista_temporal.push($1[0]); nodo_graf = $1[1]; lista_temporal.push(nodo_graf); $$ = lista_temporal; }
                            |   FUNCION_DO_WHILE ';'        { lista_temporal=[]; lista_temporal.push($1[0]); nodo_graf = $1[1]; lista_temporal.push(nodo_graf); $$ = lista_temporal; }
                            |   FUNCION_SWITCH              { lista_temporal=[]; lista_temporal.push($1[0]); nodo_graf = $1[1]; lista_temporal.push(nodo_graf); $$ = lista_temporal; }
                            |   FUNCION_TO_LOWER ';'        { lista_temporal=[]; lista_temporal.push($1[0]); nodo_graf = $1[1]; lista_temporal.push(nodo_graf); $$ = lista_temporal; }
                            |   FUNCION_MAIN ';'            { lista_temporal=[]; lista_temporal.push($1[0]); nodo_graf = $1[1]; lista_temporal.push(nodo_graf); $$ = lista_temporal; }
                            |   SENTENCIA_BREAK             { lista_temporal=[]; lista_temporal.push($1[0]); nodo_graf = $1[1]; lista_temporal.push(nodo_graf); $$ = lista_temporal; }
                            |   SENTENCIA_CONTINUE          { lista_temporal=[]; lista_temporal.push($1[0]); nodo_graf = $1[1]; lista_temporal.push(nodo_graf); $$ = lista_temporal; }
                            |   SENTENCIA_RETURN          { lista_temporal=[]; lista_temporal.push($1[0]); nodo_graf = $1[1]; lista_temporal.push(nodo_graf); $$ = lista_temporal; }
                            |   error PTCOMA                {console.error('Este es un error SINTACTICO');}
                            |   error                       {console.error('Este es un error SINTACTICO');}
;       

FUNCION_MAIN:               RMAIN id '('PARAMETROS_LLAMADA')'             {lista_temporal = []; val = new LLAMADA_MAIN($2,$4[0], @1.first_line, @1.first_column);lista_temporal.push(val);
                                                                        nodo_graf = new NODO_GRAFICAS( "MAIN", @1.first_line, @1.first_column, "gray" );
                                                                        nodo_prueba=new NODO_GRAFICAS( "ID", @1.first_line, @1.first_column, "black" );
                                                                        nodo_prueba.agregar_hijo(new NODO_GRAFICAS( $2, @1.first_line, @1.first_column, "black" ))
                                                                        nodo_graf.agregar_hijo(nodo_prueba);
                                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "black" ));
                                                                        nodo_prueba=new NODO_GRAFICAS( "PARAMETROS", @1.first_line, @1.first_column, "black" );
                                                                        lista_temporal_3 = $4[1]; for(let i = 0; i< lista_temporal_3.length;i++){nodo_prueba.agregar_hijo(lista_temporal_3[i]);if(i!=lista_temporal.length){nodo_prueba.agregar_hijo(new NODO_GRAFICAS( ",", @1.first_line, @1.first_column, "black" ));}}
                                                                        nodo_graf.agregar_hijo(nodo_prueba);
                                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "black" ));
                                                                        lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                                        }
                            |RMAIN id '('')'                               {lista_temporal = []; val = new LLAMADA_MAIN($2,[], @1.first_line, @1.first_column);lista_temporal.push(val);
                                                                        nodo_graf = new NODO_GRAFICAS( "MAIN", @1.first_line, @1.first_column, "gray" );
                                                                        nodo_prueba=new NODO_GRAFICAS( "ID", @1.first_line, @1.first_column, "black" );
                                                                        nodo_prueba.agregar_hijo(new NODO_GRAFICAS( $2, @1.first_line, @1.first_column, "black" ))
                                                                        nodo_graf.agregar_hijo(nodo_prueba);
                                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "black" ));
                                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "black" ));
                                                                        lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                                        }
;
DECLARACION_VARIABLE :        TIPO  id  '=' EXPRESION  {val = new DECLARACION_VARIABLE($1[0], $2, $4[0], @2.first_line, @2.first_column);
                              nodo_graf = new NODO_GRAFICAS( "DECLARACION_VARIABLE", @1.first_line, @1.first_column, "skyblue" );
                              nodo_graf.agregar_hijo($1[1]);    //TIPO
                              nodo_prueba = new NODO_GRAFICAS( "ID", @1.first_line, @1.first_column, "skyblue" );//ID
                              nodo_prueba.agregar_hijo(new NODO_GRAFICAS( $2, @1.first_line, @1.first_column, "black" ))
                              nodo_graf.agregar_hijo(nodo_prueba);
                              nodo_prueba = new NODO_GRAFICAS( "=", @1.first_line, @1.first_column, "black" );//=
                              nodo_graf.agregar_hijo(nodo_prueba);
                              nodo_graf.agregar_hijo($4[1]);//VALOR
                              nodo_prueba = new NODO_GRAFICAS( ";", @1.first_line, @1.first_column, "black" );//;
                              nodo_graf.agregar_hijo(nodo_prueba);
                              lista_temporal=[];lista_temporal.push(val);lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                }
                            | TIPO  id           {lista_temporal = []; val = new DECLARACION_VARIABLE($1[0], $2, undefined, @2.first_line, @2.first_column); lista_temporal.push(val);
                                                nodo_graf = new NODO_GRAFICAS( "DECLARACION_VARIABLE", @1.first_line, @1.first_column, "skyblue" );
                                                nodo_graf.agregar_hijo($1[1]);    //TIPO
                                                nodo_prueba = new NODO_GRAFICAS( "ID", @1.first_line, @1.first_column, "skyblue" );//ID
                                                nodo_prueba.agregar_hijo(new NODO_GRAFICAS( $2, @1.first_line, @1.first_column, "black" ))
                                                nodo_graf.agregar_hijo(nodo_prueba);
                                                nodo_prueba = new NODO_GRAFICAS( ";", @1.first_line, @1.first_column, "black" );//;
                                                nodo_graf.agregar_hijo(nodo_prueba);
                                                lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                }
                            
;
DECLARACION_VECTORES:         TIPO '[' ']' id '=' 'RNEW' TIPO '['EXPRESION']' {val = new DECLARACION_VECTOR_TIPO1($1[0], $4, [],$9[0],@4.first_line,@4.first_column );
                                                                                nodo_graf = new NODO_GRAFICAS( "DECLARACION VECTOR", @1.first_line, @1.first_column, "skyblue" );
                                                                                nodo_graf.agregar_hijo($1[1]);
                                                                                nodo_graf.agregar_hijo(new NODO_GRAFICAS( "[", @1.first_line, @1.first_column, "black" ));
                                                                                nodo_graf.agregar_hijo(new NODO_GRAFICAS( "]", @1.first_line, @1.first_column, "black" ));
                                                                                nodo_prueba = new NODO_GRAFICAS( "ID", @1.first_line, @1.first_column, "skyblue" );
                                                                                nodo_prueba.agregar_hijo(new NODO_GRAFICAS( $4, @1.first_line, @1.first_column, "black" ))//id
                                                                                nodo_graf.agregar_hijo(nodo_prueba);
                                                                                nodo_graf.agregar_hijo(new NODO_GRAFICAS( "=", @1.first_line, @1.first_column, "black" ));
                                                                                nodo_graf.agregar_hijo(new NODO_GRAFICAS( "\\\"NEW\\\"", @1.first_line, @1.first_column, "black" ));
                                                                                nodo_graf.agregar_hijo($7[1]);
                                                                                nodo_graf.agregar_hijo(new NODO_GRAFICAS( "[", @1.first_line, @1.first_column, "black" ));
                                                                                nodo_graf.agregar_hijo($9[1]);
                                                                                nodo_graf.agregar_hijo(new NODO_GRAFICAS( "]", @1.first_line, @1.first_column, "black" ));
                                                                                nodo_graf.agregar_hijo(new NODO_GRAFICAS( ";", @1.first_line, @1.first_column, "black" ));
                                                                                lista_temporal = []; lista_temporal.push(val); lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                                                }
                            | TIPO '[' ']' id '=' '{' LISTA_EXPRESIONES '}'   { lista_temporal_2 =$7[0]; 
                                                                                val = new DECLARACION_VECTOR_TIPO1($1[0], $4, lista_temporal_2,0,@4.first_line,@4.first_column );
                                                                                nodo_graf = new NODO_GRAFICAS( "DECLARACION VECTOR", @1.first_line, @1.first_column, "skyblue" );
                                                                                nodo_graf.agregar_hijo($1[1]);
                                                                                nodo_graf.agregar_hijo(new NODO_GRAFICAS( "[", @1.first_line, @1.first_column, "black" ));
                                                                                nodo_graf.agregar_hijo(new NODO_GRAFICAS( "]", @1.first_line, @1.first_column, "black" ));
                                                                                nodo_prueba = new NODO_GRAFICAS( "ID", @1.first_line, @1.first_column, "skyblue" );
                                                                                nodo_prueba.agregar_hijo(new NODO_GRAFICAS( $4, @1.first_line, @1.first_column, "black" ))//id
                                                                                nodo_graf.agregar_hijo(nodo_prueba);
                                                                                nodo_graf.agregar_hijo(new NODO_GRAFICAS( "=", @1.first_line, @1.first_column, "black" ));
                                                                                nodo_graf.agregar_hijo(new NODO_GRAFICAS( "{", @1.first_line, @1.first_column, "black" ));
                                                                                lista_temporal_3 = $7[1];nodo_prueba = new NODO_GRAFICAS( "LISTA EXPRESIONES", @1.first_line, @1.first_column, "skyblue" );
                                                                                for (let i =0; i<lista_temporal_3.length;i++){ let b =lista_temporal_3[i];nodo_prueba.agregar_hijo(b);}
                                                                                nodo_graf.agregar_hijo(nodo_prueba);
                                                                                nodo_graf.agregar_hijo(new NODO_GRAFICAS( "}", @1.first_line, @1.first_column, "black" ));
                                                                                nodo_graf.agregar_hijo(new NODO_GRAFICAS( ";", @1.first_line, @1.first_column, "black" ));
                                                                                lista_temporal = []; lista_temporal.push(val); lista_temporal.push(nodo_graf); $$ = lista_temporal
                                                                                }
;   
LISTA_EXPRESIONES:            LISTA_EXPRESIONES ',' EXPRESION { lista_temporal = $1; lista_temporal_2 = lista_temporal[0]; lista_temporal_2.push($3[0]);
                                                                lista_temporal_3 = lista_temporal[1]; nodo_graf=$3[1]; lista_temporal_3.push(nodo_graf);
                                                                lista_temporal = []; lista_temporal.push(lista_temporal_2); lista_temporal.push(lista_temporal_3); $$ = lista_temporal;
                                                                }
                            | EXPRESION                     {   let lstexp = [];        lstexp.push($1[0]);  
                                                                nodo_graf = $1[1]
                                                                lista_temporal_3 = []; lista_temporal_3.push(nodo_graf);
                                                                lista_temporal = []; lista_temporal.push(lstexp); lista_temporal.push(lista_temporal_3);  $$ = lista_temporal
                                                            }                                  
;
DECLARACION_METODO:           RVOID id '('PARAMETROS')' INSTRUCCIONES_FUNCION     {lista_temporal = [];val = new DECLARACION_METODO($1,$2,$4[0],$6[0]); lista_temporal.push(val);
                                                                                    nodo_graf = new NODO_GRAFICAS( "DECLARACION METODO", @1.first_line, @1.first_column, "black" );
                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "PALABRA RESERVADA: VOID", @1.first_line, @1.first_column, "black" ))
                                                                                    nodo_prueba = new NODO_GRAFICAS( "ID", @1.first_line, @1.first_column, "black" );
                                                                                    nodo_prueba.agregar_hijo(new NODO_GRAFICAS( $2, @1.first_line, @1.first_column, "black" ))
                                                                                    nodo_graf.agregar_hijo(nodo_prueba);
                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "black" ))
                                                                                    lista_temporal_3 = $4[1];
                                                                                    nodo_prueba = new NODO_GRAFICAS( "PARAMETROS", @1.first_line, @1.first_column, "black" );
                                                                                    for(let i=0;i<lista_temporal_3.length;i++){nodo_prueba.agregar_hijo(lista_temporal_3[i]);}
                                                                                    nodo_graf.agregar_hijo(nodo_prueba);
                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "black" ))
                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "{", @1.first_line, @1.first_column, "black" ))
                                                                                    nodo_graf.agregar_hijo($6[1]);
                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "}", @1.first_line, @1.first_column, "black" ))
                                                                                    lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                                                    }
                            | RVOID id '('')' INSTRUCCIONES_FUNCION               {lista_temporal = []; val = new DECLARACION_METODO($1,$2,[],$5[0]); lista_temporal.push(val);
                                                                                    nodo_graf = new NODO_GRAFICAS( "DECLARACION METODO", @1.first_line, @1.first_column, "black" );
                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "PALABRA RESERVADA: VOID", @1.first_line, @1.first_column, "black" ))
                                                                                    nodo_prueba = new NODO_GRAFICAS( "ID", @1.first_line, @1.first_column, "black" );
                                                                                    nodo_prueba.agregar_hijo(new NODO_GRAFICAS( $2, @1.first_line, @1.first_column, "black" ))
                                                                                    nodo_graf.agregar_hijo(nodo_prueba);
                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "black" ))
                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "black" ))
                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "{", @1.first_line, @1.first_column, "black" ))
                                                                                    nodo_graf.agregar_hijo($5[1]);
                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "}", @1.first_line, @1.first_column, "black" ))
                                                                                    lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                                                    lista_temporal.push(nodo_graf); $$ = lista_temporal;

                                                                                    }
;
DECLARACION_FUNCION:           TIPO id '('PARAMETROS')' INSTRUCCIONES_FUNCION     {lista_temporal = [];val = new DECLARACION_METODO($1[0],$2,$4[0],$6[0]); lista_temporal.push(val);
                                                                                    nodo_graf = new NODO_GRAFICAS( "DECLARACION FUNCION", @1.first_line, @1.first_column, "black" );
                                                                                    nodo_graf.agregar_hijo($1[1]);
                                                                                    nodo_prueba = new NODO_GRAFICAS( "ID", @1.first_line, @1.first_column, "black" );
                                                                                    nodo_prueba.agregar_hijo(new NODO_GRAFICAS( $2, @1.first_line, @1.first_column, "black" ))
                                                                                    nodo_graf.agregar_hijo(nodo_prueba);
                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "black" ))
                                                                                    lista_temporal_3 = $4[1];
                                                                                    nodo_prueba = new NODO_GRAFICAS( "PARAMETROS", @1.first_line, @1.first_column, "black" );
                                                                                    for(let i=0;i<lista_temporal_3.length;i++){nodo_prueba.agregar_hijo(lista_temporal_3[i]);}
                                                                                    nodo_graf.agregar_hijo(nodo_prueba);
                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "black" ))
                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "{", @1.first_line, @1.first_column, "black" ))
                                                                                    nodo_graf.agregar_hijo($6[1]);
                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "}", @1.first_line, @1.first_column, "black" ))
                                                                                    lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                                                    }
                            | TIPO id '('')' INSTRUCCIONES_FUNCION               {lista_temporal = []; val = new DECLARACION_METODO($1[0],$2,[],$5[0]); lista_temporal.push(val);
                                                                                    nodo_graf = new NODO_GRAFICAS( "DECLARACION FUNCION", @1.first_line, @1.first_column, "black" );
                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "black" ))
                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "black" ))
                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "{", @1.first_line, @1.first_column, "black" ))
                                                                                    nodo_graf.agregar_hijo($6[1]);
                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "}", @1.first_line, @1.first_column, "black" ))
                                                                                    lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                                                    }
;
PARAMETROS:                   PARAMETROS ',' DECLARACION_VACIA_METODO     {lista_temporal = $1; lista_temporal_2 = lista_temporal[0]; lista_temporal_2.push($3[0]);
                                                                            lista_temporal_3 = lista_temporal[1];nodo_graf = new NODO_GRAFICAS( "PARAMETRO", @3.first_line, @3.first_column, "black" );
                                                                            nodo_graf.agregar_hijo($3[1]);
                                                                            lista_temporal_3.push(nodo_graf);
                                                                            lista_temporal = []; lista_temporal.push(lista_temporal_2);lista_temporal.push(lista_temporal_3);$$ = lista_temporal;
                                                                            }
                            | DECLARACION_VACIA_METODO                   { let lstmet = [];        lstmet.push($1[0]);  
                                                                        nodo_graf = new NODO_GRAFICAS( "PARAMETRO", @1.first_line, @1.first_column, "black" );     
                                                                        nodo_prueba = $1[1];
                                                                        nodo_graf.agregar_hijo(nodo_prueba);
                                                                        lista_temporal_3 = []; lista_temporal_3.push(nodo_graf)
                                                                        
                                                                        lista_temporal = []; lista_temporal.push(lstmet); lista_temporal.push(lista_temporal_3);$$ = lista_temporal;
                                                                        }
;
DECLARACION_VACIA_METODO:     TIPO  id           {lista_temporal = []; val = new DECLARACION_PARAMETRO($1[0], $2, undefined, @2.first_line, @2.first_column);val =val.ejecutar();lista_temporal.push(val);
                                                nodo_graf = new NODO_GRAFICAS( "DECLARACION VARIABLE", @1.first_line, @1.first_column, "black" );
                                                nodo_graf.agregar_hijo($1[1]);
                                                nodo_prueba = new NODO_GRAFICAS( "ID", @1.first_line, @1.first_column, "black" );
                                                nodo_prueba.agregar_hijo(new NODO_GRAFICAS( $2, @1.first_line, @1.first_column, "black" ))
                                                nodo_graf.agregar_hijo(nodo_prueba);
                                                lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                 }
;
LLAMADA_METODOS:              id '('PARAMETROS_LLAMADA')'             {lista_temporal = []; val = new LLAMADA_METODO($1,$3[0], @1.first_line, @1.first_column);lista_temporal.push(val);
                                                                        nodo_graf = new NODO_GRAFICAS( "LLAMADA METODO O FUNCION", @1.first_line, @1.first_column, "gray" );
                                                                        nodo_prueba=new NODO_GRAFICAS( "ID", @1.first_line, @1.first_column, "black" );
                                                                        nodo_prueba.agregar_hijo(new NODO_GRAFICAS( $1, @1.first_line, @1.first_column, "black" ))
                                                                        nodo_graf.agregar_hijo(nodo_prueba);
                                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "black" ));
                                                                        nodo_prueba=new NODO_GRAFICAS( "PARAMETROS", @1.first_line, @1.first_column, "black" );
                                                                        lista_temporal_3 = $3[1]; for(let i = 0; i< lista_temporal_3.length;i++){nodo_prueba.agregar_hijo(lista_temporal_3[i]);if(i!=lista_temporal.length){nodo_prueba.agregar_hijo(new NODO_GRAFICAS( ",", @1.first_line, @1.first_column, "black" ));}}
                                                                        nodo_graf.agregar_hijo(nodo_prueba);
                                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "black" ));
                                                                        lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                                        }
                            | id '('')'                               {lista_temporal = []; val = new LLAMADA_METODO($1,[], @1.first_line, @1.first_column);lista_temporal.push(val);
                                                                        nodo_graf = new NODO_GRAFICAS( "LLAMADA METODO O FUNCION", @1.first_line, @1.first_column, "gray" );
                                                                        nodo_prueba=new NODO_GRAFICAS( "ID", @1.first_line, @1.first_column, "black" );
                                                                        nodo_prueba.agregar_hijo(new NODO_GRAFICAS( $1, @1.first_line, @1.first_column, "black" ))
                                                                        nodo_graf.agregar_hijo(nodo_prueba);
                                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "black" ));
                                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "black" ));
                                                                        lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                                        }
;
PARAMETROS_LLAMADA:           PARAMETROS_LLAMADA ',' EXPRESION    {lista_temporal = $1; lista_temporal_2 = lista_temporal[0]; lista_temporal_2.push($3[0]);lista_temporal.push(lista_temporal_2);
                                                                    lista_temporal_3 = lista_temporal[1]; nodo_graf = $3[1]; lista_temporal_3.push(nodo_graf);
                                                                    lista_temporal.push(lista_temporal_3); $$ = lista_temporal;
                                                                    }
                            | EXPRESION                           {lista_temporal=[];let lstexp_llam = [];        lstexp_llam.push($1[0]); lista_temporal.push(lstexp_llam);
                                                                   lista_temporal_3 = []
                                                                   nodo_graf = $1[1]; lista_temporal_3.push(nodo_graf);
                                                                   lista_temporal.push(lista_temporal_3);$$ = lista_temporal;
                                                                   }
;

ASIGNACION_VARIABLE  :        id '=' EXPRESION       { lista_temporal = []; val = new ASIGNACION_VARIABLE($1, $3[0], @1.first_line, @1.first_column); lista_temporal.push(val);
                                                    nodo_graf = new NODO_GRAFICAS( "ASIGNACION VARIABLE", @1.first_line, @1.first_column, "green" );
                                                    nodo_prueba = new NODO_GRAFICAS( "ID", @1.first_line, @1.first_column, "skyblue" );//ID
                                                    nodo_prueba.agregar_hijo(new NODO_GRAFICAS( $2, @1.first_line, @1.first_column, "black" ))
                                                    nodo_graf.agregar_hijo(nodo_prueba);
                                                    nodo_prueba = new NODO_GRAFICAS( "=", @1.first_line, @1.first_column, "black" );//=
                                                    nodo_graf.agregar_hijo(nodo_prueba);
                                                    nodo_graf.agregar_hijo($3[1]);//VALOR
                                                    nodo_prueba = new NODO_GRAFICAS( ";", @1.first_line, @1.first_column, "black" );//;
                                                    nodo_graf.agregar_hijo(nodo_prueba);
                                                    lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                    }
                            
                            | id '++'                {lista_temporal = []; val = new VALIDAR_EXISTE_VARIABLE($1,@1.first_line,@1.first_column); 
                                                        val = new OPERACION_UNARIA($2, val, @2.first_line, @2.first_column);
                                                        val = new ASIGNACION_VARIABLE($1,val, @1.first_line, @1.first_column); lista_temporal.push(val);
                                                        nodo_graf = new NODO_GRAFICAS( "ASIGNACION VARIABLE", @1.first_line, @1.first_column, "green" );
                                                        nodo_prueba = new NODO_GRAFICAS( "ID", @1.first_line, @1.first_column, "skyblue" );//ID
                                                        nodo_prueba.agregar_hijo(new NODO_GRAFICAS( $1, @1.first_line, @1.first_column, "black" ));
                                                        nodo_graf.agregar_hijo(nodo_prueba);
                                                        nodo_prueba.agregar_hijo(new NODO_GRAFICAS( "++", @1.first_line, @1.first_column, "black" ));
                                                        nodo_prueba = new NODO_GRAFICAS( ";", @1.first_line, @1.first_column, "black" );//;
                                                        nodo_graf.agregar_hijo(nodo_prueba);
                                                        lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                       }
                            | id '--'                { lista_temporal = []; val = new VALIDAR_EXISTE_VARIABLE($1,@1.first_line,@1.first_column); 
                                                        val = new OPERACION_UNARIA($2, val, @2.first_line, @2.first_column);
                                                        val = new ASIGNACION_VARIABLE($1,val, @1.first_line, @1.first_column); lista_temporal.push(val);
                                                        nodo_graf = new NODO_GRAFICAS( "ASIGNACION VARIABLE", @1.first_line, @1.first_column, "green" );
                                                        nodo_prueba = new NODO_GRAFICAS( "ID", @1.first_line, @1.first_column, "skyblue" );//ID
                                                        nodo_prueba.agregar_hijo(new NODO_GRAFICAS( $1, @1.first_line, @1.first_column, "black" ));
                                                        nodo_graf.agregar_hijo(nodo_prueba);
                                                        nodo_prueba.agregar_hijo(new NODO_GRAFICAS( "++", @1.first_line, @1.first_column, "black" ));
                                                        nodo_prueba = new NODO_GRAFICAS( ";", @1.first_line, @1.first_column, "black" );//;
                                                        nodo_graf.agregar_hijo(nodo_prueba);
                                                        lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                       }
;
ASIGNACION_VECTORES :         id '[' EXPRESION ']' '=' EXPRESION ';'  {lista_temporal = []; val = new ASIGNACION_VECTOR($1, $3[0], $6[0], @1.first_line, @1.first_column); lista_temporal.push(val);
                                                                    nodo_graf = new NODO_GRAFICAS( "ASIGNACION VECTOR", @1.first_line, @1.first_column, "green" );
                                                                    nodo_prueba = new NODO_GRAFICAS( "ID", @1.first_line, @1.first_column, "skyblue" );//ID
                                                                    nodo_prueba.agregar_hijo(new NODO_GRAFICAS( $1, @1.first_line, @1.first_column, "black" ));
                                                                    nodo_graf.agregar_hijo(nodo_prueba);
                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "[", @1.first_line, @1.first_column, "black" ));
                                                                    nodo_graf.agregar_hijo($3[1]);
                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "]", @1.first_line, @1.first_column, "black" ));
                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "=", @1.first_line, @1.first_column, "black" ));
                                                                    nodo_graf.agregar_hijo($6[1]);
                                                                    nodo_prueba = new NODO_GRAFICAS( ";", @1.first_line, @1.first_column, "black" );//;
                                                                    nodo_graf.agregar_hijo(nodo_prueba);
                                                                    lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                                    }
;


INSTRUCCIONES_FUNCION:        '{'instrucciones'}'{val = $2[0]; lista_temporal = []; lista_temporal.push(val); 
                                                nodo_graf = new NODO_GRAFICAS( "INSTRUCCIONES", @1.first_line, @1.first_column, "blue" );
                                                    lista_temporal_3 = $2[1];
                                                    for(let i = 0; i<lista_temporal_3.length;i++){nodo_graf.agregar_hijo(lista_temporal_3[i])}
                                                lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                }
                            | '{''}' {val = []; lista_temporal = []; lista_temporal.push(val)
                                    nodo_graf = new NODO_GRAFICAS( "INSTRUCCIONES FUNCION", @1.first_line, @1.first_column, "skyblue" );
                                    lista_temporal.push(nodo_graf); $$= lista_temporal;
                                    }
;


FUNCION_IF:                   RIF '(' EXPRESION ')' INSTRUCCIONES_FUNCION                             {lista_temporal = []; val = new IF($3[0], $5[0], [], @1.first_line, @1.first_column); lista_temporal.push(val);
                                                                                                    nodo_graf = new NODO_GRAFICAS( "FUNCION IF", @1.first_line, @1.first_column, "yellow" );
                                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "PALABRA RESERVADA: IF", @1.first_line, @1.first_column, "yellow" ));
                                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "yellow" ));
                                                                                                    nodo_graf.agregar_hijo($3[1]);
                                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "yellow" ));
                                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "{", @1.first_line, @1.first_column, "black" ));
                                                                                                    nodo_graf.agregar_hijo($5[1]);
                                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "}", @1.first_line, @1.first_column, "black" ));
                                                                                                    lista_temporal.push(nodo_graf);$$ = lista_temporal;
                                                                                                    }
                            | RIF '(' EXPRESION ')' INSTRUCCIONES_FUNCION RELSE INSTRUCCIONES_FUNCION {lista_temporal = []; val = new IF($3[0], $5[0], $7[0], @1.first_line, @1.first_column); lista_temporal.push(val);
                                                                                                    nodo_graf = new NODO_GRAFICAS( "FUNCION IF", @1.first_line, @1.first_column, "yellow" );
                                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "PALABRA RESERVADA: IF", @1.first_line, @1.first_column, "yellow" ));
                                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "yellow" ));
                                                                                                    nodo_graf.agregar_hijo($3[1]);
                                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "yellow" ));
                                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "{", @1.first_line, @1.first_column, "black" ));
                                                                                                    nodo_graf.agregar_hijo($5[1]);
                                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "}", @1.first_line, @1.first_column, "black" ));
                                                                                                    nodo_prueba = new NODO_GRAFICAS( "PALABRA RESERVADA: ELSE", @1.first_line, @1.first_column, "yellow" );
                                                                                                    nodo_graf.agregar_hijo(nodo_prueba);
                                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "{", @1.first_line, @1.first_column, "black" ));
                                                                                                    nodo_graf.agregar_hijo($7[1]);
                                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "}", @1.first_line, @1.first_column, "black" ));
                                                                                                    
                                                                                                    lista_temporal.push(nodo_graf);$$ = lista_temporal;
                                                                                                    }
                            | RIF '(' EXPRESION ')' INSTRUCCIONES_FUNCION RELSE FUNCION_IF          {lista_temporal = []; let funcion_else_if = []; funcion_else_if.push($7[0]); 
                                                                                                     val = new IF($3[0], $5[0], funcion_else_if, @1.first_line, @1.first_column); lista_temporal.push(val);
                                                                                                    nodo_graf = new NODO_GRAFICAS( "FUNCION IF", @1.first_line, @1.first_column, "yellow" );
                                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "PALABRA RESERVADA: IF", @1.first_line, @1.first_column, "yellow" ));
                                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "yellow" ));
                                                                                                    nodo_graf.agregar_hijo($3[1]);
                                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "yellow" ));
                                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "{", @1.first_line, @1.first_column, "black" ));
                                                                                                    nodo_graf.agregar_hijo($5[1]);
                                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "}", @1.first_line, @1.first_column, "black" ));
                                                                                                    nodo_prueba = new NODO_GRAFICAS( "PALABRA RESERVADA: ELSE", @1.first_line, @1.first_column, "yellow" );
                                                                                                    nodo_prueba.agregar_hijo($7[1]);
                                                                                                    nodo_graf.agregar_hijo(nodo_prueba);
                                                                                                    lista_temporal.push(nodo_graf);$$ = lista_temporal;
                                                                                                    }                       
;

FUNCION_PRINT:                RPRINT '('EXPRESION')'   {lista_temporal = []; val = new PRINT($3[0], @1.first_line, @1.first_column); lista_temporal.push(val);
                                                        nodo_graf = new NODO_GRAFICAS( "FUNCION PRINT", @1.first_line, @1.first_column, "blue" );
                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( "PALABRA RESERVADA: PRINT", @1.first_line, @1.first_column, "blue" ));
                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "black" ));
                                                        nodo_graf.agregar_hijo($3[1]);
                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "black" ));
                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( ";", @1.first_line, @1.first_column, "black" ));
                                                        lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                        }
                            
;

FUNCION_WHILE:                RWHILE '(' EXPRESION ')'  INSTRUCCIONES_FUNCION  {lista_temporal = []; val = new WHILE($3[0],$5[0], @1.first_line, @1.first_column); lista_temporal.push(val);
                                                                                nodo_graf = new NODO_GRAFICAS( "FUNCION WHILE", @1.first_line, @1.first_column, "blue" );
                                                                                nodo_graf.agregar_hijo(new NODO_GRAFICAS( "PALABRA RESERVADA: WHILE", @1.first_line, @1.first_column, "blue" ));
                                                                                nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "black" ));
                                                                                nodo_graf.agregar_hijo($3[1]);
                                                                                nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "black" ));
                                                                                nodo_graf.agregar_hijo(new NODO_GRAFICAS( "{", @1.first_line, @1.first_column, "black" ));
                                                                                nodo_graf.agregar_hijo($5[1]);
                                                                                nodo_graf.agregar_hijo(new NODO_GRAFICAS( "}", @1.first_line, @1.first_column, "black" ));
                                                                                lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                                                }
;

FUNCION_FOR:                  RFOR '(' DEC_O_ASIG ';' EXPRESION ';' ASIGNACION_VARIABLE ')' INSTRUCCIONES_FUNCION  {lista_temporal = []; val = new FOR($3[0],$5[0],$7[0],$9[0], @1.first_line, @1.first_column); lista_temporal.push(val);
                                                                                                                    nodo_graf = new NODO_GRAFICAS( "FUNCION FOR", @1.first_line, @1.first_column, "blue" );
                                                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "PALABRA RESERVADA: FOR", @1.first_line, @1.first_column, "blue" ));
                                                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "black" ));
                                                                                                                    nodo_graf.agregar_hijo($3[1]);
                                                                                                                    //nodo_graf.agregar_hijo(new NODO_GRAFICAS( ";", @1.first_line, @1.first_column, "black" ));
                                                                                                                    nodo_graf.agregar_hijo($5[1]);
                                                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ";", @1.first_line, @1.first_column, "black" ));
                                                                                                                    nodo_graf.agregar_hijo($7[1]);
                                                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "black" ));
                                                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "{", @1.first_line, @1.first_column, "black" ));
                                                                                                                    nodo_graf.agregar_hijo($9[1]);
                                                                                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "}", @1.first_line, @1.first_column, "black" ));
                                                                                                                    lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                                                                                    }
;

FUNCION_DO_WHILE:             RDO INSTRUCCIONES_FUNCION RWHILE'(' EXPRESION ')'   {lista_temporal = [];val = new DO_WHILE($5[0],$2[0], @1.first_line, @1.first_column);lista_temporal.push(val);
                                                                                
                                                                                nodo_graf = new NODO_GRAFICAS( "FUNCION DO WHILE", @1.first_line, @1.first_column, "blue" );
                                                                                nodo_graf.agregar_hijo(new NODO_GRAFICAS( "PALABRA RESERVADA: DO", @1.first_line, @1.first_column, "blue" ));
                                                                                nodo_graf.agregar_hijo(new NODO_GRAFICAS( "{", @1.first_line, @1.first_column, "black" ));
                                                                                nodo_graf.agregar_hijo($2[1]);
                                                                                nodo_graf.agregar_hijo(new NODO_GRAFICAS( "}", @1.first_line, @1.first_column, "black" ));
                                                                                nodo_graf.agregar_hijo(new NODO_GRAFICAS( "PALABRA RESERVADA: WHILE", @1.first_line, @1.first_column, "blue" ));
                                                                                nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "black" ));
                                                                                nodo_graf.agregar_hijo($5[1]);
                                                                                nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "black" ));
                                                                                lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                                                }
;

DEC_O_ASIG:                   ASIGNACION_VARIABLE    {lista_temporal = [];val = $1[0];lista_temporal.push(val); nodo_graf = $1[1]; lista_temporal.push(nodo_graf); $$ =lista_temporal;}
                            | DECLARACION_VARIABLE   {lista_temporal = [];val = $1[0];lista_temporal.push(val); nodo_graf = $1[1]; lista_temporal.push(nodo_graf);$$ =lista_temporal;}
;

FUNCION_SWITCH:               RSWITCH '(' EXPRESION ')' '{' CASES_SWITCH         '}'  {lista_temporal = []; val = new SWITCH($3[0],$6[0],[],@1.first_line, @1.first_column); lista_temporal.push(val);
                                                                                        nodo_graf = new NODO_GRAFICAS( "FUNCION SWITCH", @1.first_line, @1.first_column, "blue" );
                                                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( "PALABRA RESERVADA: SWITCH", @1.first_line, @1.first_column, "blue" ));
                                                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "blue" ));
                                                                                        nodo_graf.agregar_hijo( $3[1]);
                                                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "blue" ));
                                                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( "{", @1.first_line, @1.first_column, "blue" ));
                                                                                        nodo_prueba= new NODO_GRAFICAS( "LISTA CASES", @1.first_line, @1.first_column, "blue" );
                                                                                        lista_temporal_3 = $6[1];
                                                                                        for(let i = 0;i<lista_temporal_3.length;i++){console.log("CASE");nodo_prueba.agregar_hijo(lista_temporal_3[i]);}
                                                                                        nodo_graf.agregar_hijo(nodo_prueba);
                                                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( "}", @1.first_line, @1.first_column, "blue" ));
                                                                                        lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                                                        }
                            | RSWITCH '(' EXPRESION ')' '{' CASES_SWITCH DEFAULT '}'  {lista_temporal = []; val = new SWITCH($3[0],$6[0],$7[0],@1.first_line, @1.first_column); lista_temporal.push(val);
                                                                                        nodo_graf = new NODO_GRAFICAS( "FUNCION SWITCH", @1.first_line, @1.first_column, "blue" );
                                                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( "PALABRA RESERVADA: SWITCH", @1.first_line, @1.first_column, "blue" ));
                                                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "blue" ));
                                                                                        nodo_graf.agregar_hijo( $3[1]);
                                                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "blue" ));
                                                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( "{", @1.first_line, @1.first_column, "blue" ));
                                                                                        
                                                                                        
                                                                                        lista_temporal_3 = $6[1];
                                                                                        nodo_prueba= new NODO_GRAFICAS( "LISTA CASES", @1.first_line, @1.first_column, "blue" );
                                                                                        for(let i = 0;i<lista_temporal_3.length;i++){console.log("CASE");nodo_prueba.agregar_hijo(lista_temporal_3[i]);}
                                                                                        
                                                                                        nodo_graf.agregar_hijo(nodo_prueba);
                                                                                        nodo_graf.agregar_hijo($7[1]);
                                                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( "}", @1.first_line, @1.first_column, "blue" ));
                                                                                        
                                                                                        lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                                                        }
                            | RSWITCH '(' EXPRESION ')' '{'              DEFAULT '}'  {lista_temporal=[]; val = new SWITCH($3[0],[],$6[0],@1.first_line, @1.first_column); lista_temporal.push(val);
                                                                                        nodo_graf = new NODO_GRAFICAS( "FUNCION SWITCH", @1.first_line, @1.first_column, "blue" );
                                                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( "PALABRA RESERVADA: SWITCH", @1.first_line, @1.first_column, "blue" ));
                                                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "blue" ));
                                                                                        nodo_graf.agregar_hijo( $3[1]);
                                                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "blue" ));
                                                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( "{", @1.first_line, @1.first_column, "blue" ));
                                                                                        nodo_graf.agregar_hijo($6[1]);
                                                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( "}", @1.first_line, @1.first_column, "blue" ));
                                                                                        lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                                                        }


;

CASES_SWITCH: CASES_SWITCH CASE_SWITCH  {lista_temporal = $1; lista_temporal_2 = lista_temporal[0]; lista_temporal_2.push($2[0]); 
                                        lista_temporal_3 = lista_temporal[1];
                                        nodo_graf = $2[1];
                                        lista_temporal_3.push(nodo_graf);
                                        lista_temporal = [];lista_temporal.push(lista_temporal_2); lista_temporal.push(lista_temporal_3);  $$ = lista_temporal;
                                        }
            | CASE_SWITCH               {lista_temporal = [];let lstswitch = [];        lstswitch.push($1[0]);       lista_temporal.push(lstswitch);
                                        nodo_graf = $1[1];
                                        lista_temporal_3 = []; lista_temporal_3.push(nodo_graf);
                                        lista_temporal.push(lista_temporal_3); $$ = lista_temporal;
                                        }
;
CASE_SWITCH: RCASE EXPRESION ':'  INSTRUCCIONES_SWITCH  {lista_temporal = []; val = new CASE($2[0],$4[0], @1.first_line, @1.first_column); lista_temporal.push(val);
                                                        nodo_graf = new NODO_GRAFICAS( "CASE", @1.first_line, @1.first_column, "blue" );
                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( "PALABRA RESERVADA: CASE", @1.first_line, @1.first_column, "blue" ));
                                                        nodo_graf.agregar_hijo($2[1]);
                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( ":", @1.first_line, @1.first_column, "blue" ));
                                                        nodo_prueba = new NODO_GRAFICAS( "INSTRUCCIONES", @1.first_line, @1.first_column, "blue" );
                                                        lista_temporal_3 = $4[1];
                                                        for(let i = 0; i<lista_temporal_3.length;i++){nodo_prueba.agregar_hijo(lista_temporal_3[i])}
                                                        nodo_graf.agregar_hijo(nodo_prueba);
                                                        lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                        }
;

DEFAULT: RDEFAULT ':'  INSTRUCCIONES_SWITCH      {lista_temporal = []; val = $3[0]; lista_temporal.push(val);

                                                    nodo_graf = new NODO_GRAFICAS( "DEFAULT", @1.first_line, @1.first_column, "blue" );
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "PALABRA RESERVADA: DEFAULT", @1.first_line, @1.first_column, "blue" ));
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ":", @1.first_line, @1.first_column, "blue" ));
                                                    nodo_prueba = new NODO_GRAFICAS( "INSTRUCCIONES", @1.first_line, @1.first_column, "blue" );
                                                    lista_temporal_3 = $3[1];
                                                    for(let i = 0; i<lista_temporal_3.length;i++){nodo_prueba.agregar_hijo(lista_temporal_3[i])}
                                                    nodo_graf.agregar_hijo(nodo_prueba);
                                                    lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                    }            
;

INSTRUCCIONES_SWITCH:     instrucciones    {lista_temporal = []; val = $1[0]; lista_temporal.push(val);
                                            lista_temporal_3 = $1[1];
                                            lista_temporal.push(lista_temporal_3); $$ = lista_temporal;
                                            }
                        |                  {lista_temporal = []; val = []; lista_temporal.push(val)
                                            lista_temporal_3 = []
                                            lista_temporal.push(lista_temporal_3); $$ = lista_temporal;
                                            }
;  

SENTENCIA_BREAK:    RBREAK ';'              {lista_temporal = []; val = new SENT_BREAK(@1.first_line, @1.first_column);lista_temporal.push(val);
                                            nodo_graf = new NODO_GRAFICAS( "BREAK", @1.first_line, @1.first_column, "blue" );
                                            nodo_graf.agregar_hijo(new NODO_GRAFICAS( "PALABRA RESERVADA: BREAK", @1.first_line, @1.first_column, "blue" ));
                                            nodo_graf.agregar_hijo(new NODO_GRAFICAS( ";", @1.first_line, @1.first_column, "blue" ));
                                            lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                            }
;
SENTENCIA_CONTINUE:    RCONTINUE ';'        {lista_temporal = []; val = new SENT_CONTINUE(@1.first_line, @1.first_column);lista_temporal.push(val);
                                            nodo_graf = new NODO_GRAFICAS( "CONTINUE", @1.first_line, @1.first_column, "blue" );
                                            nodo_graf.agregar_hijo(new NODO_GRAFICAS( "PALABRA RESERVADA: CONTINUE", @1.first_line, @1.first_column, "blue" ));
                                            nodo_graf.agregar_hijo(new NODO_GRAFICAS( ";", @1.first_line, @1.first_column, "blue" ));
                                            lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                            }
;
SENTENCIA_RETURN:    RRETURN EXPRESION ';'            {lista_temporal = []; val = new SENT_RETURN($2[0], @1.first_line, @1.first_column);lista_temporal.push(val);
                                            nodo_graf = new NODO_GRAFICAS( "RETURN", @1.first_line, @1.first_column, "blue" );
                                            nodo_graf.agregar_hijo(new NODO_GRAFICAS( "PALABRA RESERVADA: RETURN", @1.first_line, @1.first_column, "blue" ));
                                            nodo_graf.agregar_hijo($2[1]);   
                                            nodo_graf.agregar_hijo(new NODO_GRAFICAS( ";", @1.first_line, @1.first_column, "blue" ));
                                            lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                            }
;

TIPO    :       RINT          { val = new Tipo(TIPO_DATO.INT);     nodo_graf = new NODO_GRAFICAS( "TIPO", @1.first_line, @1.first_column, "skyblue" );    nodo_prueba = new NODO_GRAFICAS( "INT", @1.first_line, @1.first_column, "black" );    nodo_graf.agregar_hijo(nodo_prueba);  lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal}
        |       RBOOLEAN      { val = new Tipo(TIPO_DATO.BOOLEAN); nodo_graf = new NODO_GRAFICAS( "TIPO", @1.first_line, @1.first_column, "skyblue" );    nodo_prueba = new NODO_GRAFICAS( "BOOLEAN", @1.first_line, @1.first_column, "black" );    nodo_graf.agregar_hijo(nodo_prueba);  lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal}
        |       RSTRING       { val = new Tipo(TIPO_DATO.STRING);  nodo_graf = new NODO_GRAFICAS( "TIPO", @1.first_line, @1.first_column, "skyblue" );    nodo_prueba = new NODO_GRAFICAS( "STRING", @1.first_line, @1.first_column, "black" );    nodo_graf.agregar_hijo(nodo_prueba);  lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal}
        |       RDOUBLE       { val = new Tipo(TIPO_DATO.DOUBLE);  nodo_graf = new NODO_GRAFICAS( "TIPO", @1.first_line, @1.first_column, "skyblue" );    nodo_prueba = new NODO_GRAFICAS( "DOUBLE", @1.first_line, @1.first_column, "black" );    nodo_graf.agregar_hijo(nodo_prueba);  lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal}
        |       RCHAR         { val = new Tipo(TIPO_DATO.CHAR);    nodo_graf = new NODO_GRAFICAS( "TIPO", @1.first_line, @1.first_column, "skyblue" );    nodo_prueba = new NODO_GRAFICAS( "CHAR", @1.first_line, @1.first_column, "black" );    nodo_graf.agregar_hijo(nodo_prueba);  lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal}
; 

EXPRESION :   EXPRESION '+' EXPRESION               {val = new OPERACIONES($1[0], $2, $3[0], @2.first_line, @2.first_column);      nodo_graf = new NODO_GRAFICAS( "OPERACION ARITMETICA", @1.first_line, @1.first_column, "skyblue" );lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal
                                                    nodo_graf.agregar_hijo($1[1]);nodo_graf.agregar_hijo(new NODO_GRAFICAS( "+", @1.first_line, @1.first_column, "black" ));nodo_graf.agregar_hijo($3[1]);
                                                    }
    |   EXPRESION '-' EXPRESION                     {val = new OPERACIONES($1[0], $2, $3[0], @2.first_line, @2.first_column);      nodo_graf = new NODO_GRAFICAS( "OPERACION ARITMETICA", @1.first_line, @1.first_column, "skyblue" );lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal
                                                    nodo_graf.agregar_hijo($1[1]);nodo_graf.agregar_hijo(new NODO_GRAFICAS( "-", @1.first_line, @1.first_column, "black" ));nodo_graf.agregar_hijo($3[1]);
                                                    }
    |   EXPRESION '*' EXPRESION                     {val = new OPERACIONES($1[0], $2, $3[0], @2.first_line, @2.first_column);      nodo_graf = new NODO_GRAFICAS( "OPERACION ARITMETICA", @1.first_line, @1.first_column, "skyblue" );lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal
                                                    nodo_graf.agregar_hijo($1[1]);nodo_graf.agregar_hijo(new NODO_GRAFICAS( "*", @1.first_line, @1.first_column, "black" ));nodo_graf.agregar_hijo($3[1]);
                                                    }
    |   EXPRESION '/' EXPRESION                     {val = new OPERACIONES($1[0], $2, $3[0], @2.first_line, @2.first_column);      nodo_graf = new NODO_GRAFICAS( "OPERACION ARITMETICA", @1.first_line, @1.first_column, "skyblue" );lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal
                                                    nodo_graf.agregar_hijo($1[1]);nodo_graf.agregar_hijo(new NODO_GRAFICAS( "/", @1.first_line, @1.first_column, "black" ));nodo_graf.agregar_hijo($3[1]);
                                                    }
    |   EXPRESION '^' EXPRESION                     {val = new OPERACIONES($1[0], $2, $3[0], @2.first_line, @2.first_column);      nodo_graf = new NODO_GRAFICAS( "OPERACION ARITMETICA", @1.first_line, @1.first_column, "skyblue" );lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal
                                                    nodo_graf.agregar_hijo($1[1]);nodo_graf.agregar_hijo(new NODO_GRAFICAS( "^", @1.first_line, @1.first_column, "black" ));nodo_graf.agregar_hijo($3[1]);
                                                    }
    |   EXPRESION '%' EXPRESION                     {val = new OPERACIONES($1[0], $2, $3[0], @2.first_line, @2.first_column);      nodo_graf = new NODO_GRAFICAS( "OPERACION ARITMETICA", @1.first_line, @1.first_column, "skyblue" );lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal
                                                    nodo_graf.agregar_hijo($1[1]);nodo_graf.agregar_hijo(new NODO_GRAFICAS( "%", @1.first_line, @1.first_column, "black" ));nodo_graf.agregar_hijo($3[1]);
                                                    }
    |   '-' EXPRESION %prec negativo                {val = new OPERACION_UNARIA($1, $2[0], @2.first_line, @2.first_column);        nodo_graf = new NODO_GRAFICAS( "EXPRESION", @1.first_line, @1.first_column, "skyblue" );lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "-", @1.first_line, @1.first_column, "black" ));nodo_graf.agregar_hijo($2[1]);
                                                    }
    |   '(' EXPRESION ')'                           {val = $2[0];                                                                  nodo_graf = new NODO_GRAFICAS( "EXPRESION", @1.first_line, @1.first_column, "skyblue" );lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "black" ));
                                                    nodo_graf.agregar_hijo($2[1]);
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "black" ));
                                                    }
    |   EXPRESION '=='  EXPRESION                   {val = new OPERACIONES($1[0], $2, $3[0], @2.first_line, @2.first_column);      nodo_graf = new NODO_GRAFICAS( "OPERACION RELACIONAL", @1.first_line, @1.first_column, "orange" );lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal
                                                    nodo_graf.agregar_hijo($1[1]);
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "==", @1.first_line, @1.first_column, "black" ));
                                                    nodo_graf.agregar_hijo($3[1]);
                                                    }
    |   EXPRESION '!='  EXPRESION                   {val = new OPERACIONES($1[0], $2, $3[0], @2.first_line, @2.first_column);      nodo_graf = new NODO_GRAFICAS( "OPERACION RELACIONAL", @1.first_line, @1.first_column, "orange" );lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal
                                                    nodo_graf.agregar_hijo($1[1]);
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "!=", @1.first_line, @1.first_column, "black" ));
                                                    nodo_graf.agregar_hijo($3[1]);
                                                    }
    |   EXPRESION '<'   EXPRESION                   {val = new OPERACIONES($1[0], $2, $3[0], @2.first_line, @2.first_column);      nodo_graf = new NODO_GRAFICAS( "OPERACION RELACIONAL", @1.first_line, @1.first_column, "orange" );lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal
                                                    nodo_graf.agregar_hijo($1[1]);
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "<", @1.first_line, @1.first_column, "black" ));
                                                    nodo_graf.agregar_hijo($3[1]);
                                                    }
    |   EXPRESION '>'   EXPRESION                   {val = new OPERACIONES($1[0], $2, $3[0], @2.first_line, @2.first_column);      nodo_graf = new NODO_GRAFICAS( "OPERACION RELACIONAL", @1.first_line, @1.first_column, "orange" );lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal
                                                    nodo_graf.agregar_hijo($1[1]);
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ">", @1.first_line, @1.first_column, "black" ));
                                                    nodo_graf.agregar_hijo($3[1]);
                                                    }
    |   EXPRESION '<='  EXPRESION                   {val = new OPERACIONES($1[0], $2, $3[0], @2.first_line, @2.first_column);      nodo_graf = new NODO_GRAFICAS( "OPERACION RELACIONAL", @1.first_line, @1.first_column, "orange" );lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal
                                                    nodo_graf.agregar_hijo($1[1]);
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "<=", @1.first_line, @1.first_column, "black" ));
                                                    nodo_graf.agregar_hijo($3[1]);
                                                    }
    |   EXPRESION '>='  EXPRESION                   {val = new OPERACIONES($1[0], $2, $3[0], @2.first_line, @2.first_column);      nodo_graf = new NODO_GRAFICAS( "OPERACION RELACIONAL", @1.first_line, @1.first_column, "orange" );lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal
                                                    nodo_graf.agregar_hijo($1[1]);
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ">=", @1.first_line, @1.first_column, "black" ));
                                                    nodo_graf.agregar_hijo($3[1]);
                                                    }
    |   EXPRESION '||'  EXPRESION                   {val = new OPERACIONES($1[0], $2, $3[0], @2.first_line, @2.first_column);      nodo_graf = new NODO_GRAFICAS( "OPERACION LOGICA", @1.first_line, @1.first_column, "red" );lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal
                                                    nodo_graf.agregar_hijo($1[1]);
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "||", @1.first_line, @1.first_column, "black" ));
                                                    nodo_graf.agregar_hijo($3[1]);
                                                    }
    |   EXPRESION '&&'  EXPRESION                   {val = new OPERACIONES($1[0], $2, $3[0], @2.first_line, @2.first_column);      nodo_graf = new NODO_GRAFICAS( "OPERACION LOGICA", @1.first_line, @1.first_column, "red" );lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal
                                                    nodo_graf.agregar_hijo($1[1]);
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "&&", @1.first_line, @1.first_column, "black" ));
                                                    nodo_graf.agregar_hijo($3[1]);
                                                    }
    |   '!'  EXPRESION                              {val = new OPERACION_UNARIA($1, $2[0], @2.first_line, @2.first_column);        nodo_graf = new NODO_GRAFICAS( "OPERACION LOGICA", @1.first_line, @1.first_column, "red" );lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "!", @1.first_line, @1.first_column, "black" ));
                                                    nodo_graf.agregar_hijo($2[1]);
                                                    }
    |   EXPRESION '++'                              {lista_temporal = []; val = new OPERACION_UNARIA($2, $1[0], @2.first_line, @2.first_column); lista_temporal.push(val);        
                                                    //console.log("si hago la operacion");
                                                    nodo_graf = new NODO_GRAFICAS( "INCREMENTO", @1.first_line, @1.first_column, "blue" );
                                                    //nodo_graf.agregar_hijo($1[1]);
                                                    //nodo_graf.agregar_hijo(new NODO_GRAFICAS( "++", @1.first_line, @1.first_column, "black" ));
                                                    lista_temporal.push(nodo_graf); $$= lista_temporal;
                                                    }

    |   EXPRESION '--'                              {lista_temporal = []; val = new OPERACION_UNARIA($2, $1[0], @2.first_line, @2.first_column);lista_temporal.push(val);        
                                                    nodo_graf = new NODO_GRAFICAS( "DECREMENTO", @1.first_line, @1.first_column, "blue" );
                                                    nodo_graf.agregar_hijo($1[1]);
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "--", @1.first_line, @1.first_column, "black" ));
                                                    lista_temporal.push(nodo_graf); $$= lista_temporal;
                                                    }
    |   RTOLOWER '(' EXPRESION ')'                  {lista_temporal = []; val = new TO_LOWER($3[0],@1.first_line, @1.first_column); lista_temporal.push(val);
                                                    nodo_graf = new NODO_GRAFICAS( "TOLOWER", @1.first_line, @1.first_column, "blue" );
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "PALABRA RESERVADA: TOLOWER", @1.first_line, @1.first_column, "blue" ))
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "blue" ))
                                                    nodo_graf.agregar_hijo($3[1]);
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "blue" ))
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ";", @1.first_line, @1.first_column, "blue" ))
                                                    lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                    }
    |   RTOUPPER '(' EXPRESION ')'                  {lista_temporal = []; val = new TO_UPPER($3[0],@1.first_line, @1.first_column); lista_temporal.push(val);
                                                    nodo_graf = new NODO_GRAFICAS( "TOUPPER", @1.first_line, @1.first_column, "blue" );
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "PALABRA RESERVADA: TOUPPER", @1.first_line, @1.first_column, "blue" ))
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "blue" ))
                                                    nodo_graf.agregar_hijo($3[1]);
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "blue" ))
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ";", @1.first_line, @1.first_column, "blue" ))
                                                    lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                    }
    |   RLENGTH '(' EXPRESION ')'                  {lista_temporal = []; val = new LENGHT($3[0],@1.first_line, @1.first_column); lista_temporal.push(val);
                                                    nodo_graf = new NODO_GRAFICAS( "LENGTH", @1.first_line, @1.first_column, "skyblue" );
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "PALABRA RESERVADA: LENGTH", @1.first_line, @1.first_column, "skyblue" ))
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "skyblue" ))
                                                    nodo_graf.agregar_hijo($3[1]);
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "skyblue" ))
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ";", @1.first_line, @1.first_column, "skyblue" ))
                                                    lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                    }
    |   RTRUNCATE '(' EXPRESION ')'                  {lista_temporal = []; val = new TRUNCATE($3[0],@1.first_line, @1.first_column); lista_temporal.push(val);
                                                    nodo_graf = new NODO_GRAFICAS( "TRUNCATE", @1.first_line, @1.first_column, "skyblue" );
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "PALABRA RESERVADA: TRUNCATE", @1.first_line, @1.first_column, "skyblue" ))
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "skyblue" ))
                                                    nodo_graf.agregar_hijo($3[1]);
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "skyblue" ))
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ";", @1.first_line, @1.first_column, "skyblue" ))
                                                    lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                    }
    |   RROUND '(' EXPRESION ')'                    {lista_temporal = []; val = new ROUND($3[0],@1.first_line, @1.first_column); lista_temporal.push(val);
                                                    nodo_graf = new NODO_GRAFICAS( "ROUND", @1.first_line, @1.first_column, "skyblue" );
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "PALABRA RESERVADA: ROUND", @1.first_line, @1.first_column, "skyblue" ))
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "skyblue" ))
                                                    nodo_graf.agregar_hijo($3[1]);
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "skyblue" ))
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ";", @1.first_line, @1.first_column, "skyblue" ))
                                                    lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                    }
    |   RTYPEOF '(' EXPRESION ')'                    {lista_temporal = []; val = new TYPEOF($3[0],@1.first_line, @1.first_column); lista_temporal.push(val);
                                                    nodo_graf = new NODO_GRAFICAS( "TYPEOF", @1.first_line, @1.first_column, "skyblue" );
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "PALABRA RESERVADA: TYPEOF", @1.first_line, @1.first_column, "skyblue" ))
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "skyblue" ))
                                                    nodo_graf.agregar_hijo($3[1]);
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "skyblue" ))
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ";", @1.first_line, @1.first_column, "skyblue" ))
                                                    lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                    }
    |   RTOSTRING '(' EXPRESION ')'                 {lista_temporal = []; val = new TOSTRING($3[0],@1.first_line, @1.first_column); lista_temporal.push(val);
                                                    nodo_graf = new NODO_GRAFICAS( "TOSTRING", @1.first_line, @1.first_column, "skyblue" );
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "PALABRA RESERVADA: TOSTRING", @1.first_line, @1.first_column, "skyblue" ))
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "skyblue" ))
                                                    nodo_graf.agregar_hijo($3[1]);
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "skyblue" ))
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ";", @1.first_line, @1.first_column, "skyblue" ))
                                                    lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                    }
    |   '(' RINT ')' EXPRESION                      {val = new CASTEOS("INT", $4[0], @2.first_line, @2.first_column);              nodo_graf = new NODO_GRAFICAS( "CASTEO", @1.first_line, @1.first_column, "green" );lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "black" ));
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "INT", @1.first_line, @1.first_column, "black" ));
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "black" ));
                                                    nodo_graf.agregar_hijo($4[1]);
                                                    }
    |   '(' RDOUBLE ')' EXPRESION                   {val = new CASTEOS("DOUBLE", $4[0], @2.first_line, @2.first_column);           nodo_graf = new NODO_GRAFICAS( "CASTEO", @1.first_line, @1.first_column, "green" );lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "black" ));
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "DOUBLE", @1.first_line, @1.first_column, "black" ));
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "black" ));
                                                    nodo_graf.agregar_hijo($4[1]);
                                                    }
    |   '(' RCHAR ')' EXPRESION                     {val = new CASTEOS("CHAR", $4[0], @2.first_line, @2.first_column);             nodo_graf = new NODO_GRAFICAS( "CASTEO", @1.first_line, @1.first_column, "green" );lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "black" ));
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "CHAR", @1.first_line, @1.first_column, "black" ));
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "black" ));
                                                    nodo_graf.agregar_hijo($4[1]);
                                                    }
    |   '(' RSTRING ')' EXPRESION                   {val = new CASTEOS("STRING", $4[0], @2.first_line, @2.first_column);           nodo_graf = new NODO_GRAFICAS( "CASTEO", @1.first_line, @1.first_column, "green" );lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "black" ));
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "STRING", @1.first_line, @1.first_column, "black" ));
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "black" ));
                                                    nodo_graf.agregar_hijo($4[1]);
                                                    }
    |   EXPRESION '?' EXPRESION ':' EXPRESION       {lista_temporal = []; val = new OPERACION_TERNARIA($1[0], $3[0], $5[0], @2.first_line, @2.first_column); lista_temporal.push(val);
                                                    nodo_graf = new NODO_GRAFICAS( "OPERACION TERNARIA", @1.first_line, @1.first_column, "skyblue" );
                                                    nodo_graf.agregar_hijo($1[1]);
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( "?", @1.first_line, @1.first_column, "skyblue" ));
                                                    nodo_graf.agregar_hijo($3[1]);
                                                    nodo_graf.agregar_hijo(new NODO_GRAFICAS( ":", @1.first_line, @1.first_column, "skyblue" ));
                                                    nodo_graf.agregar_hijo($5[1]);
                                                    lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                    }
    |   id '('PARAMETROS_LLAMADA')'             {lista_temporal = []; val = new LLAMADA_METODO_EXP($1,$3[0], @1.first_line, @1.first_column);lista_temporal.push(val);
                                                                        nodo_graf = new NODO_GRAFICAS( "LLAMADA METODO O FUNCION", @1.first_line, @1.first_column, "gray" );
                                                                        nodo_prueba=new NODO_GRAFICAS( "ID", @1.first_line, @1.first_column, "black" );
                                                                        nodo_prueba.agregar_hijo(new NODO_GRAFICAS( $1, @1.first_line, @1.first_column, "black" ))
                                                                        nodo_graf.agregar_hijo(nodo_prueba);
                                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "black" ));
                                                                        nodo_prueba=new NODO_GRAFICAS( "PARAMETROS", @1.first_line, @1.first_column, "black" );
                                                                        lista_temporal_3 = $3[1]; for(let i = 0; i< lista_temporal_3.length;i++){nodo_prueba.agregar_hijo(lista_temporal_3[i]);if(i!=lista_temporal.length){nodo_prueba.agregar_hijo(new NODO_GRAFICAS( ",", @1.first_line, @1.first_column, "black" ));}}
                                                                        nodo_graf.agregar_hijo(nodo_prueba);
                                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "black" ));
                                                                        lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                                        }
                            | id '('')'                               {lista_temporal = []; val = new LLAMADA_METODO_EXP($1,[], @1.first_line, @1.first_column);lista_temporal.push(val);
                                                                        nodo_graf = new NODO_GRAFICAS( "LLAMADA METODO O FUNCION", @1.first_line, @1.first_column, "gray" );
                                                                        nodo_prueba=new NODO_GRAFICAS( "ID", @1.first_line, @1.first_column, "black" );
                                                                        nodo_prueba.agregar_hijo(new NODO_GRAFICAS( $1, @1.first_line, @1.first_column, "black" ))
                                                                        nodo_graf.agregar_hijo(nodo_prueba);
                                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( "(", @1.first_line, @1.first_column, "black" ));
                                                                        nodo_graf.agregar_hijo(new NODO_GRAFICAS( ")", @1.first_line, @1.first_column, "black" ));
                                                                        lista_temporal.push(nodo_graf); $$ = lista_temporal;
                                                                        }

    |   id                                          {val = new VALIDAR_EXISTE_VARIABLE($1,@1.first_line,@1.first_column);          nodo_graf = new NODO_GRAFICAS( "EXPRESION", @1.first_line, @1.first_column, "skyblue" );     nodo_prueba = new NODO_GRAFICAS( "VARIABLE", @1.first_line, @1.first_column, "skyblue" );nodo_prueba.agregar_hijo(new NODO_GRAFICAS( $1, @1.first_line, @1.first_column, "black" )); nodo_graf.agregar_hijo(nodo_prueba);lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal}
    |   id '['EXPRESION']'                          {val = new VALIDAR_EXISTE_VECTOR($1,$3[0],@1.first_line,@1.first_column);      nodo_graf = new NODO_GRAFICAS( "EXPRESION", @1.first_line, @1.first_column, "skyblue" );     nodo_graf.agregar_hijo(new NODO_GRAFICAS( $1, @1.first_line, @1.first_column, "black" ));lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal}
    |   ENTERO                                      {val = new Valor($1,"INT",@1.first_line,@1.first_column);                      nodo_graf = new NODO_GRAFICAS( "EXPRESION", @1.first_line, @1.first_column, "skyblue" );     nodo_graf.agregar_hijo(new NODO_GRAFICAS( $1, @1.first_line, @1.first_column, "black" ));lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal}
    |   DECIMAL                                     {val = new Valor($1,"DOUBLE",@1.first_line,@1.first_column);                   nodo_graf = new NODO_GRAFICAS( "EXPRESION", @1.first_line, @1.first_column, "skyblue" );     nodo_graf.agregar_hijo(new NODO_GRAFICAS( $1, @1.first_line, @1.first_column, "black" ));lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal}
    |   CARACTER                                    {val = new Valor($1,"CHAR",@1.first_line,@1.first_column);                     nodo_graf = new NODO_GRAFICAS( "EXPRESION", @1.first_line, @1.first_column, "skyblue" );     nodo_graf.agregar_hijo(new NODO_GRAFICAS( $1, @1.first_line, @1.first_column, "black" ));lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal}
    |   CADENA                                      {val = new Valor($1,"STRING",@1.first_line,@1.first_column);                   nodo_graf = new NODO_GRAFICAS( "EXPRESION", @1.first_line, @1.first_column, "skyblue" );     nodo_graf.agregar_hijo(new NODO_GRAFICAS( $1, @1.first_line, @1.first_column, "black" ));lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal}
    |   RTRUE                                       {val = new Valor($1,"true",@1.first_line,@1.first_column);                     nodo_graf = new NODO_GRAFICAS( "EXPRESION", @1.first_line, @1.first_column, "skyblue" );     nodo_graf.agregar_hijo(new NODO_GRAFICAS( "TRUE", @1.first_line, @1.first_column, "black" ));lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal   }
    |   RFALSE                                      {val = new Valor($1,"false",@1.first_line,@1.first_column);                    nodo_graf = new NODO_GRAFICAS( "EXPRESION", @1.first_line, @1.first_column, "skyblue" );     nodo_graf.agregar_hijo(new NODO_GRAFICAS( "FALSE", @1.first_line, @1.first_column, "black" )); lista_temporal = [];lista_temporal.push(val); lista_temporal.push(nodo_graf); $$= lista_temporal}
;
