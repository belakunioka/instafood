$("body").prepend('<div class="nav-bar">' +
'<div class="nav-link">'+
' <ul>'+
'   <li><img src="/src/assets/img/logo.png" id="logo"></li>' +
'   <a href="/">'+
'     <li>MENU PRINCIPAL</li>' +
'   </a>'+
'   <a href="/">'+
'     <li>RECEITAS SALGADAS</li>'+
'   </a>'+
'   <a href="/">'+
'     <li>RECEITAS DOCES</li>'+
'   </a>'+
' </ul>'+
 '<a href="/"><button type="button" class="btn-vermelho"> SE INSCREVA </button></a>'+
  '</div>'+
'</div>')

$("body").prepend("<div class='vertical-bar'>" +
"<div class='search-icon'>" +
  "<a href='/'><i class='fa fa-th-list'></i></a>" +
  "<i class='fa fa-search'></i>" +
   "<div class='search-icon'>" +
   "<ul>" +
      "<li><a href='/' target='_blank'>RECEITAS <br>SALVAS</a></li>" +
      "<li><a href='/' target='_blank'>POSTAR</a></li>" +
      "<li><a href='/' target='_blank'>LOGIN</a>" +
      "</li>" +
      "</ul>" +
      "</div>" +
      "</div>" +
"<div class='social-icons'>" +
  '<i class="fab fa-facebook-f"></i>' +
  "<a href='/' class='fab fa-twitter '></a>"+
  "<a href='/' class='fab fa-pinterest '></a>" +
  "<a href='/' class='fab fa-instagram '></a>" +
  "</div>" +
  "</div>")