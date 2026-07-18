
function Board(){

    return(
         <div id="menu">

         <ul class="el">
                <li >
                    
                     <a href="/board" >
                        <div class="op">Inicio</div>
                     </a>

                </li>
                <li>
                    <a href="/registro">
                        <div class="op" >Registrar trabajador</div>
                    </a>
                </li>
                <li>
                    <a href="/cafe">
                        <div class="op">Registrar cantidad recolectada</div>
                    </a>
                </li>
                <li>
                    <a href="/pay">
                        <div class="op">Generar planilla de pago</div>
                    </a>
                </li>
                <li>
                    <a href="/info">
                        <div class="op">Generar informe</div>
                    </a>
                </li>
                <li>
                    <a href="/copy">
                        <div class="op">Generar copia de seguridad</div>
                    </a>
                </li>
            </ul>

    </div>
    )
}

export default Board; 