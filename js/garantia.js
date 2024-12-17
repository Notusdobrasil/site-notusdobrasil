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

    // Página Garantia
    Estaprecisando: "Need help? Don't worry",
    Seestaprecisandodeajuda:
      "If you need help, don't worry! Our specialized team is ready to assist you in the best possible way. Please watch the video on the side before proceeding, it will help you with what you need!",
    Paraagilizar:
      "To <strong>speed up your warranty</strong><br />follow our instructions",
    ManualdeGarantia: "Warranty Manual",
    Estemanual:
      "This manual aims to provide detailed information about our warranty process, clarifying the procedures to be followed related to our product line, customer service, and the proper handling of defective parts.<br /><br />Read this document carefully and keep it in an easily accessible place. Make it known to your employees and always refer to it whenever you have any questions about NOTUS Arrefecimento's warranty policy.",
    Certificado: "Certificate of Completion",
    Paracomecar:
      "To start the warranty process, you need to fill out our warranty certificate with all the required information.<br /><br />To speed up the process, after completing the form, contact us and send us the PDF that will be available after submitting the data.<br /><br />Don't worry, all the data you send through this site is protected and will only be used for the warranty process. All collected data complies with the LGPD law.",
    Fluxograma: "Flowchart",
    Fiquepordentro:
      "Stay informed about how the warranty works. Our warranty follows best practices to identify whether a defect is valid or invalid.<br /><br />We have provided a detailed flowchart of how we handle the warranty.",
    Sepreferirpode:
      "If you prefer, you can contact us, and we will <strong>respond soon!</strong>",
    Enviar: "Send",
    nome: "Name",
    MensagemInput: "Message",
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

    // Página Garantia
    Estaprecisando: "Está precisando de ajuda? Fique Tranquilo",
    Seestaprecisandodeajuda:
      " Se está precisando de ajuda, fique tranquilo! Nossa equipe especializada está pronta para auxiliá-los da melhor forma possível. Por favor, assista ao vídeo ao lado antes de prosseguir, ele vai ajudá-lo no que precisa!",
    Paraagilizar:
      " Para <strong>agilizar sua garantia</strong><br />siga nossas instruções",
    ManualdeGarantia: "Manual de Garantia",
    Estemanual:
      "Este manual tem por finalidade fornecer informações detalhadas sobre o nosso processo de garantia, esclarecendo os procedimentos a serem adotados e relacionados à nossa linha de produtos, ao atendimento e o devido encaminhamento das peças falhadas.<br /><br />Leia atentamente este documento e mantenha-o em lugar de fácil acesso. Torne-o conhecido de seus funcionários e faça uso deste sempre que lhe ocorrer alguma dúvida sobre a política de garantia da NOTUS Arrefecimento.",
    Certificado: "Certificado de preenchimento",
    Paracomecar:
      " Para começar o processo de garantia é necessário que você preencha nosso certificado de garantia com todas as informações.<br /><br />Para maior celeridade do processo, após o preenchimento do formulário entre em contato e envie-nos o PDF que ficará disponível após o preenchimento e a submissão de dados.<br /><br />Fique tranquilo, todos os dados que você envia através deste site é protegido e não será utilizado para outra finalidade e não ser a do processo de garantia. Todos os dados recolhidos estão conforme a lei LGPD da internet.",
    Fluxograma: "Fluxograma",
    Fiquepordentro:
      "Fique por dentro de como a garantia funciona. Nossa garantia trabalha com as melhores práticas para identificar o defeito procedente ou improcedente.<br /><br />Disponibilizamos um fluxograma detalhado de como lidamos com a garantia.",
    Sepreferirpode:
      " Se preferir pode nos contactar, logo te <strong>responderemos!</strong>",
    Enviar: "Enviar",
    nome: "Nome",
    MensagemInput: "Mensagem",
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

    // Página Garantia
    Estaprecisando: "¿Está necesitando ayuda? ¡No se preocupe!",
    Seestaprecisandodeajuda:
      "¡Si está necesitando ayuda, no se preocupe! Nuestro equipo especializado está listo para asistirlo de la mejor manera posible. Por favor, vea el video al lado antes de continuar, ¡le ayudará con lo que necesita!",
    Paraagilizar:
      "Para <strong>agilizar su garantía</strong><br />siga nuestras instrucciones",
    ManualdeGarantia: "Manual de Garantía",
    Estemanual:
      "Este manual tiene como objetivo proporcionar información detallada sobre nuestro proceso de garantía, aclarando los procedimientos a seguir relacionados con nuestra línea de productos, la atención y el debido envío de las piezas defectuosas.<br /><br />Lea atentamente este documento y guárdelo en un lugar de fácil acceso. Hágalo conocido entre sus empleados y utilícelo siempre que tenga alguna duda sobre la política de garantía de NOTUS Arrefecimento.",
    Certificado: "Certificado de llenado",
    Paracomecar:
      "Para comenzar el proceso de garantía, es necesario que complete nuestro certificado de garantía con toda la información.<br /><br />Para agilizar el proceso, después de completar el formulario, póngase en contacto con nosotros y envíenos el PDF que estará disponible después de completar y enviar los datos.<br /><br />No se preocupe, todos los datos que envíe a través de este sitio están protegidos y no se utilizarán para ningún otro propósito que no sea el proceso de garantía. Todos los datos recopilados están de acuerdo con la ley LGPD de internet.",
    Fluxograma: "Flujograma",
    Fiquepordentro:
      "Manténgase informado sobre cómo funciona la garantía. Nuestra garantía trabaja con las mejores prácticas para identificar el defecto procedente o improcedente.<br /><br />Hemos puesto a disposición un flujograma detallado de cómo manejamos la garantía.",
    Sepreferirpode:
      "Si lo prefiere, puede contactarnos, ¡pronto le <strong>responderemos!</strong>",
    Enviar: "Enviar",
    nome: "Nombre",
    MensagemInput: "Mensaje",
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

    // Página Garantia
    Estaprecisando: document.getElementById("Estaprecisando"),
    Seestaprecisandodeajuda: document.getElementById("Seestaprecisandodeajuda"),
    Paraagilizar: document.getElementById("Paraagilizar"),
    ManualdeGarantia: document.getElementById("ManualdeGarantia"),
    Estemanual: document.getElementById("Estemanual"),
    Certificado: document.getElementById("Certificado"),
    Paracomecar: document.getElementById("Paracomecar"),
    Fluxograma: document.getElementById("Fluxograma"),
    Fiquepordentro: document.getElementById("Fiquepordentro"),
    Sepreferirpode: document.getElementById("Sepreferirpode"),
    Enviar: document.getElementById("Enviar"),
    nome: document.getElementById("nomeInput"),
    MensagemInput: document.getElementById("MensagemInput"),
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
