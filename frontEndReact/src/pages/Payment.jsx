function Payment(){

    return(
        <div class="board">
        
        <div class="range">
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

        <div class="format">
            <div>Selecciona el formato:</div>
            <input type="checkbox" name="pdf" id="pdf" value="yes" />
            <label for="pdf">PDF</label>
            <input type="checkbox" name="excel" id="excel" />
            <label for="excel">EXCEL</label>
        </div>

        <div id="precio">
            <label for="precio">Precio del cafè: </label>
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