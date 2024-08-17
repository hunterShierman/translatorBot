let english = true;

function englishfrench() {
    if (!english) {
        var container = document.querySelector('.flags');
        container.classList.toggle('swapped');
        english = true;
    }
}

function frenchenglish() {
    if (english) {
        var container = document.querySelector('.flags');
        container.classList.toggle('swapped');
        english = false;
    }
}
