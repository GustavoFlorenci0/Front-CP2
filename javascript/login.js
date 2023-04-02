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

function validacaoLogin() {
    if (emailIsValid && senhaIsValid) {
        buttomLogin.removeAttribute("disabled");
        return true;
    } else {
        buttomLogin.setAttribute("disabled");
        return false;
    }
}

emailLogin.addEventListener("keyup", function () {
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

senhaLogin.addEventListener("keyup", function () {
    if (senhaLogin.value.length >= 5) {
        smallSenha.innerText = "";
        senhaLogin.style.borderColor = "green";
        senhaIsValid = true;

    } else {
        senhaLogin.style.backgroundColor = "#ffffff";
        senhaLogin.style.borderColor = "red";
        smallSenha.innerText = "Campo obrigatorio";
        smallSenha.style.color = "red";
        senhaIsValid = false;
    }
    validacaoLogin() 
})

buttomLogin.addEventListener("click", async function (evento) {

    //Busca os valores atualizados dos inputs
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

            /* Verifica status de sucesso na execução da promisse */
            if (resultado.status == 201 || resultado.status == 200) {
                return resultado.json();
            } else {
                /* Caso o status não seja sucesso, retorna uma exceção com todo o objeto do "erro" */
                throw resultado;
            }
        }
        ).then(
            resultado => {
                sessionStorage.setItem("jwt", resultado.jwt)

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

