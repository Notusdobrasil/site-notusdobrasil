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

    // Página Representantes
    Ondeestamos: "Where we are",
    LocalizadoemSalto:
      "Located in Salto/SP, near Viracopos Airport in Campinas/SP, with quick and easy access to some of the main highways in the State of São Paulo, Notus has the ability to supply its products across the entire national territory with efficiency and excellence.",
    Cliqueaqui: "Click here to learn more",
    Encontreumrepresentante:
      "Find a<br />Notus<strong><br />representative!</strong>",
    ANotusSistemas:
      "Notus Thermal Systems of Brazil is present throughout the national territory, just click on the map and check the nearest representative to you.",
      
    FaleConoscoREPRE: "Contact Us!",

    FaleConoscoWACARD: "Contact Us!",

    //Representantes
    ResponsavelGiovani: "Responsible: Giovani",
    ResponsavelHaroldo: "Responsible: Haroldo",
    ResponsavelViviane: "Responsible: Viviane",
    ResponsavelNotus1: "Responsible: Notus",
    ResponsavelNotus2: "Responsible: Notus",
    ResponsavelNotus3: "Responsible: Notus",
    ResponsavelNotus4: "Responsible: Notus",
    ResponsavelNotus5: "Responsible: Notus",
    ResponsavelNotus6: "Responsible: Notus",
    ResponsavelRogerio: "Responsible: Rogério Longuino",
    ResponsavelSilvanei: "Responsible: Silvanei",
    ResponsavelAlexandre: "Responsible: Alexandre",
    ResponsavelTiago: "Responsible: Tiago",
    ResponsavelIvo: "Responsible: Ivo",
    ResponsavelRicardoBer1: "Responsible: Ricardo Bernardino",
    ResponsavelRicardoBer2: "Responsible: Ricardo Bernardino",
    ResponsavelRicardoBer3: "Responsible: Ricardo Bernardino",
    ResponsavelRicardoBer4: "Responsible: Ricardo Bernardino",
    ResponsavelRicardoBer5: "Responsible: Ricardo Bernardino",
    ResponsavelHugo1: "Responsible: Hugo",
    ResponsavelHugo2: "Responsible: Hugo",
    ResponsavelHugo3: "Responsible: Hugo",
    ResponsavelJosue1: "Responsible: Josué",
    ResponsavelJosue2: "Responsible: Josué",
    ResponsavelJosue3: "Responsible: Josué",
    ResponsavelBuralli1: "Responsible: Buralli",
    ResponsavelBuralli2: "Responsible: Buralli",

    // Telefones
    Telefone1: "Phone: 51 98594-8585",
    Telefone2: "Phone: 48 9921-0001",
    Telefone3: "Phone: 11 99841-7696",
    Telefone4: "Phone: 11 4210-1997",
    Telefone5: "Phone: 11 95454-6767",
    Telefone6: "Phone: 19 99215-2272",
    Telefone7: "Phone: 21 97043-9449",
    Telefone8: "Phone: 27 99738-5333",
    Telefone9: "Phone: 31 99982-1158",
    Telefone10: "Phone: 71 98199-3525",
    Telefone11: "Phone: 71 98199-3525",
    Telefone12: "Phone: 71 98199-3525",
    Telefone13: "Phone: 71 98199-3525",
    Telefone14: "Phone: 71 98199-3525",
    Telefone15: "Phone: 11 4210-1997",
    Telefone16: "Phone: 62 99973-0276",
    Telefone17: "Phone: 62 99973-0276",
    Telefone18: "Phone: 62 99973-0276",
    Telefone19: "Phone: 11 4210-1997",
    Telefone20: "Phone: 11 4210-1997",
    Telefone21: "Phone: 11 4210-1997",
    Telefone22: "Phone: 11 4210-1997",
    Telefone23: "Phone: 92 99614-1567",
    Telefone24: "Phone: 69 9960-2111",
    Telefone25: "Phone: 92 99614-1567",
    Telefone26: "Phone: 69 9960-2111",
    Telefone27: "Phone: 92 99614-1567",
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

    // Página Representantes
    Ondeestamos: "Onde estamos",
    LocalizadoemSalto:
      "Localizado em Salto/SP próximo ao aeroporto de Viracopos em Campinas/SP e com acesso rápido e fácil a algumas das principais rodovias do Estado de São Paulo, a Notus tem a capacidade de fornecer seus produtos em todo o território nacional com eficácia e excelência.",
    Cliqueaqui: "Clique aqui para saber mais",
    Encontreumrepresentante:
      "Encontre um<br />representante<strong><br />Notus!</strong>",
    ANotusSistemas:
      "A Notus Sistemas Térmicos do Brasil está presente em todo o território nacional, basta clicar no mapa e verificar o representante mais próximo de você.",
    FaleConoscoREPRE: "Fale Conosco!",

    //Representantes
    ResponsavelGiovani: "Responsável: Giovani",
    ResponsavelHaroldo: "Responsável: Haroldo",
    ResponsavelViviane: "Responsável: Viviane",
    ResponsavelNotus1: "Responsável: Notus",
    ResponsavelNotus2: "Responsável: Notus",
    ResponsavelNotus3: "Responsável: Notus",
    ResponsavelNotus4: "Responsável: Notus",
    ResponsavelNotus5: "Responsável: Notus",
    ResponsavelNotus6: "Responsável: Notus",
    ResponsavelRogerio: "Responsável: Rogério Longuino",
    ResponsavelSilvanei: "Responsável: Silvanei",
    ResponsavelAlexandre: "Responsável: Alexandre",
    ResponsavelTiago: "Responsável: Tiago",
    ResponsavelIvo: "Responsável: Ivo",
    ResponsavelRicardoBer1: "Responsável: Ricardo Bernardino",
    ResponsavelRicardoBer2: "Responsável: Ricardo Bernardino",
    ResponsavelRicardoBer3: "Responsável: Ricardo Bernardino",
    ResponsavelRicardoBer4: "Responsável: Ricardo Bernardino",
    ResponsavelRicardoBer5: "Responsável: Ricardo Bernardino",
    ResponsavelHugo1: "Responsável: Hugo",
    ResponsavelHugo2: "Responsável: Hugo",
    ResponsavelHugo3: "Responsável: Hugo",
    ResponsavelJosue1: "Responsável: Josué",
    ResponsavelJosue2: "Responsável: Josué",
    ResponsavelJosue3: "Responsável: Josué",
    ResponsavelBuralli1: "Responsável: Buralli",
    ResponsavelBuralli2: "Responsável: Buralli",

    // Telefone
    Telefone1: "Telefone: 51 98594-8585",
    Telefone2: "Telefone: 48 9921-0001",
    Telefone3: "Telefone: 11 99841-7696",
    Telefone4: "Telefone: 11 4210-1997",
    Telefone5: "Telefone: 11 95454-6767",
    Telefone6: "Telefone: 19 99215-2272",
    Telefone7: "Telefone: 21 97043-9449",
    Telefone8: "Telefone: 27 99738-5333",
    Telefone9: "Telefone: 31 99982-1158",
    Telefone10: "Telefone: 71 98199-3525",
    Telefone11: "Telefone: 71 98199-3525",
    Telefone12: "Telefone: 71 98199-3525",
    Telefone13: "Telefone: 71 98199-3525",
    Telefone14: "Telefone: 71 98199-3525",
    Telefone15: "Telefone: 11 4210-1997",
    Telefone16: "Telefone: 62 99973-0276",
    Telefone17: "Telefone: 62 99973-0276",
    Telefone18: "Telefone: 62 99973-0276",
    Telefone19: "Telefone: 11 4210-1997",
    Telefone20: "Telefone: 11 4210-1997",
    Telefone21: "Telefone: 11 4210-1997",
    Telefone22: "Telefone: 11 4210-1997",
    Telefone23: "Telefone: 92 99614-1567",
    Telefone24: "Telefone: 69 9960-2111",
    Telefone25: "Telefone: 92 99614-1567",
    Telefone26: "Telefone: 69 9960-2111",
    Telefone27: "Telefone: 92 99614-1567",
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
    // Página Representantes
    Ondeestamos: "¿Dónde estamos?",
    LocalizadoemSalto:
      "Ubicado en Salto/SP, cerca del aeropuerto de Viracopos en Campinas/SP y con acceso rápido y fácil a algunas de las principales carreteras del Estado de São Paulo, Notus tiene la capacidad de suministrar sus productos a todo el territorio nacional con eficacia y excelencia.",
    Cliqueaqui: "Haz clic aquí para saber más",
    Encontreumrepresentante:
      "Encuentra un<br />representante<strong><br />Notus!</strong>",
    ANotusSistemas:
      "Notus Sistemas Térmicos de Brasil está presente en todo el territorio nacional, solo haz clic en el mapa y verifica el representante más cercano a ti.",
    FaleConoscoREPRE: "¡Contáctanos!",

    //Representantes
    ResponsavelGiovani: "Responsable: Giovani",
    ResponsavelHaroldo: "Responsable: Haroldo",
    ResponsavelViviane: "Responsable: Viviane",
    ResponsavelNotus1: "Responsable: Notus",
    ResponsavelNotus2: "Responsable: Notus",
    ResponsavelNotus3: "Responsable: Notus",
    ResponsavelNotus4: "Responsable: Notus",
    ResponsavelNotus5: "Responsable: Notus",
    ResponsavelNotus6: "Responsable: Notus",
    ResponsavelRogerio: "Responsable: Rogério Longuino",
    ResponsavelSilvanei: "Responsable: Silvanei",
    ResponsavelAlexandre: "Responsable: Alexandre",
    ResponsavelTiago: "Responsable: Tiago",
    ResponsavelIvo: "Responsable: Ivo",
    ResponsavelRicardoBer1: "Responsable: Ricardo Bernardino",
    ResponsavelRicardoBer2: "Responsable: Ricardo Bernardino",
    ResponsavelRicardoBer3: "Responsable: Ricardo Bernardino",
    ResponsavelRicardoBer4: "Responsable: Ricardo Bernardino",
    ResponsavelRicardoBer5: "Responsable: Ricardo Bernardino",
    ResponsavelHugo1: "Responsable: Hugo",
    ResponsavelHugo2: "Responsable: Hugo",
    ResponsavelHugo3: "Responsable: Hugo",
    ResponsavelJosue1: "Responsable: Josué",
    ResponsavelJosue2: "Responsable: Josué",
    ResponsavelJosue3: "Responsable: Josué",
    ResponsavelBuralli1: "Responsable: Buralli",
    ResponsavelBuralli2: "Responsable: Buralli",

    // Telefones
    Telefone1: "Teléfono: 51 98594-8585",
    Telefone2: "Teléfono: 48 9921-0001",
    Telefone3: "Teléfono: 11 99841-7696",
    Telefone4: "Teléfono: 11 4210-1997",
    Telefone5: "Teléfono: 11 95454-6767",
    Telefone6: "Teléfono: 19 99215-2272",
    Telefone7: "Teléfono: 21 97043-9449",
    Telefone8: "Teléfono: 27 99738-5333",
    Telefone9: "Teléfono: 31 99982-1158",
    Telefone10: "Teléfono: 71 98199-3525",
    Telefone11: "Teléfono: 71 98199-3525",
    Telefone12: "Teléfono: 71 98199-3525",
    Telefone13: "Teléfono: 71 98199-3525",
    Telefone14: "Teléfono: 71 98199-3525",
    Telefone15: "Teléfono: 11 4210-1997",
    Telefone16: "Teléfono: 62 99973-0276",
    Telefone17: "Teléfono: 62 99973-0276",
    Telefone18: "Teléfono: 62 99973-0276",
    Telefone19: "Teléfono: 11 4210-1997",
    Telefone20: "Teléfono: 11 4210-1997",
    Telefone21: "Teléfono: 11 4210-1997",
    Telefone22: "Teléfono: 11 4210-1997",
    Telefone23: "Teléfono: 92 99614-1567",
    Telefone24: "Teléfono: 69 9960-2111",
    Telefone25: "Teléfono: 92 99614-1567",
    Telefone26: "Teléfono: 69 9960-2111",
    Telefone27: "Teléfono: 92 99614-1567",
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

    // Página Representantes
    Ondeestamos: document.getElementById("Ondeestamos"),
    LocalizadoemSalto: document.getElementById("LocalizadoemSalto"),
    Cliqueaqui: document.getElementById("Cliqueaqui"),
    Encontreumrepresentante: document.getElementById("Encontreumrepresentante"),
    ANotusSistemas: document.getElementById("ANotusSistemas"),
    FaleConoscoREPRE: document.getElementById("FaleConoscoREPRE"),

    //Representantes
    ResponsavelGiovani: document.getElementById("ResponsavelGiovani"),
    ResponsavelHaroldo: document.getElementById("ResponsavelHaroldo"),
    ResponsavelViviane: document.getElementById("ResponsavelViviane"),
    ResponsavelNotus1: document.getElementById("ResponsavelNotus1"),
    ResponsavelNotus2: document.getElementById("ResponsavelNotus2"),
    ResponsavelNotus3: document.getElementById("ResponsavelNotus3"),
    ResponsavelNotus4: document.getElementById("ResponsavelNotus4"),
    ResponsavelNotus5: document.getElementById("ResponsavelNotus5"),
    ResponsavelNotus6: document.getElementById("ResponsavelNotus6"),
    ResponsavelRogerio: document.getElementById("ResponsavelRogerio"),
    ResponsavelSilvanei: document.getElementById("ResponsavelSilvanei"),
    ResponsavelAlexandre: document.getElementById("ResponsavelAlexandre"),
    ResponsavelTiago: document.getElementById("ResponsavelTiago"),
    ResponsavelIvo: document.getElementById("ResponsavelIvo"),
    ResponsavelRicardoBer1: document.getElementById("ResponsavelRicardoBer1"),
    ResponsavelRicardoBer2: document.getElementById("ResponsavelRicardoBer2"),
    ResponsavelRicardoBer3: document.getElementById("ResponsavelRicardoBer3"),
    ResponsavelRicardoBer4: document.getElementById("ResponsavelRicardoBer4"),
    ResponsavelRicardoBer5: document.getElementById("ResponsavelRicardoBer5"),
    ResponsavelHugo1: document.getElementById("ResponsavelHugo1"),
    ResponsavelHugo2: document.getElementById("ResponsavelHugo2"),
    ResponsavelHugo3: document.getElementById("ResponsavelHugo3"),
    ResponsavelJosue1: document.getElementById("ResponsavelJosue1"),
    ResponsavelJosue2: document.getElementById("ResponsavelJosue2"),
    ResponsavelJosue3: document.getElementById("ResponsavelJosue3"),
    ResponsavelBuralli1: document.getElementById("ResponsavelBuralli1"),
    ResponsavelBuralli2: document.getElementById("ResponsavelBuralli2"),

    // Telefones

    Telefone1: document.getElementById("Telefone1"),
    Telefone2: document.getElementById("Telefone2"),
    Telefone3: document.getElementById("Telefone3"),
    Telefone4: document.getElementById("Telefone4"),
    Telefone5: document.getElementById("Telefone5"),
    Telefone6: document.getElementById("Telefone6"),
    Telefone7: document.getElementById("Telefone7"),
    Telefone8: document.getElementById("Telefone8"),
    Telefone9: document.getElementById("Telefone9"),
    Telefone10: document.getElementById("Telefone10"),
    Telefone11: document.getElementById("Telefone11"),
    Telefone12: document.getElementById("Telefone12"),
    Telefone13: document.getElementById("Telefone13"),
    Telefone14: document.getElementById("Telefone14"),
    Telefone15: document.getElementById("Telefone15"),
    Telefone16: document.getElementById("Telefone16"),
    Telefone17: document.getElementById("Telefone17"),
    Telefone18: document.getElementById("Telefone18"),
    Telefone19: document.getElementById("Telefone19"),
    Telefone20: document.getElementById("Telefone20"),
    Telefone21: document.getElementById("Telefone21"),
    Telefone22: document.getElementById("Telefone22"),
    Telefone23: document.getElementById("Telefone23"),
    Telefone24: document.getElementById("Telefone24"),
    Telefone25: document.getElementById("Telefone25"),
    Telefone26: document.getElementById("Telefone26"),
    Telefone27: document.getElementById("Telefone27"),
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
