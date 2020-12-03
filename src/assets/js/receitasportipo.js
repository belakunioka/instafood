const receitasSalgadasBtn = document.getElementById("buscar-receitas-salgadas");
const receitasDocesBtn = document.getElementById("buscar-receitas-doces");

const listaDoces = window.document.getElementById("receipes-list-doces")
const listaSalgadas = window.document.getElementById("receipes-list-salgadas")

//href com link receita
//link img receita <img src= alt=${res.data[counter].titulo}>

if (window.location.href == "http://127.0.0.1:5500/receitassalgadas.html") {
    axios.get("http://localhost:8080/api/receitas/tipo?tipo=salgado")
        .then(res => {
            console.log(res.data[0].id)
            for (let counter = 0; counter < res.data.length; counter++) {
                const idReceita = res.data[counter].id;
                const receita =
                    `<div href=><section class="receipe-view">
                    <p id="receita_item" data-receita-id="${idReceita}">${res.data[counter].titulo}</p>
                    </section><div>`
                listaSalgadas.insertAdjacentHTML('afterbegin', receita)
            }
        })
} else {
    axios.get("http://localhost:8080/api/receitas/tipo?tipo=doce")
        .then(res => {
            for (let counter = 0; counter < res.data.length; counter++) {
                const idReceita = res.data[counter].id;
                const nomeReceita = res.data[counter].titulo;
                const receita =
                `<div href=><li class="receipe-view">
                <p id="receita_item" data-receita-id="${idReceita}">${nomeReceita}</p>
                </li><div>`
            listaDoces.insertAdjacentHTML('afterbegin', receita)
            }
        })
};
