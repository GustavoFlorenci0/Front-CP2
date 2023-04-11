function mostrarSpinner() {

    let spinner = document.createElement("div");
    let botaoLogin = document.querySelector("button");

    botaoLogin.innerText = "";
    spinner.classList.add("loader")
    botaoLogin.appendChild(spinner);
    
    return;
   }

   function ocultarSpinner() {

    let botaoLogin = document.querySelector("button");
    let spinner = document.querySelector(".loader");
    
    botaoLogin.removeChild(spinner);

    if (document.querySelector("#btnSignup")){
        botaoLogin.innerText = "Criar conta";
    }else{
        botaoLogin.innerText = "Acessar";
    }
    
    return;
   }

function renderizarSkeletons(quantidade, conteiner) {

    const conteinerTarefas = document.querySelector(conteiner);
    const skeletons = Array.from({ length: quantidade});
    
    skeletons.forEach(() => {
      const template = `
      <li class="skeleton-conteiner ${conteiner.replace(".", "")}-child">
        <div class="skeleton-card">
          <p class="skeleton-text"></p>
          <p class="skeleton-text"></p>
        </div>
      </li>
    `;
    
      conteinerTarefas.innerHTML += template;
    });
   }

function removerSkeleton(conteiner) {

    const conteinerTarefas = document.querySelector(conteiner);
    const skeletons = document.querySelectorAll(`${conteiner}-child`);
    
    skeletons.forEach((skeleton) => conteinerTarefas.removeChild(skeleton));
   }