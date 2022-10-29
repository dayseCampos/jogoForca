let palavras = ['JAVASCRIPT', 'ALURA', 'ORACLE', 'PROGRAMAR', 'DESENVOLVER', 'CODIGO', 'CSS', 'PYTHON'];
let palavrasErradas = [];
let palavrasCertas = [];
let tentativas;
let correto;
let fimJogo = false;

const btnIniciar = document.getElementById('iniciar-jogo');
const btnNovaPalavra = document.getElementById('nova-palavra');
let palavra = '';

const canvas = document.querySelector('canvas');
const brush = canvas.getContext('2d');
brush.strokeStyle = '#FFB200';
brush.lineWidth = 4;

const boardEl = document.getElementById('palavra');
const palavrasErradasEl = document.getElementById('letras-erradas');

function limparArray(array) {
    while (array.length) {
        array.pop();
    }
    palavrasErradasEl.innerHTML = '<span></span>';
}

function board(palavra) {
    boardEl.innerHTML = '';
    for (let i = 0; i < palavra.length; i++) {
        boardEl.innerHTML += '<span></span>';
    }
}

function palavraSecreta() {
    return palavras[Math.floor(Math.random() * palavras.length)];
}

function isLetter(code) {
    return code >= 97 && code <= 122;
}

function checarPalavra(letter, palavra, spans) {
    if (tentativas < 6 && fimJogo == false) {
        if (palavra.includes(letter) && !palavrasCertas.includes(letter)) {
            checkpalavrasCertas(palavrasCertas, palavra, letter, spans);
            return false;
        } else if (!palavra.includes(letter) && !palavrasErradas.includes(letter)) {
            checkpalavrasErradas(palavrasErradas, palavrasErradasEl, letter);
            return true;
        }
    }
}

function checkpalavrasCertas(arrayLetters, palavra, letter, spans) {
    arrayLetters.push(letter);
    for (let i = 0; i < palavra.length; i++) {
        if (palavra[i] == letter) {
            spans[i].textContent = letter;
            correto++;
        }
    }
}

function checkpalavrasErradas(arrayLetters, palavrasErradasEl, letter) {
    arrayLetters.push(letter);
    palavrasErradasEl.innerHTML = '';
    for (let i = 0; i < arrayLetters.length; i++) {
        palavrasErradasEl.innerHTML += arrayLetters[i] + '    ';
    }
}

function limparCanvas() {
    brush.clearRect(0, 0, 600, 300);
}

function desenharForca() {
    limparCanvas();

    brush.beginPath();
    brush.moveTo(200, 250);
    brush.lineTo(400, 250);
    brush.stroke();

    brush.beginPath();
    brush.moveTo(250, 250);
    brush.lineTo(250, 70);
    brush.lineTo(380, 70);
    brush.lineTo(380, 100);
    brush.stroke();
}

function desenharCabeca() {
    brush.beginPath();
    brush.arc(380, 120, 20, 0, Math.PI * 2);
    brush.stroke();
}

function desenharLinha(xStar, yStart, xFinal, yFinal) {
    brush.beginPath();
    brush.moveTo(xStar, yStart);
    brush.lineTo(xFinal, yFinal);
    brush.stroke();
}

function testarForca(tentativas) {
    switch (tentativas) {
        case 0:
            desenharForca();
            break;
        case 1:
            desenharCabeca();
            break;
        case 2:
            desenharLinha(380, 140, 380, 210);
            break;
        case 3:
            desenharLinha(380, 140, 350, 160);
            break;
        case 4:
            desenharLinha(380, 140, 410, 160);
            break;
        case 5:
            desenharLinha(380, 210, 350, 230);
            break;
        case 6:
            desenharLinha(380, 210, 410, 230);
            break;
    }
}

function novoJogo() {
    btnIniciar.innerText = 'Novo jogo';
    palavra = palavraSecreta();
    board(palavra);
    limparArray(palavrasErradas);
    limparArray(palavrasCertas);
    fimJogo = false;
    desenharForca();
    tentativas = 0;
    correto = 0;
}

function fimJogoTest(tentativas, palavra) {
    if (tentativas == 6) {
        palavrasErradasEl.style.color = 'red';
        palavrasErradasEl.innerHTML = 'Que pena! É o fim do jogo para você!';
    } else if (ganhador(palavra)) {
        palavrasErradasEl.style.color = 'green';
        palavrasErradasEl.innerHTML = 'Você venceu.<br>Parabéns!';
    }
}

function ganhador(palavra) {
    if (correto == palavra.length) {
        return fimJogo = true;
    }
}

function adicionarPalavra(palavra) {
    if (!palavras.includes(palavra) && input.value != '') {
        palavras.push(palavra);
        alert('Palavra adicionada ao jogo.');
    } else if (palavras.includes(palavra)) {
        alert('Essa palavra já está no jogo. Digite outra.');
    }
}

btnIniciar.addEventListener('click', function () {
    novoJogo();
    addEventListener('keypress', function (e) {
        const spans = document.querySelectorAll('span');
        if (isLetter(e.keyCode)) {
            const isWrong = checarPalavra(e.key.toUpperCase(), palavra, spans);
            if (isWrong) {
                tentativas++;
                testarForca(tentativas);
            }
            fimJogoTest(tentativas, palavra);
        }
    })
})

btnNovaPalavra.addEventListener('click', function () {
    const gameEls = document.querySelectorAll('div');
    const input = document.querySelector('textarea');
    for (let i = 0; i < gameEls.length; i++) {
        gameEls[i].style.display = 'none';
    }
    
    input.style.display = 'block';
    const palavra = input.value.toUpperCase();

    adicionarPalavra(palavra);

    btnIniciar.addEventListener('click', function () {
        input.style.display = 'none';
        for (let i = 0; i < gameEls.length; i++) {
            gameEls[i].style.display = 'block';
        }
    })
})