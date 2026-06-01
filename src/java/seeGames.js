async function loadGames() {
    const response = await fetch('http://localhost:3000/games');
    if (!response.ok) {
        throw new Error(`blad serwera ${response.status}`);
    }
    const games = await response.json();

    return games;
}

async function seeGames() {
    const games = await loadGames();

    const content = document.querySelector('.content');

    content.innerHTML = '';

    games.forEach(game => {
        let gameDifficulty = game.difficulty || 0;

        let maxDifficulty = Math.max(0, Math.min(gameDifficulty, 5));

        if (isNaN(maxDifficulty)) {
            stars = '☆☆☆☆☆';
        } else {
            let filledStars = '★'.repeat(maxDifficulty);
            let emptyStars = '☆'.repeat(5 - maxDifficulty);
            stars = filledStars + emptyStars;
        }

        let rating = game.rating ?? '-';

        let daniel = game.daniel ? '☑' : '☐';

        // obrazek jeszcze trzeba ogarnac
        let picture = game.picture || 'src/img/plchld.png';

        content.innerHTML += `
        <div class="game-card">
            <h3 class="game-title">${game.title}</h3>

            <div class="game-content">

                <img src="${picture}" alt="${game.title}" class="game-cover" />

                <div class="game-stats">
                    <div class="stat-item stars">${stars}</div>

                    <div class="stat-item circle rating-pink">
                        ${rating}
                    </div>

                    <div class="stat-item circle pg-orange">
                        ${game.age_rating}
                    </div>

                    <div class="stat-item checkbox">
                        ${daniel}
                    </div>

                    <div class="stat-item year">
                        ${game.year_of_release}
                    </div>
                </div>

            </div>

            <button class="review-btn" data-id="${game.id}">
                Dodaj opinię
            </button>
        </div>
        `;
    });

    const buttons = document.querySelectorAll('.review-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function() {

            const gameId = this.dataset.id;

            console.log('Kliknięto grę o id:', gameId);

        });
    });
}

seeGames();



// npx json-server src/db.json

// const fajnie = await fetch('http://localhost:3000/games/1')
// const text = await fajnie.text()



