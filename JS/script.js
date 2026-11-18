let filmes = [
    {
        id: 1,
        titulo: "Poderoso Chefão 1",
        genero: "Drama",
        ano: 1972,
        descricao: "A história da poderosa família Corleone e do crime organizado.",
        imagem: "IMG/image2.png",
    },
    {
        id: 2,
        titulo: "Pets 2",
        genero: "Animação",
        ano: 2019,
        descricao: "Pets 2 acompanha Max e seus amigos em novas aventuras.",
        imagem: "IMG/image3.png",
    },
    {
        id: 3,
        titulo: "Homem-Aranha 2",
        genero: "Ação",
        ano: 2004,
        descricao: "Homem-Aranha 2 acompanha Peter Parker equilibrando sua vida pessoal e heroica.",
        imagem: "IMG/image4.png",
    }
];

const listaFilmes = document.getElementById("listaFilmes");
const pesquisa = document.getElementById("pesquisa");
const filtroGenero = document.getElementById("filtroGenero");
const formulario = document.getElementById("formFilme");
const mensagem = document.getElementById("mensagem");

function mostrarMensagem(texto, tipo = "success") {

    mensagem.textContent = texto;
    mensagem.className = `alert alert-${tipo} mb-3`;

}
    listaFilmes.innerHTML = "";

    if (filmesFiltrados.length === 0) {

        const aviso = document.createElement("p");
        aviso.className = "text-center text-muted";
        aviso.textContent = "Nenhum filme encontrado.";

        listaFilmes.appendChild(aviso);

        return;
    }

    filmesFiltrados.forEach(function(filme) {
        const coluna = document.createElement("div");
        coluna.className = "col-12 col-md-6 col-lg-4";
        const card = document.createElement("div");
        card.className = "card h-100 shadow-sm";
        const imagem = document.createElement("img");
        imagem.src = filme.imagem || "IMG/image.png";
        imagem.alt = filme.titulo;
        imagem.className = "card-img-top";
        const corpo = document.createElement("div");
        corpo.className = "card-body";
        const titulo = document.createElement("h3");
        titulo.className = "card-title h5";
        titulo.textContent = filme.titulo;
        const descricao = document.createElement("p");
        descricao.className = "card-text";
        descricao.textContent = filme.descricao;
        const genero = document.createElement("p");
        genero.className = "card-text";
        genero.textContent = "Gênero: " + filme.genero;
        const ano = document.createElement("p");
        ano.className = "card-text";
        ano.textContent = "Ano: " + filme.ano;
        const excluir = document.createElement("button");
        excluir.className = "btn btn-danger mb-2";
        excluir.textContent = "Excluir";

        excluir.dataset.acao = "excluir";
        excluir.dataset.id = filme.id;

        corpo.append(
            titulo,
            descricao,
            genero,
            ano,
            excluir
        );
        card.append(imagem, corpo);
        coluna.appendChild(card);
        listaFilmes.appendChild(coluna);
    });
}
pesquisa.addEventListener("input", function() {
    mostrarFilmes();
});
filtroGenero.addEventListener("change", function() {
    mostrarFilmes();

});
listaFilmes.addEventListener("click", function(event) {
    const botao = event.target.closest("button");
    if (!botao) return;
    const id = Number(botao.dataset.id);
    const acao = botao.dataset.acao;
    const filme = filmes.find(function(item) {
        return item.id === id;
    });
    if (!filme) return;
    if (acao === "excluir") {
        const confirmar = confirm("Tem certeza que deseja excluir este filme?");
        if (confirmar) {
            filmes = filmes.filter(function(item) {
                return item.id !== id;
            });
            mostrarMensagem("Filme excluído com sucesso!");
        }
    }
    mostrarFilmes();
});
formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    const titulo = document.getElementById("titulo").value.trim();
    const genero = document.getElementById("genero").value;
    const ano = Number(document.getElementById("ano").value);
    const descricao = document.getElementById("descricao").value.trim();
    if (!titulo || !genero || !ano || !descricao) {
        mostrarMensagem("Preencha todos os campos!", "danger");
        return;
    }
    if (
        !Number.isInteger(ano) ||
        ano < 1895 ||
        ano > new Date().getFullYear()
    ) {
        mostrarMensagem("Digite um ano de lançamento válido!", "danger");
        return;
    }
    const novoFilme = {
        id: Date.now(),
        titulo: titulo,
        genero: genero,
        ano: ano,
        descricao: descricao,
        imagem: "IMG/image.png",
    };
    filmes.push(novoFilme);
    formulario.reset();
    pesquisa.value = "";
    filtroGenero.value = "";
    mostrarFilmes();
    mostrarMensagem("Novo filme cadastrado com sucesso!");
});
mostrarFilmes();