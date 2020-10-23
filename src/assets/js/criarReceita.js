//Remove navbar elements
$(".nav-link").empty();

//Multipages form
let currentTab = 0;
let tabs = $(".tab");

$("#prev-btn").hide(); //hide first previous button
$(".form-step").eq(0).addClass("active")

    //Show current table on the form
function showTab (step){
    tabs.eq(step).show();

        //Previous/Next buttons
    step == 0? $("#prev-btn").hide() : $("#prev-btn").show();
    step == tabs.length-1? $("#next-btn").html("Postar receita") 
    : $("#next-btn").html("Próximo passo");

    fixStepIndicator(step)
}

    //Will figure out which tab to display
function nextPrev(step) {
    if (step == 1 && !validateForm()) return false;

    tabs.eq(currentTab).hide();
    currentTab = currentTab + step;

    if (currentTab >= tabs.length){ //end of form
        $("#create-receipe-form").submit();
        return false;
    }
    showTab(currentTab)
}
    //Check every input in the current tab
function validateForm () {
    let valid = true;
    let input = tabs.eq(currentTab).find("input[type='text']");
    console.log(input.val())
    for (let i = 0; i < input.length; i++){
        if (input.eq(i).val() == ""){
            $("#alert").html("* Os campos devem ser preenchidos");
            valid = false;
        }
    }
    return valid;
}

    //Change arrow color
function fixStepIndicator(step) {
    $("#alert").html("");
    let arrowIcon = $(".form-step");

    for (let i = 0; i<arrowIcon.length; i++){
        arrowIcon.eq(i).className = arrowIcon.eq(i).removeClass("active")
    }
    arrowIcon.eq(step).addClass("active");
}