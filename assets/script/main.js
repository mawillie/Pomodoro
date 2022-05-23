/* ==== GERAL ========================= */

const play = document.querySelector(".status__checkbox");
const iconStatus = document.querySelector(".status");

const audio = document.querySelector(".audio__checkbox");
const iconAudio = document.querySelector(".audio");

const timer = document.querySelector(".timer");
const reset = document.querySelector(".reset");

// minuto x 6000 = timestamp
const meioSegundo = 500;
const minuto = 60000;
// timestamp - 1000
const segundo = 1000;

// Executando pela primeira vez
let tempoDado = 5;
let tempoRecebido = criaTimestamp(tempoDado);
let resetado = false;

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
}

function switchStatus() {
    mudaIcon(play.checked, 1);

    // Se ele estava pausado; Inícia.
    if (!play.checked) {
        cronometro(tempoRecebido);
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
function cronometro(tempoTotal) {
    const myInterval = setInterval(() => {
        // Reset
        if (resetado) {
            resetado = false;

            clearInterval(myInterval);

            let tempoResetado = criaTimestamp(tempoDado);
            tempoRecebido = tempoResetado;

            timer.textContent = new Date(tempoResetado)
                .toLocaleTimeString("pt-BR")
                .slice(3, 8);
            return;
        }

        // Stop
        if (!play.checked) {
            clearInterval(myInterval);
            tempoRecebido = tempoTotal;
            return;
        }

        // Loop
        tempoTotal -= segundo / 2;

        timer.textContent = new Date(tempoTotal)
            .toLocaleTimeString("pt-BR")
            .slice(3, 8);
    }, meioSegundo);
}

/* ==== RESETAR ========================= */

function resetar() {
    // Caso resete enquanto não está em um loop
    if (!play.checked) {
        let tempoResetado = criaTimestamp(tempoDado);
        tempoRecebido = tempoResetado;

        timer.textContent = new Date(tempoResetado)
            .toLocaleTimeString("pt-BR")
            .slice(3, 8);
        return;
    }

    resetado = true;

    mudaIcon("Desativa", 3);
    play.checked = false;
}
