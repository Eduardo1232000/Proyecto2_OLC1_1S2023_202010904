/* CODIGO EN JAVASCRIPT PARA ANALIZADOR LEXICO */
/* ------------------------------------------------- */
%{
    var lexico=[];
    module.exports.lexico = lexico;

    let LISTA_EJECUCIONES           =   require("./src/arbol/LISTA_EJECUCIONES").LISTA_EJECUCIONES;
    let Tipo                        =   require("./src/arbol/Tipo").Tipo;
    let TIPO_DATO                   =   require("./src/arbol/Tipo").TIPO_DATO;
    let DECLARACION_VARIABLE        =   require("./src/instrucciones/VARIABLES").DECLARACION_VARIABLE; 
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
    let OPERACION_TERNARIA          =   require("./src/instrucciones/OPERACION_TERNARIA").OPERACION_TERNARIA;
    let CASTEOS                     =   require("./src/instrucciones/CASTEOS").CASTEOS;
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
([a-zA-ZÑñ]|("_"[a-zA-ZÑñ]))([a-zA-ZÑñ]|[0-9]|"_")*             yytext = yytext.toLowerCase();          return 'id';
\"(?:[{corchete_abre}|{corchete_cierra}]|["\\"]["bnrt/["\\"]]|[^"["\\"])*\"         yytext = yytext.substr(1,yyleng-2);     return 'CADENA';
\'(?:{doblediagonal}["bfnrt/{doblediagonal}]|{doblediagonal}"u"[a-fA-F0-9]{4}|[^"{doblediagonal}])\'    yytext = yytext.substr(1,yyleng-2);     return 'CARACTER'
{int}{frac}\b                                                                                           return 'DECIMAL'
{int}\b                                                                                                 return 'ENTERO'
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
                            let raiz = $1
                            $$ = raiz;
                            return raiz;
                        }
;

instrucciones :    instrucciones instruccion        {$1.push($2);  $$ = $1;}
            |      instruccion {   let lstsent = [];        lstsent.push($1);       $$ = lstsent;}
;

instruccion :   DECLARACION_VARIABLE ';'    { $$ = $1; }
            |   DECLARACION_VECTORES ';'    { $$ = $1; }
            |   ASIGNACION_VARIABLE  ';'    { $$ = $1; }
            |   ASIGNACION_VECTORES         { $$ = $1; }
            |   FUNCION_IF                  { $$ = $1; }
            |   FUNCION_PRINT ';'           { $$ = $1; }
            |   FUNCION_WHILE               { $$ = $1; }
            |   FUNCION_FOR                 { $$ = $1; }
            |   FUNCION_DO_WHILE ';'        { $$ = $1; }
            |   error PTCOMA                {console.error('Este es un error SINTACTICO');}
            |   error                       {console.error('Este es un error SINTACTICO');}
;       


DECLARACION_VARIABLE :    TIPO  id  '=' EXPRESION  {$$ = new DECLARACION_VARIABLE($1, $2, $4, @2.first_line, @2.first_column);}
                        | TIPO  id           {$$ = new DECLARACION_VARIABLE($1, $2, undefined, @2.first_line, @2.first_column); }
                        | TIPO  id  '=' EXPRESION_IF {$$ = new DECLARACION_VARIABLE($1, $2, $4, @2.first_line, @2.first_column);}
;
DECLARACION_VECTORES:   TIPO '[' ']' id '=' 'RNEW' TIPO '['EXPRESION']' {$$ = new DECLARACION_VECTOR_TIPO1($1, $4, [],$9,@4.first_line,@4.first_column );}
                       |TIPO '[' ']' id '=' '{' LISTA_EXPRESIONES '}'   {$$ = new DECLARACION_VECTOR_TIPO1($1, $4, $7,0,@4.first_line,@4.first_column );}
;   
LISTA_EXPRESIONES:  LISTA_EXPRESIONES ',' EXPRESION {$1.push($3);  $$ = $1;}
                    | EXPRESION                     {   let lstexp = [];        lstexp.push($1);       $$ = lstexp;}
                    
                                     
;


ASIGNACION_VARIABLE  :    id '=' EXPRESION       { $$ = new ASIGNACION_VARIABLE($1, $3, @1.first_line, @1.first_column);}
                         |id '=' EXPRESION_IF    { $$ = new ASIGNACION_VARIABLE($1, $3, @1.first_line, @1.first_column);}
                         |id '++'                { $$ = new VALIDAR_EXISTE_VARIABLE($1,@1.first_line,@1.first_column);
                                                   $$ = new OPERACION_UNARIA($2, $$, @2.first_line, @2.first_column);
                                                   $$ = new ASIGNACION_VARIABLE($1,$$, @1.first_line, @1.first_column);}
                         |id '--'                { $$ = new VALIDAR_EXISTE_VARIABLE($1,@1.first_line,@1.first_column);
                                                   $$ = new OPERACION_UNARIA($2, $$, @2.first_line, @2.first_column);
                                                   $$ = new ASIGNACION_VARIABLE($1,$$, @1.first_line, @1.first_column);}
;
ASIGNACION_VECTORES :   id '[' EXPRESION ']' '=' EXPRESION ';'  { $$ = new ASIGNACION_VECTOR($1, $3, $6, @1.first_line, @1.first_column);}
;

EXPRESION_IF: EXPRESION '?' EXPRESION ':' EXPRESION {$$ = new OPERACION_TERNARIA($1, $3, $5, @2.first_line, @2.first_column); }
;

INSTRUCCIONES_FUNCION:  '{'instrucciones'}'{$$ = $2;}
                        |'{''}' {$$ = [];}
;

FUNCION_IF: RIF '(' EXPRESION ')' INSTRUCCIONES_FUNCION                             {$$ = new IF($3, $5, [], @1.first_line, @1.first_column);}
           |RIF '(' EXPRESION ')' INSTRUCCIONES_FUNCION RELSE INSTRUCCIONES_FUNCION {$$ = new IF($3, $5, $7, @1.first_line, @1.first_column);}
           |RIF '(' EXPRESION ')' INSTRUCCIONES_FUNCION RELSE IF                    {let funcion_else_if = [];
                                                                                    funcion_else_if.push($7);
                                                                                    $$ = funcion_else_if;}                       
;

FUNCION_PRINT: RPRINT '('EXPRESION')'   {$$ = new PRINT($3, @1.first_line, @1.first_column);}
;

FUNCION_WHILE: RWHILE '(' EXPRESION ')'  INSTRUCCIONES_FUNCION  {$$ = new WHILE($3,$5, @1.first_line, @1.first_column);}
;

FUNCION_FOR: RFOR '(' DEC_O_ASIG ';' EXPRESION ';' ASIGNACION_VARIABLE ')' INSTRUCCIONES_FUNCION  {$$ = new FOR($3,$5,$7,$9, @1.first_line, @1.first_column); }
;

FUNCION_DO_WHILE: RDO INSTRUCCIONES_FUNCION RWHILE'(' EXPRESION ')'   {$$ = new DO_WHILE($5,$2, @1.first_line, @1.first_column);}
;
DEC_O_ASIG:  ASIGNACION_VARIABLE    {$$ = $1}
            |DECLARACION_VARIABLE   {$$ = $1}
;

TIPO    :       RINT          { $$ = new Tipo(TIPO_DATO.INT); }
        |       RBOOLEAN      { $$ = new Tipo(TIPO_DATO.BOOLEAN); }
        |       RSTRING       { $$ = new Tipo(TIPO_DATO.STRING);  }
        |       RDOUBLE       { $$ = new Tipo(TIPO_DATO.DOUBLE);  }
; 

EXPRESION :   EXPRESION '+' EXPRESION               {$$ = new OPERACIONES($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXPRESION '-' EXPRESION                     {$$ = new OPERACIONES($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXPRESION '*' EXPRESION                     {$$ = new OPERACIONES($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXPRESION '/' EXPRESION                     {$$ = new OPERACIONES($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXPRESION '^' EXPRESION                     {$$ = new OPERACIONES($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXPRESION '%' EXPRESION                     {$$ = new OPERACIONES($1, $2, $3, @2.first_line, @2.first_column);}
    |   '-' EXPRESION %prec negativo                {$$ = new OPERACION_UNARIA($1, $2, @2.first_line, @2.first_column);}
    |   '(' EXPRESION ')'                           {$$ = $2;}
    |   EXPRESION '=='  EXPRESION                   {$$ = new OPERACIONES($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXPRESION '!='  EXPRESION                   {$$ = new OPERACIONES($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXPRESION '<'   EXPRESION                   {$$ = new OPERACIONES($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXPRESION '>'   EXPRESION                   {$$ = new OPERACIONES($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXPRESION '<='  EXPRESION                   {$$ = new OPERACIONES($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXPRESION '>='  EXPRESION                   {$$ = new OPERACIONES($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXPRESION '||'  EXPRESION                   {$$ = new OPERACIONES($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXPRESION '&&'  EXPRESION                   {$$ = new OPERACIONES($1, $2, $3, @2.first_line, @2.first_column);}
    |   '!'  EXPRESION                              {$$ = new OPERACION_UNARIA($1, $2, @2.first_line, @2.first_column);}
    |   EXPRESION '++'                              {$$ = new OPERACION_UNARIA($2, $1, @2.first_line, @2.first_column);}
    |   EXPRESION '--'                              {$$ = new OPERACION_UNARIA($2, $1, @2.first_line, @2.first_column);}
    |   '(' RINT ')' EXPRESION                      {$$ = new CASTEOS("INT", $4, @2.first_line, @2.first_column);}
    |   '(' RDOUBLE ')' EXPRESION                   {$$ = new CASTEOS("DOUBLE", $4, @2.first_line, @2.first_column);}
    |   '(' RCHAR ')' EXPRESION                     {$$ = new CASTEOS("CHAR", $4, @2.first_line, @2.first_column);}
    |   '(' RSTRING ')' EXPRESION                   {$$ = new CASTEOS("STRING", $4, @2.first_line, @2.first_column);}
    |   id                              {$$ = new VALIDAR_EXISTE_VARIABLE($1,@1.first_line,@1.first_column);}
    |   id '['EXPRESION']'              {$$ = new VALIDAR_EXISTE_VECTOR($1,$3,@1.first_line,@1.first_column);}
    |   ENTERO                          {$$ = new Valor($1,"INT",@1.first_line,@1.first_column);}
    |   DECIMAL                         {$$ = new Valor($1,"DOUBLE",@1.first_line,@1.first_column); }
    |   CARACTER                        {$$ = new Valor($1,"CHAR",@1.first_line,@1.first_column);   }
    |   CADENA                          {$$ = new Valor($1,"STRING",@1.first_line,@1.first_column); }
    |   RTRUE                           {$$ = new Valor($1,"true",@1.first_line,@1.first_column);   }
    |   RFALSE                          {$$ = new Valor($1,"false",@1.first_line,@1.first_column);  }
;
