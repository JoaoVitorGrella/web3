// ==========================================
// CINEMA TOP - SISTEMA DE FUNCIONALIDADES
// ==========================================

// 1. ARRAY COM OS FILMES DO CATÁLOGO

let filmes = [
    {
        id: 1,
        titulo: "Poderoso Chefão 1",
        genero: "Drama",
        ano: 1972,
        descricao: "A história da poderosa família Corleone e do crime organizado.",
        imagem: "IMG/image2.png",
        favorito: false
    },
    {
        id: 2,
        titulo: "Pets 2",
        genero: "Animação",
        ano: 2019,
        descricao: "Pets 2 acompanha Max e seus amigos em novas aventuras.",
        imagem: "IMG/image3.png",
        favorito: false
    },
    {
        id: 3,
        titulo: "Homem-Aranha 2",
        genero: "Ação",
        ano: 2004,
        descricao: "Homem-Aranha 2 acompanha Peter Parker equilibrando sua vida pessoal e heroica.",
        imagem: "IMG/image4.png",
        favorito: false
    }
];

// 2. SELECIONAR ELEMENTOS DO HTML

const listaFilmes = document.getElementById("listaFilmes");
const pesquisa = document.getElementById("pesquisa");
const filtroGenero = document.getElementById("filtroGenero");
const botaoFavoritos = document.getElementById("botaoFavoritos");
const formulario = document.getElementById("formFilme");
const mensagem = document.getElementById("mensagem");

let mostrarFavoritos = false;


// 3. FUNÇÃO PARA MOSTRAR MENSAGENS AO USUÁRIO

function mostrarMensagem(texto, tipo = "success") {

    mensagem.textContent = texto;
    mensagem.className = `alert alert-${tipo} mb-3`;

}


// 4. FUNÇÃO PARA EXIBIR OS FILMES

function mostrarFilmes() {

    const textoPesquisa = pesquisa.value.toLowerCase().trim();
    const generoEscolhido = filtroGenero.value;

    // Filtrar os filmes de acordo com a pesquisa e categoria

    const filmesFiltrados = filmes.filter(function(filme) {

        const nomeCombina = filme.titulo.toLowerCase().includes(textoPesquisa);

        const generoCombina =
    generoEscolhido === "" ||
    generoEscolhido === "Todos" ||
    filme.genero === generoEscolhido;

        const favoritoCombina =
            !mostrarFavoritos || filme.favorito;

        return nomeCombina && generoCombina && favoritoCombina;

    });

    // Limpar os cards anteriores

    listaFilmes.innerHTML = "";

    // Verificar se existem filmes

    if (filmesFiltrados.length === 0) {

        const aviso = document.createElement("p");
        aviso.className = "text-center text-muted";
        aviso.textContent = "Nenhum filme encontrado.";

        listaFilmes.appendChild(aviso);

        return;
    }

    // Criar um card para cada filme

    filmesFiltrados.forEach(function(filme) {

        const coluna = document.createElement("div");
        coluna.className = "col-12 col-md-6 col-lg-4";

        const card = document.createElement("div");
        card.className = "card h-100 shadow-sm";

        // Imagem do filme

        const imagem = document.createElement("img");
        imagem.src = filme.imagem || "IMG/image.png";
        imagem.alt = filme.titulo;
        imagem.className = "card-img-top";

        // Corpo do card

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

        // Botão de favoritos

        const favorito = document.createElement("button");
        favorito.className = "btn btn-danger me-2 mb-2";
        favorito.textContent = filme.favorito
            ? "❤️ Favoritado"
            : "♡ Favoritar";

        favorito.dataset.acao = "favorito";
        favorito.dataset.id = filme.id;

        // Botão de excluir

        const excluir = document.createElement("button");
        excluir.className = "btn btn-danger mb-2";
        excluir.textContent = "Excluir";

        excluir.dataset.acao = "excluir";
        excluir.dataset.id = filme.id;

        // Organizar os elementos

        corpo.append(
            titulo,
            descricao,
            genero,
            ano,
            favorito,
            excluir
        );

        card.append(imagem, corpo);
        coluna.appendChild(card);
        listaFilmes.appendChild(coluna);

    });

}


// 5. PESQUISAR FILMES PELO NOME

pesquisa.addEventListener("input", function() {

    mostrarFilmes();

});


// 6. FILTRAR FILMES POR GÊNERO

filtroGenero.addEventListener("change", function() {

    mostrarFilmes();

});


// 7. FAVORITAR E EXCLUIR FILMES

listaFilmes.addEventListener("click", function(event) {

    const botao = event.target.closest("button");

    if (!botao) return;

    const id = Number(botao.dataset.id);
    const acao = botao.dataset.acao;

    // Encontrar o filme selecionado

    const filme = filmes.find(function(item) {

        return item.id === id;

    });

    if (!filme) return;

    // Adicionar ou remover dos favoritos

    if (acao === "favorito") {

        filme.favorito = !filme.favorito;

        if (filme.favorito) {

            mostrarMensagem("Filme adicionado aos favoritos!");

        } else {

            mostrarMensagem("Filme removido dos favoritos!");

        }

    }

    // Excluir filme do catálogo

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


// 8. MOSTRAR SOMENTE OS FILMES FAVORITOS

botaoFavoritos.addEventListener("click", function() {

    mostrarFavoritos = !mostrarFavoritos;

    if (mostrarFavoritos) {

        botaoFavoritos.textContent = "Mostrar todos";

    } else {

        botaoFavoritos.textContent = "♡ Ver favoritos";

    }

    mostrarFilmes();

});


// 9. CADASTRAR NOVOS FILMES

formulario.addEventListener("submit", function(event) {

    // Impedir que a página atualize

    event.preventDefault();

    // Pegar os valores digitados

    const titulo = document.getElementById("titulo").value.trim();
    const genero = document.getElementById("genero").value;
    const ano = Number(document.getElementById("ano").value);
    const descricao = document.getElementById("descricao").value.trim();

    // Validar os campos

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

    // Criar um novo objeto de filme

    const novoFilme = {

        id: Date.now(),
        titulo: titulo,
        genero: genero,
        ano: ano,
        descricao: descricao,
        imagem: "IMG/image.png",
        favorito: false

    };

    // Adicionar o filme ao array

    filmes.push(novoFilme);

    // Limpar os campos

    formulario.reset();

    pesquisa.value = "";
    filtroGenero.value = "";

    mostrarFavoritos = false;
    botaoFavoritos.textContent = "♡ Ver favoritos";

    // Atualizar o catálogo

    mostrarFilmes();

    mostrarMensagem("Novo filme cadastrado com sucesso!");

});


// 10. INICIAR O CATÁLOGO

mostrarFilmes();