window.API_BASE_URL =
	window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
		? window.location.port === "3000" 
			? "" // Mesma origem (servido pelo backend)
			: "http://localhost:3000" // Live Server ou outra porta
		: "https://backend-site-notusdobrasil.onrender.com"; // Produção
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
