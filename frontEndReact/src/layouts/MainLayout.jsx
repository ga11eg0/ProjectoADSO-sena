import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
function MainLayout({ onLogout }){

    
    return(
        <>
            <div className="content"> 
            <NavBar onLogout={onLogout} />

            <Outlet/>
            </div>
        </>
    )
}

export default MainLayout; 