
let receitas = JSON.parse(window.localStorage.getItem('receitasEncontradas'));
let viewReceita = document.getElementById("search-receipes-view");
for (let i = 0; i < receitas.length; i++) {
    let idReceita = receitas[i][0];
    let nomeReceita = receitas[i][1];
    const receita =
        `<div><section class="receipe-view">
    <p id="receita_item" data-receita-id="${idReceita}">${nomeReceita}</p>
    </section><div>`;
    viewReceita.insertAdjacentHTML('afterbegin', receita)
}

document.addEventListener('click', e => {
    if (e.target.id === 'receita_item') {
        window.localStorage.setItem('receitaId', e.target.dataset.receitaId);
    }
    window.location.href = 'http://127.0.0.1:5500/receita.html';
});