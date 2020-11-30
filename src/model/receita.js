const submitBtn = document.getElementById("submit-btn");
const receipeImage = document.getElementById("receipe-image");

// receipeImage.addEventListener("change", (event) => {
//     let image = event.target.files[0]

//     const formData = new FormData()
//     formData.append("image", image);

//     axios.patch(`http://localhost:8080/api/receitas/receita/imagem/`, formData)
//         .then(res => console.log(res))
//         .catch(error => console.log(error));
// })

//Data
function getCheckboxChecked(checkboxClass) {
    let listOfElements = [];
    let elements = document.querySelectorAll(checkboxClass);
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].checked == true) {
            listOfElements.push({ nome: elements[i].value });
        }
    }
    return listOfElements;
};

function getIngredients() {
    let listOfIngredients = [];
    let ingredientsName = document.querySelectorAll(".ingredient-name");
    let ingredientsQuantity = document.querySelectorAll(".ingredient-quantity");
    let ingredientsUnity = document.querySelectorAll(".ingredient-unity");
    let ingredientsTable = document.getElementById("selected-ingredients").childNodes;
    for (let i = 0; i < ingredientsTable.length; i++) {
        let ingredient = {
            produto: {
                nome: ingredientsName[i].innerText
            },
            quantidade: ingredientsQuantity[i].innerText,
            unidade: ingredientsUnity[i].innerText
        }
        listOfIngredients.push(ingredient);
    };
    return listOfIngredients;
};

function getSteps() {
    let steps = ""
    let listOfSteps = document.querySelectorAll(".step-item");
    for (let i = 0; i < listOfSteps.length; i++) {
        let stepElement = document.querySelectorAll(".step-info");
        steps += stepElement[i].value + "\n"
    };
    return steps;
};

//Collecting all data
function getReceipeData() {
    let nome = document.getElementById("receipe-name").value;
    let tempo = document.getElementById("receipe-time").value;
    let porcao = document.getElementById("receipe-yield").value;
    let tipo = document.querySelector('input[name=receipe-type]:checked').value;
    let tags = getCheckboxChecked(".checkbox-tag");
    let utensilios = getCheckboxChecked(".checkbox-utensil");
    let ingredientes = getIngredients();
    let passos = getSteps();

    let receita = {
        titulo: nome,
        tipo: tipo,
        tempoPreparo: tempo + " min",
        rendimento: porcao + " porções",
        intrucoes: passos,
        utensilios: utensilios,
        ingredientes: ingredientes,
        tags: tags
    };
    return receita;
};

//Requisição
submitBtn.addEventListener("click", () => {
    axios({
        method: 'POST',
        url: "http://localhost:8080/api/receitas",
        body: JSON.stringify(getReceipeData())
    })
        .then(res => console.log(res.json()))
        .catch(error => console.log(error));
})