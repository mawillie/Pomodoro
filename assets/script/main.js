/* ==== GERAL ========================= */

const play = document.querySelector(".status__checkbox");
const iconStatus = document.querySelector(".status");

const audio = document.querySelector(".audio__checkbox");
const iconAudio = document.querySelector(".audio");

// minuto x 6000 = timestamp
const minuto = 60000;
// timestamp - 1000
const segundo = 1000;



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
                : iconAudio.setAttribute("src","./assets/images/volume-off.svg");
            break;
    }
}


function switchAudio() {
    mudaIcon(audio.checked, 2);
}

function switchStatus() {
    mudaIcon(play.checked, 1);

    
}

/* ==== FUNÇÕES DO TIMER ========================= */

let tempoTotal = criaTimestamp();
timer(tempoTotal)

// Converte minutos em TimeStamp
function criaTimestamp(tempo) {
    if (!tempo) {
        tempo = 25;
    }

    return tempo * minuto;
}

// A cada segundo reduz o tempo em 1s e printa
function timer(tempoTotal) {
    const myInterval = setInterval(() => {

        if (play.checked) {
            clearInterval(myInterval);
            return tempoTotal
        }

        tempoTotal = passaTempo(tempoTotal);
        console.log(
            new Date(tempoTotal).toLocaleTimeString("pt-BR").slice(3, 8)
        );
    }, 1000);

}

// Responsável por reduzir o tempo
function passaTempo(tempo) {
    return tempo - segundo;
}

//     data.toLocaleTimeString("pt-BR", {
//         hour12: false
//     })