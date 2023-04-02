let emailLogin = document.getElementById("inputEmail");
let senhaLogin = document.getElementById("inputPassword");
let smallEmail = document.getElementById("smallEmail");
let smallSenha = document.getElementById("smallSenha");
let buttomLogin = document.querySelector("button")

let emailIsValid = false;
let senhaIsValid = false;

function validacaoLogin() {
    if (emailIsValid && senhaIsValid) {
        buttomLogin.removeAttribute("disabled");
        return true;
    } else {
        buttomLogin.setAttribute("disabled", true);
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
