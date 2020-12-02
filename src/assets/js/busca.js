const container = document.querySelector('.container');
var inputValue = document.querySelector('.input');
const add = document.getElementById('.add');

if (window.localStorage.getItem("todos") == undefined) {
    var todos = [];
    window.localStorage.setItem("todos", JSON.stringify(todos));
}

var todosEX = window.localStorage.getItem("todos");
var todos = JSON.parse(todosEX);


class item {
    constructor(name) {
        this.createItem(name);
    }
    createItem(name) {
        var itemBox = document.createElement('div');
        itemBox.classList.add('item');

        var input = document.createElement('input');
        input.type = "text";
        input.disabled = true;
        input.value = name;
        input.setAttribute("class", "ingredient-item-search item_input")

        var edit = document.createElement('button');
        edit.setAttribute('type', 'button');
        edit.classList.add('edit');
        edit.innerHTML = "edit";
        edit.addEventListener('click', () => this.edit(input, name));

        var remove = document.createElement('button');
        remove.classList.add('remove');
        remove.innerHTML = "-";
        remove.addEventListener('click', () => this.remove(itemBox, name));

        container.appendChild(itemBox);

        itemBox.appendChild(input);
        itemBox.appendChild(edit);
        itemBox.appendChild(remove);

    }

    edit(input, name) {
        if (input.disabled == true) {
            input.disabled = !input.disabled;
        }
        else {
            input.disabled = !input.disabled;
            let indexof = todos.indexOf(name);
            todos[indexof] = input.value;
            window.localStorage.setItem("todos", JSON.stringify(todos));
        }
    }

    remove(itemBox, name) {
        itemBox.parentNode.removeChild(itemBox);
        let index = todos.indexOf(name);
        todos.splice(index, 1);
        window.localStorage.setItem("todos", JSON.stringify(todos));
    }
}

window.addEventListener('keydown', (e) => {
    if (e.which == 13) {
        check();
    }
})

function check() {
    if (inputValue.value != "") {
        new item(inputValue.value);
        todos.push(inputValue.value);
        window.localStorage.setItem("todos", JSON.stringify(todos));
        inputValue.value = "";
    }
}


for (var v = 0; v < todos.length; v++) {
    new item(todos[v]);
}


//Requisição buscar receitas

//Carrega lista de ingredientes
let ingredientsList = {}

axios.get("http://localhost:8080/api/produtos")
    .then(res => {
        for (let i = 0; i < res.data.length; i++) {
            let id = res.data[i].id
            let nome = res.data[i].nome.toLowerCase()
            ingredientsList[id] = nome
        }
    })

//Captura id dos ingredientes buscados
function getIngredientsSearch() {
    let listOfIngredients = [];
    let selectedIngredients = document.querySelectorAll(".ingredient-item-search")
    for (let i = 0; i < selectedIngredients.length; i++) {
        let ingredient = capturarValor(ingredientsList, selectedIngredients[i].value.toLowerCase())
        if (ingredient != undefined) {
            listOfIngredients.push(ingredient)
        }
    }
    return listOfIngredients;
};

//Botão que faz requisição

const exibirReceitas = document.getElementById('exibir-receitas');
exibirReceitas.addEventListener("click", () => {

    let receitasEncontradas = []

    const data = {
        "produtos": getIngredientsSearch(),
        "utensilios": getCheckboxCheckedSearch(utensiliosList, ".checkbox-utensil"),
        "tags": getCheckboxCheckedSearch(tagsList, ".checkbox-tag"),
        "pagina": 1,
        "tamanho": 1
    }

    axios.post("http://localhost:8080/api/receitas/busca", data)
        .then(res => {
            for (let i = 0; i < res.data.length; i++) {
                let idReceita = res.data[i].id;
                let nomeReceita = res.data[i].titulo;
                receitasEncontradas.push([idReceita, nomeReceita])
            }
            window.localStorage.setItem("receitasEncontradas", JSON.stringify(receitasEncontradas));
            document.getElementById("search-form").submit()
            window.location.href = "http://127.0.0.1:5500/resultadodabusca.html"

        })
        .catch(err => console.log(err))
})
