import { useNavigate } from "react-router-dom";

function LogIn(){

    const navigate = useNavigate()

    function handleLongin(){
        navigate("/board")
    }
    return(
        <div id="login">
            
        <div id="u">
            <label for="user">user  </label>
            <input type="text" name="user" id = "user" placeholder="Username" required />
        </div>
        
        <div id="p">
            <label for="pwd">pasword  </label>
            <input type="password" name="pwd" id="pwd" placeholder="Password" required />
        </div>
      
        <button type="submit" id="btn-log" onClick={handleLongin}>login</button>
    
        <div id="message"></div>

       </div>
    )
}

export default LogIn;