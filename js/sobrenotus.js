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

    ListadeProdutos: "Product List",

    VentiladorInternoFooter: "Internal Fan",

    Precisadeajuda:
      "Need help? Contact us via <strong class='secao2-titulo-cinza' style='font-weight: 700'>WhatsApp!</strong>",

    atendidoimediatamente:
      "Hello! Click on one of our team members to be assisted immediately on WhatsApp!",

    Respondeemalgunsminutos: "The team usually responds within a few minutes.",

    FaleConoscoWACARD: "Contact Us!",

    // Página Sobre Notus

    Conhecanossajornada: "Discover our journey in the automotive industry!",
    Atuandodesde2007:
      "Operating since 2007 in the automotive cooling systems aftermarket, we have the largest portfolio of products in the Brazilian market, always following our motto: quality, productivity, trust, and making a difference. Notus has become one of the biggest references in this segment.",
    Conhecatambemas: "Discover also the companies of the Notus Group!",
    Saibamais: "<strong>Learn more</strong> about us",
    Quemsomos: "Who <strong class='comps-titulo-azul'>we are</strong>",
    Sevoceveioconhecer:
      "If you came to learn more about us… You’re in the right place! Nice to meet you, we are <strong class='comps-titulo-azul'>Notus Sistemas Térmicos do Brasil LTDA</strong>, but you can call us <strong class='comps-titulo-azul'>Notus</strong> <strong class='comps-titulo-amarelo'>do</strong> <strong class='comps-titulo-verde'>Brasil!<br /><br /></strong> We are a <strong class='comps-titulo-verde'>proudly Brazilian</strong> company <strong class='comps-titulo-azul'>specialized in cooling and air conditioning systems</strong> for automotive vehicles. We drive the Brazilian market with imported products and those <strong class='comps-titulo-azul'>manufactured</strong> <strong class='comps-titulo-amarelo'>in</strong> <strong class='comps-titulo-verde'>Brazil.</strong><br /><br /> We always aim to offer a <strong class='comps-titulo-azul'>personalized relationship</strong> and a good experience to our clients, the partners of Notus! To achieve this, we keep in touch and maintain friendship and good manners with our partners, <strong class='comps-titulo-azul'>developing our own machinery, manufacturing molds, and ERP system</strong>, through the Notus Group!<br /><br /> Check out our <strong class='comps-titulo-azul'>mission, vision, and values</strong>, the meaning of the brand, history, and differentiators, as well as photos of our <strong class='comps-titulo-azul'>Super Team!</strong>",
    Nossamissao: "Our <strong>mission, vision, and values</strong>",
    MissaoTitulo: "Mission",
    Oferecerasmelhores:
      "To offer the best solutions in cooling and air conditioning systems for automotive vehicles, becoming the biggest reference in this market and raising Brazil’s name worldwide.",
    VisaoTitulo: "Vision",
    Serreconhecida:
      "To be recognized throughout MERCOSUR as a leader in the automotive cooling sector for the quality of our products, processes, and people management, being among the best companies to work for in South America.",
    ValoresTitulo: "Values",
    Frutodaconcepcao:
      "Born from our company's and each individual's conception of life, these values represent our way of being and guide our professional and personal conduct, both individually and collectively: Quality, Productivity, Trust, and Making a Difference.",
    Significadodamarca: "<strong>Meaning</strong> of the brand",
    Temosgrandeorgulho:
      "<strong>We take great pride in our brand,</strong> we needed a name that resonated with us and carried a <strong>greater meaning</strong> behind it!<br /><br />That’s why, after much research, we finally found our brand, Notus!<br /><br /><strong>“Notus” comes from “Noto”</strong>, in Latin “Notus,” which <strong>means “god of the south wind”</strong> or “great south wind.”<br /><br /><strong>Why “god of the south wind”?</strong> We chose this name because the <strong>main component of a radiator,</strong> our primary product, <strong>is the wind</strong>. Without it, nothing cools, and the radiator cannot perform its function. Moreover, we are a <strong class='comps-titulo-verde'>proudly Brazilian company.</strong> Therefore, it could only be <strong>“Notus”</strong>, the god of the south wind, <strong>“Notus</strong> <strong class='comps-titulo-amarelo'>do</strong> <strong class='comps-titulo-verde'>Brasil”!</strong>",
    Conhecaumpouco:
      "<strong>Discover</strong> a little bit of our <strong>History</strong>",
    INICIODAMARCA: "THE BEGINNING OF THE BRAND",
    Desde2007atuando:
      "Since 2007, operating in the national automotive cooling aftermarket with innovative products and concepts, <strong>Notus Sistemas Térmicos Do Brasil</strong> is proud to have been ranked among the top 5 companies in this segment in such a short time.",
    AVANÇONOPORTFOLIO: "PORTFOLIO ADVANCEMENT",
    Comessemodelodetrabalho:
      "With this working model, in 2011, <strong class='texto-cinza-bold'>we managed to meet our customers' needs</strong>, worked hard to position the brand in sales points. <strong>Participating in the most important fairs in the automotive replacement market</strong>, we had the opportunity to show our <strong class='texto-cinza-bold'>commitment to the quality and efficiency of our products.</strong>",
    NOVASACOMODACOES: "NEW FACILITIES",
    Comsedelocalizada:
      "With headquarters located in the city of Salto, São Paulo state, we have a <strong>25,000 m² area</strong> and a <strong>structure of over 16,000 m² of built area,</strong> a double-deep Porta Pallets storage system with <strong>storage capacity for over 500,000 parts</strong> and a wide variety of automotive cooling system models <strong>totaling more than 2,500 different items.</strong>",
    FABRICAÇAONACIONAL: "NATIONAL MANUFACTURING",
    fabricaçaodeitens:
      "The <strong class='texto-cinza-bold'>manufacturing of national items</strong> began in January 2020. Between 2020 and 2024, <strong>we have already manufactured over 1,000,000 radiators.</strong> Throughout our history, up to 2024, <strong class='texto-cinza-bold'>we have supplied the Brazilian market with</strong> <strong>over 10,000,000 products.</strong><br /><br />We are the <strong>only industry</strong> <strong class='texto-cinza-bold'>manufacturer of automotive cooling systems that is</strong> <strong>100% national.</strong>",
    Conhecaafabrica: "Discover our <strong>factory!</strong>",
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

    // Página Sobre Notus

    Conhecanossajornada: "Conheça nossa jornada no setor automotivo!",
    Atuandodesde2007:
      "Atuando desde 2007 no mercado repositor de arrefecimento automotivo, contemplamos o maior portfólio de produtos do mercado brasileiro, sempre seguindo nosso lema: qualidade, produtividade, confiança e fazer a diferença. A Notus se tornou uma das maiores referências no seguimento.",
    Conhecatambemas: "Conheça também as empresas do Grupo Notus!",
    Saibamais: "<strong>Saiba mais</strong> sobre nós",
    Quemsomos: "Quem <strong class='comps-titulo-azul'>somos</strong>",
    Sevoceveioconhecer:
      "Se você veio conhecer um pouco mais sobre nós… Você veio ao lugar certo! Muito prazer, somos a <strong class='comps-titulo-azul'>Notus Sistemas Térmicos do Brasil LTDA</strong>, mas pode nos chamar de <strong class='comps-titulo-azul'>Notus</strong> <strong class='comps-titulo-amarelo'>do</strong> <strong class='comps-titulo-verde'>Brasil!<br /><br /> </strong>Somos uma empresa,<strong class='comps-titulo-verde'>orgulhosamente, Brasileira</strong><strong class='comps-titulo-azul'>Especializados em sistemas de Arrefecimento e Climatização</strong> de veículos automotores. Nós fomentamos o mercado brasileiro com produtos importados e <strong class='comps-titulo-azul'>fabricados</strong> <strong class='comps-titulo-amarelo'>no</strong> <strong class='comps-titulo-verde'>Brasil.</strong><br /><br /> Buscamos sempre entregar um <strong class='comps-titulo-azul'>relacionamento personalizado</strong> e uma boa experiência aos nossos clientes, os Parceiros Notus! Para isso, mantemos contato e preservamos a amizade e bons modos com nossos Parceiros,<strong class='comps-titulo-azul'>desenvolvemos nossos próprios maquinários, moldes de fabricação e sistema ERP</strong>, por meio do Grupo Notus!<br /><br />Confira nossa<strong class='comps-titulo-azul'>Missão, Visão e Valores</strong>, significado da marca, história e diferenciais, além das fotos da nossa <strong class='comps-titulo-azul'>Super Equipe!</strong>",
    Nossamissao: "Nossa <strong>missão, visão e valores</strong>",
    MissaoTitulo: "Missão",
    Oferecerasmelhores:
      "Oferecer as melhores soluções em sistemas de arrefecimento e climatização de veículos automotores, nos tornando a maior referência deste mercado e elevando o nome do Brasil pelo mundo.",
    VisaoTitulo: "Visão",
    Serreconhecida:
      "Ser reconhecida em todo o MERCOSUL como líder do setor de arrefecimento automotivo pela qualidade de nossos produtos, procedimentos e gestão de pessoas, estando entre as melhores empresas para se trabalhar na América do Sul.",
    ValoresTitulo: "Valores",
    Frutodaconcepcao:
      "Fruto da concepção de vida da nossa empresa e de cada um de nós, estes valores representam nosso jeito de ser e orientam nossa conduta profissional e pessoal, individual e coletivamente: Qualidade, Produtividade, Confiança e Fazer a diferença.",
    Significadodamarca: "<strong>Significado</strong> da marca",
    Temosgrandeorgulho:
      "<strong>Temos grande orgulho da nossa marca,</strong> precisávamos de um nome que tivesse tudo a ver conosco e contesse um <strong>significado maior</strong> por trás!<br /><br />Por isso, depois de muita pesquisa, finalmente encontramos nossa a marca, Notus!<br /><br /><strong>“Notus” vem de “Noto”</strong>, em latim “Notus”, que <strong>significa “deus do vento do sul”</strong> ou “grande vento do sul”.<br /><br /><strong>Por que “deus do vento do sul”?</strong> Escolhemos este nome porque o <strong>principal componente de um radiador,</strong> nosso principal produto, <strong>é o vento</strong>, sem ele nada resfria e o radiador não pode fazer a sua função. Além disso, somos uma empresa <strong class='comps-titulo-verde'>orgulhosamente brasileira.</strong> Por isso, <strong>só podia ser “Notus”</strong>, o deus do vento do sul, <strong>“Notus</strong> <strong class='comps-titulo-amarelo'>do</strong> <strong class='comps-titulo-verde'>Brasil”!</strong>",
    Conhecaumpouco:
      "<strong>Conheça</strong> um pouco da nossa <strong>História</strong>",
    INICIODAMARCA: "INICIO DA MARCA",
    Desde2007atuando:
      " Desde 2007 atuando no mercado de reposição na área de <strong class='texto-cinza-bold'>Arrefecimento automotivo</strong> Nacional, com produtos e conceitos inovadores, a <strong>Notus Sistemas Térmicos Do Brasil</strong> se orgulha de, em tão pouco tempo, estar ranqueada entre as 5 maiores empresas deste seguimento.",
    AVANÇONOPORTFOLIO: "AVANÇO NO PORTFÓLIO",
    Comessemodelodetrabalho:
      "Com esse modelo de trabalho, em 2011,<strong class='texto-cinza-bold'>conseguimos atender as necessidades de nossos clientes</strong>, trabalhamos duro para ativar a marca nos pontos de vendas.<strong>Participando das feiras mais importantes do mercado</strong> de reposição automotiva, tivemos a oportunidade de mostrar nosso <strong class='texto-cinza-bold'>compromisso com a qualidade e eficiência dos nossos produtos.</strong>",
    NOVASACOMODACOES: "NOVAS ACOMODAÇÕES",
    Comsedelocalizada:
      " Com sede localizada na cidade de Salto, interior de São Paulo, possuímos uma <strong>área com 25.000 m²</strong> e uma<strong>estrutura de mais de 16.000 m² de área construída,</strong> um sistema de armazenagem Porta Pallets de dupla profundidade, com<strong>capacidade de estocagem para mais de 500.000 peças</strong> tendo uma ampla variação de modelos do sistema de arrefecimento automotivo<strong>totalizando mais de 2.500 itens diversificados.</strong>",
    FABRICAÇAONACIONAL: "FABRICAÇÃO NACIONAL",
    fabricaçaodeitens:
      "  A <strong class='texto-cinza-bold'>fabricação de itens nacionais</strong> se iniciou em Janeiro de 2020. Entre 2020 e 2024 nós <strong>já fabricamos mais de 1.000.000 de radiadores.</strong> Durante nossa história, até 2024, <strong class='texto-cinza-bold'>já abastecemos o mercado brasileiro com</strong><strong> mais de 10.000.000 de produtos.</strong><br /><br />Somos a <strong>única indústria</strong><strong class='texto-cinza-bold'> fabricante do sistema de arrefecimento automotivo que é</strong><strong> 100% nacional.</strong>",
    Conhecaafabrica: "Conheça a <strong>nossa fábrica!</strong>",
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

    // Página Sobre Notus

    Conhecanossajornada:
      "¡Conozca nuestra trayectoria en el sector automotriz!",
    Atuandodesde2007:
      "Actuando desde 2007 en el mercado de reposición de sistemas de enfriamiento automotriz, contamos con el mayor portafolio de productos del mercado brasileño, siempre siguiendo nuestro lema: calidad, productividad, confianza y marcar la diferencia. Notus se ha convertido en una de las mayores referencias en este segmento.",
    Conhecatambemas: "¡Conozca también las empresas del Grupo Notus!",
    Saibamais: "<strong>Obtenga más información</strong> sobre nosotros",
    Quemsomos: "Quiénes <strong class='comps-titulo-azul'>somos</strong>",
    Sevoceveioconhecer:
      "Si vino a conocernos un poco más… ¡Está en el lugar correcto! Mucho gusto, somos <strong class='comps-titulo-azul'>Notus Sistemas Térmicos do Brasil LTDA</strong>, pero puede llamarnos <strong class='comps-titulo-azul'>Notus</strong> <strong class='comps-titulo-amarelo'>do</strong> <strong class='comps-titulo-verde'>Brasil!<br /><br /> </strong>Somos una empresa,<strong class='comps-titulo-verde'>orgullosamente, brasileña</strong> <strong class='comps-titulo-azul'>especializada en sistemas de enfriamiento y climatización</strong> de vehículos automotores. Impulsamos el mercado brasileño con productos importados y <strong class='comps-titulo-azul'>fabricados</strong> <strong class='comps-titulo-amarelo'>en</strong> <strong class='comps-titulo-verde'>Brasil.</strong><br /><br /> Buscamos siempre ofrecer una <strong class='comps-titulo-azul'>relación personalizada</strong> y una buena experiencia a nuestros clientes, ¡los socios de Notus! Para ello, mantenemos contacto y preservamos la amistad y buenos modales con nuestros socios, <strong class='comps-titulo-azul'>desarrollamos nuestra propia maquinaria, moldes de fabricación y sistema ERP</strong>, a través del Grupo Notus!<br /><br /> Consulte nuestra <strong class='comps-titulo-azul'>misión, visión y valores</strong>, el significado de la marca, historia y diferenciales, además de las fotos de nuestro <strong class='comps-titulo-azul'>Super Equipo!</strong>",
    Nossamissao: "Nuestra <strong>misión, visión y valores</strong>",
    MissaoTitulo: "Misión",
    Oferecerasmelhores:
      "Ofrecer las mejores soluciones en sistemas de enfriamiento y climatización de vehículos automotores, convirtiéndonos en la mayor referencia de este mercado y elevando el nombre de Brasil en el mundo.",
    VisaoTitulo: "Visión",
    Serreconhecida:
      "Ser reconocida en todo el MERCOSUR como líder en el sector de enfriamiento automotriz por la calidad de nuestros productos, procedimientos y gestión de personas, estando entre las mejores empresas para trabajar en América del Sur.",
    ValoresTitulo: "Valores",
    Frutodaconcepcao:
      "Fruto de la concepción de vida de nuestra empresa y de cada uno de nosotros, estos valores representan nuestra forma de ser y orientan nuestra conducta profesional y personal, individual y colectivamente: Calidad, Productividad, Confianza y Marcar la diferencia.",
    Significadodamarca: "<strong>Significado</strong> de la marca",
    Temosgrandeorgulho:
      "<strong>Nos sentimos muy orgullosos de nuestra marca,</strong> necesitábamos un nombre que tuviera todo que ver con nosotros y contuviera un <strong>significado mayor</strong> detrás!<br /><br />Por eso, después de mucha investigación, finalmente encontramos nuestra marca, ¡Notus!<br /><br /><strong>“Notus” viene de “Noto”</strong>, en latín “Notus”, que <strong>significa “dios del viento del sur”</strong> o “gran viento del sur”.<br /><br /><strong>¿Por qué “dios del viento del sur”?</strong> Elegimos este nombre porque el <strong>principal componente de un radiador,</strong> nuestro producto principal, <strong>es el viento</strong>, sin él nada se enfría y el radiador no puede cumplir su función. Además, somos una empresa <strong class='comps-titulo-verde'>orgullosamente brasileña.</strong> Por eso, <strong>sólo podía ser “Notus”</strong>, el dios del viento del sur, <strong>“Notus</strong> <strong class='comps-titulo-amarelo'>do</strong> <strong class='comps-titulo-verde'>Brasil”!</strong>",
    Conhecaumpouco:
      "<strong>Conozca</strong> un poco de nuestra <strong>Historia</strong>",
    INICIODAMARCA: "INICIO DE LA MARCA",
    Desde2007atuando:
      "Desde 2007 actuando en el mercado de reposición en el área de <strong class='texto-cinza-bold'>enfriamiento automotriz</strong> Nacional, con productos y conceptos innovadores, <strong>Notus Sistemas Térmicos Do Brasil</strong> se enorgullece de, en tan poco tiempo, estar clasificada entre las 5 mayores empresas de este segmento.",
    AVANÇONOPORTFOLIO: "AVANCE EN EL PORTAFOLIO",
    Comessemodelodetrabalho:
      "Con este modelo de trabajo, en 2011, <strong class='texto-cinza-bold'>logramos satisfacer las necesidades de nuestros clientes</strong>, trabajamos duro para posicionar la marca en los puntos de venta. <strong>Participando en las ferias más importantes del mercado</strong> de reposición automotriz, tuvimos la oportunidad de mostrar nuestro <strong class='texto-cinza-bold'>compromiso con la calidad y eficiencia de nuestros productos.</strong>",
    NOVASACOMODACOES: "NUEVAS INSTALACIONES",
    Comsedelocalizada:
      "Con sede ubicada en la ciudad de Salto, interior de São Paulo, contamos con un <strong>área de 25.000 m²</strong> y una <strong>estructura de más de 16.000 m² de área construida,</strong> un sistema de almacenamiento Porta Pallets de doble profundidad, con <strong>capacidad de almacenamiento para más de 500.000 piezas</strong> y una amplia variedad de modelos del sistema de enfriamiento automotriz <strong>totalizando más de 2.500 ítems diversos.</strong>",
    FABRICAÇAONACIONAL: "FABRICACIÓN NACIONAL",
    fabricaçaodeitens:
      "La <strong class='texto-cinza-bold'>fabricación de ítems nacionales</strong> comenzó en enero de 2020. Entre 2020 y 2024 <strong>ya hemos fabricado más de 1.000.000 de radiadores.</strong> Durante nuestra historia, hasta 2024, <strong class='texto-cinza-bold'>ya hemos abastecido el mercado brasileño con</strong> <strong>más de 10.000.000 de productos.</strong><br /><br />Somos la <strong>única industria</strong> <strong class='texto-cinza-bold'>fabricante de sistemas de enfriamiento automotriz que es</strong> <strong>100% nacional.</strong>",
    Conhecaafabrica: "¡Conozca nuestra <strong>fábrica!</strong>",
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

    // Página Sobre Notus

    Conhecanossajornada: document.getElementById("Conhecanossajornada"),
    Atuandodesde2007: document.getElementById("Atuandodesde2007"),
    Conhecatambemas: document.getElementById("Conhecatambemas"),
    Saibamais: document.getElementById("Saibamais"),
    Quemsomos: document.getElementById("Quemsomos"),
    Sevoceveioconhecer: document.getElementById("Sevoceveioconhecer"),
    Nossamissao: document.getElementById("Nossamissao"),
    MissaoTitulo: document.getElementById("MissaoTitulo"),
    Oferecerasmelhores: document.getElementById("Oferecerasmelhores"),
    VisaoTitulo: document.getElementById("VisaoTitulo"),
    Serreconhecida: document.getElementById("Serreconhecida"),
    ValoresTitulo: document.getElementById("ValoresTitulo"),
    Frutodaconcepcao: document.getElementById("Frutodaconcepcao"),
    Significadodamarca: document.getElementById("Significadodamarca"),
    Temosgrandeorgulho: document.getElementById("Temosgrandeorgulho"),
    Conhecaumpouco: document.getElementById("Conhecaumpouco"),
    INICIODAMARCA: document.getElementById("INICIODAMARCA"),
    Desde2007atuando: document.getElementById("Desde2007atuando"),
    AVANÇONOPORTFOLIO: document.getElementById("AVANÇONOPORTFOLIO"),
    Comessemodelodetrabalho: document.getElementById("Comessemodelodetrabalho"),
    NOVASACOMODACOES: document.getElementById("NOVASACOMODACOES"),
    Comsedelocalizada: document.getElementById("Comsedelocalizada"),
    FABRICAÇAONACIONAL: document.getElementById("FABRICAÇAONACIONAL"),
    fabricaçaodeitens: document.getElementById("fabricaçaodeitens"),
    Conhecaafabrica: document.getElementById("Conhecaafabrica"),
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
