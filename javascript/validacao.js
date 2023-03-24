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
// validando informações; 

nomeSignup.addEventListener("keyup", function () {
    if (nomeSignup.value.length >= 4) {
        nomeSmall.innerText = "Ok!";
        nomeSmall.style.color = "green";

    } else {
        nomeSignup.style.backgroundColor = "#ffffff";
        nomeSmall.innerText = "Campo obrigatorio com 4 letras no minimo";
        nomeSmall.style.color = "red";
    }
})

sobrenomeSignup.addEventListener("keyup", function () {
    if (sobrenomeSignup.value.length >= 4) {
        sobrenomeSmall.innerText = "Ok!";
        sobrenomeSmall.style.color = "green";

    } else {
        sobrenomeSignup.style.backgroundColor = "#ffffff";
        sobrenomeSmall.innerText = "Campo obrigatorio com 4 letras no minimo";
        sobrenomeSmall.style.color = "red";
    }
})

emailSignup.addEventListener("keyup", function () {
    if (emailSignup.value.length >= 4) {
        emailSmall.innerText = "Ok!";
        emailSmall.style.color = "green";

    } else {
        emailSignup.style.backgroundColor = "#ffffff";
        emailSmall.innerText = "Campo obrigatorio com 4 letras no minimo";
        emailSmall.style.color = "red";
    }
})

senhaSignup.addEventListener("keyup", function () {
    if (senhaSignup.value.length >= 4) {
        senhaSmall.innerText = "Ok!";
        senhaSmall.style.color = "green";

    } else {
        senhaSignup.style.backgroundColor = "#ffffff";
        senhaSmall.innerText = "Campo obrigatorio com 4 letras no minimo";
        senhaSmall.style.color = "red";
    }
})

senhaRepetidaSignup.addEventListener("keyup", function () {
    if (senhaRepetidaSignup.value.length >= 4) {
        senhaRepetidaSmall.innerText = "Ok!";
        senhaRepetidaSmall.style.color = "green";

    } else {
        senhaRepetidaSignup.style.backgroundColor = "#ffffff";
        senhaRepetidaSmall.innerText = "Campo obrigatorio com 4 letras no minimo";
        senhaRepetidaSmall.style.color = "red";
    }
})

btnSignup.addEventListener("click", function (e) {
    let senhaRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

    if (!senhaRegex.test(senhaSignup.value)) {
        alert('A senha deve conter pelo menos uma letra maiúscula, um caractere especial e um número.');
        e.preventDefault();
    } else if (senhaSignup.value !== senhaRepetidaSignup.value) {
        alert('As senhas não coincidem. Por favor, tente novamente.');
        e.preventDefault();
    }
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