//declaração de variaveis globais
let novaTarefa = document.getElementById("novaTarefa");
let btnNovaTarefa = document.getElementById("btnAddTarefa");
let smallNovaTarefa = document.getElementById("smallNovaTarefa");
let jwt;

let tarefaIsValid = false;

let loginUsuario ={
    description: "",
    completed: false
  }
let loginUsuarioJson = ""

//evento para validaçao da nova tarefa e do botão
novaTarefa.addEventListener("keyup", function () {
    if (novaTarefa.value.length > 4) {
        smallNovaTarefa.innerText = "";
        novaTarefa.style.borderColor = "green";
        tarefaIsValid = true;
        btnNovaTarefa.removeAttribute("disabled");  
    }
    else {
        //personalizações para avisar que está com caracteres a menos
        btnNovaTarefa.setAttribute("disabled", "");
        novaTarefa.style.backgroundColor = "#ffffff";
        novaTarefa.style.borderColor = "red";
        smallNovaTarefa.innerText = `Min. ${5 - novaTarefa.value.length} caracteres`;
        tarefaIsValid = false;
        smallNovaTarefa.style.color = "red";
    }
})

//função de loading da pagina
onload = function () {

    jwt = sessionStorage.getItem("token");

    obterNomeUsuario();
    obterTarefasUsuario()
}

//funçao para buscar o nome do usuario
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

//função que adiciona o nome e sobrenome ao p "nome usuario" da header
function NomeUsuario(nomeUsuario) {
    let userInfoP = document.getElementById("nomeUsuario");
    userInfoP.innerText = `${nomeUsuario.firstName} ${nomeUsuario.lastName}`
}

//funçao que busca tarefas ja criadas pelo usuario 
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
            AntigasTarefasUsuario(resultado)
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

//função que mostra no console as tarefas ja ciadas 
function AntigasTarefasUsuario(tarefas) {
   console.log(tarefas)
}

//evento do botão que cria e conversa com a API
btnNovaTarefa.addEventListener("click", async function (e) {

    novaTarefa = document.getElementById("novaTarefa");

    if (tarefaIsValid) {

        e.preventDefault();

        novaTarefa = normalizaStringUsandoTrim(novaTarefa.value);

        loginUsuario.description = novaTarefa;
        loginUsuarioJson = JSON.stringify(loginUsuario);

        TarefaAPI(loginUsuarioJson);

    } 
    
    else {
        alert("Tarefa inválida");
    }

});

//função de cria tarefas
function TarefaAPI(tarefaJson) {
    let request = {
        method: "POST",
        body: tarefaJson,
        headers: {
            'Content-type': 'application/json',
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
                NovasTarefasUsuario(resultado)
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
    
//função que adiciona a nova tarefa no console
function NovasTarefasUsuario(tarefas) {
    console.log(tarefas)
}