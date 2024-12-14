// Pesquisa

const framePesquisa = document.querySelector(".framePesquisa");
const closeButton = document.querySelector(".closeButton");

function openSearch() {
  framePesquisa.style.animation = "pesquisaIn .6s ease";
  framePesquisa.style.display = "block";
  framePesquisa.style.opacity = "1";
  closeButton.style.display = "block";
  closeButton.style.opacity = "1";
}

function closeSearch() {
  framePesquisa.style.animation = "pesquisaOut .6s ease";
  setTimeout(() => {
    framePesquisa.style.display = "none";
    framePesquisa.style.opacity = "0";
    closeButton.style.display = "none";
    closeButton.style.opacity = "0";
  }, 500);
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

//Whatsapp

const whatsappIcone = document.querySelector(".whatsapp-botao");
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
// Sistema de Idiomas

// Textos em diferentes idiomas
const translations = {
  en: {
    SobreNotusNav: "About Notus",
    SobreNotusBurger: "About Notus",
    SobreNotusFooter: "About Notus",

    TrabalheConoscoNav: "Work With Us",
    TrabalheConoscoBurger: "Work With Us",
    TrabalheConoscoFooter: "Work With Us",

    GarantiaNav: "Warranty",
    GarantiaBurger: "Warranty",
    GarantiaFooter: "Warranty",

    RepresentantesNav: "Representatives",
    RepresentantesBurger: "Representatives",
    RepresentantesFooter: "Representatives",

    ContatoNav: "Contact",
    ContatoBurger: "Contact",
    ContatoFooter: "Contact",

    CatálogoNav: "Catalog",
    CatálogoFooter: "Catalog",

    FaleConoscoFooter: "Contact Us!",

    RadiadorFooter: "Radiator",

    EletroventiladorFooter: "Electrofan",

    CondensadorFooter: "Condenser",

    EvaporadorFooter: "Evaporator",

    RadiadordeoleoFooter: "Oil Radiator",

    RadiadordeAquecimentoFooter: "Heating Radiator",

    VentiladorInternoFooter: "Internal Fan",

    ListadeProdutos: "Product List",

    Precisadeajuda:
      "Need help? Contact us via <strong class='secao2-titulo-cinza' style='font-weight: 700'>WhatsApp!</strong>",

    atendidoimediatamente:
      "Hello! Click on one of our team members to be assisted immediately on WhatsApp!",

    Respondeemalgunsminutos: "The team usually responds within a few minutes.",

    FaleConoscoWACARD: "Contact Us!",

    // Página Contato
    FaleConoscoTitle: "Contact Us",
    Nossoscanais: "Our <strong>channels!</strong>",
    Enviar: "Send",
    Nome: "First Name",
    Sobrenome: "Last Name",
    Telefone: "Phone",
    Mensagem: "Message",
  },
  pt: {
    SobreNotusNav: "Sobre Notus",
    SobreNotusBurger: "Sobre Notus",
    SobreNotusFooter: "Sobre Nos",

    TrabalheConoscoNav: "Trabalhe Conosco",
    TrabalheConoscoBurger: "Trabalhe Conosco",
    TrabalheConoscoFooter: "Trabalhe Conosco",

    GarantiaNav: "Garantia",
    GarantiaBurger: "Garantia",
    GarantiaFooter: "Garantia",

    RepresentantesNav: "Representantes",
    RepresentantesBurger: "Representantes",
    RepresentantesFooter: "Representantes",

    ContatoNav: "Contato",
    ContatoFooter: "Contato",
    ContatoBurger: "Contato",

    CatálogoNav: "Catálogo",
    CatálogoFooter: "Catálogo",

    FaleConoscoFooter: " Fale Conosco!",

    RadiadorFooter: "Radiador",

    EletroventiladorFooter: "Eletro Ventilador",

    CondensadorFooter: "Condensador",

    EvaporadorFooter: "Evaporador",

    RadiadordeoleoFooter: "Radiador de Óleo",

    RadiadordeAquecimentoFooter: "Radiador de Aquecimento",

    VentiladorInternoFooter: "Ventilador Interno",

    ListadeProdutos: "Lista de Produtos",

    Precisadeajuda:
      " Precisa de ajuda? Fale conosco pelo<strong class='secao2-titulo-cinza' style='font-weight: 700'>Whatsapp!</strong>",

    atendidoimediatamente:
      "Olá! Clique em um de nossos membros da equipe para ser atendido imediatamente pelo Whatsapp!",

    Respondeemalgunsminutos: "A equipe normalmente responde em alguns minutos.",

    FaleConoscoWACARD: " Fale Conosco!",

    // Página Contato
    FaleConoscoTitle: "Fale Conosco",
    Nossoscanais: "Nossos <strong>canais!</strong>",
    Enviar: "Enviar",
    Nome: "Nome",
    Sobrenome: "Sobrenome",
    Telefone: "Telefone",
    Mensagem: "Mensagem",
  },
  es: {
    SobreNotusNav: "Sobre Notus",
    SobreNotusBurger: "Sobre Notus",
    SobreNotusFooter: "Sobre Notus",

    TrabalheConoscoNav: "Trabaje con nosotros",
    TrabalheConoscoBurger: "Trabaje con nosotros",
    TrabalheConoscoFooter: "Trabaje con nosotros",

    GarantiaNav: "Garantía",
    GarantiaBurger: "Garantía",
    GarantiaFooter: "Garantía",

    RepresentantesNav: "Representantes",
    RepresentantesBurger: "Representantes",
    RepresentantesFooter: "Representantes",

    ContatoNav: "Contacto",
    ContatoBurger: "Contacto",
    ContatoFooter: "Contacto",

    CatálogoNav: "Catálogo",
    CatálogoFooter: "Catálogo",

    FaleConoscoFooter: "¡Contáctenos!",

    RadiadorFooter: "Radiador",

    EletroventiladorFooter: "Electroventilador",

    CondensadorFooter: "Condensador",

    EvaporadorFooter: "Evaporador",

    RadiadordeoleoFooter: "Radiador de Aceite",

    RadiadordeAquecimentoFooter: "Radiador de Calefacción",

    VentiladorInternoFooter: "Ventilador Interno",

    Precisadeajuda:
      "¿Necesita ayuda? Contáctenos por <strong class='secao2-titulo-cinza' style='font-weight: 700'>WhatsApp!</strong>",

    atendidoimediatamente:
      "¡Hola! Haga clic en uno de nuestros miembros del equipo para ser atendido inmediatamente por WhatsApp.",

    Respondeemalgunsminutos: "El equipo suele responder en pocos minutos.",

    FaleConoscoWACARD: "¡Contáctenos!",

    ListadeProdutos: "Lista de productos",
    // Página Contato
    FaleConoscoTitle: "Contáctenos",
    Nossoscanais: "¡Nuestros <strong>canales!</strong>",
    Enviar: "Enviar",
    Nome: "Nombre",
    Sobrenome: "Apellido",
    Telefone: "Teléfono",
    Mensagem: "Mensaje",
  },
};

// Função para mudar o idioma
function changeLanguage(language) {
  const elements = {
    SobreNotusNav: document.getElementById("SobreNotusNav"),
    SobreNotusBurger: document.getElementById("SobreNotusBurger"),
    SobreNotusFooter: document.getElementById("SobreNotusFooter"),
    TrabalheConoscoNav: document.getElementById("TrabalheConoscoNav"),
    TrabalheConoscoBurger: document.getElementById("TrabalheConoscoBurger"),
    TrabalheConoscoFooter: document.getElementById("TrabalheConoscoFooter"),
    GarantiaNav: document.getElementById("GarantiaNav"),
    GarantiaFooter: document.getElementById("GarantiaFooter"),
    GarantiaBurger: document.getElementById("GarantiaBurger"),
    RepresentantesNav: document.getElementById("RepresentantesNav"),
    RepresentantesBurger: document.getElementById("RepresentantesBurger"),
    RepresentantesFooter: document.getElementById("RepresentantesFooter"),
    ContatoNav: document.getElementById("ContatoNav"),
    ContatoFooter: document.getElementById("ContatoFooter"),
    ContatoBurger: document.getElementById("ContatoBurger"),
    CatálogoFooter: document.getElementById("CatálogoFooter"),
    CatálogoNav: document.getElementById("CatálogoNav"),
    FaleConoscoFooter: document.getElementById("FaleConoscoFooter"),
    RadiadorFooter: document.getElementById("RadiadorFooter"),
    EletroventiladorFooter: document.getElementById("EletroventiladorFooter"),
    CondensadorFooter: document.getElementById("CondensadorFooter"),
    EvaporadorFooter: document.getElementById("EvaporadorFooter"),
    RadiadordeoleoFooter: document.getElementById("RadiadordeoleoFooter"),
    RadiadordeAquecimentoFooter: document.getElementById(
      "RadiadordeAquecimentoFooter"
    ),
    VentiladorInternoFooter: document.getElementById("VentiladorInternoFooter"),
    ListadeProdutos: document.getElementById("ListadeProdutos"),
    Precisadeajuda: document.getElementById("Precisadeajuda"),
    atendidoimediatamente: document.getElementById("atendidoimediatamente"),
    Respondeemalgunsminutos: document.getElementById("Respondeemalgunsminutos"),
    FaleConoscoWACARD: document.getElementById("FaleConoscoWACARD"),

    // Página Contato
    FaleConoscoTitle: document.getElementById("FaleConoscoTitle"),
    Nossoscanais: document.getElementById("Nossoscanais"),
    Enviar: document.getElementById("Enviar"),
    Nome: document.getElementById("Nome"),
    Sobrenome: document.getElementById("Sobrenome"),
    Telefone: document.getElementById("Telefone"),
    Mensagem: document.getElementById("Mensagem"),
  };

  // Atualiza os textos com base no idioma selecionado
  for (const key in elements) {
    if (elements[key]) {
      const element = elements[key];

      // Verifica se é um input
      if (element.tagName === "INPUT") {
        if (element.hasAttribute("placeholder")) {
          // Atualiza o placeholder
          element.placeholder = translations[language][key];
        } else if (element.type === "button") {
          // Atualiza o valor de um botão
          element.value = translations[language][key];
        }
      } else {
        // Para outros elementos
        element.innerHTML = translations[language][key];
      }
    }
  }
}

// Define um idioma padrão
changeLanguage("pt");
