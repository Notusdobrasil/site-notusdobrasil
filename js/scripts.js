// Botão Menu Hamburguer para ativação na versão mobile para navegação das páginas
let btnMobile = document.getElementById("btn-mobile")
let menu = document.getElementById("menu")

btnMobile.addEventListener("click", function openMenu (event) {
    event.preventDefault()
    menu.classList.toggle("visible")
})



// Botão Fale Conosco da index.html para contato com os vendedores
let btnFaleConosco = document.getElementById("btn-faleconosco")
let listaFaleConosco = document.getElementById("lista-faleconosco")

btnFaleConosco.addEventListener("click", function (event) {
    event.preventDefault()
    listaFaleConosco.classList.toggle("visible")
    btnFaleConosco.classList.toggle("secao1-botao-sembordaembaixo")
})



let btnWhatsapp = document.getElementById("btn-whatsapp")
let cardWhatsapp = document.getElementById("card-whatsapp")
let balaoWhatsapp = document.getElementById("balao-whatsapp")

btnWhatsapp.addEventListener("click", function (event) {
    event.preventDefault()
    cardWhatsapp.classList.toggle("visible")
    balaoWhatsapp.classList.toggle("invisible")
})