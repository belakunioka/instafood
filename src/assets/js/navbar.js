document.addEventListener('DOMContentLoaded', () => {
  // Navbar
  const navbarTag = document.querySelector('nav')

  const navbar = document.createElement('div')
  navbar.classList.add('nav-bar');
  const menu = document.createElement('div');
  menu.classList.add('nav-link');

  const ul = document.createElement('ul');
  const img = document.createElement('img');
  img.src = "/src/assets/img/logo.png";
  img.id = "logo";

  links = [
    { href: 'home.html', name: 'MENU PRINCIPAL' },
    { href: 'rsalgadas.html', name: 'RECEITAS SALGADAS' },
    { href: 'rdoces.html', name: 'RECEITAS DOCES' },
  ]

  ul.appendChild(img);
  links.forEach(link => {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.href = link.href;
    a.innerText = link.name;

    li.appendChild(a);
    ul.appendChild(li);
  })

  const a = document.createElement('a');
  a.href = "inscreva.html"
  const button = document.createElement('button');

  button.classList.add('btn-vermelho');
  button.innerText = "SE INSCREVA";

  a.appendChild(button);
  menu.appendChild(ul);
  menu.appendChild(a);
  navbar.appendChild(menu);
  navbarTag.appendChild(navbar);



})


{/* 
  <div class="nav-bar">
    <div class="nav-link">
      <ul>
        <li> <img src="logo.png" id="logo"></li>
          <a href="home.html">
            <li>MENU PRINCIPAL</li>
          </a>
          <a href="rsalgadas.html">
            <li>RECEITAS SALGADAS</li>
          </a>
          <a href="rdoces.html">
            <li>RECEITAS DOCES</li>
          </a>
      </ul>

      <a href="inscreva.html">
        <button type="button" class="btn-vermelho"> 
        SE INSCREVA
        </button>
      </a>

    </div>
  </div> 
*/}