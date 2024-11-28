function menuOnClick() {
  document.getElementById("menu-bar").classList.toggle("change");
  document.getElementById("nav").classList.toggle("change");
  document.getElementById("menu-bg").classList.toggle("change-bg");
}

let dropDownOpen = true;
function animationDropDown() {
  const container_secao1 = document.getElementById("cont_secao1");
  const secao1_botao = document.querySelector(".secao1-botao");
  const currentHeight = parseInt(
    window.getComputedStyle(container_secao1).height
  );
  if (dropDownOpen) {
    container_secao1.style.height = currentHeight + 200 + "px"; // Aumenta 200px toda vez que clicar
    dropDownOpen = false;
    secao1_botao.classList.add("removeBorderRadiusSecao1Botao");
    secao1_botao.style.backgroundColor = "#8fcce6";
  } else {
    container_secao1.style.height = currentHeight - 200 + "px"; // Diminui 200px toda vez que clicar
    dropDownOpen = true;
    secao1_botao.classList.remove("removeBorderRadiusSecao1Botao");
    secao1_botao.style.backgroundColor = "#6ec1e4";
  }
}

const hamburgerButton = document.querySelector("#hamburger-menu");
const nav_navegacao_catalogo_burguer = document.querySelector(
  ".nav-navegacao-catalogo-burguer"
);
const drop_down_burger = document.querySelector(".drop-down-burger");

// Função para verificar a largura da tela e mostrar/ocultar o botão
function checkScreenWidth() {
  if (window.innerWidth <= 767) {
    hamburgerButton.style.display = "block";
    drop_down_burger.style.display = "block";
  } else {
    hamburgerButton.style.display = "none";
    drop_down_burger.style.display = "none";
  }
}

// Executa a verificação ao carregar a página e ao redimensionar
checkScreenWidth();
window.addEventListener("resize", checkScreenWidth);
