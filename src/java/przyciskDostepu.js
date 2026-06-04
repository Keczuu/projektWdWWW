if (localStorage.getItem('accessibility') === 'enabled') {
    document.body.classList.add('dostepnosc');
}
let czas = 0;
document.addEventListener('click', (e) => { // to musialo byc zmienione bo tak samo jak z ladowaniem gier, strona sie ladowala wolniej od skryptu
    const btn = event.target.closest('.accessibility'); // tutaj jest target closest bo jakby sie kliknelo w ten przycisk to to by nie dzialalo bo nie klikasz w przycisk tak jakby tylko w literke K wiec dzieki temu to idzie w gore tego drzewa i sprawdza czy jest tak klasa accessibility
    if (!btn) return;
    const czasTeraz = Date.now();
    if (czasTeraz - czas < 1000) {
        alert("Poczekaj sekunde przed kolejna zmiana"); // to trzeba zmienic na toast
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