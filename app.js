// Array com dados falsos de músicas
const musicas = [
    {
        titulo: "Bohemian Rhapsody",
        artista: "Queen",
        album: "A Night at the Opera",
        imagem: "https://exemplo.com/imagem1.jpg"
    },
    {
        titulo: "Imagine",
        artista: "John Lennon",
        album: "Imagine",
        imagem: "https://exemplo.com/imagem2.jpg"
    },
    {
        titulo: "Garota de Ipanema",
        artista: "Tom Jobim",
        album: "The Composer of Desafinado, Plays",
        imagem: "https://exemplo.com/imagem3.jpg"
    }
];

// Função para criar e inserir os cards de música no HTML
function criarCardsMusicas() {
    const containerMusicas = document.getElementById('lista-de-musicas');
    
    musicas.forEach(musica => {
        const card = document.createElement('div');
        card.className = 'musica-card';
        
        card.innerHTML = `
            <img src="${musica.imagem}" alt="${musica.titulo}">
            <h3>${musica.titulo}</h3>
            <p>${musica.artista}</p>
            <p>${musica.album}</p>
        `;
        
        containerMusicas.appendChild(card);
    });
}

// Chama a função quando a página carregar
document.addEventListener('DOMContentLoaded', criarCardsMusicas);