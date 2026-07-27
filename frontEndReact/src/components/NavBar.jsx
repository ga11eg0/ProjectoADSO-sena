import { Link } from "react-router-dom";

function NavBar(){

    return(
          <div id="navBar">
        <nav>
            <div id="logo" >
                <img src=" img /icon.png" alt="" id="icon" />
                <div id="Tl">CAFE APP</div>
            </div>
            <ul>
                <li >
                    
                     <Link to="/board" >
                        <div className="navLink">Inicio</div>
                     </Link>

                </li>
                <li>
                    <Link to="/registro">
                        <div className="navLink" >Registrar trabajador</div>
                    </Link>
                </li>
                <li>
                    <Link to="/cafe">
                        <div className="navLink">Registrar cantidad recolectada</div>
                    </Link>
                </li>
                <li>
                    <Link to="/pay">
                        <div className="navLink">Generar planilla de pago</div>
                    </Link>
                </li>
                <li>
                    <Link to="/info">
                        <div className="navLink">Generar informe</div>
                    </Link>
                </li>
                <li>
                    <Link to="/copy">
                        <div className="navLink">Generar copia de seguridad</div>
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        <div className="navLink" id="lout" >Logout</div>
                    </Link>
                </li>
            </ul>
        </nav>
    </div>
    )
}

export default NavBar; 