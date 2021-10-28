class Game {
  constructor() {
    // Cada jogador tem uma peça diferente: X ou O
    // Cada jogador faz uma jogada por turno
    this.currentPlayer = "X";
    this.currentGameBoard = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];
    this.originalGameBoard = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];
    this.gameOver = false;
    this.tie = false;
    this.winningLane = [];
  }

  switchPlayer() {
    if (this.currentPlayer === "X") {
      this.currentPlayer = "O";
    } else {
      this.currentPlayer = "X";
    }
  }

  play(position) {
    // Só joga se o jogo não tiver terminado
    if (!this.gameOver) {
      // Uma vez uma célula estando marcada, ela não pode ser modificada
      for (let i = 0; i < this.currentGameBoard.length; i++) {
        for (let j = 0; j < this.currentGameBoard[i].length; j++) {
          if (this.currentGameBoard[i][j] === position) {
            console.log("oi");

            // Atualiza a coordenada selecionada para a peça do jogador atual
            this.currentGameBoard[i][j] = this.currentPlayer;

            this.checkWinCondition();

            if (!this.gameOver) {
              this.checkTie();
            }

            if (!this.gameOver) {
              // Trocar o jogador
              this.switchPlayer();
            }
          }
        }
      }
    }
  }

  checkTie() {
    // Checa se não tem mais nenhum número no tabuleiro. Se verdadeiro, encerra o jogo pois foi um empate (deu velha)
    if (
      this.currentGameBoard.every((boardRow) => {
        return boardRow.every((boardTile) => typeof boardTile !== "number");
      })
    ) {
      this.gameOver = true;
      // Informa que foi um empate
      this.tie = true;
    }
  }

  checkWinCondition() {
    const winConditions = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [2, 0],
        [1, 1],
        [0, 2],
      ],
    ];

    for (let i = 0; i < winConditions.length; i++) {
      const coord1 = winConditions[i][0];
      const coord2 = winConditions[i][1];
      const coord3 = winConditions[i][2];

      // Quando três peças iguais completarem uma linha, coluna ou diagonal, o jogo termina
      if (
        this.currentGameBoard[coord1[0]][coord1[1]] ===
          this.currentGameBoard[coord2[0]][coord2[1]] &&
        this.currentGameBoard[coord2[0]][coord2[1]] ===
          this.currentGameBoard[coord3[0]][coord3[1]]
      ) {
        this.gameOver = true;
        // Salva as casas vencedoras para podermos alterar as cores de fundo pelo DOM depois
        this.winningLane = [
          this.originalGameBoard[coord1[0]][coord1[1]],
          this.originalGameBoard[coord2[0]][coord2[1]],
          this.originalGameBoard[coord3[0]][coord3[1]],
        ];
      }
    }

    // Se não houver nenhuma linha, coluna ou diagonal completa com as mesmas peças, o jogo termina em empate
  }
}
