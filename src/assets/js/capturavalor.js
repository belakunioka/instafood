//Funções utilisadas na criação e busca de receitas

//Pega o id associado ao utensilio ou tag
function capturarValor(objeto, valor) {
    for (let chave in objeto) {
        if (objeto[chave] === valor && objeto.hasOwnProperty(chave)) {
            return chave;
        }
    }
}


const utensiliosList = {
    "1": "batedeira",
    "2": "forno",
    "3": "liquidificador",
    "4": "fogão",
    "5": "microondas"
};

const tagsList = {
    "1": "sem culpa",
    "2": "glúten free",
    "3": "lactose free",
    "4": "vegano",
    "5": "vegetariano"
};

//Verifica os checkbox selecionados
function getCheckboxChecked(tagsOrUtensils, checkboxClass) {
    let listOfElements = [];
    let elements = document.querySelectorAll(checkboxClass);
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].checked == true) {
            listOfElements.push({ id: Number(capturarValor(tagsOrUtensils, elements[i].value)) });
        }
    }
    return listOfElements;
};

function getCheckboxCheckedSearch(tagsOrUtensils, checkboxClass) {
    let listOfElements = [];
    let elements = document.querySelectorAll(checkboxClass);
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].checked == true) {
            listOfElements.push(Number(capturarValor(tagsOrUtensils, elements[i].value)));
        }
    }
    return listOfElements;
};