//declaração de variaveis globais
let novaTarefa = document.getElementById("novaTarefa");
let btnNovaTarefa = document.getElementById("btnAddTarefa");
let smallNovaTarefa = document.getElementById("smallNovaTarefa");
let tarefasPendentes = document.querySelector(".tarefas-pendentes")
let tarefasTerminadas = document.querySelector(".tarefas-terminadas")
let closeApp = document.getElementById("closeApp")
let listaTarefasGlobal = [];
let jwt;

let tarefaIsValid = false;

let taskUsuario ={
    description: "",
    completed: false
  }
let taskUsuarioJson = ""

//evento para validaçao da nova tarefa e do botão
novaTarefa.addEventListener("keyup", function () {
    if (novaTarefa.value.length > 5) {
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
        smallNovaTarefa.innerText = `faltam ${6 - novaTarefa.value.length} caracteres`;
        tarefaIsValid = false;
        smallNovaTarefa.style.color = "red";
    }
})

//função de loading da pagina
onload = function () {

    jwt = sessionStorage.getItem("token");

    obterNomeUsuario();
    obterTarefasUsuario();
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
            adicinarTarefas(resultado)
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

//função que mostra no console as tarefas ja criadas e selciona se a tarefa é pendente ou terminada
function adicinarTarefas(tarefas) {
   console.log(tarefas)
   listaTarefasGlobal = tarefas;

   for(let tarefa of tarefas){
    if(tarefa.completed){

        let li = document.createElement("li");
        li.classList.add("tarefa");
        li.innerHTML = `  <div class="done"></div>
                            <div class="descricao">
                            <p class="nome">${tarefa.description}</p>
                            <div>
                                <button><i id="${tarefa.id}" class="fas fa-undo-alt change" onclick="AlteraStatus(${tarefa.id})"></i></button>
                                <button><i id="${tarefa.id}" class="far fa-trash-alt" onclick="DeletaTarefaAPI(${tarefa.id})"></i></button>
                            </div>
                            </div>`;
        tarefasTerminadas.appendChild(li);
    }else{
        let li = document.createElement("li");
        li.classList.add("tarefa");
        li.innerHTML = ` <button><div class="not-done" id="${tarefa.id}" onclick="AlteraStatus(${tarefa.id})"></div></button>
                            <div class="descricao">
                            <p class="nome">${tarefa.description}</p>
                            <p class="timestamp"><i class="far fa-calendar-alt"></i> ${tarefa.createdAt}</p>
                            </div>`;
        tarefasPendentes.appendChild(li);

    }
   }
}

//função que para definir o body e realizar a troca de status
function AlteraStatus(tarefaId){

        let tarefa =  listaTarefasGlobal.find(e => e.id == tarefaId);

        if(tarefa.completed == true){
            taskUsuario.description = tarefa.description
            taskUsuario.completed = false;
        }else{
            taskUsuario.description = tarefa.description
            taskUsuario.completed = true
        }
        taskUsuarioJson = JSON.stringify(taskUsuario);

        AtualizaTarefaAPI(taskUsuarioJson, tarefa.id);
}

//função que modifica o statusda tarefa
function AtualizaTarefaAPI(tarefaJson,IdTarefa) {
    let request = {
        method: "PUT",
        body: tarefaJson,
        headers: {
            'Content-type': 'application/json',
            'Authorization': jwt
        }
    }

    fetch(`${baseUrlApi()}/tasks/${IdTarefa}`, request)
        .then(resultado => {

            if (resultado.status == 201 || resultado.status == 200) {
                return resultado.json();
            } else {

                throw resultado;
            }
        })
        .then(resultado => {
            window.location.reload()
        }
        ) .catch(
                erro => {
                    if (erro.status == 400 || erro.status == 404) {
                        console.log("error");
                    }
                }
            );
}

//função para deletar tarefa
function DeletaTarefaAPI(IdTarefa) {
    let request = {
        method: "DELETE",
        headers: {
            'Authorization': jwt
        }
    }

    fetch(`${baseUrlApi()}/tasks/${IdTarefa}`, request)
        .then(resultado => {

            if (resultado.status == 201 || resultado.status == 200) {
                return resultado.json();
            } else {

                throw resultado;
            }
        }
        )
        .then(resultado => {
            window.location.reload()
        }) .catch(
                erro => {
                    if (erro.status == 400 || erro.status == 404) {
                        console.log("error");
                    }
                }
            );
}



//evento do botão que cria e conversa com a API
btnNovaTarefa.addEventListener("click", async function (e) {

    novaTarefa = document.getElementById("novaTarefa");

    if (tarefaIsValid) {

        e.preventDefault();

        novaTarefa = normalizaStringUsandoTrim(novaTarefa.value);

        taskUsuario.description = novaTarefa;
        taskUsuarioJson = JSON.stringify(taskUsuario);

        TarefaAPI(taskUsuarioJson);

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
        ).then(resultado => {
                window.location.reload()
                adicinarTarefas(resultado)
            })
            .catch(
                erro => {
                    if (erro.status == 400 || erro.status == 404) {
                        console.log("error");
                    }
                }
            );
    }

//evento para encerrar cessão
closeApp.addEventListener("click", async function(e){
    e.preventDefault();
    sessionStorage.removeItem("token");

    window.location.href = "index.html";
})