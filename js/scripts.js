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
