import { useState, useEffect } from "react";

function CantidadRecolectada(){

    const [find,setFind] = useState("")
    const [resultados,setResultados] = useState([])
    const [resultMsg,setResultMsg] = useState("resultados de busqueda....")
    const [currentWorker,setCurrentWorker] = useState({ id:"", nombre:"", cedula:"" })
    const [cantidad,setCantidad] = useState("")
    const [cantidadStatus,setCantidadStatus] = useState("")

    //get all the workers and show them, same as getWorkers() in frontend.js
    async function getWorkers(){
        try{
            const respuesta = await fetch("http://localhost:3000/personas/", {
                credentials: "include"
            });
            const data = await respuesta.json()

            if(data.success === "true"){
                setResultados(data.lista)
                setResultMsg("")
            }
        }catch(error){
            console.log("error al obtener trabajadores en el frontend", error)
        }
    }

    //load the workers list once, when the page mounts
    useEffect(() => {
        getWorkers()
    }, [])

    //search a worker by cedula, same as search_worker() in frontend.js
    async function searchWorker(){

        if(Number.isNaN(Number(find))){
            alert("debe ingresar una cedula valida, sin espacios, ni caracteres alfabeticos")
            return
        }

        const respuesta = await fetch(`http://localhost:3000/personas/${find}`,{
            credentials: "include"
        })
        const data = await respuesta.json()

        if(data.success === "true"){
            setResultados(data.result)
            setResultMsg("")
        }else{
            setResultados([])
            setResultMsg(data.msg)
        }
    }

    //select a worker from the results, same as SetWorker() in frontend.js
    function selectWorker(worker){
        setCurrentWorker({ id: worker.idPersona, nombre: worker.nombre, cedula: worker.cedula })
    }

    //clear the search and reload the full list, same as cleanResults() in frontend.js
    function cleanResults(){
        setFind("")
        getWorkers()
    }

    //register the collected amount for the selected worker, same as registerCantidad() in frontend.js
    async function registerCantidad(){

        const respuesta = await fetch(`http://localhost:3000/cafe/${currentWorker.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cantidad: cantidad })
        })

        const data = await respuesta.json()

        if(data.success === "true"){
            setCantidadStatus(data.msg)
        }else{
            setCantidadStatus(data.msg)
        }
    }

    return(
        <div className="board">
        <div id="search">
            <input type="search" name="find" id="find" value={find} onChange={(e) => setFind(e.target.value)} />
            <button id="search_btn" onClick={searchWorker} >Buscar</button>
            <button id="cln_btn" onClick={cleanResults}>Limpiar</button>
            <div id="result">
                {resultMsg}
                {resultados.map((worker) => (
                    <div className="reslt" key={worker.idPersona}>
                        {"id: " + worker.idPersona + " cedula: " + worker.cedula + " nombre: " + worker.nombre}
                        <button onClick={() => selectWorker(worker)}>seleccionar</button>
                    </div>
                ))}
            </div>
        </div>

        <div id="setP">
            <div id="fullname">{currentWorker.nombre ? "Nombre: " + currentWorker.nombre : "Nombre:"}</div>
            <div id="ced">{currentWorker.cedula ? "Cedula: " + currentWorker.cedula : "Cedula:"}</div>
            <div>Ingrese la cantidad recolectada en kg:</div>
            <input type="number" name="cantidad" id="cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
            <button id="regCantidad" onClick={registerCantidad}>Registrar </button>
            <div id="cantidadStatus">{cantidadStatus}</div>
        </div>
    
    </div>
    )
}

export default CantidadRecolectada;
