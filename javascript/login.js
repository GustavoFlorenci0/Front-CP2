//declaração de variaveis globais
let emailLogin = document.getElementById("inputEmail");
let senhaLogin = document.getElementById("inputPassword");
let smallEmail = document.getElementById("smallEmail");
let smallSenha = document.getElementById("smallSenha");
let buttomLogin = document.querySelector("button")

let emailIsValid = false;
let senhaIsValid = false;

let loginUsuario = {
    email: "",
    password: ""
}

let loginUsuarioJson = ""

//validações;
//função para habilitar/desabilitar o botão
function validacaoLogin() {
    if (emailIsValid && senhaIsValid) {
        buttomLogin.removeAttribute("disabled");
        return true;
    } 

    else {
        buttomLogin.setAttribute("disabled", true);
        return false;
    }
}

//evento para a validação do email
emailLogin.addEventListener("keyup", function () {

    emailLogin = document.getElementById("inputEmail");
    smallEmail = document.getElementById("smallEmail");

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailLogin.value)) {
        emailLogin.style.backgroundColor = "#ffffff";
        emailLogin.style.borderColor = "red";
        smallEmail.innerText = "Campo obrigatorio";
        smallEmail.style.color = "red";
        emailIsValid = false;
    } 
    else {
        smallEmail.innerText = "";
        emailLogin.style.borderColor = "green";
        emailIsValid = true;
    }
    validacaoLogin() 

})

//evento para a validação da senha 
senhaLogin.addEventListener("keyup", function () {

    senhaLogin = document.getElementById("inputPassword");
    smallSenha = document.getElementById("smallSenha");

    if (senhaLogin.value.length >= 5) {
        smallSenha.innerText = "";
        senhaLogin.style.borderColor = "green";
        senhaIsValid = true;

    } else {
        senhaLogin.style.backgroundColor = "#ffffff";
        senhaLogin.style.borderColor = "red";
        smallSenha.innerText = `Campo obrigatorio, faltam  ${5 - senhaLogin.value.length} caracteres`;
        smallSenha.style.color = "red";
        senhaIsValid = false;
    }
    validacaoLogin() 
})

//funçoes da API
//evento do botão que apos clicar seja realizado o login 
buttomLogin.addEventListener("click", async function (evento) {

    emailLogin = document.getElementById("inputEmail");
    senhaLogin = document.getElementById("inputPassword");

    if (validacaoLogin()) {

        evento.preventDefault();

        emailLogin = normalizaStringUsandoTrim(emailLogin.value);
        senhaLogin = normalizaStringUsandoTrim(senhaLogin.value);

        loginUsuario.email = emailLogin;
        loginUsuario.password = senhaLogin;
        loginUsuarioJson = JSON.stringify(loginUsuario);

        loginAPI(loginUsuarioJson);

    } 
    
    else {
        alert("Login inválido");
    }

});

//função de comunicação com a API e seus resultados
function loginAPI(UsuarioJson) {
    let request = {
        method: "POST",
        body: UsuarioJson,
        headers: {
            'Content-type': 'application/json'
        }
    }

    fetch(`${baseUrlApi()}/users/login`, request)
        .then(resultado => {

            if (resultado.status == 201 || resultado.status == 200) {
                return resultado.json();
            } else {

                throw resultado;
            }
        }
        ).then(
            resultado => {
                sessionStorage.setItem("token", resultado.jwt)

                window.location.href = "tarefas.html";
            }
        ).catch(
            erro => {
                if (erro.status == 400 || erro.status == 404) {
                    console.log("E-mail e/ou senha inválidos");
                    alert("E-mail e/ou senha inválidos");

                }
            }
        );
}

