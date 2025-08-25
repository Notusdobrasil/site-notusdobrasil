// Botão Menu Hamburguer para ativação na versão mobile para navegação das páginas
const btnMobile = document.getElementById("btn-mobile");
const menu = document.getElementById("menu");

if (btnMobile && menu) {
  btnMobile.addEventListener("click", function openMenu(event) {
    event.preventDefault();
    menu.classList.toggle("visible");
  });
}

// Botão Fale Conosco da index.html para contato com os vendedores
const btnFaleConosco = document.getElementById("btn-faleconosco");
const listaFaleConosco = document.getElementById("lista-faleconosco");

if (btnFaleConosco && listaFaleConosco) {
  btnFaleConosco.addEventListener("click", function (event) {
    event.preventDefault();
    listaFaleConosco.classList.toggle("visible");
    btnFaleConosco.classList.toggle("secao1-botao-sembordaembaixo");
  });
}

// Lógica do botão flutuante do WhatsApp
const btnWhatsapp = document.getElementById("btn-whatsapp");
const cardWhatsapp = document.getElementById("card-whatsapp");
const balaoWhatsapp = document.getElementById("balao-whatsapp");
const whatsappIcon = document.querySelector(".whatsapp-icone");

if (btnWhatsapp && cardWhatsapp && balaoWhatsapp && whatsappIcon) {
  btnWhatsapp.addEventListener("click", function (event) {
    event.preventDefault();

    // abre/fecha card e balão
    cardWhatsapp.classList.toggle("visible");
    balaoWhatsapp.classList.toggle("invisible");

    // inicia fade out
    whatsappIcon.classList.add("fade-out");

    setTimeout(() => {
      // troca ícone
      if (whatsappIcon.classList.contains("fa-whatsapp")) {
        whatsappIcon.classList.remove("fa-brands", "fa-whatsapp");
        whatsappIcon.classList.add("fa-solid", "fa-xmark");
      } else {
        whatsappIcon.classList.remove("fa-solid", "fa-xmark");
        whatsappIcon.classList.add("fa-brands", "fa-whatsapp");
      }

      // faz fade in
      whatsappIcon.classList.remove("fade-out");

      // dispara o pulso depois do fade-in
      whatsappIcon.classList.add("pulse");

      // remove a classe pulse ao terminar a animação (para permitir repetir)
      whatsappIcon.addEventListener(
        "animationend",
        () => {
          whatsappIcon.classList.remove("pulse");
        },
        { once: true }
      );
    }, 300); // tempo igual ao transition do fade (0.3s)
  });
}

// Intersection Observer para animar os cards da seção de produtos
const cards = document.querySelectorAll(".secao4-grid-card");
if (cards.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.5,
    }
  );
  cards.forEach((card) => observer.observe(card));
}

// Lógica para o formulário de Newsletter
(() => {
  const form = document.getElementById("newsletter-form");
  if (!form) return;

  const nameInput = form.querySelector('[name="name"]');
  const emailInput = form.querySelector('[name="email"]');
  const consentInput = form.querySelector('[name="consent"]');
  const submitButton = form.querySelector(".form-botao");
  const successMessage = document.getElementById("newsletter-ok");
  const errorMessage = document.getElementById("newsletter-err");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    successMessage.style.display = "none";
    errorMessage.style.display = "none";
    submitButton.disabled = true;
    submitButton.value = "Enviando...";

    const payload = {
      name: nameInput?.value || "",
      email: emailInput?.value || "",
      consent: consentInput?.checked || false,
    };

    if (!payload.name || !payload.email || !payload.consent) {
      errorMessage.textContent = "Por favor, preencha todos os campos e aceite os termos.";
      errorMessage.style.display = "block";
      submitButton.disabled = false;
      submitButton.value = "Inscreva-se";
      return;
    }

    try {
      const res = await fetch("https://backend-site-notusdobrasil.onrender.com/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || `Falha no cadastro (${res.status}).`);
      }

      successMessage.style.display = "block";
      form.reset();
    } catch (err) {
      console.error("Newsletter fetch error:", err);
      errorMessage.textContent = err.message || "Erro de conexão. Tente novamente mais tarde.";
      errorMessage.style.display = "block";
    } finally {
      submitButton.disabled = false;
      submitButton.value = "Inscreva-se";
    }
  });
})();

(() => {
  const formCurriculo = document.getElementById("form-curriculo");
  if (!formCurriculo) return;

  const fileInput = document.getElementById("envio-curriculo");
  const fileNameDisplay = document.getElementById("file-name");
  const btnEnviarCurriculo = document.getElementById("btn-enviar-curriculo");
  const successMessage = document.getElementById("curriculo-ok");
  const errorMessage = document.getElementById("curriculo-err");

  // Função para ler o arquivo como Base64
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Extrai apenas o conteúdo Base64, removendo o cabeçalho do tipo de arquivo
      let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
      if ((encoded.length % 4) > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
    reader.onerror = error => reject(error);
  });

  // Mostra o nome do arquivo selecionado
  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
      fileNameDisplay.textContent = fileInput.files[0].name;
    } else {
      fileNameDisplay.textContent = "Nenhum arquivo selecionado";
    }
  });

  // Lida com o envio do formulário
  formCurriculo.addEventListener("submit", async (e) => {
    e.preventDefault();

    btnEnviarCurriculo.disabled = true;
    btnEnviarCurriculo.textContent = "Enviando...";
    successMessage.style.display = "none";
    errorMessage.style.display = "none";

    const nome = formCurriculo.querySelector('[name="nome"]').value;
    const email = formCurriculo.querySelector('[name="email"]').value;
    const file = fileInput.files[0];

    if (!nome || !email || !file) {
      errorMessage.textContent = "Por favor, preencha todos os campos e anexe seu currículo.";
      errorMessage.style.display = "block";
      btnEnviarCurriculo.disabled = false;
      btnEnviarCurriculo.textContent = "Enviar";
      return;
    }

    try {
      // Converte o arquivo para Base64 antes de criar o payload
      const fileContent = await toBase64(file);

      const payload = {
        nome: nome,
        email: email,
        attachments: [{
          filename: file.name,
          content: fileContent
        }]
      };

      const response = await fetch("https://backend-site-notusdobrasil.onrender.com/api/enviar-curriculo", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Ocorreu um erro no servidor.");
      }

      successMessage.style.display = "block";
      formCurriculo.reset();
      fileNameDisplay.textContent = "Nenhum arquivo selecionado";

    } catch (error) {
      errorMessage.textContent = error.message;
      errorMessage.style.display = "block";
    } finally {
      btnEnviarCurriculo.disabled = false;
      btnEnviarCurriculo.textContent = "Enviar";
    }
  });
})();

// --- LÓGICA PARA O FORMULÁRIO DE GARANTIA ---
(() => {
  const formGarantia = document.getElementById('form-garantia');
  if (!formGarantia) return;

  const btnEnviar = document.getElementById('btn-enviar-garantia');
  const successMessage = document.getElementById('garantia-ok');
  const errorMessage = document.getElementById('garantia-err');

  formGarantia.addEventListener('submit', async (e) => {
    e.preventDefault();

    btnEnviar.disabled = true;
    btnEnviar.textContent = 'Enviando...';
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    
    const payload = {
      nome: formGarantia.querySelector('[name="nome"]').value,
      email: formGarantia.querySelector('[name="email"]').value,
      mensagem: formGarantia.querySelector('[name="mensagem"]').value,
    };

    try {
      const response = await fetch('https://backend-site-notusdobrasil.onrender.com/api/enviar-garantia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Ocorreu um erro no servidor.');
      }
      
      successMessage.style.display = 'block';
      formGarantia.reset();

    } catch (error) {
      errorMessage.textContent = error.message;
      errorMessage.style.display = 'block';
    } finally {
      btnEnviar.disabled = false;
      btnEnviar.textContent = 'Enviar';
    }
  });
})();

// --- LÓGICA PARA O FORMULÁRIO DE CONTATO ---
(() => {
  const formContato = document.getElementById('form-contato');
  if (!formContato) return;

  const btnEnviar = document.getElementById('btn-enviar-contato');
  const successMessage = document.getElementById('contato-ok');
  const errorMessage = document.getElementById('contato-err');

  formContato.addEventListener('submit', async (e) => {
    e.preventDefault();

    btnEnviar.disabled = true;
    btnEnviar.textContent = 'Enviando...';
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    
    const formData = new FormData(formContato);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://backend-site-notusdobrasil.onrender.com/api/enviar-contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Ocorreu um erro no servidor.');
      }
      
      successMessage.style.display = 'block';
      formContato.reset();

    } catch (error) {
      errorMessage.textContent = error.message;
      errorMessage.style.display = 'block';
    } finally {
      btnEnviar.disabled = false;
      btnEnviar.textContent = 'Enviar';
    }
  });
})();