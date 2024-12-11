function menuOnClick() {
  document.getElementById("menu-bar").classList.toggle("change");
  document.getElementById("nav").classList.toggle("change");
  document.getElementById("menu-bg").classList.toggle("change-bg");
}

// Seção do Botão 'Fale Conosco

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

// Seção do Botão de DropDown Burger

const hamburgerButton = document.querySelector("#hamburger-menu");
const dropDownBurger = document.querySelector(".drop-down-burger");

// Alterna a exibição do menu com base na largura da tela
function updateMenuVisibility() {
  const isMobile = window.innerWidth <= 1119;
  hamburgerButton.style.display = isMobile ? "block" : "none";
  dropDownBurger.style.display = isMobile ? "block" : "none";
}

// Inicializa e adiciona listener para redimensionamento
window.addEventListener("resize", updateMenuVisibility);
updateMenuVisibility();

// Muda o formato do Botão Burger
function toggleMenu(element) {
  element.classList.toggle("open"); // Adiciona ou remove a classe "open"
}

// Seção do Carrossel da Seção 5

const carrossel = document.querySelector(".secao5-divcarrossel");
const slides = document.querySelectorAll(".secao5-divcarrossel-div");
const prevButton = document.querySelector(".carrossel-btn.prev");
const nextButton = document.querySelector(".carrossel-btn.next");

let currentIndex = 2; // Inicia no segundo slide "duplicado"
const slideCount = slides.length;

// Duplica os primeiros e últimos slides
const firstClone = slides[0].cloneNode(true);
const secondClone = slides[1].cloneNode(true);
const lastClone = slides[slideCount - 1].cloneNode(true);
const secondLastClone = slides[slideCount - 2].cloneNode(true);

firstClone.id = "first-clone";
secondClone.id = "second-clone";
lastClone.id = "last-clone";
secondLastClone.id = "second-last-clone";

carrossel.appendChild(firstClone);
carrossel.appendChild(secondClone);
carrossel.prepend(secondLastClone);
carrossel.prepend(lastClone);

const totalSlides = slideCount + 4; // Inclui os clones
// Função para calcular a largura do slide com base no tamanho da tela
function getSlideWidth() {
  const screenWidth = window.innerWidth;
  // Ajuste a lógica conforme necessário (por exemplo, em telas menores, pode ser 100% em vez de 50%)
  return screenWidth >= 1281 ? 50 : 100; // Exemplo: 50% para telas grandes e 100% para telas pequenas
}

let slideWidth = getSlideWidth();

carrossel.style.transform = `translateX(-${currentIndex * slideWidth}%)`;

let isTransitioning = false; // Flag para evitar cliques rápidos

function updateCarrossel() {
  isTransitioning = true; // Bloqueia interações durante a transição
  carrossel.style.transition = "transform 0.5s ease";
  carrossel.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
}

function checkLoop() {
  carrossel.addEventListener("transitionend", () => {
    isTransitioning = false; // Libera interações após a transição

    if (currentIndex === 0) {
      carrossel.style.transition = "none"; // Remove animação
      currentIndex = slideCount + 1; // Reposiciona para o segundo slide original
      carrossel.style.transform = `translateX(-${currentIndex * slideWidth}%)`;

      // Adiciona um pequeno atraso para reabilitar a transição
      setTimeout(() => {
        carrossel.style.transition = "transform 0.5s ease";
      }, 50);
    }

    if (currentIndex === totalSlides - 1) {
      carrossel.style.transition = "none"; // Remove animação
      currentIndex = 2; // Reposiciona para o segundo slide original
      carrossel.style.transform = `translateX(-${currentIndex * slideWidth}%)`;

      // Adiciona um pequeno atraso para reabilitar a transição
      setTimeout(() => {
        carrossel.style.transition = "transform 0.5s ease";
      }, 50);
    }

    // Mudança instantânea quando atingir o limite de -400%
    if (currentIndex === 8) {
      carrossel.style.transition = "none"; // Remove animação
      currentIndex = 2; // Reseta para -100%
      carrossel.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    }

    // Mudança para -350% após voltar para o início
    if (currentIndex === 1) {
      carrossel.style.transition = "none"; // Remove animação
      currentIndex = 7; // Reseta para -350%
      carrossel.style.transform = `translateX(-${currentIndex * slideWidth}%)`;

      // Adiciona um pequeno atraso para reabilitar a transição
      setTimeout(() => {
        carrossel.style.transition = "transform 0.5s ease";
      }, 50);
    }
  });
}

prevButton.addEventListener("click", () => {
  if (isTransitioning) return; // Ignora o clique se já estiver em transição
  currentIndex -= 1;
  updateCarrossel();
});

nextButton.addEventListener("click", () => {
  if (isTransitioning) return; // Ignora o clique se já estiver em transição
  currentIndex += 1;
  updateCarrossel();
});

checkLoop();

//Whatsapp

const whatsappIcone = document.querySelector(".whatsapp-icone");
const xIcone = document.querySelector(".x-icone");
const card_whatsapp_container = document.querySelector(
  ".card-whatsapp-container"
);

const card_whatsapp_bottom = document.querySelector(".card-whatsapp-bottom");

whatsappIcone.addEventListener("click", () => {
  // Ocultar o ícone do WhatsApp com rotação e opacidade
  whatsappIcone.style.transform = "rotate(150deg)";
  whatsappIcone.style.opacity = "0";

  // Mostrar o "X" após a animação
  setTimeout(() => {
    whatsappIcone.style.display = "none";
    xIcone.style.display = "flex";
    xIcone.style.animation = "rotateIn 0.3s ease forwards";
    card_whatsapp_container.style.display = "block";
    card_whatsapp_container.style.opacity = "1";
    card_whatsapp_container.style.animation = "whatsappIn 0.3s ease forwards";
  }, 100); // Tempo para a transição do WhatsApp terminar

  setTimeout(() => {
    card_whatsapp_bottom.style.display = "flex";
    card_whatsapp_bottom.style.opacity = "1";
    card_whatsapp_bottom.style.animation =
      "whatsappBottomIn 0.3s ease forwards";
  }, 500);
});

xIcone.addEventListener("click", () => {
  // Ocultar o ícone do WhatsApp com rotação e opacidade
  whatsappIcone.style.transform = "rotate(0deg)";
  whatsappIcone.style.opacity = "1";

  // Mostrar o "X" após a animação
  setTimeout(() => {
    whatsappIcone.style.display = "flex";
    xIcone.style.animation = "rotateOut 0.3s ease forwards";
    whatsappIcone.style.animation = "rotateOut 0.3s ease forwards";
    card_whatsapp_container.style.animation = "whatsappOut 0.3s ease forwards";
  }, 100); // Tempo para a transição do WhatsApp terminar

  setTimeout(() => {
    xIcone.style.display = "none";
  }, 200);
  setTimeout(() => {
    card_whatsapp_bottom.style.display = "none";
    card_whatsapp_bottom.style.opacity = "0";
    card_whatsapp_container.style.display = "none";
    card_whatsapp_container.style.opacity = "0";
  }, 500);
});

// Pesquisa

const fa_magnifying_glass = document.querySelector(".fa-magnifying-glass");
const framePesquisa = document.querySelector(".framePesquisa");

fa_magnifying_glass.addEventListener("click", (e) => {
  e.preventDefault()
  framePesquisa.style.display = "block";
  framePesquisa.style.opacity = "1";
});
