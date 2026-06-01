function loadPage(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const body = doc.querySelector('body');

            if (body) {
                document.getElementById('container').innerHTML = body.innerHTML;
                attachLinkHandlers();
            }
        })
}

function attachLinkHandlers() {
    const links = document.querySelectorAll('#container a');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && (href.includes('index.html') || href.includes('dodajGre.html') || href.includes('oNas.html'))) {
                e.preventDefault();
                loadPage(href);
            }
        });
    });
}

window.addEventListener('DOMContentLoaded', function () {
    loadPage('index.html');
});