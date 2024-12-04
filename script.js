function filtrar(grupo) {
    const itens = document.querySelectorAll(".item");

    itens.forEach((item) => {
        if (item.classList.contains(grupo)) {
            item.classList.remove("oculto");
        } else {
            item.classList.add("oculto");
        }
    });
}

