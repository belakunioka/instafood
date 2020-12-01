const Menu = (() => {
    let menuSuperior = `
        <div class="nav-bar">
            <div class="nav-link">
                <ul>
                    <li><a href="/"><img src="./src/assets/img/logo.png" id="logo"</a></li>
                    <li><a href="/">MENU PRINCIPAL</a></li>
                    <li><a href="/">RECEITAS SALGADAS</a></li>
                    <li><a href="/">RECEITAS DOCES</a></li>
                </ul>
    `;

    // Verifica se o usuário está logado
    const nome = localStorage.getItem('nome');
    if (nome) {
        menuSuperior += `
            <button type="button" class="btn-vermelho"><a id='usuario-nome' href="perfil.html">${nome}</a></button>
    `;
    } else {
        menuSuperior += `<a href="../templates/cadastro.html"><button type="button" class="btn-vermelho"> SE INSCREVA </button></a></div></div>`;
    }


    let menuLateral = `
        <div class="vertical-bar">
            <div class="search-icon">
                <a href="/"><i class="fa fa-th-list"></i></a>
                <i class="fa fa-search"></i>
                <div class="search-icon">
                    <ul>
    `;

    if (nome) {
        menuLateral += `
            <li><a href="/" target="_self">RECEITAS <br>SALVAS</a></li>
            <li><a href="./src/templates/criarreceita.html" target="_self">POSTAR</a></li>
            <li><div id="button__logout">SAIR</div></li>
        `;
    } else {
        menuLateral += `
            <li><a href="login.html" target="_self">RECEITAS <br>SALVAS</a></li>
            <li><a href="login.html" target="_self">POSTAR</a></li>
            <li><a href="login.html" target="_self">ENTRAR</a></li>
        `;
    }

    menuLateral += `
                        </li>
                    </ul>
                </div>
            </div>
            <div class="social-icons">
                <ul>
                    <li><i class="fab fa-facebook-f fa-2x icon-social"></i></li>
                    <li><i href="/" class="fab fa-twitter fa-2x icon-social"></i></li>
                    <li><i href="/" class="fab fa-pinterest fa-2x icon-social"></i></li>
                    <li><i href="/" class="fab fa-instagram fa-2x icon-social"></i></li>
                </ul>
            </div>
        </div>
        
    `;



    window.location.replace = "http://127.0.0.1:5500/src/templates/busca.html";

    document.body.insertAdjacentHTML('afterbegin', menuSuperior);
    document.body.insertAdjacentHTML('afterbegin', menuLateral);
    window.location.replace = "http://127.0.0.1:5500/src/templates/busca.html";

    // Se o usuário estiver logado, adiciona o evento no botão logout
    const logoutButton = document.getElementById('button__logout');

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            alert("Já vai? Vemos você em breve!")
            localStorage.setItem('nome', '');
            localStorage.setItem('token', '');
            window.location.href = 'http://127.0.0.1:5500/index.html';
        });
    }

})();