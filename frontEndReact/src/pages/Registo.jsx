import { useState } from "react";

function Registro(){

    const [datos,setDatos] = useState({cedula:"",name:""})
    const [regAnswer,setRegAnswer] = useState("")

    function actualizarCampo(evento){
        setDatos({ ...datos, [evento.target.name]: evento.target.value })
    }

    async function registerU(evento){

        evento.preventDefault();

        const respuesta = await fetch("http://localhost:3000/personas", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre: datos.name, cedula: datos.cedula })
        })

        const data = await respuesta.json()

        if(data.success){
            console.log(data.msg)
            setRegAnswer(data.msg)
        }else{
            console.log(data.msg)
            setRegAnswer(data.msg)
        }
    }

    return(
    <div id="reg">
        <form id="regform" onSubmit={registerU}>
            <div id="cc">
                <label htmlFor="cedula">Cedula</label>
                <input type="number" name="cedula" id="cedula" value={datos.cedula} onChange={actualizarCampo} />
            </div>
            <div id="n">
                <label htmlFor="name"> Nombre</label>
                <input type="text" name="name" id="name" value={datos.name} onChange={actualizarCampo} />

            </div> 
            <button type="submit" >Registrar</button>
            <div id="regAnswer">{regAnswer}</div>
        </form>
        
    </div>
    )
}

export default Registro;
