/* ==== GERAL ========================= */

const play = document.querySelector(".status__checkbox")
const iconStatus = document.querySelector(".status")

/* ==== FUNCIONALIDADES ========================= */

function mudaIcon(status) {
  status ? iconStatus.setAttribute('src', "./assets/images/play.svg") : iconStatus.setAttribute('src', "./assets/images/pause.svg") 
}

function switchStatus() {
  mudaIcon(play.checked)
}