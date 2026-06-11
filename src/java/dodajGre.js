document.querySelector(".add-form")
    .addEventListener("submit", addGame);

async function addGame(event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const difficulty = Number(document.getElementById("trudnosc").value);
    const ageRating = document.getElementById("wiek").value;
    const daniel = document.getElementById("daniel").checked;
    const year = Number(document.getElementById("releaseYear").value);

    if (title.length < 2) {
        alert("Nazwa gry jest za krótka");
        return;
    }

    if (difficulty < 1 || difficulty > 5) {
        alert("Trudność musi być od 1 do 5");
        return;
    }

    if (year < 1950 || year > new Date().getFullYear()) {
        alert("Niepoprawny rok wydania");
        return;
    }

    const game = {
        title,
        difficulty,
        rating: null,
        age_rating: ageRating.replace("+", ""),
        daniel,
        year_of_release: year,
        picture: ""
    };

    const response = await fetch(
        "http://localhost:3000/games",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        }
    );

    if (response.ok) {
        alert("Gra została dodana");
        document.querySelector(".add-form").reset();
    }
}