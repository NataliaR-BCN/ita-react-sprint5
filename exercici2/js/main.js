"use strict";
//Nivell 1
//Exercici 2
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
function showJokeByScreen() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`https://icanhazdadjoke.com/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        const randomJoke = yield response.json();
        const textJoke = document.getElementById('joke-text');
        const buttonNextJoke = document.getElementById('next-joke');
        textJoke.innerHTML = randomJoke.joke;
        buttonNextJoke.innerText = "Següent acudit";
    });
}
