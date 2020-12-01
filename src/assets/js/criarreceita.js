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
    step == tabs.length-1? $("#next-btn").html("Postar receita")
        : $("#next-btn").html("Próximo passo");

    fixStepIndicator(step)
}

//Will figure out which tab to display
function nextPrev(step) {
    if (step == 1 && !validateForm()) return false;

    tabs.eq(currentTab).hide();
    currentTab = currentTab + step;

    if (currentTab == tabs.length) { //end of form
        $("#next-btn").removeAttr("type").attr("type", "submit");
        return false;
    }
    showTab(currentTab);
}
//Check every input in the current tab - except for ingredients
function validateForm() {
    let valid = true;
    if (currentTab != 1) {
        let input = tabs.eq(currentTab).find("input");
        for (let i = 0; i < input.length; i++) {
            if (input.eq(i).val() == "") {
                $("#alert").html("* Os campos devem ser preenchidos");
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