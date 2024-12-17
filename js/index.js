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

// Sistema de Idiomas

// Textos em diferentes idiomas
const translations = {
  en: {
    Inscrevase: "Subscribe",

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

    Comodeusdovento: "With the god of wind, the cooling system is guaranteed!",

    Commaisde2500:
      "With more than 2,500 cooling system items, we are ready to expand your product portfolio and meet any demand.",

    FaleConoscoWA:
      "<img class='secao1-botao-img' src='../images/logo-whatsapp.webp' alt='Logo Whatsapp'/>Contact Us!",
    FaleConoscoWACARD: "Contact Us!",
    FaleConoscoParceiro: "Contact Us!",
    FaleConoscoFooter: "Contact Us!",

    OrgulhosamenteBrasileira:
      "<strong>Notus</strong> Thermal Systems,<br /><strong>Proudly</strong><br /><strong class='secao2-titulo-degrade'>Brazilian!</strong>",

    Precisadeajuda:
      "Need help? Contact us via <strong class='secao2-titulo-cinza' style='font-weight: 700'>WhatsApp!</strong>",

    atendidoimediatamente:
      "Hello! Click on one of our team members to be assisted immediately on WhatsApp!",

    Respondeemalgunsminutos: "The team usually responds within a few minutes.",

    Comercial: "Commercial",

    Benefíciosdosnossosprodutos: "Benefits of our products",

    QualidadeOEM: "OEM Quality",

    Nossosprodutossaoprojetados:
      "Our products are designed with the same precision and geometry as the original parts, ensuring maximum durability and resistance, even under extreme conditions.",

    Certificacoesdeexcelencia: "Excellence certifications",

    Trabalhamosapenascomfornecedores:
      "We work only with suppliers that strictly follow international quality standards such as ISO9001, ISOTS16949, and CE.",

    Especialistasemarrefecimentoautomotivo: "Automotive cooling specialists",

    Comnossasfabricasdeponta:
      "With our state-of-the-art factories, innovative technologies, and strategic partnerships, we offer industry-leading cooling solutions.",

    Segurancanacompra: "Safety<br />in purchase",

    Maiorvariedadedomercado: "Largest variety in the market",

    Somosamarcamaiscompleta:
      "We are the most comprehensive cooling brand, with more than 2,500 items in our portfolio and over 500,000 pieces in stock ready for shipment.",

    Qualidadegarantida: "Guaranteed quality",

    Todososnossosprodutos:
      "All our products undergo rigorous quality tests before packaging, ensuring performance and safety. Additionally, we offer a 1-year warranty on our entire line.",

    Inovacaoconstante: "Constant innovation",

    Nossaequipededesenvolvimento:
      "Our development team is always ahead, managing and improving our product offerings, bringing the best solutions to the market.",

    Eticademercado: "Market<br />ethics",

    Compromissocomatransparencia: "Commitment to transparency",

    Respeitamosacadeia:
      "We respect the sales chain, protecting our customers and maintaining market integrity.",

    Parceriadevalor: "Value partnership",

    Atendemosdistribuidores:
      "We serve distributors and cooling specialists, who become our Notus Partners! We recommend and direct clients to our Notus Partners when we cannot serve them directly.",

    Unicaempresa:
      "The only company <strong>manufacturing radiators</strong> and components for the <strong>cooling system</strong> that is <strong>100% Brazilian</strong>",

    DEIMPORTADORAAFABRICANTE: "FROM IMPORTER TO MANUFACTURER.",

    Unicaempresafabricante:
      "The only manufacturer of the cooling system that is 100% national.",

    Nascidacomoimportadora:
      "Born as an importer, Notus Thermal Systems of Brazil has consolidated itself in the Brazilian market, always aiming to make a difference for those around us. Today, our company is proud to be 100% national to serve and foster the Brazilian industry.",

    LinhasdeProdutos: "<strong>Product Lines</strong>",

    RadiadorProduct: "Radiator",
    RadiadorFooter: "Radiator",

    EletroventiladorProduct: "Electrofan",
    EletroventiladorFooter: "Electrofan",

    CondensadorProduct: "Condenser",
    CondensadorFooter: "Condenser",

    EvaporadorProduct: "Evaporator",
    EvaporadorFooter: "Evaporator",

    RadiadordeoleoProduct: "Oil Radiator",
    RadiadordeoleoFooter: "Oil Radiator",

    RadiadordeAquecimentoProduct: "Heating Radiator",
    RadiadordeAquecimentoFooter: "Heating Radiator",

    VentiladorInternoProduct: "Internal Fan",
    VentiladorInternoFooter: "Internal Fan",

    Querometornar: "I want to become a Notus Partner!",

    PorqueescolherNotus: "Why <strong>choose Notus?</strong>",

    Modelodenegóciounico: "Unique <strong>business model</strong>",

    Sempreinvestindo:
      "Always investing in our own solutions to meet the needs of our customers, which ultimately become ours. With this, we develop our machinery, product molds, ERP software, and own fleet to stand out and serve you in the best possible way.",

    Qualidadeeconfianca: "Quality and <strong>trust</strong>",

    Nossaconduta:
      "Our conduct is based on quality and trust, which makes us rigorous in company procedures, supplier selection, raw materials, and more.",

    Fazeradiferenca: "Making a <strong>difference</strong>",

    Nossotime:
      "Our team is select; we aim to make a difference in the lives of everyone who works with us.",

    Certificacoeserigor: "Certifications and <strong>rigor</strong>",

    Todaessarigorosidade:
      "All this rigor makes our quality distinctive; our partners in the Asian and Brazilian markets were handpicked and possess the correct certifications for each occasion, such as ISO 9001, ISOTS16949, and CE.",

    Equipededesenvolvimento: "Development <strong>team</strong>",

    Possuímosainda:
      "We also have a product development team always seeking to bring innovation and satisfaction to stakeholders and their needs.",

    Indústrianacional: "National <strong>industry</strong>",

    Alemdetudoisso:
      "Moreover, we are the only Brazilian company manufacturing 100% national cooling system items.",

    Confiradicasenovidades:
      "Check out <strong>tips and news</strong> in the automotive sector",

    Assinenossanewsletter:
      "<strong>Subscribe to our newsletter</strong> and stay updated on all the news!",

    ListadeProdutos: "Product List",

    DesenvolvidoporNotus:
      "Developed by Notus Thermal Systems of Brazil © All rights reserved",
  },
  pt: {
    Inscrevase: "Inscreva-se",
    FaleConoscoWA:
      "<img class='secao1-botao-img' src='../images/logo-whatsapp.webp' alt='Logo Whatsapp'/>Fale Conosco!",
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

    Comodeusdovento:
      "Com o deus do vento, o sistema de arrefecimento é garantido!",

    Commaisde2500:
      "Com mais de 2.500 itens do sistema de arrefecimento, estamos prontos para aumentar seu portfólio de produtos e receber qualquer demanda.",

    FaleConoscoWACARD: " Fale Conosco!",
    FaleConoscoParceiro: " Fale Conosco!",
    FaleConoscoFooter: " Fale Conosco!",

    OrgulhosamenteBrasileira:
      " <strong>Notus</strong> Sistemas Térmicos,<br /><strong>Orgulhosamente</strong><br /><strong class='secao2-titulo-degrade'>Brasileira!</strong>",

    Precisadeajuda:
      " Precisa de ajuda? Fale conosco pelo<strong class='secao2-titulo-cinza' style='font-weight: 700'>Whatsapp!</strong>",

    atendidoimediatamente:
      "Olá! Clique em um de nossos membros da equipe para ser atendido imediatamente pelo Whatsapp!",

    Respondeemalgunsminutos: "A equipe normalmente responde em alguns minutos.",

    Comercial: "Comercial",

    Benefíciosdosnossosprodutos: "Benefícios dos nossos produtos",

    QualidadeOEM: "Qualidade OEM",

    Nossosprodutossaoprojetados:
      "Nossos produtos são projetados com a mesma precisão e geometria das peças originais, garantindo máxima durabilidade e resistência , mesmo em condições extremas.",

    Certificacoesdeexcelencia: " Certificações de excelência",

    Trabalhamosapenascomfornecedores:
      "  Trabalhamos apenas com fornecedores que seguem rigorosamente os padrões internacionais de qualidade como ISO9001, ISOTS16949 E CE.",

    Especialistasemarrefecimentoautomotivo:
      "Especialistas em arrefecimento automotivo",

    Comnossasfabricasdeponta:
      "Com nossas fábricas de ponta, tecnologias inovadoras e parcerias estratégicas, oferecemos soluções líderes no setor de arrefecimento.",

    Segurancanacompra: " Segurança <br />na compra",

    Maiorvariedadedomercado: "Maior variedade do mercado",

    Somosamarcamaiscompleta:
      "Somos a marca mais completa em arrefecimento, com mais de 2.500 itens em nosso portfólio e um estoque de mais de 500.000 peças prontas para envio.",

    Qualidadegarantida: "Qualidade garantida",

    Todososnossosprodutos:
      "   Todos os nossos produtos passam por rigorosos testes de qualidade antes de serem embalados, garantindo performance e segurança. Além disso, oferecemos 1 ano de garantia em toda a nossa linha.",

    Inovacaoconstante: "Inovação constante",

    Nossaequipededesenvolvimento:
      "  Nossa equipe de desenvolvimento está sempre à frente, gerindo e aprimorando nossa oferta de produtos, trazendo as melhores soluções para o mercado.",

    Eticademercado: "  Ética <br />de mercado",

    Compromissocomatransparencia: "Compromisso com a transparência",

    Respeitamosacadeia:
      " Respeitamos a cadeia de vendas, protegendo nossos clientes e mantendo a integridade do mercado.",

    Parceriadevalor: "Parceria de valor",

    Atendemosdistribuidores:
      "  Atendemos distribuidores e especialistas em arrefecimento, que se tornam nossos Parceiros Notus! Recomendamos e direcionamos clientes para nossos Parceiros Notus quando não podemos atendê-los diretamente.",

    Unicaempresa:
      " Única empresa <strong>fabricante de radiadores</strong> e componentes <strong>sistema de arrefecimento</strong> que é <strong>100% Brasileira</strong>",

    DEIMPORTADORAAFABRICANTE: "DE IMPORTADORA A FABRICANTE.",

    Unicaempresafabricante:
      "Única empresa fabricante do sistema de arrefecimento que é 100% Nacional.",

    Nascidacomoimportadora:
      "Nascida como importadora, a Notus Sistemas Térmicos do Brasil se consolidou no mercado brasileiro, sempre visando fazer a diferença àqueles a nossa volta. Hoje nossa empresa tem o orgulho de ser 100% nacional para servir e fomentar a indústria brasileira.",

    LinhasdeProdutos: "Linhas de <strong>Produtos</strong>",

    RadiadorProduct: "Radiador",
    RadiadorFooter: "Radiador",

    EletroventiladorProduct: "Eletro Ventilador",
    EletroventiladorFooter: "Eletro Ventilador",

    CondensadorProduct: "Condensador",
    CondensadorFooter: "Condensador",

    EvaporadorProduct: "Evaporador",
    EvaporadorFooter: "Evaporador",

    RadiadordeoleoProduct: "Radiador de Óleo",
    RadiadordeoleoFooter: "Radiador de Óleo",

    RadiadordeAquecimentoProduct: "Radiador de Aquecimento",
    RadiadordeAquecimentoFooter: "Radiador de Aquecimento",

    VentiladorInternoProduct: "Ventilador Interno",
    VentiladorInternoFooter: "Ventilador Interno",

    Querometornar: "Quero me tornar um Parceiro Notus!",

    PorqueescolherNotus: "Por que <strong>escolher Notus?</strong>",

    Modelodenegóciounico: "Modelo de <strong>negócio único</strong>",

    Sempreinvestindo:
      " Sempre investindo em soluções próprias para atender às necessidades de nossos clientes, que acabam por se tornar as nossas. Com isto, desenvolvemos nossos maquinários, moldes de produtos, software ERP e frota própria para nos destacar e atendê-los da melhor forma possível;",

    Qualidadeeconfianca: "Qualidade e <strong>confiança</strong>",

    Nossaconduta:
      "Nossa conduta é baseada na qualidade e confiança, o que nos torna rigorosos quanto aos procedimentos da empresa, escolha de fornecedores, matéria-prima e outros;",

    Fazeradiferenca: "Fazer a <strong>diferença</strong>",

    Nossotime:
      "Nosso time é seleto, procuramos fazer a diferença na vida de cada um que trabalha conosco;",

    Certificacoeserigor: "Certificações e <strong>rigor</strong>",

    Todaessarigorosidade:
      "Toda essa rigorosidade torna nossa qualidade diferenciada; nossos parceiros dos mercados asiático e brasileiro foram escolhidos a dedo, possuindo as corretas certificações para cada ocasião, como a ISO 9001, ISOTS16949 e CE;",

    Equipededesenvolvimento: "Equipe de <strong>desenvolvimento</strong>",

    Possuímosainda:
      " Possuímos, ainda, uma equipe de desenvolvimento de produtos sempre em busca de trazer novidades e satisfação aos stakeholders e suas necessidades",

    Indústrianacional: "Indústria <strong>nacional</strong>",

    Alemdetudoisso:
      "Além de tudo isso, somos a única empresa brasileira com fabricação de itens 100% nacional do sistema de arrefecimento automotivo.",

    Confiradicasenovidades:
      "Confira <strong>dicas e novidades</strong> do setor automotivo",

    Assinenossanewsletter:
      " <strong>Assine nossa newsletter</strong> e fique por dentro de todas as novidades!",

    ListadeProdutos: "Lista de Produtos",

    DesenvolvidoporNotus:
      "Desenvolvido por Notus Sistemas Térmicos do Brasil © Todos os direitos reservados",
  },
  es: {
    Inscrevase: "Registrarse",

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

    Comodeusdovento:
      "¡Con el dios del viento, el sistema de enfriamiento está garantizado!",

    Commaisde2500:
      "Con más de 2.500 artículos del sistema de enfriamiento, estamos listos para ampliar su portafolio de productos y atender cualquier demanda.",

    FaleConoscoWA:
      "<img class='secao1-botao-img' src='../images/logo-whatsapp.webp' alt='Logo Whatsapp'/>¡Contáctenos!",
    FaleConoscoWACARD: "¡Contáctenos!",
    FaleConoscoParceiro: "¡Contáctenos!",
    FaleConoscoFooter: "¡Contáctenos!",

    OrgulhosamenteBrasileira:
      "<strong>Notus</strong> Sistemas Térmicos,<br /><strong>Orgullosamente</strong><br /><strong class='secao2-titulo-degrade'>Brasileña!</strong>",

    Precisadeajuda:
      "¿Necesita ayuda? Contáctenos por <strong class='secao2-titulo-cinza' style='font-weight: 700'>WhatsApp!</strong>",

    atendidoimediatamente:
      "¡Hola! Haga clic en uno de nuestros miembros del equipo para ser atendido inmediatamente por WhatsApp.",

    Respondeemalgunsminutos: "El equipo suele responder en pocos minutos.",

    Comercial: "Comercial",

    Benefíciosdosnossosprodutos: "Beneficios de nuestros productos",

    QualidadeOEM: "Calidad OEM",

    Nossosprodutossaoprojetados:
      "Nuestros productos están diseñados con la misma precisión y geometría que las piezas originales, garantizando máxima durabilidad y resistencia, incluso en condiciones extremas.",

    Certificacoesdeexcelencia: "Certificaciones de excelencia",

    Trabalhamosapenascomfornecedores:
      "Trabajamos únicamente con proveedores que cumplen estrictamente con los estándares internacionales de calidad como ISO9001, ISOTS16949 y CE.",

    Especialistasemarrefecimentoautomotivo:
      "Especialistas en enfriamiento automotriz",

    Comnossasfabricasdeponta:
      "Con nuestras fábricas de vanguardia, tecnologías innovadoras y asociaciones estratégicas, ofrecemos soluciones líderes en el sector de enfriamiento.",

    Segurancanacompra: "Seguridad<br />en la compra",

    Maiorvariedadedomercado: "Mayor variedad del mercado",

    Somosamarcamaiscompleta:
      "Somos la marca más completa en enfriamiento, con más de 2.500 artículos en nuestro portafolio y más de 500.000 piezas en stock listas para envío.",

    Qualidadegarantida: "Calidad garantizada",

    Todososnossosprodutos:
      "Todos nuestros productos pasan por rigurosas pruebas de calidad antes de ser embalados, garantizando rendimiento y seguridad. Además, ofrecemos 1 año de garantía en toda nuestra línea.",

    Inovacaoconstante: "Innovación constante",

    Nossaequipededesenvolvimento:
      "Nuestro equipo de desarrollo está siempre a la vanguardia, gestionando y mejorando nuestra oferta de productos, trayendo las mejores soluciones al mercado.",

    Eticademercado: "Ética<br />de mercado",

    Compromissocomatransparencia: "Compromiso con la transparencia",

    Respeitamosacadeia:
      "Respetamos la cadena de ventas, protegiendo a nuestros clientes y manteniendo la integridad del mercado.",

    Parceriadevalor: "Asociación de valor",

    Atendemosdistribuidores:
      "Atendemos distribuidores y especialistas en enfriamiento, ¡quienes se convierten en nuestros socios Notus! Recomendamos y dirigimos clientes a nuestros socios Notus cuando no podemos atenderlos directamente.",

    Unicaempresa:
      "La única empresa <strong>fabricante de radiadores</strong> y componentes para el <strong>sistema de enfriamiento</strong> que es <strong>100% brasileña</strong>",

    DEIMPORTADORAAFABRICANTE: "DE IMPORTADOR A FABRICANTE.",

    Unicaempresafabricante:
      "La única empresa fabricante del sistema de enfriamiento que es 100% nacional.",

    Nascidacomoimportadora:
      "Nacida como importadora, Notus Sistemas Térmicos de Brasil se ha consolidado en el mercado brasileño, siempre buscando marcar la diferencia para quienes nos rodean. Hoy, nuestra empresa tiene el orgullo de ser 100% nacional para atender y fomentar la industria brasileña.",

    LinhasdeProdutos: "<strong>Líneas de productos</strong>",

    RadiadorProduct: "Radiador",
    RadiadorFooter: "Radiador",

    EletroventiladorProduct: "Electroventilador",
    EletroventiladorFooter: "Electroventilador",

    CondensadorProduct: "Condensador",
    CondensadorFooter: "Condensador",

    EvaporadorProduct: "Evaporador",
    EvaporadorFooter: "Evaporador",

    RadiadordeoleoProduct: "Radiador de Aceite",
    RadiadordeoleoFooter: "Radiador de Aceite",

    RadiadordeAquecimentoProduct: "Radiador de Calefacción",
    RadiadordeAquecimentoFooter: "Radiador de Calefacción",

    VentiladorInternoProduct: "Ventilador Interno",
    VentiladorInternoFooter: "Ventilador Interno",

    Querometornar: "¡Quiero ser un socio Notus!",

    PorqueescolherNotus: "¿Por qué elegir <strong>Notus?</strong>",

    Modelodenegóciounico: "Modelo de negocio <strong>único</strong>",

    Sempreinvestindo:
      "Siempre invirtiendo en nuestras propias soluciones para satisfacer las necesidades de nuestros clientes, que a su vez se convierten en las nuestras. Con esto, desarrollamos nuestras maquinarias, moldes de productos, software ERP y flota propia para destacar y atenderle de la mejor manera posible.",

    Qualidadeeconfianca: "Calidad y <strong>confianza</strong>",

    Nossaconduta:
      "Nuestra conducta está basada en calidad y confianza, lo que nos hace rigurosos en procedimientos empresariales, selección de proveedores, materias primas y más.",

    Fazeradiferenca: "Haciendo la <strong>diferencia</strong>",

    Nossotime:
      "Nuestro equipo es selecto; buscamos marcar la diferencia en la vida de todos los que trabajan con nosotros.",

    Certificacoeserigor: "Certificaciones y <strong>rigor</strong>",

    Todaessarigorosidade:
      "Todo este rigor hace que nuestra calidad sea distintiva; nuestros socios en los mercados asiáticos y brasileños fueron seleccionados a mano y poseen las certificaciones adecuadas para cada ocasión, como ISO 9001, ISOTS16949 y CE.",

    Equipededesenvolvimento: "Equipo de <strong>desarrollo</strong>",

    Possuímosainda:
      "También contamos con un equipo de desarrollo de productos siempre buscando traer innovación y satisfacción a las partes interesadas y sus necesidades.",

    Indústrianacional: "Industria <strong>nacional</strong>",

    Alemdetudoisso:
      "Además, somos la única empresa brasileña que fabrica artículos 100% nacionales del sistema de enfriamiento.",

    Confiradicasenovidades:
      "Consulte <strong>consejos y novedades</strong> en el sector automotriz",

    Assinenossanewsletter:
      "<strong>Suscríbase a nuestro boletín</strong> y manténgase al día con todas las novedades.",

    ListadeProdutos: "Lista de Productos",

    DesenvolvidoporNotus:
      "Desarrollado por Notus Sistemas Térmicos de Brasil © Todos los derechos reservados",
  },
};

// Função para mudar o idioma
function changeLanguage(language) {
  const elements = {
    Inscrevase: document.getElementById("Inscrevase"),
    LinhasdeProdutos: document.getElementById("LinhasdeProdutos"),
    FaleConoscoWA: document.getElementById("FaleConoscoWA"),
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
    Comodeusdovento: document.getElementById("Comodeusdovento"),
    Commaisde2500: document.getElementById("Commaisde2500"),
    FaleConoscoWACARD: document.getElementById("FaleConoscoWACARD"),
    FaleConoscoFooter: document.getElementById("FaleConoscoFooter"),
    FaleConoscoParceiro: document.getElementById("FaleConoscoParceiro"),
    OrgulhosamenteBrasileira: document.getElementById(
      "OrgulhosamenteBrasileira"
    ),
    Precisadeajuda: document.getElementById("Precisadeajuda"),
    atendidoimediatamente: document.getElementById("atendidoimediatamente"),
    Respondeemalgunsminutos: document.getElementById("Respondeemalgunsminutos"),
    Comercial: document.getElementById("Comercial"),
    Benefíciosdosnossosprodutos: document.getElementById(
      "Benefíciosdosnossosprodutos"
    ),
    QualidadeOEM: document.getElementById("QualidadeOEM"),
    Nossosprodutossaoprojetados: document.getElementById(
      "Nossosprodutossaoprojetados"
    ),
    Certificacoesdeexcelencia: document.getElementById(
      "Certificacoesdeexcelencia"
    ),
    Trabalhamosapenascomfornecedores: document.getElementById(
      "Trabalhamosapenascomfornecedores"
    ),
    Especialistasemarrefecimentoautomotivo: document.getElementById(
      "Especialistasemarrefecimentoautomotivo"
    ),
    Comnossasfabricasdeponta: document.getElementById(
      "Comnossasfabricasdeponta"
    ),
    Segurancanacompra: document.getElementById("Segurancanacompra"),
    Maiorvariedadedomercado: document.getElementById("Maiorvariedadedomercado"),
    Somosamarcamaiscompleta: document.getElementById("Somosamarcamaiscompleta"),
    Qualidadegarantida: document.getElementById("Qualidadegarantida"),
    Todososnossosprodutos: document.getElementById("Todososnossosprodutos"),
    Inovacaoconstante: document.getElementById("Inovacaoconstante"),
    Nossaequipededesenvolvimento: document.getElementById(
      "Nossaequipededesenvolvimento"
    ),
    Eticademercado: document.getElementById("Eticademercado"),
    Compromissocomatransparencia: document.getElementById(
      "Compromissocomatransparencia"
    ),
    Respeitamosacadeia: document.getElementById("Respeitamosacadeia"),
    Parceriadevalor: document.getElementById("Parceriadevalor"),
    Atendemosdistribuidores: document.getElementById("Atendemosdistribuidores"),
    Unicaempresa: document.getElementById("Unicaempresa"),
    DEIMPORTADORAAFABRICANTE: document.getElementById(
      "DEIMPORTADORAAFABRICANTE"
    ),
    Unicaempresafabricante: document.getElementById("Unicaempresafabricante"),
    Nascidacomoimportadora: document.getElementById("Nascidacomoimportadora"),
    RadiadorProduct: document.getElementById("RadiadorProduct"),
    RadiadorFooter: document.getElementById("RadiadorFooter"),
    EletroventiladorProduct: document.getElementById("EletroventiladorProduct"),
    EletroventiladorFooter: document.getElementById("EletroventiladorFooter"),
    CondensadorProduct: document.getElementById("CondensadorProduct"),
    CondensadorFooter: document.getElementById("CondensadorFooter"),
    EvaporadorProduct: document.getElementById("EvaporadorProduct"),
    EvaporadorFooter: document.getElementById("EvaporadorFooter"),
    RadiadordeoleoProduct: document.getElementById("RadiadordeoleoProduct"),
    RadiadordeoleoFooter: document.getElementById("RadiadordeoleoFooter"),
    RadiadordeAquecimentoProduct: document.getElementById(
      "RadiadordeAquecimentoProduct"
    ),
    RadiadordeAquecimentoFooter: document.getElementById(
      "RadiadordeAquecimentoFooter"
    ),
    VentiladorInternoProduct: document.getElementById(
      "VentiladorInternoProduct"
    ),
    VentiladorInternoFooter: document.getElementById("VentiladorInternoFooter"),
    Querometornar: document.getElementById("Querometornar"),
    PorqueescolherNotus: document.getElementById("PorqueescolherNotus"),
    Modelodenegóciounico: document.getElementById("Modelodenegóciounico"),
    Sempreinvestindo: document.getElementById("Sempreinvestindo"),
    Qualidadeeconfianca: document.getElementById("Qualidadeeconfianca"),
    Nossaconduta: document.getElementById("Nossaconduta"),
    Fazeradiferenca: document.getElementById("Fazeradiferenca"),
    Nossotime: document.getElementById("Nossotime"),
    Certificacoeserigor: document.getElementById("Certificacoeserigor"),
    Todaessarigorosidade: document.getElementById("Todaessarigorosidade"),
    Equipededesenvolvimento: document.getElementById("Equipededesenvolvimento"),
    Possuímosainda: document.getElementById("Possuímosainda"),
    Indústrianacional: document.getElementById("Indústrianacional"),
    Alemdetudoisso: document.getElementById("Alemdetudoisso"),
    Confiradicasenovidades: document.getElementById("Confiradicasenovidades"),
    Assinenossanewsletter: document.getElementById("Assinenossanewsletter"),
    ListadeProdutos: document.getElementById("ListadeProdutos"),
    DesenvolvidoporNotus: document.getElementById("DesenvolvidoporNotus"),
  };

  // Atualiza os textos com base no idioma selecionado
  for (const key in elements) {
    if (elements[key]) {
      elements[key].innerHTML = translations[language][key];
    }
  }
}

// Define um idioma padrão
changeLanguage("pt");
