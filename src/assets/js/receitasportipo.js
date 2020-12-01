const receitasSalgadasBtn = document.getElementById("buscar-receitas-salgadas");
const receitasDocesBtn = document.getElementById("buscar-receitas-doces");

const listaDoces = window.document.getElementById("receipes-list-doces")
const listaSalgadas = window.document.getElementById("receipes-list-salgadas")

//href com link receita
//link img receita <img src= alt=${res.data[counter].titulo}>

if (window.location.href == "http://127.0.0.1:5500/src/templates/receitassalgadas.html") {
    axios.get("http://localhost:8080/api/receitas/tipo?tipo=salgado")
        .then(res => {
            console.log(res.data[0].id)
            for (let counter = 0; counter < res.data.length; counter++) {
                const receita =
                    `<a href=><li class="receipe-view">
                    <p>${res.data[counter].titulo}</p>
                    </li><a>`
                listaSalgadas.insertAdjacentHTML('afterbegin', receita)
            }
        })
} else {
    axios.get("http://localhost:8080/api/receitas/tipo?tipo=doce")
        .then(res => {
            for (let counter = 0; counter < res.data.length; counter++) {
                const receita =
                `<a href=><li class="receipe-view">
                <p>${res.data[counter].titulo}</p>
                </li><a>`
            listaDoces.insertAdjacentHTML('afterbegin', receita)
            }
        })
};
