let novaTarefa = document.getElementById("novaTarefa");
let btnNovaTarefa = document.getElementById("btnAddTarefa");

novaTarefa.addEventListener("keyup", function () {
    if (novaTarefa.value.length > 4) {
        btnNovaTarefa.removeAttribute("disabled");
        btnNovaTarefa.style.cursor = "pointer"   
    }
    else {
        //personalizações para avisar que está com caracteres a menos
        btnNovaTarefa.setAttribute("disabled", "");
        
    }
})

let jwt;

onload = function () {

    jwt = sessionStorage.getItem("token");

    obterNomeUsuario();
    obterTarefasUsuario()
}

function obterNomeUsuario() {
    let request = {
        headers: {
            'Authorization': jwt
        }
    }

    fetch(`${baseUrlApi()}/users/getMe`, request)
    .then(resultado => {

        if (resultado.status == 201 || resultado.status == 200) {
            return resultado.json();
        } else {

            throw resultado;
        }
    }
    ).then(
        resultado => {
            NomeUsuario(resultado)
        }
        )
        .catch(
            erro => {
                if (erro.status == 400 || erro.status == 404) {
                    console.log("error");
                }
            }
        );
}

function NomeUsuario(nomeUsuario) {
    let userInfoP = document.getElementById("nomeUsuario");
    userInfoP.innerText = `${nomeUsuario.firstName} ${nomeUsuario.lastName}`
}

function obterTarefasUsuario() {
    let request = {
        headers: {
            'Authorization': jwt
        }
    }

    fetch(`${baseUrlApi()}/tasks`, request)
    .then(resultado => {

        if (resultado.status == 201 || resultado.status == 200) {
            return resultado.json();
        } else {

            throw resultado;
        }
    }
    ).then(
        resultado => {
            TarefasUsuario(resultado)
        }
        )
        .catch(
            erro => {
                if (erro.status == 400 || erro.status == 404) {
                    console.log("error");
                }
            }
        );
}

function TarefasUsuario(tarefas) {
   console.log(tarefas)
}