
async function requestLogout() {
    
    const petition = await fetch("/logout", {method: "POST"})

    const data = await petition.json();
    
    if (data.success) {
      window.location.href = data.redirectUrl; // O '/' directamente
    }
} 

const logoutDiv = document.getElementById("lout");
logoutDiv.addEventListener("click",requestLogout)