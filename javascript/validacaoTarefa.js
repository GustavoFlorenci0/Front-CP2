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