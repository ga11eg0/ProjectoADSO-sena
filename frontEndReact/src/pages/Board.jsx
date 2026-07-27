import { Link } from "react-router-dom";
function Board(){

    return(
         <div id="menu">

         <ul className="el">
                <li >
                    
                     <Link to="/board" >
                        <div className="op">Inicio</div>
                     </Link>

                </li>
                <li>
                    <Link to="/registro">
                        <div className="op" >Registrar trabajador</div>
                    </Link>
                </li>
                <li>
                    <Link to="/cafe">
                        <div className="op">Registrar cantidad recolectada</div>
                    </Link>
                </li>
                <li>
                    <Link to="/pay">
                        <div className="op">Generar planilla de pago</div>
                    </Link>
                </li>
                <li>
                    <Link to="/info">
                        <div className="op">Generar informe</div>
                    </Link>
                </li>
                <li>
                    <Link to="/copy">
                        <div className="op">Generar copia de seguridad</div>
                    </Link>
                </li>
            </ul>

    </div>
    )
}

export default Board; 