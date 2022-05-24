/* ==== AUDIO ========================= */

const audioZelda = document.querySelector(".playAudio");
const audioPokemon = document.querySelector(".playAudio2");
const audioPokeWin = document.querySelector(".playAudio3");


function tocaAudio(audio) {
    if (audioStatus) {
        audio.play();
    }
}

/* ==== GERAL ========================= */

const play = document.querySelector(".status__checkbox");
const iconStatus = document.querySelector(".status");

const audio = document.querySelector(".audio__checkbox");
const iconAudio = document.querySelector(".audio");

const timer = document.querySelector(".timer");
const reset = document.querySelector(".reset");

const count = document.querySelector(".count");

// minuto x 6000 = timestamp
// timestamp - 1000
const minuto = 60000;
const segundo = 1000;

// Executando pela primeira vez
let tempoInicial = 0.1;
let intervaloCurto = 0.05;
let intervaloLongo = 0.3;

let tempoResetado;
let tempoRecebido;

let resetado = false;
let intervaloStatus = false;
let audioStatus = true;

let myInterval;
let laps = 0;

setaDados(true);

function setaDados(load) {
    if (intervaloStatus === false) {
        if (!load) {
            contaVolta();
            tocaAudio(audioPokemon);
        }

        tempoRecebido = tempoResetado = criaTimestamp(tempoInicial);
    } else if (intervaloStatus === true && laps % 4 === 0 && laps > 0) {
        tempoRecebido = tempoResetado = criaTimestamp(intervaloLongo);
        tocaAudio(audioPokeWin);
    } else if (intervaloStatus === true) {
        tempoRecebido = tempoResetado = criaTimestamp(intervaloCurto);
        tocaAudio(audioZelda);
    }
}

function contaVolta() {
    laps += 1;
    count.textContent = laps;
}

/* ==== FUNÇÕES DE SWITCH ========================= */

function mudaIcon(status, option) {
    switch (option) {
        case 1:
            status
                ? iconStatus.setAttribute("src", "./assets/images/play.svg")
                : iconStatus.setAttribute("src", "./assets/images/pause.svg");
            break;

        case 2:
            status
                ? iconAudio.setAttribute("src", "./assets/images/volume-up.svg")
                : iconAudio.setAttribute("src", "./assets/images/volume-f.svg");
            break;

        case 3:
            iconStatus.setAttribute("src", "./assets/images/play.svg");
            break;
    }
}

function switchAudio() {
    mudaIcon(audio.checked, 2);

    audio.checked ? (audioStatus = true) : (audioStatus = false);
}

function switchStatus() {
    mudaIcon(play.checked, 1);

    // Se ele estava pausado; Inícia.
    if (!play.checked) {
        clearInterval(myInterval);
        cronometro();
    }
}

/* ==== FUNÇÕES DO TIMER ========================= */
/* ==== CRIA TIMESTAMP ========================= */

// Converte minutos em TimeStamp
function criaTimestamp(tempo) {
    if (!tempo) {
        tempo = 25;
    }

    return tempo * minuto;
}

/* ==== CRONOMETRO ========================= */

// Função Principal
function cronometro() {
    if (tempoRecebido === 0) {
        setaDados();
    }

    myInterval = setInterval(() => {
        // Loop
        tempoRecebido -= segundo;

        timer.textContent = new Date(tempoRecebido)
            .toLocaleTimeString("pt-BR")
            .slice(3, 8);

        // Stop
        if (!play.checked) {
            clearInterval(myInterval);
            return;
        }

        if (tempoRecebido === 0) {
            intervaloStatus
                ? (intervaloStatus = false)
                : (intervaloStatus = true);

            setaDados();
            resetar();
        }
    }, segundo);
}

/* ==== RESETAR ========================= */

function resetar() {
    resetando();

    play.checked = false;
    mudaIcon("Desativa", 3);
}

// Se estiver em um ciclo (play.checked = true) ele para o setInterval
function resetando() {
    clearInterval(myInterval);

    tempoRecebido = tempoResetado;
    timer.textContent = new Date(tempoRecebido)
        .toLocaleTimeString("pt-BR")
        .slice(3, 8);
}
