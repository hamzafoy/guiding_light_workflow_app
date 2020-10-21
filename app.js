let randomAyat = Math.floor((Math.random() * 6235) + 1);
const url = `http://api.alquran.cloud/v1/ayah/${randomAyat}/editions/quran-uthmani,en.sahih`;
const zipcode = 40220;
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

getAyat();
getWeather();
getTime();
setInterval(getTime, 1000);