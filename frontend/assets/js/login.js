console.log("Estoy cargando...")

const URL = "http://localhost:3000"

function getData() {
    var elements = document.getElementById("form-login").elements;
    var obj ={};
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        if (item.name != "") {
            obj[item.name] = item.value;
        }
    }
    return obj;
}
  

document.addEventListener("DOMContentLoaded", (e) => {
    const formLogin = document.getElementById("form-login");

    formLogin.addEventListener("submit", async (e) => {
        e.preventDefault();
        let data = getData()
        const response = await fetch(URL + "/login", {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        let info = await response.json();
        if (info[0] == undefined || info[0] == null) {
            alert("No existe tu usuario en la base de datos o las credenciales son incorrectas")
            return
        }
        formLogin.innerHTML = `<p>Te has autenticado, ${info[0].name}!</p> Tu ultima conexión fue ${info[0].last_time} <p>Estamos cargando tus chats...</p>`
        setTimeout(() => {
            window.location.href = "/chats.html"
        }, 5000)
    });
});