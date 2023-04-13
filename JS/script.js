const cells = document.querySelectorAll('.cell');
const result = document.querySelector('#result');
const restart = document.querySelector('#restart');
let currentPlayer = 'X';
let moves = 0;
let gameEnded = false;

// Função para alternar entre X e O
function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Função para atualizar o resultado do jogo
function updateResult(message) {
  gameEnded = true;
  result.textContent = message;
}

// Função para verificar se uma linha de células é igual
function checkLine(a, b, c) {
  if (cells[a].textContent === cells[b].textContent && cells[b].textContent === cells[c].textContent && cells[a].textContent !== '') {
    return true;
  }
  return false;
}

// Função para verificar se há um vencedor
function checkWinner() {
  if (checkLine(0, 1, 2) || checkLine(3, 4, 5) || checkLine(6, 7, 8) || checkLine(0, 3, 6) || checkLine(1, 4, 7) || checkLine(2, 5, 8)) {
    return true;
  } else if (checkLine(0, 4, 8) || checkLine(2, 4, 6)) {
    return true;
  }
  return false;
}

// Função para atualizar o jogo após um movimento
function move(cell) {
  cell.textContent = currentPlayer;
  moves++;

  if (checkWinner()) {
    updateResult(`Graças a Deus que o "${currentPlayer}" venceu! Eu não aguentava mais essa besteira!`);
  } else if (moves === 9) {
    updateResult('Ninguém ganhou esta bagaça!');
  } else {
    togglePlayer();
  }
}

// Adicionando os ouvintes para as células
cells.forEach((cell) => {
  cell.addEventListener('click', () => {
    if (!gameEnded && cell.textContent === '') {
      move(cell);
    }
  });
});

// Listener para o botão de recomeçar o jogo
restart.addEventListener('click', () => {
  cells.forEach((cell) => {
    cell.textContent = '';
  });
  result.textContent = '';
  currentPlayer = 'X';
  moves = 0;
  gameEnded = false;
});
