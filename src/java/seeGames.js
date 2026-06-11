let wszystkieGry = [];
let zaladowane = 0;
const ladujMax = 5;
let aktywneLadowanie = 0;

async function loadGames() {
    const response = await fetch('http://localhost:3000/games');
    if (!response.ok) {
        throw new Error(`blad serwera ${response.status}`);
    }
    return await response.json();
}

async function seeGames() {
    const idLadowania = ++aktywneLadowanie;
    const content = document.querySelector('.content');

    const staryPrzycisk = document.getElementById('przyciskWiecej');
    if (staryPrzycisk) {
        staryPrzycisk.remove();
    }

    if (!content) {
        console.error("Brakuje kontenera .content - nie mozna zaladowac gier");
        return;
    }

    zaladowane = 0;
    wszystkieGry = [];

    try {
        const gry = await loadGames();

        if (idLadowania !== aktywneLadowanie || !document.body.contains(content)) {
            return;
        }

        wszystkieGry = gry;
        render(content);

        if (!content.dataset.reviewListenerAttached) {
            content.addEventListener('click', function (event) {
                if (event.target.classList.contains('review-btn')) {
                    const gameId = event.target.dataset.id;
                    console.log('Kliknięto grę o id:', gameId);
                }
            });
            content.dataset.reviewListenerAttached = 'true';
        }

    } catch (error) {
        console.error("Nie mozna zaladowac gier:", error);
        if (document.body.contains(content)) {
            content.innerHTML = '<h3>Blad ladowania gier</h3>';
        }
    }
}

function render(content = document.querySelector('.content')) {
    if (!content) {
        return;
    }

    if (zaladowane == 0) {
        content.innerHTML = '';
    }
    const czesc = wszystkieGry.slice(zaladowane, zaladowane + ladujMax);
    let htmlString = '';
    czesc.forEach(game => {
        let gameDifficulty = game.difficulty || 0;

        let maxDifficulty = Math.max(0, Math.min(gameDifficulty, 5));
        let stars;

        if (isNaN(maxDifficulty)) {
            stars = '☆☆☆☆☆';
        } else {
            let filledStars = '★'.repeat(maxDifficulty);
            let emptyStars = '☆'.repeat(5 - maxDifficulty);
            stars = filledStars + emptyStars;
        }

        let rating = game.rating ?? '-';

        let daniel = game.daniel ? '☑' : '☐';

        // obrazek jeszcze trzeba ogarnac - ogarniete!
        let picture = game.picture || 'src/img/plchld.png';

        htmlString += `
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
    content.insertAdjacentHTML('beforeend', htmlString);
    zaladowane += czesc.length;
    przyciskPoWiecej(content);
}

function przyciskPoWiecej(content = document.querySelector('.content')) {
    let przycisk = document.getElementById('przyciskWiecej');
    if (zaladowane < wszystkieGry.length) {
        if (!przycisk) {
            const backdrop = content ? content.closest('.backdrop') : null;
            if (!backdrop) {
                return;
            }
            przycisk = document.createElement('button');
            przycisk.id = 'przyciskWiecej';
            przycisk.className = 'buttonBright';
            przycisk.style.marginTop = '30px';
            przycisk.innerText = 'Zaladuj wiecej gier';
            przycisk.addEventListener('click', function () {
                render(content);
            });
            backdrop.appendChild(przycisk);
        }
    } else {
        if (przycisk) {
            przycisk.remove();
        }
    }
}

//
// seeGames();
// generalnie trzeba bylo to zakomentowac przez to ze gry ladowaly sie szybciej od strony wiec wywolanie tej funkcji jest w ladowanieStronek.js


// npx json-server src/db.json

// const fajnie = await fetch('http://localhost:3000/games/1')
// const text = await fajnie.text()
