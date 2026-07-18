
function Copy(){

    return(
         <div>
        <div>Seleccione el rango </div>
        <div className="range">
            <div>
                <div>Desde</div>
                <input type="date" name="from3" id="from3" />
            </div>
            <div>
                <div>Hasta</div>
                <input type="date" name="to3" id="to3" />
            </div>
        </div>

        <div id="services">
            <input type="checkbox" name="drive" id="drive" />
            <label htmlFor="drive">Google Drive </label>
            <input type="checkbox" name="over" id="over" />
            <label htmlFor="over">Over drive</label>
            <input type="checkbox" name="pc" id="pc" />
            <label htmlFor="pc">Este equipo </label>
            <input type="checkbox" name="other" id="other" />
            <label htmlFor="other">Otros</label>
            <button>Generar copia </button>
        </div>

    </div>
    )
}

export default Copy;
