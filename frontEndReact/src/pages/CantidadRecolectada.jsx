function CantidadRecolectada(){

    return(
        <div className="board">
        <div id="search">
            <input type="search" name="find" id="find"/>
            <button id="search_btn" >Buscar</button>
            <div id="result">
                resultados de busqueda....
            </div>
        </div>

        <div id="setP">
            <div id="fullname">Nombre:</div>
            <div id="ced">Cedula:</div>
            <div>Ingrese la cantidad recolectada en kg:</div>
            <input type="number" name="cantidad" id="cantidad" />
            <button>Registrar </button>
        </div>
    
    </div>
    )
}

export default CantidadRecolectada;