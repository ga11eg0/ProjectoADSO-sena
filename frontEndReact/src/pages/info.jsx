
function Info(){

    return(
          
        <div>

            <h3>Seleccione el rango </h3>
            <div className="range">
                <div>
                    <div>Desde</div>
                    <input type="date" name="from2" id="from2" />
                </div>
                <div>
                    <h3>Hasta</h3>
                    <input type="date" name="to2" id="to2" />
                </div>

        </div>

        <div className= "format">
            <h3> Selecciona el formato </h3>
            <input type="checkbox" name="pdf2" id="pdf2" value="yes" />
            <label htmlFor="pdf2">PDF</label>
            <input type="checkbox" name="excel2" id="excel2"/>
            <label htmlFor="excel2">EXCEL</label>
            <input type="checkbox" name="word" id="word" />
            <label htmlFor="word">WORD</label>
        </div>

        <div id="options2">
            <button>Previsualizar</button>
            <button>Generar</button>
        </div>
        </div>
        
    
    )
}
export default Info;