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
const reportJokes = [];
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
    reportJokes.push(jokeRated);
    console.log(reportJokes);
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
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, errorLocation);
    }
    else {
        alert("Geolocation is not supported by this browser.");
        errorLocation();
    }
}
/**
 * Sends location data to the weather function
 * @returns nothing
 */
function showPosition(position) {
    showWeather(position.coords.latitude, position.coords.longitude);
}
/**
 * Set position coords by default, if getLocation throws an error or user denies:
 * @returns nothing
 */
function errorLocation() {
    showWeather(41.408, 2.1575); //Barcelona coords  
}
/**
 * Connects to OpenWeatherMap API to get local weather information
 * @param latValue - The number of user's latitude
 * @param lonValue - The number of user's longitude
 * @returns nothing
 */
function showWeather(latValue, lonValue) {
    return __awaiter(this, void 0, void 0, function* () {
        const API_WEATHER = `https://api.openweathermap.org/data/2.5/weather?lat=${latValue}&lon=${lonValue}&units=metric&lang=ca&appid=5ef4db07eb6deb8d094c4d8e544f4631`;
        const response = yield fetch(API_WEATHER);
        const convert = yield response.json();
        let iconNameInOpenWeather = convert.weather[0].icon;
        const weatherInfo = document.getElementById('weather-forecast');
        weatherInfo.innerHTML = `Avui: ${convert.weather[0].description}`;
    });
}
