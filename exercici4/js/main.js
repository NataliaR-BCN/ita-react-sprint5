"use strict";
//NIVELL 1 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Shows a random joke from an API.
 * @returns nothing
 */
function showAJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`https://icanhazdadjoke.com/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        const randomJoke = yield response.json();
        const textJoke = document.getElementById('joke-text');
        const jokeRating = document.getElementById('joke-rating');
        const buttonNextJoke = document.getElementById('next-joke');
        textJoke.innerHTML = randomJoke.joke;
        jokeRating.style.display = "flex";
        buttonNextJoke.innerText = "Següent acudit";
    });
}
const reportJokesArray = [];
/**
 * Collects joke's data, converts rating feedback in a score and stores all (joke, user's feedback as a score and date) in an array.
 * @param ratingSelected - The string of the rating selected by user
 * @returns nothing
 */
const jokeScoreSaved = (ratingSelected) => {
    //Conversion from rating to score:
    let scoreConverted;
    ratingSelected === "bad" ? scoreConverted = 1 : ratingSelected === "good" ? scoreConverted = 3 : scoreConverted = 2;
    const currentDate = new Date().toISOString();
    const textJoke = document.getElementById('joke-text');
    const currentJoke = textJoke.innerHTML;
    const jokeRated = {
        joke: currentJoke,
        score: scoreConverted,
        date: currentDate
    };
    reportJokesArray.push(jokeRated);
    console.log(reportJokesArray);
};
//Event to get jokes' rating:
document.querySelectorAll('#joke-rating button').forEach(ratingButton => {
    ratingButton.addEventListener('click', function () {
        jokeScoreSaved(this.id);
    });
});
//NIVELL 2
//Exercici 4
/**
 * Gets user's position coords to provide local current weather
 * @returns nothing
 */
function getLocationEx4() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPositionEx4, errorLocationEx4);
    }
    else {
        alert("Geolocation is not supported by this browser.");
        errorLocationEx4();
    }
}
/**
 * Sends location data to the weather function
 * @returns nothing
 */
function showPositionEx4(position) {
    showWeatherEx4(position.coords.latitude, position.coords.longitude);
}
/**
 * Set position coords by default, if getLocation throws an error or user denies:
 * @returns nothing
 */
function errorLocationEx4() {
    showWeatherEx4(41.408, 2.1575); //Barcelona coords  
}
/**
 * Connects to OpenWeatherMap API to get local weather information
 * @param latValue - The number of user's latitude
 * @param lonValue - The number of user's longitude
 * @returns nothing
 */
function showWeatherEx4(latValue, lonValue) {
    return __awaiter(this, void 0, void 0, function* () {
        const MI_API_KEY = 'SORRY! Fake KEY ;)'; // @Pablo: te la paso en la entrega para no colgarla en GitHub
        const API_WEATHER = `https://api.openweathermap.org/data/2.5/weather?lat=${latValue}&lon=${lonValue}&units=metric&lang=ca&appid=${MI_API_KEY}`;
        const response = yield fetch(API_WEATHER);
        const convert = yield response.json();
        const weatherInfo = document.getElementById('weather-forecast');
        weatherInfo.innerHTML = `Avui: ${convert.weather[0].description}`;
    });
}
