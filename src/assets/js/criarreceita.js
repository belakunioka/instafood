const nome = localStorage.getItem('nome');

// Se o usuário não estiver logado, redireciona para página de login
if (!nome) {
    alert('Faça login para postar uma receita');
    setTimeout(() => window.location.href = 'http://127.0.0.1:5500/src/templates/login.html', 200);
}

// Se estiver logado, pega o token
const token = localStorage.getItem('token');

//Multipages form
let form = $("#create-receipe-form");
let currentTab = 0;
let tabs = $(".tab");

$("#prev-btn").hide(); //hide first previous button
$(".form-step").eq(0).addClass("active");

//Show current table on the form
function showTab(step) {
    tabs.eq(step).show();

    //Previous/Next buttons
    step == 0 ? $("#prev-btn").hide() : $("#prev-btn").show();
    step == tabs.length - 1 ? $("#next-btn").html("Postar receita")
        : $("#next-btn").html("Próximo passo");

    fixStepIndicator(step)
}

//Will figure out which tab to display
function nextPrev(step) {
    if (step == 1 && !validateForm()) return false;

    tabs.eq(currentTab).hide();
    currentTab = currentTab + step;

    if (currentTab == tabs.length) { //end of form
        $("#next-btn").attr("class", "btn-submit-receipe btn-form");
        return false;
    }
    showTab(currentTab);
}
//Check every input in the current tab - except for ingredients
function validateForm() {
    let valid = true;
    if (currentTab != 1) {
        let input = tabs.eq(currentTab).find("input[type=text]");
        let radio = tabs.eq(currentTab).find('input[name=receipe-type]:checked')
        for (let i = 0; i < input.length; i++) {
            if (input.eq(i).val() == "" || radio.val() == null) {
                $("#alert").html("* Todos os campos devem ser preenchidos");
                valid = false;
            }
        }
    }
    return valid;
}

//Change arrow color
function fixStepIndicator(step) {
    $("#alert").html("");
    let arrowIcon = $(".form-step");

    for (let i = 0; i < arrowIcon.length; i++) {
        arrowIcon.eq(i).className = arrowIcon.eq(i).removeClass("active");
    }
    arrowIcon.eq(step).addClass("active");
}

//ADD button - ingredients
//Inputs
let ingredientInputs = [$("#ingredient-name"), $("#ingredient-quantity"), $("#quantity-unit")];

//Check if it was well filled and call setIngredients
$("#insert-ingredient").click("click", () => {
    if (ingredientInputs[0].val() == ""
        || ingredientInputs[1].val() == ""
        || ingredientInputs[2].val() == "") {
        return;
    }

    setIngredients(ingredientInputs);
}, false);

function setIngredients(arr) {
    let listOfIngredients = $(`
    <ul class="ingredient-list">
        <li class="ingredient-name">${arr[0].val()}</li>
        <li class="ingredient-quantity">${arr[1].val()}</li>
        <li class="ingredient-unity">${arr[2].val()}
            <button class="remove" onclick="removeIngredient(this)" type="button">
                <i class="fas fa-minus"></i>
            </button>
        </li>
    </ul>`);
    $("#selected-ingredients").append(listOfIngredients);

    //Clear input
    arr.forEach(element => {
        element.val("");
    });
}

//Remove button - ingredients
function removeIngredient(ingredient) {
    $(ingredient).closest('.ingredient-list').remove();
}

//ADD button - receipe steps
let receipeStepsList = $("#receipe-steps-list")
let stepDescriptionCounter = 0;
$("#insert-step").click("click", () => {
    //Check if last step was well filled
    if ($(".step-info").eq(stepDescriptionCounter).val() == "") {
        return;
    }
    setStep();
    stepDescriptionCounter++;
}, false);

function setStep() {
    let receipeStep = $(`
    <li class="step-item">
        <fieldset class="input-form">
            <label for="step">Passo</label>
            <textarea class="step-info" name="step"></textarea>
        </fieldset>
        <button class="remove remove-step" onclick="removeStep(this)" type="button">
            <i class="fas fa-minus"></i>
        </button>
    </li>`);
    receipeStepsList.append(receipeStep);
}

//Remove button - steps
function removeStep(step) {
    $(step).closest('.step-item').remove();
    stepDescriptionCounter--;
}

$("#submit-btn").click("click", () => {
    form.submit();
});


//*******************************POST************************************* */
const submitBtn = document.getElementById("next-btn");
const receipeImage = document.getElementById("receipe-image");

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
    if (submitBtn.classList.contains("btn-submit-receipe")) {
        axios({
            method: 'POST',
            url: "http://localhost:8080/api/receitas",
            body: JSON.stringify(getReceipeData()),
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => console.log(res.json()))
            .catch(error => console.log(error));

        // receipeImage.addEventListener("change", (event) => {
        //     let image = event.target.files[0]

        //     const formData = new FormData()
        //     formData.append("image", image);

        //     axios.patch(`http://localhost:8080/api/receitas/receita/imagem/${id}`, formData)
        //         .then(res => console.log(res))
        //         .catch(error => console.log(error));
        // })

        document.getElementById("create-receipe-form").submit()
        window.location.href = "http://127.0.0.1:5500/index.html";
    }
})