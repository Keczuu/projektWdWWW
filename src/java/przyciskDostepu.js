if (localStorage.getItem('accessibility') === 'enabled') {
    document.body.classList.add('dostepnosc');
}
let czas = 0;

function toast(wiadomosc) {
    const staryToast = document.querySelector('.toast');
    if (staryToast) {
        staryToast.remove();
    }
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = wiadomosc;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('show');
    }, 10); // najpierw strona go generuje a po tych 10ms pokazuje bo inaczej nie dziala animacja
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000) // to troche bez sensu bo trzeba czekac sekunde a toast zostaje trzy sekundy ale tak to wyglada ladniej
}

document.addEventListener('click', (e) => { // to musialo byc zmienione bo tak samo jak z ladowaniem gier, strona sie ladowala wolniej od skryptu
    const btn = event.target.closest('.accessibility'); // tutaj jest target closest bo jakby sie kliknelo w ten przycisk to to by nie dzialalo bo nie klikasz w przycisk tak jakby tylko w literke K wiec dzieki temu to idzie w gore tego drzewa i sprawdza czy jest tak klasa accessibility
    if (!btn) return;
    const czasTeraz = Date.now();
    if (czasTeraz - czas < 1000) {
        toast("Poczekaj sekunde przed kolejna zmiana");
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