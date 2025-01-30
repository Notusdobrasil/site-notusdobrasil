// function menuOnClick() {
//     document.getElementById("menu-bar").classList.toggle("change");
//     document.getElementById("nav").classList.toggle("change");
//     document.getElementById("menu-bg").classList.toggle("change-bg");
//   }


let btnMobile = document.getElementById("btn-mobile")
let menu = document.getElementById("menu")

btnMobile.addEventListener("click", function openMenu () {
    menu.classList.toggle("visible")
})