
import { useState } from "react";

function Payment(){

    const [date1, setDate1] = useState("")
    const [date2, setDate2] = useState("")
    const [format, setFormat] = useState("")
    const [priceCoffe, setPriceCoffe] = useState("")
    const [table, setTable] = useState("")
    const [status, setStatus] = useState("")

    async function generate(){

        if(!date1 || !date2 || !priceCoffe || !format){
            setStatus("Debe completar las fechas, el precio del café y seleccionar un formato.")
            return
        }

        setStatus("Generando...")
        setTable("")

        try{
            const respuesta = await fetch("http://localhost:3000/pay", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    date1: date1,
                    date2: date2,
                    priceCoffe: Number(priceCoffe)
                })
            })

            const data = await respuesta.json()

            if(data.success === true){

                const parser = new DOMParser()
                const htmlDoc = parser.parseFromString(data.table, "text/html")

                const title = htmlDoc.querySelector("h2")
                const htmlTable = htmlDoc.querySelector("table")

                if(htmlTable){
                    setTable(
                        (title ? title.outerHTML : "") +
                        htmlTable.outerHTML
                    )
                }else{
                    setStatus("La respuesta no contiene una tabla válida.")
                    return
                }

                setStatus("")

            }else{
                setStatus(data.msg || "No se pudo generar la planilla.")
            }

        }catch(error){
            console.log("error al generar la planilla", error)
            setStatus("Error al conectar con el servidor.")
        }
    }

    return(
        <div className="board">

            <div className="range">
                <div>Seleccione el rango</div>

                <div>
                    <div>Desde</div>
                    <input
                        type="date"
                        name="from"
                        id="from"
                        value={date1}
                        onChange={(e) => setDate1(e.target.value)}
                    />
                </div>

                <div>
                    <div>Hasta</div>
                    <input
                        type="date"
                        name="to"
                        id="to"
                        value={date2}
                        onChange={(e) => setDate2(e.target.value)}
                    />
                </div>
            </div>

            <div className="format">
                <div>Selecciona el formato:</div>

                <input
                    type="checkbox"
                    name="pdf"
                    id="pdf"
                    checked={format === "pdf"}
                    onChange={() => setFormat(format === "pdf" ? "" : "pdf")}
                />
                <label htmlFor="pdf">PDF</label>

                <input
                    type="checkbox"
                    name="excel"
                    id="excel"
                    checked={format === "excel"}
                    onChange={() => setFormat(format === "excel" ? "" : "excel")}
                />
                <label htmlFor="excel">EXCEL</label>
            </div>

            <div id="precio">
                <label htmlFor="precio">Precio del cafè: </label>
                <input
                    type="number"
                    name="precio"
                    id="precio"
                    value={priceCoffe}
                    onChange={(e) => setPriceCoffe(e.target.value)}
                />
                <button type="button">Guardar</button>
            </div>

            <div id="options">
                <button type="button" onClick={generate}>
                    Generar
                </button>
            </div>

            {status && <div id="paymentStatus">{status}</div>}

            <div
                id="paymentTable"
                dangerouslySetInnerHTML={{ __html: table }}
            />

        </div>
    )
}

export default Payment;

