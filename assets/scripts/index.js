const game = new Game();

const img = new Image();
img.src = "./assets/images/dino.jpeg";

const currentPlayerElement = document.getElementById("currentPlayer");
const winnerElement = document.getElementById("winner");
const playerChoiceElement = document.getElementById("playerChoice");
const gameBoardElement = document.getElementById("gameBoard");
const startGameBtnElement = document.getElementById("startGameBtn");
const player1SelectElement = document.getElementById("player1Select");
const player2SelectElement = document.getElementById("player2Select");

playerChoiceElement.appendChild(img);

// Impede que os dois jogadores tenham a mesma peça

player1SelectElement.addEventListener("change", (event) => {
  if (event.target.value === "X") {
    player2SelectElement.value = "O";
  } else if (event.target.value === "O") {
    player2SelectElement.value = "X";
  }
});

player2SelectElement.addEventListener("change", (event) => {
  if (event.target.value === "X") {
    player1SelectElement.value = "O";
  } else if (event.target.value === "O") {
    player1SelectElement.value = "X";
  }
});

startGameBtnElement.addEventListener("click", (event) => {
  // Previne que o formulário recarregue a página
  event.preventDefault();

  // Atualiza o jogador que começa pro valor do input do Jogador 1
  game.currentPlayer = player1SelectElement.value;

  // Esconde o formulário
  playerChoiceElement.classList.add("d-none");

  // Exibe o tabuleiro do jogo
  gameBoardElement.classList.replace("d-none", "d-flex");

  // Atualiza quem é o jogador atual na tela
  currentPlayerElement.innerText = game.currentPlayer;
});

document.addEventListener("click", (event) => {
  // Verificar se o clique foi em uma célula do tabuleiro

  if (event.target.classList.contains("tile")) {
    // Caso o jogo não tenha terminado
    if (!game.gameOver) {
      // Só preenche a peça se a casa estiver vazia
      if (!event.target.innerText) {
        // Atualizar o HTML com a peça do jogador atual na casa correta
        event.target.innerText = game.currentPlayer;
      }

      // Fazer a jogada passando a posição da "casa" que foi clicada
      game.play(parseInt(event.target.id));

      // Atualiza quem é o jogador atual
      currentPlayerElement.innerText = game.currentPlayer;

      // Caso algum dos jogadores tenha vencido
      if (game.gameOver && !game.tie) {
        game.winningLane.forEach((position) => {
          // Pintar o fundo das casas vencedoras de verde
          const winningTile = document.getElementById(position.toString());

          winningTile.classList.add("bg-success", "text-white");
        });

        winnerElement.innerText = game.currentPlayer;
      }

      // Caso tenha sido empate
      if (game.gameOver && game.tie) {
        // Pintar o fundo de todas as casas de vermelho
        const tiles = document.getElementsByClassName("tile");

        for (let element of tiles) {
          element.classList.add("bg-danger", "text-white");
        }

        winnerElement.innerText = "Deu velha!";
      }
    }
  }
});
