const favoritar = document.getElementById('favoritar');
let coracaoPreenchido = "..\\assets\\img\\icons\\coração preenchido.png";
let coracaoVazio = "..\\assets\\img\\icons\\coração vazio.png";

favoritar.addEventListener("click", () => {
    if(favoritar.getAttribute("src") == coracaoVazio){
        favoritar.src = coracaoPreenchido;
    } else {
        favoritar.src = coracaoVazio;
    }
});

const tituloReceita = document.getElementById("tituloReceita");
const imagemReceita = document.getElementById("imagemReceita");
const tempoPreparo = document.getElementById("tempoPreparo");
const autorReceita = document.getElementById("autorReceita");
const rendimento = document.getElementById("rendimento");
const dataReceita = document.getElementById("dataReceita");
const ingredientes = document.getElementById("ingredientes");
const modoPreparo = document.getElementById("modoPreparo");

window.addEventListener("load", () => {
    axios.get("http://localhost:8080/api/receitas/${id}");
    //axios.get("http://localhost:8080/api/receitas/" + 1)
    .then(res => {
        console.log(res.data)
        imagemReceita.src = "../assets/img/imagemReceita/" + res.data.imagem;
        tituloReceita.textContent = res.data.titulo;
        tempoPreparo.textContent = res.data.tempoPreparo;
        autorReceita.textContent = res.data.usuario.nome;
        rendimento.textContent = res.data.rendimento;
        dataReceita.textContent = converterData(res.data.dataCriacao);

        res.data.ingredientes.forEach(ingrediente => {
            let li = document.createElement("li");
            li.textContent = ingrediente.quantidade + " " + ingrediente.unidade + " de " + ingrediente.produto.nome;
            ingredientes.appendChild(li);

        })

        modoPreparo.textContent = res.data.instrucoes;
        /*res.data.instrucoes.forEach(instrucao => {
            let li = document.createElement("li");
            li.textContent = instrucao;
            modoPreparo.appendChild(li);
        }) */

    })
})

const converterData = (data) => {
    var arrDataCriacao = data.split('-');
    var stringFormatada = arrDataCriacao[0] + '/' + arrDataCriacao[1] + '/' + arrDataCriacao[2];
    return stringFormatada;
}