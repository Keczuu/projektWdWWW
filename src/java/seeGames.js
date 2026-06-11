async function loadGames() {
    const res = await fetch("http://localhost:3000/games");
    const games = await res.json();
    return games;
}

async function seeGames() {
    const content = document.querySelector('.content');
    const games = await loadGames();

    games.forEach(game => {
        const card = document.createElement("div");
        card.classList.add("game-card");

        const title = document.createElement("h3");
        title.classList.add("game-title");
        title.textContent = game.title;

        const gameContent = document.createElement("div");
        gameContent.classList.add("game-content");

        const img = document.createElement("img");
        img.classList.add("game-cover");
        img.src = game.picture || "src/img/plchld.png";
        img.alt = game.title;

        const stats = document.createElement("div");
        stats.classList.add("game-stats");

        const stars = document.createElement("div");
        stars.classList.add("stat-item", "stars");
        stars.textContent = "★".repeat(game.difficulty);

        const rating = document.createElement("div");
        rating.classList.add("stat-item", "circle", "rating-pink");
        rating.textContent = game.rating ?? "-";

        const pg = document.createElement("div");
        pg.classList.add("stat-item", "circle", "pg-orange");
        pg.textContent = game.age_rating;

        const daniel = document.createElement("div");
        daniel.classList.add("stat-item", "checkbox");
        daniel.textContent = game.daniel ? "☑" : "☐";

        const year = document.createElement("div");
        year.classList.add("stat-item", "year");
        year.textContent = game.year_of_release;

        const button = document.createElement("button");
        button.classList.add("review-btn");
        button.textContent = "Dodaj opinię";
        button.dataset.id = game.id;

        button.addEventListener("click", () => {
            console.log("ID gry:", game.id);
        });

        stats.append(stars, rating, pg, daniel, year);
        gameContent.append(img, stats);
        card.append(title, gameContent, button);

        content.appendChild(card);
    });
}

seeGames();