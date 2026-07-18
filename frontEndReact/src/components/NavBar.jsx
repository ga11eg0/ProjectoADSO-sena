
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
                    
                     <a href="/board" >
                        <div class="navLink">Inicio</div>
                     </a>

                </li>
                <li>
                    <a href="/registro">
                        <div class="navLink" >Registrar trabajador</div>
                    </a>
                </li>
                <li>
                    <a href="/cafe">
                        <div class="navLink">Registrar cantidad recolectada</div>
                    </a>
                </li>
                <li>
                    <a href="/pay">
                        <div class="navLink">Generar planilla de pago</div>
                    </a>
                </li>
                <li>
                    <a href="/info">
                        <div class="navLink">Generar informe</div>
                    </a>
                </li>
                <li>
                    <a href="/copy">
                        <div class="navLink">Generar copia de seguridad</div>
                    </a>
                </li>
                <li>
                    <a href="/">
                        <div class="navLink" id="lout" >Logout</div>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
    )
}

export default NavBar; 