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

    // Página Trabalhe Conosco
    TRABALHARCONOSCO: "ARE YOU INTERESTED IN WORKING WITH US?",
    Ficamosmuitocontentes:
      "We are very happy with your interest in working with us and being part of this family. Check out the video on the side, it will help you better in this process.<br /><br />If you haven't seen our history, mission, vision, and values yet… then take a look there to stay informed about everything. Let's build the future of Brazil together.<br /><br />Good luck, we look forward to seeing you!",
    Conhecatambemas: "Also get to know the companies of the Notus Group!",
    Confiranossasvagas: "Check out <strong>our job openings</strong>!",
    AuxiliardeLogistica: "Logistics Assistant",
    Prerequisitos: "Requirements",
    Formacaonaarea:
      "Education in the area<br />Over 18 years old<br />Reside in Salto<br />Availability of schedule",
    CADASTRO: "REGISTRATION",
    Sejaavisado: "Be notified of new job openings",
    envieseucurr: "send your resume",
    EscolherArquivo: "Choose File",
    enviarBotao: "Send",
    nomeCompleto: "Full name",
    email: "Email",
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

    // Página Trabalhe Conosco

    TRABALHARCONOSCO: "ESTÁ INTERESSADO EM TRABALHAR CONOSCO?",
    Ficamosmuitocontentes:
      " Ficamos muito contentes com seu interesse em trabalhar conosco e fazer parte desta família! confira o vídeo ao lado, ele irá auxiliá-lo melhor neste processo.<br /><br />Se ainda não conferiu nossa história, missão, visão e valores… então dá uma olhada lá para ficar por dentro de tudo. Vamos construir juntos o futuro do Brasil.<br /><br />Boa sorte, esperamos por você!",
    Conhecatambemas: "Conheça também as empresas do Grupo Notus!",
    Confiranossasvagas: "Confira <strong>nossas vagas</strong>",
    AuxiliardeLogistica: "Auxiliar de Logística",
    Prerequisitos: "Pré-requisitos",
    Formacaonaarea:
      " Formação na área<br />Maior de 18 anos<br />Residir em Salto<br />Disponibilidade de horário",
    CADASTRO: "CADASTRO",
    Sejaavisado: "Seja avisado de novas vagas",
    envieseucurr: "envie seu currículo",
    EscolherArquivo: "Escolher Arquivo",
    enviarBotao: "Enviar",
    nomeCompleto: "Nome completo",
    email: "E-mail",
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

    ListadeProdutos: "Lista de productos",

    Precisadeajuda:
      "¿Necesita ayuda? Contáctenos por <strong class='secao2-titulo-cinza' style='font-weight: 700'>WhatsApp!</strong>",
    atendidoimediatamente:
      "¡Hola! Haga clic en uno de nuestros miembros del equipo para ser atendido inmediatamente por WhatsApp.",

    Respondeemalgunsminutos: "El equipo suele responder en pocos minutos.",

    FaleConoscoWACARD: "¡Contáctenos!",

    // Página Trabalhe Conosco
    TRABALHARCONOSCO: "¿ESTÁ INTERESADO EN TRABAJAR CON NOSOTROS?",
    Ficamosmuitocontentes:
      "Estamos muy contentos con su interés en trabajar con nosotros y ser parte de esta familia. Mire el video al lado, que lo ayudará mejor en este proceso.<br /><br />Si aún no ha visto nuestra historia, misión, visión y valores… entonces échales un vistazo para estar al tanto de todo. Construyamos juntos el futuro de Brasil.<br /><br />¡Buena suerte, lo esperamos!",
    Conhecatambemas: "¡Conozca también las empresas del Grupo Notus!",
    Confiranossasvagas: "¡Consulte <strong>nuestras vacantes</strong>!",
    AuxiliardeLogistica: "Auxiliar de Logística",
    Prerequisitos: "Requisitos",
    Formacaonaarea:
      "Formación en el área<br />Mayor de 18 años<br />Residir en Salto<br />Disponibilidad de horario",
    CADASTRO: "REGISTRO",
    Sejaavisado: "Reciba notificaciones de nuevas vacantes",
    envieseucurr: "envíe su currículum",
    EscolherArquivo: "Seleccionar Archivo",
    enviarBotao: "Enviar",
    nomeCompleto: "Nombre completo",
    email: "Correo electrónico",
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

    // Página Trabalhe Conosco
    TRABALHARCONOSCO: document.getElementById("TRABALHARCONOSCO"),
    Ficamosmuitocontentes: document.getElementById("Ficamosmuitocontentes"),
    Conhecatambemas: document.getElementById("Conhecatambemas"),
    Confiranossasvagas: document.getElementById("Confiranossasvagas"),
    AuxiliardeLogistica: document.getElementById("AuxiliardeLogistica"),
    Prerequisitos: document.getElementById("Prerequisitos"),
    Formacaonaarea: document.getElementById("Formacaonaarea"),
    CADASTRO: document.getElementById("CADASTRO"),
    Sejaavisado: document.getElementById("Sejaavisado"),
    envieseucurr: document.getElementById("envieseucurr"),
    EscolherArquivo: document.getElementById("EscolherArquivo"),
    enviarBotao: document.querySelector('input[type="button"][value="Enviar"]'),
    nomeCompleto: document.querySelector('input[placeholder="Nome completo"]'),
    email: document.querySelector('input[placeholder="E-mail"]'),
  };

  // Atualiza os textos com base no idioma selecionado
  // Atualiza os textos com base no idioma selecionado
  for (const key in elements) {
    if (elements[key]) {
      // Verifica se é um input com placeholder
      if (
        elements[key].tagName === "INPUT" &&
        elements[key].hasAttribute("placeholder")
      ) {
        elements[key].placeholder = translations[language][key];
      } else if (
        elements[key].tagName === "INPUT" &&
        elements[key].type === "button"
      ) {
        // Caso seja um botão, altera o value
        elements[key].value = translations[language][key];
      } else {
        // Para outros elementos
        elements[key].innerHTML = translations[language][key];
      }
    }
  }
}

// Define um idioma padrão
changeLanguage("pt");
