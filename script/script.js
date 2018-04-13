// functie expressie om JSON-request via url uit te voeren
const getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

let buttonM = document.getElementById('buttonM');
let buttonD = document.getElementById('buttonW');

buttonM.addEventListener('click', function() {
    weatherStatus = 'mariakerke';
    weatherApi();
})
buttonW.addEventListener('click', function() {
    weatherStatus = 'wondelgem';
    weatherApi();
})

function weatherApi() {
    // get json data
    getJSON('https://api.openweathermap.org/data/2.5/weather?q=' + weatherStatus + '&units=metric&APPID=b4cf8456b5752c219f4d17fe85818dcc', function(error, data) {
        // show error
        if (error) {
            // do something here
            return false;
        }

        //console.log(data);
        let weatherList = document.getElementById('weatherList');
        let weatherListR = document.getElementById('weatherListRight');
        let grid_item1 = document.getElementById('grid_item1');
        //H2 IS CREATED IN THE HTML WITH THE CLASS weatherTitle
        let weatherTitle = document.getElementById('weatherTitle');

        // DELETE ALL CHILDREN
        weatherList.innerHTML = '';
        weatherListR.innerHTML = '';
        weatherTitle.innerHTML = '';
        //FIRST CHECK IF ICON WITH CLASS weatherIconStyle EXIST
        if (document.querySelector('img.weatherIconStyle')) {
            grid_item1.removeChild(document.querySelector('img.weatherIconStyle'));
        };

        //H2 IS CREATED IN THE HTML WITH THE CLASS weatherTitle
        let nameCity = document.createTextNode('Het weer in ' + data.name + ' - ' + data.sys.country);
        //add textnode to h2 element
        weatherTitle.appendChild(nameCity);

        //create list item

        //create temperature items
        let temp = [data.main.temp.toFixed(1), 'max: ' + data.main.temp_max, 'min: ' + data.main.temp_min];
        //create wind items
        let extraInfo = ['Wind: ' + data.wind.speed + ' m/s', 'Luchtvochtigheid: ' + data.main.humidity + ' %'];
        //add temperature items to list
        for (i = 0; i < temp.length; i++) {
            let listItem = document.createElement('li');
            listItem.append(temp[i] + '°C');
            weatherList.appendChild(listItem);
        }
        //add extraInfo to list
        for (i = 0; i < extraInfo.length; i++) {
            let listItem = document.createElement('li');
            listItem.append(extraInfo[i]);
            weatherListR.appendChild(listItem);
        }

        //add icon
        let weatherIcon = document.createElement('img');
        let weatherIconStatus = data.weather["0"].icon;
        weatherIcon.src = 'http://openweathermap.org/img/w/' + weatherIconStatus + '.png';
        weatherIcon.classList.add('weatherIconStyle');
        grid_item1.appendChild(weatherIcon);
    });
}

//NEWS
const url = 'https://newsapi.org/v2/top-headlines?' +
'country=us&' +
'category=sports&' +
'apiKey=614e47d6de384d80a3355779914e9c6d';

let req = new Request(url);
fetch(req)
.then((resp) => resp.json())
.then(function(data){
document.getElementById("div2").innerHTML +="<h3> Het Nieuws </h3>";
for (a = 0; a <= 2; a++) { 
let article = data.articles[a];

document.getElementById("div2").innerHTML += "<div id='bullet'>" + "<h5> " + 
                                      article.title + "</h5>" + "<small>" + 
                                      article.description + "</small>" + "</br> </div> </br>";
}
})


const button = document.getElementById('btnMakeJoke');
button.addEventListener('click', function(){
    
// waardes uit de elementen halen
    const firstName = document.getElementById('firstNameField').value;
    const lastName = document.getElementById('lastNameField').value;

    //GET JSON
    //Url met dynamische parameters
    const url = 'http://api.icndb.com/jokes/random?firstName=' + firstName + '&lastName=' + lastName;


//JSON FUNCTIE OPROEPEN, BINNEN DE CALLBACK MANIPULEREN WE DE VERKREGEN DATA
    getJSON(url, function(error, data) {
    
    //Fact komt in je venster
    //DEZE STAAT UIT WEGENS DAT HIJ NIET WERKT, SCHERM REFRESHT EN IK BEN ALLES KWIJT... HELP!
    //document.write(data.value.joke);

   //list item maken
   const listItem = document.createElement('li');
   //inhoud aan toevoegen
   listItem.textContent = data.value.joke;
   //
   factsList.appendChild(listItem);

});
})

//Drank api
getJSON('https://www.thecocktaildb.com/api/json/v1/1/random.php', function(error, data) {

document.getElementById("div4").innerHTML += "<div id='bullet'>" + 
"<h5> Zin in een cocktail? </h5> <small> Probeer deze heerlijke drankjes eens: </small>" + 
"<h4 class='title'> '" + data.drinks[0].strDrink + "'</h4>" +
"<img src=' " + data.drinks[0].strDrinkThumb + "' width='100%' height='100%'> </br></br> " +
"<p>" + data.drinks[0].strIngredient1 + " </br>" + 
data.drinks[0].strIngredient2 + "</br>" + 
data.drinks[0].strIngredient3 + "</br>" + 
data.drinks[0].strIngredient4 + "</br>" + 
data.drinks[0].strIngredient5 + "</br>" + 
data.drinks[0].strIngredient6 + "</br>" + 
"<p>" + data.drinks[0].strInstructions + " </p> </div>"; 

});

//quote api
getJSON('http://quotes.rest/qod.json', function(error, data) {
    if (error) {
        // do something here
        return false;
    }
    //quote
    let quote = document.createElement('p');
    quote.innerHTML = "'" + data.contents.quotes["0"].quote;
    let grid_item3 = document.getElementById('grid_item3');
    quote.classList.add('quoteStyle');
    grid_item3.appendChild(quote);

    //author
    let author = document.createElement('p');
    author.innerHTML = ' - ' + data.contents.quotes["0"].author + ' - ';
    author.classList.add('authorStyle');
    grid_item3.appendChild(author);

});