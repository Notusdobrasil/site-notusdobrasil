// -----------------------------
// Menu hambúrguer (mobile)
// -----------------------------
const btnMobile = document.getElementById("btn-mobile");
const menu = document.getElementById("menu");

if (btnMobile && menu) {
  btnMobile.addEventListener("click", function openMenu(event) {
    event.preventDefault();
    menu.classList.toggle("visible");
  });
}

// -----------------------------
// Botão "Fale Conosco" (index)
// -----------------------------
const btnFaleConosco = document.getElementById("btn-faleconosco");
const listaFaleConosco = document.getElementById("lista-faleconosco");

if (btnFaleConosco && listaFaleConosco) {
  btnFaleConosco.addEventListener("click", function (event) {
    event.preventDefault();
    listaFaleConosco.classList.toggle("visible");
    btnFaleConosco.classList.toggle("secao1-botao-sembordaembaixo");
  });
}

// -----------------------------
// Botão flutuante WhatsApp
// -----------------------------
const btnWhatsapp = document.getElementById("btn-whatsapp");
const cardWhatsapp = document.getElementById("card-whatsapp");
const balaoWhatsapp = document.getElementById("balao-whatsapp");
const whatsappIcon = document.querySelector(".whatsapp-icone");

if (btnWhatsapp && cardWhatsapp && balaoWhatsapp && whatsappIcon) {
  btnWhatsapp.addEventListener("click", function (event) {
    event.preventDefault();
    cardWhatsapp.classList.toggle("visible");
    balaoWhatsapp.classList.toggle("invisible");
    whatsappIcon.classList.add("fade-out");
    setTimeout(() => {
      if (whatsappIcon.classList.contains("fa-whatsapp")) {
        whatsappIcon.classList.remove("fa-brands", "fa-whatsapp");
        whatsappIcon.classList.add("fa-solid", "fa-xmark");
      } else {
        whatsappIcon.classList.remove("fa-solid", "fa-xmark");
        whatsappIcon.classList.add("fa-brands", "fa-whatsapp");
      }
      whatsappIcon.classList.remove("fade-out");
      whatsappIcon.classList.add("pulse");
      whatsappIcon.addEventListener(
        "animationend",
        () => whatsappIcon.classList.remove("pulse"),
        { once: true }
      );
    }, 300);
  });
}

// ---------------------------------------------
// Intersection Observer: anima cards de produtos
// ---------------------------------------------
const cards = document.querySelectorAll(".secao4-grid-card");
if (cards.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("active");
      });
    },
    { threshold: 0.5 }
  );
  cards.forEach((card) => observer.observe(card));
}

// ===================================================================
// Helpers gerais
// ===================================================================
function show(el, display = "block") {
  if (el) el.style.display = display;
}
function hide(el) {
  if (el) el.style.display = "none";
}
function setText(el, text) {
  if (el) el.textContent = text;
}
async function jsonPost(url, payload) {
  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(data?.message || "Falha ao enviar.");
  return data;
}

// ===================================================================
// Newsletter
// ===================================================================
(() => {
  const form = document.getElementById("newsletter-form");
  if (!form) return;

  const submitButton = form.querySelector(".form-botao");
  const successMessage = document.getElementById("newsletter-ok");
  const errorMessage = document.getElementById("newsletter-err");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    hide(successMessage);
    hide(errorMessage);
    if (submitButton) {
      submitButton.disabled = true;
      if ("value" in submitButton) submitButton.value = "Enviando...";
      else submitButton.textContent = "Enviando...";
    }

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      await jsonPost(
        "https://backend-site-notusdobrasil.onrender.com/api/subscribe",
        payload
      );
      show(successMessage);
      form.reset();
    } catch (err) {
      setText(errorMessage, err.message);
      show(errorMessage);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        if ("value" in submitButton) submitButton.value = "Inscreva-se";
        else submitButton.textContent = "Inscreva-se";
      }
    }
  });
})();

// ===================================================================
// Trabalhe Conosco — Envio de Currículo (com attachments corretos)
// ===================================================================
(() => {
  const formCurriculo = document.getElementById("form-curriculo");
  if (!formCurriculo) return;

  const fileInput = document.getElementById("envio-curriculo");
  const fileNameDisplay = document.getElementById("file-name");
  const btnEnviarCurriculo = document.getElementById("btn-enviar-curriculo");
  const successMessage = document.getElementById("curriculo-ok");
  const errorMessage = document.getElementById("curriculo-err");

  // Converte arquivo em Base64 (puro), removendo prefixo data:...;base64,
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const dataUrl = String(reader.result || "");
        const base64 = dataUrl.includes(",") ? dataUrl.split(",")[1] : dataUrl;
        const padLen = base64.length % 4;
        resolve(padLen ? base64 + "=".repeat(4 - padLen) : base64);
      };
      reader.onerror = (err) => reject(err);
    });

  if (fileInput) {
    fileInput.addEventListener("change", () => {
      const name =
        fileInput.files && fileInput.files[0]
          ? fileInput.files[0].name
          : "Nenhum arquivo selecionado";
      setText(fileNameDisplay, name);
    });
  }

  formCurriculo.addEventListener("submit", async (e) => {
    e.preventDefault();
    hide(successMessage);
    hide(errorMessage);
    if (btnEnviarCurriculo) {
      btnEnviarCurriculo.disabled = true;
      btnEnviarCurriculo.textContent = "Enviando...";
    }

    const nomeEl = formCurriculo.querySelector('[name="nome"]');
    const emailEl = formCurriculo.querySelector('[name="email"]');

    const nome = (nomeEl && nomeEl.value ? nomeEl.value : "").trim();
    const email = (emailEl && emailEl.value ? emailEl.value : "").trim();
    const file = fileInput && fileInput.files ? fileInput.files[0] : null;

    // 👉 checks opcionais (tire se não quiser):
    const MAX_MB = 8; // ~8MB em base64 cabe no limit de 10MB do backend
    if (file) {
      const okType = /pdf|msword|officedocument/i.test(file.type) || /\.pdf|\.docx?$/.test(file.name);
      const okSize = file.size <= MAX_MB * 1024 * 1024;
      if (!okType) {
        setText(errorMessage, "Envie PDF, DOC ou DOCX.");
        show(errorMessage);
        btnEnviarCurriculo.disabled = false;
        btnEnviarCurriculo.textContent = "Enviar";
        return;
      }
      if (!okSize) {
        setText(errorMessage, `Arquivo muito grande. Limite: ${MAX_MB} MB.`);
        show(errorMessage);
        btnEnviarCurriculo.disabled = false;
        btnEnviarCurriculo.textContent = "Enviar";
        return;
      }
    }

    if (!nome || !email || !file) {
      setText(
        errorMessage,
        "Por favor, preencha todos os campos e anexe seu currículo."
      );
      show(errorMessage);
      if (btnEnviarCurriculo) {
        btnEnviarCurriculo.disabled = false;
        btnEnviarCurriculo.textContent = "Enviar";
      }
      return;
    }

    try {
      const fileContent = await toBase64(file);
      const payload = {
        nome,
        email,
        attachments: [
          {
            filename: file.name || "curriculo",
            content: fileContent, // base64 puro
            content_type: file.type || "application/octet-stream",
          },
        ],
      };

      await jsonPost(
        "https://backend-site-notusdobrasil.onrender.com/api/enviar-curriculo",
        payload
      );

      show(successMessage);
      formCurriculo.reset();
      if (fileNameDisplay) setText(fileNameDisplay, "Nenhum arquivo selecionado");
    } catch (error) {
      setText(errorMessage, error.message);
      show(errorMessage);
    } finally {
      if (btnEnviarCurriculo) {
        btnEnviarCurriculo.disabled = false;
        btnEnviarCurriculo.textContent = "Enviar";
      }
    }
  });
})();

// ===================================================================
// Formulário de Garantia
// ===================================================================
(() => {
  const formGarantia = document.getElementById("form-garantia");
  if (!formGarantia) return;

  const btnEnviar = document.getElementById("btn-enviar-garantia");
  const successMessage = document.getElementById("garantia-ok");
  const errorMessage = document.getElementById("garantia-err");

  formGarantia.addEventListener("submit", async (e) => {
    e.preventDefault();
    hide(successMessage);
    hide(errorMessage);
    if (btnEnviar) {
      btnEnviar.disabled = true;
      btnEnviar.textContent = "Enviando...";
    }

    const payload = {
      nome: (formGarantia.querySelector('[name="nome"]')?.value || "").trim(),
      email: (formGarantia.querySelector('[name="email"]')?.value || "").trim(),
      mensagem:
        (formGarantia.querySelector('[name="mensagem"]')?.value || "").trim(),
    };

    try {
      await jsonPost(
        "https://backend-site-notusdobrasil.onrender.com/api/enviar-garantia",
        payload
      );
      show(successMessage);
      formGarantia.reset();
    } catch (error) {
      setText(errorMessage, error.message);
      show(errorMessage);
    } finally {
      if (btnEnviar) {
        btnEnviar.disabled = false;
        btnEnviar.textContent = "Enviar";
      }
    }
  });
})();

// ===================================================================
// Formulário de Contato
// ===================================================================
(() => {
  const formContato = document.getElementById("form-contato");
  if (!formContato) return;

  const btnEnviar = document.getElementById("btn-enviar-contato");
  const successMessage = document.getElementById("contato-ok");
  const errorMessage = document.getElementById("contato-err");

  formContato.addEventListener("submit", async (e) => {
    e.preventDefault();
    hide(successMessage);
    hide(errorMessage);
    if (btnEnviar) {
      btnEnviar.disabled = true;
      btnEnviar.textContent = "Enviando...";
    }

    const formData = new FormData(formContato);
    if (formData.has("nome"))
      formData.set("nome", (formData.get("nome") || "").toString().trim());
    if (formData.has("email"))
      formData.set("email", (formData.get("email") || "").toString().trim());
    if (formData.has("mensagem"))
      formData.set("mensagem", (formData.get("mensagem") || "").toString().trim());

    const payload = Object.fromEntries(formData.entries());

    try {
      await jsonPost(
        "https://backend-site-notusdobrasil.onrender.com/api/enviar-contato",
        payload
      );
      show(successMessage);
      formContato.reset();
    } catch (error) {
      setText(errorMessage, error.message);
      show(errorMessage);
    } finally {
      if (btnEnviar) {
        btnEnviar.disabled = false;
        btnEnviar.textContent = "Enviar";
      }
    }
  });
})();
