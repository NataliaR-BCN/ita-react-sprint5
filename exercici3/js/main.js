"use strict";
//Nivell 1
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
function showJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`https://icanhazdadjoke.com/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        const randomJoke = yield response.json();
        const textJoke = document.getElementById('joke-text');
        textJoke.innerHTML = randomJoke.joke;
    });
}
const reportJokes = [];
/**
 * Collects joke's data (joke, user's feedback and date) and stores it in an array.
 * @param scoreSelected - The number of the score selected by user
 * @returns nothing
 */
function jokeScore(scoreSelected) {
    const currentDate = new Date().toISOString();
    const textJoke = document.getElementById('joke-text');
    const currentJoke = textJoke.innerHTML;
    const jokeRated = { joke: currentJoke, score: scoreSelected, date: currentDate };
    reportJokes.push(jokeRated);
    console.log(reportJokes);
}
