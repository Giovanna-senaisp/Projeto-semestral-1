let indiceAtual = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
// const intervalo = 5000; //5 segundos

function mostrarSlide(indice) {
    const carrosselSlides = document.querySelector('.carrossel');
    carrosselSlides.style.transform = `translateX(-${indice * 100}%)`
}

function proximo() {
    indiceAtual = (indiceAtual + 1) % totalSlides;
    mostrarSlide(indiceAtual);
}

function anterior() {
    indiceAtual = (indiceAtual - 1 + totalSlides) % totalSlides;
    mostrarSlide(indiceAtual)
}

function avancar () {
    indiceAtual = (indiceAtual + 1) % totalSlides;
    mostrarSlide(indiceAtual);
}

setInterval(avancar, intervalo);