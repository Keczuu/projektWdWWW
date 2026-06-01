if (localStorage.getItem('accessibility') === 'enabled') {
    document.body.classList.add('dostepnosc');
}
let czas = 0;
for (const btn of document.querySelectorAll('.accessibility')) { // lecimy po wszysktich, bo możliwe że wstawimy np w headerze i w stopce taki przycisk
    // po kliknięciu dodajemy/usuwamy klasę `is-dark` na body
    btn.addEventListener('click', () => {
        const czasTeraz = Date.now();
        if (czasTeraz - czas < 1000) {
            alert("Poczekaj sekunde przed kolejna zmiana");
            return;
        }
        czas = czasTeraz;
        document.body.classList.toggle('dostepnosc');

        if (document.body.classList.contains('dostepnosc')) {
            localStorage.setItem('accessibility', 'enabled');
        } else {
            localStorage.setItem('accessibility', 'disabled');
        }
    });
}