
console.log("frontend.js loaded");
// ----- log out function 
async function requestLogout() {
    
    const petition = await fetch("/logout", {method: "POST"})

    const data = await petition.json();
    
    if (data.success) {
      window.location.href = data.redirectUrl; // O '/' directamente
    }
} 

const logoutDiv = document.getElementById("lout");
logoutDiv.addEventListener("click",requestLogout)
//---------------------------------------------------

//---------FUNCTION TO SHOW MESSAGES-----------------
// it receives element id and text to show 
function showMsg(elementID, text){

  const msg = document.getElementById(elementID);
  msg.textContent = text; 
}
//----- procceses for reg.html ----------------------

async function registerU(event) {

    console.log("fired");
    event.preventDefault();
    const form = event.target;
    const cedula = form.cedula.value;
    const nombre = form.name.value; 
    const response = await fetch('/personas', {
      method : "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({nombre: nombre, cedula: cedula})
    })

    const data = await response.json();

    if(data.success){
      console.log(data.msg);
      showMsg("regAnswer",data.msg);
    }else{
      console.log(data.msg);
      showMsg("regAnswer",data.msg); 

    }

}


// event listener para el formulario de registro recolector
const regForm = document.getElementById("regform");
//makes sure is needed
if ( regForm){
    regForm.addEventListener("submit", registerU); 
}
//-------------------------------------------------------------------------------------------------------------

//------- procceses for cafe.html -----------------------------------------------------------------------------
//select the results box 
const results= document.querySelector("#result"); 
//the current object 
const currentObject= {
    id: '',
    nombre:'',
    cedula: ''
}

//clears the results
function clearRes(){
  const rslt= document.querySelectorAll(".reslt"); 
  rslt.forEach(item => {
      results.removeChild(item); 
      item.classList.remove("reslt")
  })
}
//shows results/users
function showResults(object){

  clearRes(); 
  object.forEach(element => {
    //create element for result 
    const reslt = document.createElement("div"); 
    //add to class 
    reslt.classList.add('reslt');

    //add the text
    reslt.textContent= "id: "+element.idPersona+" cedula: "+element.cedula+" nombre: "+element.nombre; 
    //create a butto 
    const btn = document.createElement("button"); 
    btn.textContent = "seleccionar"; 
    //event listener
    btn.addEventListener("click",() =>{
        SetWorker(element); 
    }); 
    //add button to div
    reslt.appendChild(btn); 
    
    //add to result box 
    results.appendChild(reslt)
  });
}

//sends request 
async function search_worker(params) {
  
  //console.log("test boton de busqueda"); 
  // select the element 
  const cedulaInput = document.getElementById("find");
  // grab what is inside
  const cedula = cedulaInput.value;
  console.log(cedula); 
  // check if is  a valid input
  // convertimos string a numero, con funcion Number.isNaN vemos si se puede convertir o no, si tiene caracteres alfabeticos nos se convierte y retorna Nan
  if ( Number.isNaN(Number(cedula))){
    alert("debe ingresar una cedula valida, sin espacios, ni caracteres alfabeticos"); 
  } else {
    const response = await fetch(`/personas/${cedula}`);

    const data = await response.json();
    //console.log(data);

    if(data.success === 'true'){
      showResults(data.result); 
    } else {
      showMsg("result", data.msg); 
    } 
  }
}

//get all the workrs and shows on UI 
async function getWorkers(){
    try{
        //call the api 
        const response = await fetch('/personas/'); 
        const data = await response.json(); 
        //console.log(data); 
        if(data.success === "true"){
            showResults(data.lista); 
        }

    }catch(error){
        console.log("error al obtener trabajadores en el frontend", error); 
    }
}

//function to add worker info in order to register the collected amount 
function SetWorker(object){

    //select name
    const fn= document.getElementById("fullname"); 
    //select ced
    const cd= document.getElementById("ced"); 
    //addtext
    cd.textContent="Cedula: "+object.cedula; 
    fn.textContent="Nombre: "+object.nombre; 
    //update object 
    currentObject.id= object.idPersona; 
    currentObject.nombre= object.nombre; 
    currentObject.cedula= object.cedula; 
    //console.log(currentObject); 
}

//event listener for btn search
const search_btn = document.getElementById("search_btn");
if ( search_btn){
    search_btn.addEventListener("click", search_worker );
    getWorkers(); 
    
}
//
//function to clean and list workers again 
async function cleanResults(){
    getWorkers(); 
    const searchBar= document.getElementById("find").value= ''; 
}

//listener for the clean btn 
const cln_btn= document.getElementById("cln_btn"); 
if( cln_btn){
    cln_btn.addEventListener("click", cleanResults )
}

//function to register cantidad 
async function registerCantidad(){

    //get cantidad 
    const cantidad = document.getElementById("cantidad").value; 
    //console.log("cantidad: ", cantidad.value, " , object: ", currentObject);
    //send the post api request 
    const respuesta = await fetch(`/cafe/${currentObject.id}`,{
      method : "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({cantidad: cantidad})
    }); 
    
    const data = await respuesta.json(); 

    if(data.success === "true"){
        showMsg("cantidadStatus", data.msg); 

    }else{
        showMsg("cantidadStatus",data.msg); 
    }

}

//event listener to add the amount collected 
const regCantidad = document.getElementById("regCantidad"); 
if(regCantidad){
    regCantidad.addEventListener("click", registerCantidad )
} 