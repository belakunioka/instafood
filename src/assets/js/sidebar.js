document.addEventListener('DOMContentLoaded', () => {

    const sidebarTag = document.getElementById('sidebar');

    const sidebar = document.createElement('div');
    sidebar.classList.add('vertical-bar');

    // Menu
    const menu = document.createElement('div');
    menu.classList.add('search-icon');
    const searchIcon = document.createElement('i');
    searchIcon.classList.add('fa', 'fa-search');

    // Menu Icon    
    const buscaLink = document.createElement('a');
    buscaLink.href = "/src/pages/busca.html";
    const menuIcon = document.createElement('i');
    menuIcon.classList.add('fa', 'fa-th-list');

    //Links
    const links = [
        { href: 'usuario/login.html', name: 'RECEITAS SALVAS' },
        { href: 'usuario/login.html', name: 'POSTAR' },
        { href: 'usuario/login.html', name: 'LOGIN' },
    ]
    const divLinks = document.createElement('div');
    divLinks.classList.add('search-icon');
    const ulLinks = document.createElement('ul');
    links.map(link => {
        let liLink = document.createElement('li');
        let aLink = document.createElement('a');
        aLink.href = link.href;
        aLink.target = "_blank";
        aLink.innerText = link.name;
        liLink.appendChild(aLink);
        ulLinks.appendChild(liLink);
    })
    divLinks.appendChild(ulLinks);

    buscaLink.appendChild(menuIcon);
    menu.appendChild(buscaLink);
    menu.appendChild(searchIcon);
    menu.appendChild(divLinks);

    sidebar.appendChild(menu);
    sidebarTag.appendChild(sidebar);

    // Social media icons
    const socialIcons = document.createElement('div');
    socialIcons.classList.add('social-icons');

    const socialLinks = [
        { href: '#', class: ['fa', 'fa-facebook'] },
        { href: '#', class: ['fa', 'fa-twitter'] },
        { href: '#', class: ['fa', 'fa-pinterest'] },
        { href: '#', class: ['fa', 'fa-instagram'] },
    ]

    socialLinks.forEach(link => {
        let aLink = document.createElement('a');
        aLink.href = link.href;
        link.class.forEach(cl => {
            aLink.classList.add(cl);
        })
        socialIcons.appendChild(aLink);
    })
    sidebar.appendChild(socialIcons);
})