var numField1 = document.getElementById('numField1');
var numField2 = document.getElementById('numField2');

var resultFieldWine1 = document.getElementById('resultFieldWine1');
var resultFieldBeer1 = document.getElementById('resultFieldBeer1');
var resultFieldSpirits2 = document.getElementById('resultFieldSpirits1');

var resultFieldWine2 = document.getElementById('resultFieldWine2');
var resultFieldBeer2 = document.getElementById('resultFieldBeer2');

var resultFieldWine3 = document.getElementById('resultFieldWine3');
var resultFieldBeer3 = document.getElementById('resultFieldBeer3');
var resultFieldSpirits3 = document.getElementById('resultFieldSpirits3');

var form = document.getElementById('calculation');

// Wine beer, spirits calculation
form.addEventListener('submit', function(event){

    if (!numField1.value || !numField2.value) {
        alert("Please enter values in fields");
    } else {
        var totalGuests = parseFloat(numField1.value);
        var totalHours = parseFloat(numField2.value);
        totalHours++;

        var resultWine1 = (((totalGuests * totalHours) * .5) / 5);
        var resultBeer1 = ((totalGuests * totalHours) * .3);
          var resultSpirits1 = ((totalGuests * totalHours) * .2) /15;

// Wine Beer Calculation
        var resultWine2 = (((totalGuests * totalHours) * .6) / 5);
        var resultBeer2 = ((totalGuests * totalHours) * .4);

        var resultWine3 = ((totalGuests * totalHours)/ 5);
        var resultBeer3 = (totalGuests * totalHours) ;
        var resultSpirits3 = (totalGuests * totalHours) /15;
        


        resultFieldWine1.innerText = "Wine: " + Math.round(resultWine1) + " bottles of wine or " + Math.round((resultWine1 /12)) + " cases of wine.";
         resultFieldBeer1.innerText = "Beer: " + Math.round(resultBeer1) + " bottles of beer or " + Math.round((resultBeer1 /24))+ " cases of beer.";
         resultFieldSpirits1.innerText = "Spirits: " + Math.round(resultSpirits1) + " bottles of spirits.";
         
        resultFieldWine2.innerText = "Wine: " + Math.round(resultWine2) + " bottles of wine or "+ Math.round((resultWine2 /12))+ " cases of wine.";
        resultFieldBeer2.innerText = "Beer: " + Math.round(resultBeer2) + " bottles of beer or " + Math.round((resultBeer2 /24))+ " cases of beer.";

        resultFieldWine3.innerText = "Only Wine: " + Math.round(resultWine3) + " bottles of wine or " + Math.round((resultWine3 /12)) + " cases of wine.";
        resultFieldBeer3.innerText = "Only Beer: " + Math.round(resultBeer3) + " bottles of beer or " + Math.round((resultBeer3 /24))+ " cases of beer.";
        resultFieldSpirits3.innerText = "Only Spirits: " + Math.round(resultSpirits3) + " bottles of spirits.";
        
        event.preventDefault();
    }
});
