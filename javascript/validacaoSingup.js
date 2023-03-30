// buscando os itens a validar.

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

        let usuarioJs = {
            name: nomeSignup,
            lastName: sobrenomeSignup,
            email: emailSignup,
            password: senhaRepetidaSignup
        }

        let usuarioJson = JSON.stringify(usuarioJs);
        //loginApi(usuarioJson);
    } else {
        alert ("login invalid");
    }



});

// validando informações; 


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

nomeSignup.addEventListener("keyup", function () {
    if (nomeSignup.value.length >= minNameCaracteres) {
        nomeSmall.innerText = "Ok!";
        nomeSmall.style.color = "green";
        nameIsValid = true;

    } else {
        nomeSignup.style.backgroundColor = "#ffffff";
        nomeSmall.innerText = "Campo obrigatorio com 4 letras no minimo";
        nomeSmall.style.color = "red";
        nameIsValid = false;
    }
    validaLogin()
})

sobrenomeSignup.addEventListener("keyup", function () {
    if (sobrenomeSignup.value.length >= minNameCaracteres) {
        sobrenomeSmall.innerText = "Ok!";
        sobrenomeSmall.style.color = "green";
        sobrenomeIsValid = true;

    } else {
        sobrenomeSignup.style.backgroundColor = "#ffffff";
        sobrenomeSmall.innerText = "Campo obrigatorio com 4 letras no minimo";
        sobrenomeSmall.style.color = "red";
        sobrenomeIsValid = false;
    }
    validaLogin()
})

emailSignup.addEventListener("keyup", function () {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailSignup.value)) {
        emailSignup.style.backgroundColor = "#ffffff";
        emailSmall.innerText = "Campo obrigatorio com 4 letras no minimo";
        emailSmall.style.color = "red";
        emailIsValid = false;
    } else {
        emailSmall.innerText = "Ok!";
        emailSmall.style.color = "green";
        emailIsValid = true;
    }
    validaLogin()
})

senhaSignup.addEventListener("keyup", function () {
    if (senhaSignup.value.length >= minPasswordCaracteres) {
        senhaSmall.innerText = "Ok!";
        senhaSmall.style.color = "green";
        senhaIsValid = true;

    } else {
        senhaSignup.style.backgroundColor = "#ffffff";
        senhaSmall.innerText = "Campo obrigatorio com 5 letras no minimo";
        senhaSmall.style.color = "red";
        senhaIsValid = false;
    }
    validaLogin()
})

senhaRepetidaSignup.addEventListener("keyup", function () {
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