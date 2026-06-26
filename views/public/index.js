
function showMessage(text) {

    const messageDiv = document.getElementById("message");

    messageDiv.textContent = text;

}

async function login(event) {
    
    // para la accion de enviar que hace por defecto 
    event.preventDefault();
    console.log("envio del formulario log in");

    const form = event.target;
    console.log(form)

    const user = form.user.value;
    const pwd = form.pwd.value;

    console.log(user);
    console.log(pwd);

    const response = await fetch("/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body:  JSON.stringify({
        user: user,
        pwd: pwd
        })
    });

    const data = await response.json();

    console.log(response.status); // 401
    console.log(data);            // Entire object
    console.log(data.msg);        // Message
    if (data.success) {
        window.location.href = "/board";
    }else{
        showMessage(data.msg)
    }
}

//1. seleccionamos la forma/formulario 
const form = document.getElementById("loginForm");
//2. le ponemos un escuhador de eventos de tipo submit, cuando le den clicl llama a la funcion login y le pasa info 
form.addEventListener("submit", login)