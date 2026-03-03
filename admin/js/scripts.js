// ============================================
// Configuração da URL base da API - v3.0
// Backend híbrido:
// - Admin routes: Backend LOCAL (acessa SQL Server)
// - Forms routes: Backend RENDER (newsletter, contato, etc)
// ============================================
const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const isBackendPort = window.location.port === "3000";

// ADMIN: Sempre usa backend local (onde SQL Server está acessível)
if (isLocalhost) {
	// Desenvolvimento local
	window.API_BASE_URL = isBackendPort 
		? "" // Mesma origem (servido pelo backend na porta 3000)
		: "http://localhost:3000"; // Live Server ou outra porta local
} else {
	// Produção - Backend LOCAL da empresa
	// TODO: Substituir pelo seu IP/domínio real quando configurar
	// Exemplo: "https://backend.notus.ind.br" ou "http://seu-ip:3000"
	window.API_BASE_URL = "http://SEU_IP_OU_DOMINIO:3000";
}

console.log("🔧 Admin Script Version: 3.0 (Hybrid Backend)");
console.log("🌐 Current hostname:", window.location.hostname);
console.log("📡 Admin API Base URL:", window.API_BASE_URL);
console.log("🔗 Full API example:", window.API_BASE_URL + "/api/admin/session");
console.log("💡 Admin → Backend Local | Forms → Backend Render");

async function adminRequest(path, options = {}) {
	const response = await fetch(`${window.API_BASE_URL}${path}`, {
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			...(options.headers || {}),
		},
		...options,
	});

	const data = await response.json().catch(() => ({}));
	if (!response.ok) {
		throw new Error(data?.message || "Falha na autenticação.");
	}

	return data;
}

function showError(message) {
	const errorElement = document.getElementById("errorMessage");
	if (!errorElement) return;

	errorElement.textContent = message;
	errorElement.classList.add("show");
}

function hideError() {
	const errorElement = document.getElementById("errorMessage");
	if (!errorElement) return;

	errorElement.classList.remove("show");
}

function setLoginLoadingState(loading) {
	const button = document.getElementById("loginBtn");
	const buttonText = document.getElementById("btnText");
	if (!button || !buttonText) return;

	button.disabled = loading;
	buttonText.textContent = loading ? "Entrando..." : "Entrar";
}

function setupLoginPage() {
	const form = document.getElementById("loginForm");
	if (!form) return;

	adminRequest("/api/admin/session", { method: "GET", headers: {} })
		.then(() => {
			window.location.href = "./admin.html";
		})
		.catch(() => {});

	form.addEventListener("submit", async (event) => {
		event.preventDefault();
		hideError();
		setLoginLoadingState(true);

		const usernameInput = document.getElementById("username");
		const passwordInput = document.getElementById("password");
		const rememberInput = document.getElementById("rememberMe");

		try {
			await adminRequest("/api/admin/login", {
				method: "POST",
				body: JSON.stringify({
					username: usernameInput?.value?.trim(),
					password: passwordInput?.value || "",
					rememberMe: Boolean(rememberInput?.checked),
				}),
			});

			window.location.href = "./admin.html";
		} catch (error) {
			showError(error.message || "Usuário ou senha incorretos");
		} finally {
			setLoginLoadingState(false);
		}
	});
}

async function setupAdminPage() {
	const logoutBtn = document.getElementById("logoutBtn");
	if (!logoutBtn) return;

	try {
		const session = await adminRequest("/api/admin/session", {
			method: "GET",
			headers: {},
		});

		const userElement = document.getElementById("loggedUser");
		if (userElement) {
			userElement.textContent = session?.user?.username || "-";
		}
	} catch (error) {
		window.location.href = "./index.html";
		return;
	}

	logoutBtn.addEventListener("click", async () => {
		try {
			await adminRequest("/api/admin/logout", {
				method: "POST",
				body: JSON.stringify({}),
			});
		} finally {
			window.location.href = "./index.html";
		}
	});
}

// Detectar qual página estamos e executar setup apropriado
if (window.location.pathname.includes('admin.html')) {
	// Página administrativa
	setupAdminPage();
} else if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/admin') || window.location.pathname.endsWith('/admin/')) {
	// Página de login
	setupLoginPage();
} else {
	// Outras páginas - tentar ambos
	setupLoginPage();
	setupAdminPage();
}