
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

//----- procceses for reg.html ----------------------

async function registerU(event) {

    console.log("fired");
    event.preventDefault();
    const form = event.target;
    const cedula = form.cedula.value;
    const nombre = form.name.value; 
    console.log(cedula);
    console.log(nombre);
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
    }else{
      console.log(data.msg);
    }

}



const regForm = document.getElementById("regform");
regForm.addEventListener("submit", registerU); 