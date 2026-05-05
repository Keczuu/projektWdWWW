async function loadGame(id) {
    const response = await fetch('http://localhost:3000/games/' + id.toString())
    const games = await response.json()
    console.log(games)
    return games
}

function seeGames(){
    let id = 1
    while (id < 20) {
        let game = loadGame(id)
        document.getElementById("game_adding_menu").innerHTML = "Gra dodana:-P";
        id += 1
    }
}





// npx json-server src/db.json

// const fajnie = await fetch('http://localhost:3000/games/1')
// const text = await fajnie.text()



