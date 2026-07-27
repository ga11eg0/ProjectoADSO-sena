function Payment(){

    return(
        <div className="board">
        
        <div className="range">
            <div>Seleccione el rango </div>
            <div>
                <div>Desde</div>
                <input type="date" name="from" id="from" />
            </div>
            <div>
                <div>Hasta</div>
                <input type="date" name="to" id="to" />
            </div>
        </div>

        <div className="format">
            <div>Selecciona el formato:</div>
            <input type="checkbox" name="pdf" id="pdf" value="yes" />
            <label htmlFor="pdf">PDF</label>
            <input type="checkbox" name="excel" id="excel" />
            <label htmlFor="excel">EXCEL</label>
        </div>

        <div id="precio">
            <label htmlFor="precio">Precio del cafè: </label>
            <input type="number" name="precio" id="precio" />
            <button>Guardar</button>
            
        </div>
        <div id="options">
            <button>Previsualizar</button>
            <button>Generar</button>
        </div>
    </div>
    )
}

export default Payment;