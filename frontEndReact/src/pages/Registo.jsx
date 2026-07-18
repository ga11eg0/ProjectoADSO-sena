
function Registro(){

    return(
    <div id="reg">
   
            <div id="cc">
                <label for="cedula">Cedula</label>
                <input type="number" name="cedula" id="cedula" />
            </div>
            <div id="n">
                <label for="name"> Nombre</label>
                <input type="text" name="name" id="name" />

            </div>
            <button type="submit" >Registrar</button>
            <div id="regAnswer"></div>
        
        
    </div>
    )
}

export default Registro; 