
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
//--------------------------------------------------

// procceses for cafe.html

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
    console.log(data);

    if(data.success === 'true'){
      const msg = 'cedula: '+data.cedula+' - nombre: '+data.nombre+' - id: '+data.id;
      showMsg("result",msg);
    } else {
      showMsg("result", data.msg); 
    } 
  }
}


//event listener for btn search
const search_btn = document.getElementById("search_btn");
if ( search_btn){
    search_btn.addEventListener("click", search_worker );
}
