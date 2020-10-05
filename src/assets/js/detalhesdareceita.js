const favoritar = document.getElementById('favoritar');
let coracaoPreenchido = "..\\src\\assets\\img\\icons\\coração preenchido.png";
let coracaoVazio = "..\\src\\assets\\img\\icons\\coração vazio.png";

favoritar.addEventListener("click", () => {
    if(favoritar.getAttribute("src") == coracaoVazio){
        favoritar.src = coracaoPreenchido;
    } else {
        favoritar.src = coracaoVazio;
    }
});