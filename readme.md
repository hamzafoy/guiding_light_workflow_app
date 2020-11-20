# Workflow App for Guiding Light Islamic Center

<br>

### Instructions for Running this Project

1. **Step 1**: Download MAMP (local server environment) at [MAMP](https://www.mamp.info/en/downloads/).
2. **Step 2**: Run MAMP and go to 'MAMP' on the menu bar and click 'Preferences'. Go to 'Web Server' on the Preferences Menu and 'Select' the Document Root to be on the root folder of my project file.
3. **Step 3**: On your browser, type 'localhost' in your address bar and go to localhost which should open up the app directly with API calls working fine.
3. **Step 3.1**: The .html file should have `code_lou.js` in the script tag at the bottom. `code_lou.js` has the API key inserted so that the async functions & API calls run smoothly.
  
<br>

## Description

*AZM App* is an application programmed in JavaScript. The intention behind this application is to create a workflow application tailored for the board members at a local masjid (mosque) in Louisville, KY.
This application contains a number of API calls including a call to the Alquran API (to fetch random verses and display them in a beautiful Arabic font courtesy of Google Fonts), a call to OpenWeatherMap API
to find the current weather and temperature using the zipcode of Guiding Light Islamic Center, and a call to Aladhan API to convert the current Gregorian calendar date to current Hijri/Islamic calendar date.
**This application is also my capstone project for Code Louisville's September JS course.**

## Code Louisville Basic & Optional Requirements

<br>

| **Capstone Requirement**            | **Code & Execution**                                                                                                                                |
|---------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| *Responsive per Viewport Width*   | View `@media (min-width: 699px)` in **Line 125** - The app changes layout depending on mobile or computer viewport.                   |
| *Readme File*                     | Readme.md can be found in this repo.                                                                          |
| *Project on GitHub w/ 5+ Commits* | Visit [Ross "Hamza" Foy's Github](https://github.com/hamzafoy/azm_glic_app), 13+ commits.                                                                                      |

| **Optional Requirements** | **Code & Execution**                                                             |
|---------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| *Read & parse an external file & display some data*          | View `async function getAyat() {}` starting on **Line 17**.           |
| *Retrieve Data from external API*     | View `async function getAyat()` on **Line 17**, `async function getWeather()` on **Line 74**, & `async function getHijri()` on **Line 116**.      |
| *Create array, populate with multiple values, draw one to display*       | View `async function getHijri()`, specifically Lines **122 through 183**.  |
| *Create function taking 2 or more parameters & returns a new value*   | View `function fixWeatherReading(zipcode, temperature, weather, city)` on **Line 96**.   |
| *Implement a regex to test user input*   | View `let patternRegex = /^\s{1,}/;` & its subsequent use on lines **Line 209** to **Line 228**.   |

**Please note the following: This application is published on Surge at [AZM App Guiding Light Islamic Center Workflow App](http://azm-app.surge.sh/).**