import 'axios' from axios;
import { apiUrl } from '../config';
import { Receita } from '../model/Receita';

const pesquisaBtn = document.getElementById("pesquisabtn")
const receitasTable = document.getElementById("receitasbusca")

pesquisaBtn.addEventListener("click", function (event) {
  fetch("http://localhost:8080/busca").then(res => res.json())
    .then(receitas => {
      receitas.forEach(receita => {
        const todasReceitas = document.createElement("tr");
        const receitaTitulo = document.createElement("td");
        receitaTitulo.innerText = receita.receitaTitulo;

        todasReceitas.appendChild(receitaTitulo);

        receitasTable.appendChild(todasReceitas);
      })
    })
})

// export default class Pesquisa {
//   constructor(query) {
//     this.query = query;
//   }

//   async getResultado() {
//     const res = await axios.post(`${apiUrl}/receitas`);
//     return res.data;
//   }
// }
