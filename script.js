document.addEventListener('DOMContentLoaded', async () => {
  // Navbar
  const navbarTag = document.querySelector('nav');
  if (navbarTag) {
    const navbar = await fetch('/src/components/navbar.html').then(res => res.text());
    navbarTag.innerHTML = navbar;
  }
  // Sidenav
  const sidenavTag = document.querySelector('#sidenav');
  if (sidenavTag) {
    const sidenav = await fetch('/src/components/sidenav.html').then(res => res.text());
    sidenavTag.innerHTML = sidenav;
  }

});