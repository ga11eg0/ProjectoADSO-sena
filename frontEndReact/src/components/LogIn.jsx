import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LogIn(props){

    const [credenciales,setCredenciales]= useState({user:"",pwd:""})

    function actualizarCampo(evento) {
    setCredenciales({ ...credenciales, [evento.target.name]: evento.target.value })
     }
    return(
        <div id="login">
            
        <div id="u">
            <label for="user">user  </label>
            <input type="text" name="user" id = "user" onChange={actualizarCampo} placeholder="Username" required  />
        </div>
        
        <div id="p">
            <label for="pwd">pasword  </label>
            <input type="password" name="pwd" id="pwd" onChange={actualizarCampo} placeholder="Password" required />
        </div>
      
        <button type="submit" id="btn-log"  onClick={() => props.onLogin(credenciales.user,credenciales.pwd)}>login</button>
    
        <div id="message"></div>

       </div>
    )
}

export default LogIn;