//This variable stores a number between 1 & 6,235 to be used to pull a random verse from the Qu'ran for the async function getAyat()
let randomAyat = Math.floor((Math.random() * 6235) + 1);

//This variable stores the URL for the async function getAyat() with ${randomAyat} calling the variable randomAyat
const url = `http://api.alquran.cloud/v1/ayah/${randomAyat}/editions/quran-uthmani,en.sahih`;

//This variable stores the zipcode that Guiding Light Islamic Center is located in for the async function getWeather()
const zipcode = 40218;

//This import draws my OpenWeatherAPI API key. It is stored in /carKeys.js and logged in .gitignore to ensure I don't accidentally put my API key on a public GitHub repo
import { openWeatherAPIKey } from './carKeys.js';

//This variable stores the URL for the async function getWeather() with ${zipcode} calling the variable zipcode & ${openWeatherAPIKey} drawing the variable storing my API key
const url_weather = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&units=imperial&APPID=${openWeatherAPIKey}`;


async function getAyat() {
    try {
    //This asynchronous HTTP request requests a random verse of the Qu'ran (via AlQuran API) upon load/reload of page.
        let response = await fetch(url);
    //Parses the response into a JSON object.
        let quranVerse = await response.json();
    //The following two variables store elements that I want to print parts of the HTTP request into.
        const islamicQuotes = document.getElementById('islamicQuotes');
        const islamicQuoteTranslation = document.getElementById('islamicQuoteTranslation');
    //The following two variables store the parts of the HTTP request that I want to print onto the app.
        let htmlSegment = `<h2>"${quranVerse.data[0].text}"</h2>`;
        let htmlTranslatedSegment = `<h2>${quranVerse.data[1].text}</h2>`;
    //The following two lines of code print parts of the HTTP request onto the app.
        islamicQuotes.innerHTML = htmlSegment;
        islamicQuoteTranslation.innerHTML = htmlTranslatedSegment;
    } catch (error) {
        console.log(error);
    }
}


function getTime() {
//This variable stores the element on the HTML file that will display the time.
    let clockFace = document.getElementById('currentTime');

//This variable stores an object with the current date and time.
    let currentTime = new Date();

//This variable takes and stores the current (military time) hour found on the Date object.
    let hourOfDay = currentTime.getHours();

//This variable stores a string of 'AM' or 'PM' depending on whether the hour is less than or greater than 12.
    let am_or_pm = (hourOfDay < 12 ? "AM" : "PM");

//The following line of code adds a 0 before the hour if the hour is less than 10.
    hourOfDay = (hourOfDay < 10 ? "0" : "") + hourOfDay;

//The following line of code makes it to where the time displayed on the app is conventional as opposed to military time.
    hourOfDay = (hourOfDay > 12) ? hourOfDay - 12 : hourOfDay;

//The following line of code ensures that hour 0 displays as 12:00.
    hourOfDay = (hourOfDay == 0) ? "12" : hourOfDay;

//This variable takes and stores the current minute found on the Date object.
    let minuteOfDay = currentTime.getMinutes();

//The following line of code adds a 0 before the minute if the minute is less than 10.
    minuteOfDay = (minuteOfDay < 10 ? "0" : "") + minuteOfDay;

//This variable stores the current time to be displayed on the app in the following order: current hour:current minute (AM or PM).
    let timeOfDay = `${hourOfDay}:${minuteOfDay} ${am_or_pm}`;

//The following line of code displays the current time on the app.
    clockFace.innerHTML = timeOfDay;
};


async function getWeather() {
    try {
    //This asynchronous HTTP request requests the current weather (via OpenWeatherMap API) upon load/reload of page.
        let response = await fetch(url_weather);

    //Parses the response from the asynchronous network request into a JSON object.
        let weatherInLouisville = await response.json();

    //This variable stores the element from the HTML file that will display the current weather conditions.
        const weatherForecast = document.getElementById('weatherForecast');
    
    //This variable stores the result of the fixWeatherReading function - more on this function below.
        let htmlSegment = `${fixWeatherReading(zipcode, weatherInLouisville.main.temp, weatherInLouisville.weather[0].main, weatherInLouisville.name)}`;

    //The following line of code displays the current weather conditions on the app.
        weatherForecast.innerHTML = htmlSegment;
    } catch (error) {
        console.log(error);
    }
}


function fixWeatherReading(zipcode, temperature, weather, city) {
//This variable stores the result of reading the weather condition description - it ensures the weather condition description (rain, clouds, etc) is returned in lowercase &
// replaces the 's' at the end of some description with 'y' so that such condition descriptions as clouds reads as cloudy.
    let weatherCondition = weather.replace(/[s]$/, "y").toLowerCase();

//This if statement adds 'y' at the end of a few weather condition descriptions to ensure that they are adjectives and not nouns.
    if (weatherCondition === 'rain' || weatherCondition === 'mist') {
        weatherCondition += 'y';
    }

//This variable stores the temperature as a rounded up whole number - for example: 65 as opposed to 64.12.
    const temperatureRounded = Math.ceil(temperature);

//This variable stores the full weather condition message to be displayed in the app. The previous lines of code ensure that this variable will display a grammatically
// correct message on the app.
    const message = `The current weather in the city of ${city} [ZIP: ${zipcode}] is ${temperatureRounded}F with ${weatherCondition} conditions.`;
    return message;
}


async function getHijri() {
    try {
    //This variable stores the element on the HTML page for the Hijri/Islamic calendar to be displayed on.
        let dateDisplay = document.getElementById('currentDateToday');

    //This variable stores an array containing the names of days of the week.
        let daysOfTheWeek = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];

    //This variable stores an array containing the names of months of the year.
        let months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        let currentTime = new Date();

    //This variable stores the current day derived from the Date object above.
        let day = currentTime.getDay();

    //This variable accesses the appropriate name of the day - .getDay() returns a number 0-6 which is then used to access the appropriate name from the daysOfTheWeek array.
        let dayToday = daysOfTheWeek[`${day}`];

    //This variable stores the current month derived from the Date object.
        let month = currentTime.getMonth();

    //This variable stores the current month derived from the Date object in such a way that can be used with the AlAdhan Islamic Calendar API.
        let fixedMonthHijri = month + 1;

    //This variable accesses the appropriate name of the month - .getMonth() returns a number 0-11 which is then used to access the appropriate name from the months array.
        let monthToday = months[`${month}`];
        let dateToday = currentTime.getDate();
        let yearToday = currentTime.getFullYear();

    //This variable stores the current date display message to be displayed on the app.
        let dateMessage = `Today is ${dayToday}, ${monthToday} ${dateToday} ${yearToday}`;
        
    //This variable stores the Aladhan API URL used to make the network request and draw the current Islamic Calendar date.
        let url_hijri = `http://api.aladhan.com/v1/gToH?date=${dateToday}-${fixedMonthHijri}-${yearToday}`
        let response = await fetch(url_hijri);
        let hijriDateToday = await response.json();

    //This variable stores the current Islamic Calendar date display message to be displayed on the app.
        let currentHijri = `${hijriDateToday.data.hijri.month.en} ${hijriDateToday.data.hijri.day}, ${hijriDateToday.data.hijri.year} AH`;

    //The following line of code adds the Gregorian and Islamic Calendar date display messages onto the app.
        dateDisplay.innerHTML = `${dateMessage} </br> ${currentHijri}`;
    } catch (error) {
        console.log(error);
    }
}


//The following three variables stores elements from HTML page related to the to-do list portion of the app.
let task_input = document.getElementById('task_entry');
let tasks_ul = document.getElementById('tasks_list');
const add_task = document.getElementById('add_task');


//Adds an event listener listening for clicks on the 'Add Task' button.
add_task.addEventListener('click', (e) => {

//The following line of code ensures the page doesn't refresh upon clicking the 'Add Task' button.
    e.preventDefault();

//Creates a 'li' element.
    let li = document.createElement('li');
    let ul = document.getElementById('tasks_list');

//This variable stores true/false based on whether the input box is empty or has text entered by the user.
    let isTaskInputEmpty = (task_input.value == "") ? true : false;

//This variable stores the user's input typed in the input box on the HTML page.
    let addedText = task_input.value;

//Creates a regular expression checking for multiple whitespaces.
    let patternRegex = /^\s{1,}/;

//Applies the regular expression as a test against the user's input to check if the user spammed spaces in the input box.
    let regExTest = patternRegex.test(addedText);

//The following line of code takes the user's input in the input box and adds it as text surrounded by <p> tags to the 'li' element created above.
    li.innerHTML = `<p>${task_input.value}</p>`;

//The following line of code adds a series of buttons to the 'li' element created by the user adding tasks.
    li.innerHTML += ` <span><button title="Edit" id="edit_task">&#9998;</button> <button title="Delete" id="delete_task">&#10008;</button> <button title="Emphasize" id="increase_importance">&#10169;</button></span>`;

//This if statement throws up various alerts telling the user that they cannot leave the input box empty when adding tasks nor add multiple whitespaces
// as a task. If the user added text to the input, then this is used as the text of the created 'li' element above and appended to the <ul> element.
    if (isTaskInputEmpty) {
        alert("You cannot create a task that is empty!")
    } else if (regExTest) {
        alert("Type in complete sentences and omit the whitespaces.");
    } else {
        ul.appendChild(li);
    }

//Clears the input box after a task is created.
    task_input.value = "";
});

//Adds an event listener to the <ul> element itself to listen to various button clicks from the multiple buttons attached to <li> elements.
tasks_ul.addEventListener('click', (e) => {

//The following four variables uses DOM traversal to store various elements and the button's ID.
    let li = e.target.parentNode.parentNode;
    let li_2 = e.target.parentNode.previousElementSibling;
    let li_id = e.target.id;
    let ul = document.getElementById('tasks_list');

//The following three variables store true/false checks based on the ID of the button clicked.
    let isButtonForRemoving = (li_id == 'delete_task') ? true : false;
    let isButtonForEditing = (li_id == 'edit_task') ? true : false;
    let isButtonForEmphasis = (li_id == 'increase_importance') ? true : false;

//This ternary operator will either remove the <li> element if the Delete button is pressed or throw a jokeful error message in the console.
    isButtonForRemoving ? ul.removeChild(li) : console.log('I am about to block you like Ben Wallace!');

//This if statement will change the <li> text color to reflect change in emphasis if the right button is clicked.
    if (isButtonForEmphasis === true && li_2.style.color != "orange" && li_2.style.color != "red") {
        li_2.style.color = "orange";
    } else {
        li_2.style.color = "white";
    };

//This if statement controls the ability to edit the text of an already created task.
    if (isButtonForEditing === true) {
        let newText = prompt("Correct the text here");
        let patternRegex = /^\s{1,}/;
        let regExTest = patternRegex.test(newText);
        let isTheEditEmpty = (newText === null || newText === '' || newText === ' ') ? true : false;
        if (isTheEditEmpty === true) {
            alert("You can't leave the edit field empty!");
        } else if (regExTest) {
            alert("Type in complete sentences and omit the whitespaces.");
        } else {
            li.innerHTML = `<p>${newText}</p>`;
            li.innerHTML += ` <span><button title="Edit" id="edit_task">&#9998;</button> <button title="Delete" id="delete_task">&#10008;</button> <button title="Emphasize" id="increase_importance">&#10169;</button></span>`;
        }
    };
});

//Adds an event listener listening for a double click, used to alter emphasis to the most important rank.
tasks_ul.addEventListener('dblclick', (e) => {
    let li = e.target.parentNode.previousElementSibling;
    let li_id = e.target.id;
    let isButtonForEmphasis = (li_id == 'increase_importance') ? true : false;
    if (isButtonForEmphasis === true && li.style.color != "red") {
        li.style.color = "red";
    } else {
        li.style.color = "white";
    };
});


//Runs all of the functions above and sets an interval of 1 second for the getTime() function.
getHijri();
getAyat();
getWeather();
getTime();
setInterval(getTime, 1000);