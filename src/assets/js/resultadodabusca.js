
let receitas = JSON.parse(window.localStorage.getItem('receitasEncontradas'));
let viewReceita = document.getElementById("search-receipes-view");
for (let i = 0; i < receitas.length; i++) {
    let idReceita = receitas[i][0];
    let nomeReceita = receitas[i][1];
    const receita =
        `<a href=""><section class="receipe-view">
    <p>${nomeReceita}</p>
    </section><a>`
    viewReceita.insertAdjacentHTML('afterbegin', receita)
}