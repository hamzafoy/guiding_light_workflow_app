let randomAyat = Math.floor((Math.random() * 6235) + 1);
const url = `http://api.alquran.cloud/v1/ayah/${randomAyat}/editions/quran-uthmani,en.sahih`;
const zipcode = 40218;
import { openWeatherAPIKey } from './carKeys.js';
const url_weather = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&units=imperial&APPID=${openWeatherAPIKey}`;

async function getAyat() {
    try {
        let response = await fetch(url);
        let quranVerse = await response.json();
        const islamicQuotes = document.getElementById('islamicQuotes');
        const islamicQuoteTranslation = document.getElementById('islamicQuoteTranslation');
        let htmlSegment = `<h2>"${quranVerse.data[0].text}"</h2>`;
        let htmlTranslatedSegment = `<h2>${quranVerse.data[1].text}</h2>`;
        islamicQuotes.innerHTML = htmlSegment;
        islamicQuoteTranslation.innerHTML = htmlTranslatedSegment;
    } catch (error) {
        console.log(error);
    }
}

function fixWeatherReading(zipcode, temperature, weather, city) {
    let weatherCondition = weather.replace(/[s]$/, "y").toLowerCase();
    if (weatherCondition === 'rain' || weatherCondition === 'mist') {
        weatherCondition += 'y';
    }
    const temperatureRounded = Math.ceil(temperature);
    const message = `The current weather in the city of ${city} [ZIP: ${zipcode}] is ${temperatureRounded}F with ${weatherCondition} conditions.`;
    return message;
}

function getTime() {
    let clockFace = document.getElementById('currentTime');
    let currentTime = new Date();
    let hourOfDay = currentTime.getHours();
    let am_or_pm = (hourOfDay < 12 ? "AM" : "PM");
    hourOfDay = (hourOfDay < 10 ? "0" : "") + hourOfDay;
    hourOfDay = (hourOfDay > 12) ? hourOfDay - 12 : hourOfDay;
    hourOfDay = (hourOfDay == 0) ? "12" : hourOfDay;
    let minuteOfDay = currentTime.getMinutes();
    minuteOfDay = (minuteOfDay < 10 ? "0" : "") + minuteOfDay;
    let timeOfDay = `${hourOfDay}:${minuteOfDay} ${am_or_pm}`;
    clockFace.innerHTML = timeOfDay;
};

async function getWeather() {
    try {
        let response = await fetch(url_weather);
        let weatherInLouisville = await response.json();
        const weatherForecast = document.getElementById('weatherForecast');
        let htmlSegment = `${fixWeatherReading(zipcode, weatherInLouisville.main.temp, weatherInLouisville.weather[0].main, weatherInLouisville.name)}`;
        weatherForecast.innerHTML = htmlSegment;
    } catch (error) {
        console.log(error);
    }
}

async function getHijri() {
    try {
        let dateDisplay = document.getElementById('currentDateToday');

        let daysOfTheWeek = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ];
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
        let day = currentTime.getDay();
        let dayToday = daysOfTheWeek[`${day}`];
        let month = currentTime.getMonth();
        let fixedMonthHijri = month + 1;
        let monthToday = months[`${month}`];
        let dateToday = currentTime.getDate();
        let yearToday = currentTime.getFullYear();
        let dateMessage = `Today is ${dayToday}, ${monthToday} ${dateToday} ${yearToday}`;
        
        let url_hijri = `http://api.aladhan.com/v1/gToH?date=${dateToday}-${fixedMonthHijri}-${yearToday}`
        let response = await fetch(url_hijri);
        let hijriDateToday = await response.json();
        let currentHijri = `${hijriDateToday.data.hijri.month.en} ${hijriDateToday.data.hijri.day}, ${hijriDateToday.data.hijri.year} AH`;
        dateDisplay.innerHTML = `${dateMessage} </br> ${currentHijri}`;
    } catch (error) {
        console.log(error);
    }
}

let task_input = document.getElementById('task_entry');
let tasks_ul = document.getElementById('tasks_list');
const add_task = document.getElementById('add_task');
let delete_task = document.getElementById('delete_task');

add_task.addEventListener('click', (e) => {
    e.preventDefault();
    let li = document.createElement('li');
    let ul = document.getElementById('tasks_list');
    let isTaskInputEmpty = (task_input.value == "") ? true : false;
    li.textContent = task_input.value;
    li.innerHTML += ` <button id="edit_task">Edit &#9998;</button> <button id="delete_task">Delete &#10008;</button> <button id="increase_importance">Emphasize &#10169;</button>`;
    isTaskInputEmpty === true ? alert("You cannot create a task that is empty!") : ul.appendChild(li);
    task_input.value = "";
});

tasks_ul.addEventListener('click', (e) => {
    let li = e.target.parentNode;
    let li_id = e.target.id;
    let ul = document.getElementById('tasks_list');
    let isButtonForRemoving = (li_id == 'delete_task') ? true : false;
    let isButtonForEditing = (li_id == 'edit_task') ? true : false;
    let isButtonForEmphasis = (li_id == 'increase_importance') ? true : false;
    isButtonForRemoving ? ul.removeChild(li) : console.log('I am about to block you like Ben Wallace!');
    if (isButtonForEmphasis === true && li.style.color != "orange" && li.style.color != "red") {
        li.style.color = "orange";
    } else {
        li.style.color = "white";
    };
    if (isButtonForEditing === true) {
        li.textContent = prompt("Correct the text here");
        li.innerHTML += ` <button id="edit_task">Edit &#9998;</button> <button id="delete_task">Delete &#10008;</button> <button id="increase_importance">Emphasize &#10169;</button>`;
    };
});

tasks_ul.addEventListener('dblclick', (e) => {
    let li = e.target.parentNode;
    let li_id = e.target.id;
    let ul = document.getElementById('tasks_list');
    let isButtonForEmphasis = (li_id == 'increase_importance') ? true : false;
    if (isButtonForEmphasis === true && li.style.color != "red") {
        li.style.color = "red";
    } else {
        li.style.color = "white";
    };
});

getHijri();
getAyat();
getWeather();
getTime();
setInterval(getTime, 1000);