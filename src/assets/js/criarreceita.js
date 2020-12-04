const nome = localStorage.getItem('nome');

// Se o usuário não estiver logado, redireciona para página de login
if (!nome) {
    alert('Faça login para postar uma receita');
    setTimeout(() => window.location.href = 'http://127.0.0.1:5500/src/templates/login.html', 200);
}

// Se estiver logado, pega o token
const token = localStorage.getItem('token');
const id = localStorage.getItem('id')

//Dropdown ingredients
const dropDownIngredients = $("#ingredient-name");
dropDownIngredients.empty();
dropDownIngredients.append('<option value=0 selected="true" disabled>Selecione um ingrediente</option>');
dropDownIngredients.prop('selectedIndex', 0);

axios.get("http://localhost:8080/api/produtos")
    .then(res => {
        for (let i = 0; i < res.data.length; i++) {
            let product = $(`
        <option value=${res.data[i].id}>${res.data[i].nome}</option>
        `)
            dropDownIngredients.append(product)
        }
    })

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
    if (ingredientInputs[0].val() == null
        || ingredientInputs[1].val() == ""
        || ingredientInputs[2].val() == "") {
        return;
    }

    setIngredients(ingredientInputs);
}, false);

function setIngredients(arr) {
    let listOfIngredients = $(`
    <ul class="ingredient-list">
        <li class="ingredient-name" value=${arr[0].val()}>${arr[0].find(":selected").text()}</li>
        <li class="ingredient-quantity" value=${arr[1].val()}>${arr[1].val()}</li>
        <li class="ingredient-unity" value=${arr[1].val()}>${arr[2].val()}
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


//*******************************POST**************************************/
const submitBtn = document.getElementById("next-btn");

//Data

function getIngredients() {
    let listOfIngredients = [];
    let ingredientsName = document.querySelectorAll(".ingredient-name");
    let ingredientsQuantity = document.querySelectorAll(".ingredient-quantity");
    let ingredientsUnity = document.querySelectorAll(".ingredient-unity");
    let ingredientsTable = document.getElementById("selected-ingredients").childNodes;
    for (let i = 0; i < ingredientsTable.length; i++) {
        let ingredient = {
            produto: {
                id: ingredientsName[i].value
            },
            quantidade: ingredientsQuantity[i].value,
            unidade: ingredientsUnity[i].value
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
    let tags = getCheckboxChecked(tagsList, ".checkbox-tag");
    let utensilios = getCheckboxChecked(utensiliosList, ".checkbox-utensil");
    let ingredientes = getIngredients();
    let passos = getSteps();

    let receita = {
        titulo: nome,
        tipo: tipo,
        tempoPreparo: tempo + " min",
        rendimento: porcao + " porções",
        instrucoes: passos,
        usuario: {
            id: Number(id)
        },
        utensilios: utensilios,
        ingredientes: ingredientes,
        tags: tags
    };
    return receita;
};

//Requisição
submitBtn.addEventListener("click", async () => {
    console.log(getReceipeData());
    if (submitBtn.classList.contains("btn-submit-receipe")) {
        const data = getReceipeData();

        try {
            const receita = await axios.post('http://localhost:8080/api/receitas', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(res => res.data);
            if (receita) {
                const image = document.getElementById("receipe-image").files[0];
                const fd = new FormData();
                console.log(fd);
                fd.append('imagem', image);
                
                await axios.post(`http://localhost:8080/api/receitas/receita/imagem/${receita.id}`, fd, { 
                    headers: {
                         'Authorization': `Bearer ${token}`,
                         'Content-Type': 'multipart/form-data' }
                     })
                     .then(res => alert('Imagem alterada com sucesso!'))
                     .catch(err => console.log(err.response));
            }
        } catch (err) {
            console.log(err);
        }


        /*
        axios.post('http://localhost:8080/api/receitas', data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then((res) => () => {
                const image = document.getElementById("receipe-image").files[0];
                const formData = new FormData()
                formData.append("image", image);

                axios.post(`http://localhost:8080/api/receitas/receita/imagem/${res.data.id}`, formData, { 
                headers: {
                     'Authorization': `Bearer ${token}`,
                     'Content-Type': 'multipart/form-data' }
                 })
                 .then(res => alert('Imagem alterada com sucesso!'))
                 .catch(err => alert(err.response.data.mensagem));
            })
            .then(res => alert('Receita postada com sucesso!'))
            .then(res => {
                document.getElementById("create-receipe-form").submit()
                window.location.href = "http://127.0.0.1:5500/index.html";
            })
            .catch(error => console.log(error));
*/
        
    }
})