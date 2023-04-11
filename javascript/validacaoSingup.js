// declaração de variaveis globais
let nomeSignup = document.getElementById("nomeSignup");
let sobrenomeSignup = document.getElementById("sobrenomeSignup");
let emailSignup = document.getElementById("emailSignup");
let senhaSignup = document.getElementById("senhaSignup");
let senhaRepetidaSignup = document.getElementById("senhaRepetidaSignup");
let btnSignup = document.getElementById("btnSignup");

let nomeSmall = document.getElementById("nomeSmall");
let sobrenomeSmall = document.getElementById("sobrenomeSmall");
let emailSmall = document.getElementById("emailSmall");
let senhaSmall = document.getElementById("senhaSmall");
let senhaRepetidaSmall = document.getElementById("senhaRepetidaSmall");

let minPasswordCaracteres = 5;
let minNameCaracteres = 2;

let nameIsValid = false;
let sobrenomeIsValid = false;
let emailIsValid = false;
let senhaIsValid = false;
let senhaRepetidaIsValid = false;

let usuarioJs = {};
let usuarioJson = "";


// adicionando um evento para cadastro

btnSignup.addEventListener("click", async function (evento) {

    // busca valores atualizados

    nomeSignup = document.querySelector("#nomeSignup");
    sobrenomeSignup = document.querySelector("#sobrenomeSignup");
    emailSignup = document.querySelector("#emailSignup");
    senhaSignup = document.querySelector("#senhaSignup");
    senhaRepetidaSignup = document.querySelector("#senhaRepetidaSignup");

    if (validaLogin()) {

        evento.preventDefault();

        nomeSignup = normalizaStringUsandoTrim(nomeSignup.value);
        sobrenomeSignup = normalizaStringUsandoTrim(sobrenomeSignup.value);
        emailSignup = normalizaStringUsandoTrim(emailSignup.value);
        senhaRepetidaSignup = normalizaStringUsandoTrim(senhaRepetidaSignup.value);

        usuarioJs = {
            firstName: nomeSignup,
            lastName: sobrenomeSignup,
            email: emailSignup,
            password: senhaRepetidaSignup
        }

        usuarioJson = JSON.stringify(usuarioJs);

        SingupAPI(usuarioJson);
    } else {
        alert ("login invalid");
    }
});

//função que se comunica com a API e cria o usuario
function SingupAPI(UsuarioJson) {
    let request = {
        method: "POST",
        body: UsuarioJson,
        headers: {
            'Content-type': 'application/json'
        }
    }

    mostrarSpinner();
    fetch(`${baseUrlApi()}/users`, request)
        .then(resultado => {

            if (resultado.status == 201 || resultado.status == 200) {
                window.location.href = "index.html";
                return resultado.json();
            } else {

                throw resultado;
            }
        }
        ).then(
            resultado => { 
                 setTimeout(() => {
                  ocultarSpinner()
                 }, 2000);
            }
        ).catch(
            erro => {
                if (erro.status == 400) {
                     setTimeout(() => {
                    ocultarSpinner()
                     }, 1500);
                    console.log("Usuario ja existe");
                    alert("Usuário já existe");

                }
            }
        );
}

// validando informações; 
//função que habilita e desabilita o botão 
function validaLogin() {
    if (nameIsValid && sobrenomeIsValid && emailIsValid && senhaRepetidaIsValid) {

        btnSignup.style.backgroundColor = "#7898FF";
        btnSignup.innerText = "Acessar";
        btnSignup.removeAttribute("disabled");
        return true;
    } else {
        btnSignup.style.backgroundColor = "#979292A1";
        btnSignup.innerText = "Bloqueado";
        btnSignup.setAttribute("disabled", true);
        return false;
    }
}

//evento para validaçao do nome 
nomeSignup.addEventListener("keyup", function () {

    nomeSignup = document.getElementById("nomeSignup");
    nomeSmall = document.getElementById("nomeSmall");

    if (nomeSignup.value.length >= minNameCaracteres) {
        nomeSmall.innerText = "Ok!";
        nomeSmall.style.color = "green";
        nameIsValid = true;

    } else {
        nomeSignup.style.backgroundColor = "#ffffff";
        nomeSmall.innerText = `Campo obrigatorio, faltam  ${minNameCaracteres - nomeSignup.value.length} caracteres`;
        nomeSmall.style.color = "red";
        nameIsValid = false;
    }
    validaLogin()
})

//evento para validaçao do sobrenome 
sobrenomeSignup.addEventListener("keyup", function () {

    sobrenomeSignup = document.getElementById("sobrenomeSignup");
    sobrenomeSmall = document.getElementById("sobrenomeSmall");

    if (sobrenomeSignup.value.length >= minNameCaracteres) {
        sobrenomeSmall.innerText = "Ok!";
        sobrenomeSmall.style.color = "green";
        sobrenomeIsValid = true;

    } else {
        sobrenomeSignup.style.backgroundColor = "#ffffff";
        sobrenomeSmall.innerText = `Campo obrigatorio, faltam  ${minNameCaracteres - sobrenomeSignup.value.length} caracteres`;
        sobrenomeSmall.style.color = "red";
        sobrenomeIsValid = false;
    }
    validaLogin()
})

//evento para validaçao do email
emailSignup.addEventListener("keyup", function () {

    emailSignup = document.getElementById("emailSignup");
    emailSmall = document.getElementById("emailSmall");

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailSignup.value)) {
        emailSignup.style.backgroundColor = "#ffffff";
        emailSmall.innerText = "Campo obrigatorio";
        emailSmall.style.color = "red";
        emailIsValid = false;
    } else {
        emailSmall.innerText = "Ok!";
        emailSmall.style.color = "green";
        emailIsValid = true;
    }
    validaLogin()
})

//evento para validaçao da senha
senhaSignup.addEventListener("keyup", function () {

    senhaSignup = document.getElementById("senhaSignup");
    senhaSmall = document.getElementById("senhaSmall");


    if (senhaSignup.value.length >= minPasswordCaracteres) {
        senhaSmall.innerText = "Ok!";
        senhaSmall.style.color = "green";
        senhaIsValid = true;

    } else {
        senhaSignup.style.backgroundColor = "#ffffff";
        senhaSmall.innerText = `Campo obrigatorio, faltam  ${minPasswordCaracteres - senhaSignup.value.length} caracteres`;
        senhaSmall.style.color = "red";
        senhaIsValid = false;
    }
    validaLogin()
})

//evento para validaçao da senha repetida
senhaRepetidaSignup.addEventListener("keyup", function () {

    senhaSignup = document.getElementById("senhaSignup");
    senhaRepetidaSignup = document.getElementById("senhaRepetidaSignup");
    senhaRepetidaSmall = document.getElementById("senhaRepetidaSmall");

    if (senhaRepetidaSignup.value == senhaSignup.value && senhaIsValid == true) {
        senhaRepetidaSmall.innerText = "Ok!";
        senhaRepetidaSmall.style.color = "green";
        senhaRepetidaIsValid = true;

    } else {
        senhaRepetidaSignup.style.backgroundColor = "#ffffff";
        senhaRepetidaSmall.innerText = "Senha invalida ou não coincide. ";
        senhaRepetidaSmall.style.color = "red";
        senhaRepetidaIsValid = false;
    }
    validaLogin()
})

//capitalizar primeira letra do nome e sobrenome, independente da forma de entrada do usuário
btnSignup.addEventListener('click', () => {
    let nomeInput = document.getElementById('nomeSignup');
    let sobrenomeInput = document.getElementById('sobrenomeSignup');

    let nome = nomeInput.value;
    let sobrenome = sobrenomeInput.value;

    let nomeCapitalizado = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
    let sobrenomeCapitalizado = sobrenome.charAt(0).toUpperCase() + sobrenome.slice(1).toLowerCase();

    nomeInput.value = nomeCapitalizado;
    sobrenomeInput.value = sobrenomeCapitalizado;
})

// https://github.com/xk08/DH_Turma2_N2_BI0223_FrontEnd2_2023/blob/main/Aula20--APIs_II_To-Do_App/scripts/login/index.js
validaLogin()