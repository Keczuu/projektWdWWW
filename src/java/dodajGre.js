document.addEventListener("click", function (event) {
    const button = event.target.closest("button");

    if (!button || !button.closest(".add-game-form")) {
        return;
    }

    if (button.classList.contains("buttonBright")) {
        addGame(event);
    }

    if (button.classList.contains("buttonDark")) {
        event.preventDefault();
        clearForm();
    }
});

async function addGame(event) {
    event.preventDefault();

    const title = document.querySelector('[name="title"]').value.trim();
    const difficulty = Number(document.querySelector('[name="trudnosc"]').value);
    const ageRating = document.getElementById("wiek").value;
    const daniel = document.getElementById("daniel").checked;
    const year = Number(document.getElementById("releaseYear").value);
    const image = document.querySelector('[name="image"]').files[0];

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
        picture: image ? `src/img/${image.name}` : "src/img/plchld.png"
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
        clearForm();
    }
}

function clearForm() {
    document.querySelector('[name="title"]').value = "";
    document.querySelector('[name="trudnosc"]').value = "";
    document.getElementById("wiek").value = "";
    document.getElementById("daniel").checked = false;
    document.getElementById("releaseYear").value = "";
    document.querySelector('[name="image"]').value = "";
}
