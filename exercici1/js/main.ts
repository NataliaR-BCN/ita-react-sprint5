//Nivell 1
//Exercici 1

/** 
 * Shows in console a random joke from an API. 
 * @returns nothing
 */

async function showJoke(): Promise<void> {
        const response: Response = await fetch(`https://icanhazdadjoke.com/`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });

    const randomJoke = await response.json();

    console.log(randomJoke.joke);

}