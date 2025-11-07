/*
 * Array de músicas com imagens locais
 * - Todas as imagens agora estão na pasta 'imagens/'
 * - Mantemos o fallback para o placeholder.jpg caso necessário
 * - Caminhos relativos para melhor portabilidade
 */
const musicas = [
    {
        titulo: "Bohemian Rhapsody",
        artista: "Queen",
        album: "A Night at the Opera",
        imagem: "imagens/Bohemian.jpg"
    },
    {
        titulo: "Billie Jean",
        artista: "Michael Jackson",
        album: "Thriller",
        imagem: "imagens/billie.jpg"
    },
    {
        titulo: "Garota de Ipanema",
        artista: "Tom Jobim",
        album: "The Composer of Desafinado, Plays",
        imagem: "imagens/garota ipanema.jpg"
    },
    {
        titulo: "Shape of You",
        artista: "Ed Sheeran",
        album: "÷ (Divide)",
        imagem: "imagens/shape.jpg"
    },
    {
        titulo: "Chega de Saudade",
        artista: "João Gilberto",
        album: "Chega de Saudade",
        imagem: "imagens/chega de sau.jpg"
    },
    {
        titulo: "Sweet Child O' Mine",
        artista: "Guns N' Roses",
        album: "Appetite for Destruction",
        imagem: "imagens/sweet.jpg"
    },
    {
        titulo: "Mas Que Nada",
        artista: "Sergio Mendes & Brasil '66",
        album: "Herb Alpert Presents",
        imagem: "imagens/mas que nada.jpg"
    },
    {
        titulo: "Uptown Funk",
        artista: "Mark Ronson ft. Bruno Mars",
        album: "Uptown Special",
        imagem: "imagens/uptown.jpg"
    }
];

/*
 * Sistema de fallback para imagens
 * - Definimos uma imagem padrão para quando a capa não carregar
 * - O placeholder é uma imagem local que sempre estará disponível
 * - Usamos uma constante para facilitar a manutenção
 */
const PLACEHOLDER_IMAGE = 'imagens/placeholder.jpg';

// Função para criar e inserir os cards de música no HTML
function criarCardsMusicas(musicasFiltradas = musicas) {
    const containerMusicas = document.getElementById('lista-de-musicas');
    containerMusicas.innerHTML = ''; // Limpa o container antes de inserir novos cards
    
    /* 
     * O que faz o método forEach() neste código?
     * - É um método de array que executa uma função para cada elemento
     * - Neste caso, para cada música do array, ele:
     *   1. Cria um novo elemento div (card)
     *   2. Adiciona a classe 'musica-card'
     *   3. Preenche o HTML do card com os dados da música
     *   4. Adiciona o evento de clique
     *   5. Insere o card no container
     * - É mais moderno e legível que usar um loop for tradicional
     * - Não retorna nada (diferente do map() que retorna um novo array)
     */
    musicasFiltradas.forEach(musica => {
        const card = document.createElement('div');
        card.className = 'musica-card';
        
        // Criamos a imagem separadamente para poder adicionar o evento onerror
        const img = document.createElement('img');
        img.src = musica.imagem;
        img.alt = musica.titulo;
        // Se a imagem falhar ao carregar, usa o placeholder
        img.onerror = function() {
            this.src = PLACEHOLDER_IMAGE;
            console.log(`Imagem não encontrada para: ${musica.titulo}`);
        };
        
        const cardContent = document.createElement('div');
        cardContent.innerHTML = `
            <h3>${musica.titulo}</h3>
            <p class="artista">${musica.artista}</p>
            <p class="album">${musica.album}</p>
        `;
        
        // Adiciona a imagem e o conteúdo ao card
        card.appendChild(img);
        card.appendChild(cardContent);

        // Adiciona evento de clique para simular play
        card.addEventListener('click', () => tocarMusica(musica));
        
        containerMusicas.appendChild(card);
    });
}

// Função para reprodução de música
function tocarMusica(musica) {
    // Encontra o card ativo anterior (se houver) e remove a classe
    const cardAtivo = document.querySelector('.musica-card.tocando');
    if (cardAtivo) {
        cardAtivo.classList.remove('tocando');
    }

    // Encontra o novo card e adiciona a classe tocando
    const cards = document.querySelectorAll('.musica-card');
    cards.forEach(card => {
        const titulo = card.querySelector('h3').textContent;
        if (titulo === musica.titulo) {
            card.classList.add('tocando');
        }
    });

    // Atualiza o player (se existir)
    const playerInfo = document.createElement('div');
    playerInfo.className = 'player-info';
    
    // Cria a imagem do player com fallback
    const playerThumb = document.createElement('img');
    playerThumb.src = musica.imagem;
    playerThumb.alt = musica.titulo;
    playerThumb.className = 'player-thumb';
    playerThumb.onerror = function() {
        this.src = PLACEHOLDER_IMAGE;
    };

    const playerText = document.createElement('div');
    playerText.className = 'player-text';
    playerText.innerHTML = `
        <h4>${musica.titulo}</h4>
        <p>${musica.artista}</p>
    `;

    playerInfo.appendChild(playerThumb);
    playerInfo.appendChild(playerText);

    // Encontra ou cria o player container
    let playerContainer = document.querySelector('.player-container');
    if (!playerContainer) {
        playerContainer = document.createElement('div');
        playerContainer.className = 'player-container';
        document.body.appendChild(playerContainer);
    }

    // Atualiza o conteúdo do player
    playerContainer.innerHTML = '';
    playerContainer.appendChild(playerInfo);

    // Adiciona controles de áudio
    const audioControls = document.createElement('div');
    audioControls.className = 'audio-controls';
    audioControls.innerHTML = `
        <button class="btn-play-pause">
            <span class="playing">▐▐</span>
            <span class="paused">▶</span>
        </button>
        <div class="progress-bar">
            <div class="progress"></div>
        </div>
    `;
    playerContainer.appendChild(audioControls);

    // Simula o progresso da música
    let progress = 0;
    const progressBar = playerContainer.querySelector('.progress');
    const interval = setInterval(() => {
        progress += 1;
        if (progress > 100) {
            clearInterval(interval);
            return;
        }
        progressBar.style.width = `${progress}%`;
    }, 100);

    console.log(`Tocando: ${musica.titulo} - ${musica.artista}`);
}

// Função para filtrar músicas
function filtrarMusicas(termo) {
    if (!termo) {
        criarCardsMusicas();
        return;
    }

    const termoLower = termo.toLowerCase();
    const musicasFiltradas = musicas.filter(musica => 
        musica.titulo.toLowerCase().includes(termoLower) ||
        musica.artista.toLowerCase().includes(termoLower) ||
        musica.album.toLowerCase().includes(termoLower)
    );

    criarCardsMusicas(musicasFiltradas);
}

/*
 * Por que usamos 'DOMContentLoaded'?
 * - É um evento que dispara quando todo o HTML foi carregado e parseado
 * - Diferente do 'load' que espera imagens e outros recursos
 * - Garante que os elementos HTML existam antes de manipulá-los
 * - Evita erros de "elemento não encontrado" ao executar getElementById/querySelector
 * - É uma boa prática para garantir que o DOM está pronto para interação
 */
document.addEventListener('DOMContentLoaded', () => {
    criarCardsMusicas();

    // Adiciona funcionalidade de busca
    const campoBusca = document.getElementById('pesquisa');
    if (campoBusca) {
        campoBusca.addEventListener('input', (e) => {
            filtrarMusicas(e.target.value);
        });
    }
});
// Copilot, crie um array de objetos chamado 'musicas'.
// Cada objeto deve ter: titulo, artista e capaUrl.
// Depois, crie uma função chamada renderMusicas() que:
// - percorre o array
// - gera o HTML dos cards com class 'musica-card'
// - insere os cards na div com id 'lista-de-musicas'
// Por fim, chame renderMusicas() quando o DOM estiver carregado.