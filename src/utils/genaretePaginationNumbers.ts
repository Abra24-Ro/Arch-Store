

export const generatePaginationNumbers = (currentPage:number,totalPages:number)=> {
    //* si el numero total de paginas es 7 0 menos 
    //**vamos a mostrar todas las paginas sin puntos suspensivos */

    if(totalPages <= 6) {
        return Array.from({length:totalPages},(_,i)=> i + 1)
    }

    //* si son mas de 7 paginas 
    //* mostrar las primeras 3 ,puntos suspenvivos y las ultimas 2

    if(currentPage <= 3) {
        return [1,2,3,"...",totalPages -1,totalPages];
    }


    //*Si la pagina actual esta entre las ultimas 3 paginas ,
    //*mostrar las primeras 2 , puntos suspensivos , las ultimas 3 paginas 
    
    if(currentPage >= totalPages - 2){
        return [1,2,"...",totalPages-2 , totalPages-1,totalPages]
    }

    //*si la pagina actual esta en otro lugar ,mostrar la primra paginia suspencion ,la pagina actual y vecinos

    return [
        1,
        "...",
        currentPage - 1 ,
        currentPage,
        currentPage + 1 ,
        "...",
        totalPages 

    ]
}