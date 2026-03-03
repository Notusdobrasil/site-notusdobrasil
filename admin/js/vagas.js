// API_BASE_URL definido globalmente em scripts.js
let vagasCache = [];

async function carregarVagas() {
	try {
		const response = await fetch(`${window.API_BASE_URL}/api/vagas`, {
			credentials: "include",
		});
		const vagas = await response.json();
		vagasCache = vagas;
		renderizarVagas(vagas);
	} catch (error) {
		document.getElementById("vagasList").innerHTML = `
            <div class="error-message">
                <i class="fa-solid fa-exclamation-triangle"></i>
                Erro ao carregar vagas: ${error.message}
            </div>
        `;
	}
}

function renderizarVagas(vagas) {
	const container = document.getElementById("vagasList");

	if (vagas.length === 0) {
		container.innerHTML = `
            <div class="empty-state">
                <p>Nenhuma vaga cadastrada ainda.</p>
                <button class="btn-primary" onclick="abrirModalNovaVaga()">
                     Adicionar Primeira Vaga
                </button>
            </div>
        `;
		return;
	}

	container.innerHTML = vagas
		.map(
			(vaga) => `
        <div class="vaga-item" data-id="${vaga.id}">
            <div class="vaga-item-header">
                <div class="vaga-item-info">
                    ${vaga.nova ? '<span class="badge-nova">NOVA</span>' : ""}
                    <h3>${vaga.titulo}</h3>
                    <p class="vaga-empresa">
                        <i class="fa-solid fa-building"></i> ${vaga.empresa}
                    </p>
                </div>
                <div class="vaga-item-actions">
                    <button class="btn-icon btn-edit" onclick="editarVaga('${vaga.id}')" title="Editar">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="btn-icon btn-delete" onclick="confirmarExclusao('${vaga.id}', '${vaga.titulo}')" title="Excluir">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="vaga-item-details">
                <span><i class="fa-solid fa-location-dot"></i> ${vaga.local}</span>
                <span><i class="fa-solid fa-dollar-sign"></i> ${vaga.salario}</span>
                <span><i class="fa-solid fa-briefcase"></i> ${vaga.tipo}</span>
            </div>
        </div>
    `
		)
		.join("");
}

function abrirModalNovaVaga() {
	document.getElementById("modalTitle").textContent = "Nova Vaga";
	document.getElementById("formVaga").reset();
	document.getElementById("vagaId").value = "";
	document.getElementById("flyerAtual").style.display = "none";
	document.getElementById("modalVaga").classList.add("show");
}

async function editarVaga(id) {
	const vaga = vagasCache.find((v) => v.id === id);
	if (!vaga) return;

	document.getElementById("modalTitle").textContent = "Editar Vaga";
	document.getElementById("vagaId").value = vaga.id;
	document.getElementById("vagaTitulo").value = vaga.titulo;
	document.getElementById("vagaEmpresa").value = vaga.empresa;
	document.getElementById("vagaLocal").value = vaga.local;
	document.getElementById("vagaSalario").value = vaga.salario;
	document.getElementById("vagaTipo").value = vaga.tipo;
	document.getElementById("vagaHorario").value = vaga.horario;
	document.getElementById("vagaDescricao").value = vaga.descricao;
	document.getElementById("vagaResponsabilidades").value = vaga.responsabilidades.join("\n");
	document.getElementById("vagaRequisitos").value = vaga.requisitos.join("\n");
	document.getElementById("vagaBeneficios").value = vaga.beneficios.join("\n");
	
	// Mostrar arquivo atual se existir
	if (vaga.flyerUrl) {
		const fileName = vaga.flyerUrl.split('/').pop();
		document.getElementById("flyerNome").textContent = fileName;
		document.getElementById("flyerAtual").style.display = "block";
	} else {
		document.getElementById("flyerAtual").style.display = "none";
	}
	
	document.getElementById("vagaNova").checked = vaga.nova || false;

	document.getElementById("modalVaga").classList.add("show");
}

function confirmarExclusao(id, titulo) {
	if (confirm(`Deseja realmente excluir a vaga "${titulo}"?`)) {
		excluirVaga(id);
	}
}

async function excluirVaga(id) {
	try {
		const response = await fetch(`${window.API_BASE_URL}/api/admin/vagas/${id}`, {
			method: "DELETE",
			credentials: "include",
		});

		if (!response.ok) throw new Error("Falha ao excluir vaga");

		await carregarVagas();
		mostrarNotificacao("Vaga excluída com sucesso!", "success");
	} catch (error) {
		mostrarNotificacao("Erro ao excluir vaga: " + error.message, "error");
	}
}

function fecharModal() {
	document.getElementById("modalVaga").classList.remove("show");
}

function mostrarNotificacao(mensagem, tipo = "success") {
	const notif = document.createElement("div");
	notif.className = `notificacao ${tipo}`;
	notif.innerHTML = `
        <i class="fa-solid fa-${tipo === "success" ? "check-circle" : "exclamation-circle"}"></i>
        ${mensagem}
    `;
	document.body.appendChild(notif);

	setTimeout(() => notif.classList.add("show"), 10);
	setTimeout(() => {
		notif.classList.remove("show");
		setTimeout(() => notif.remove(), 300);
	}, 3000);
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
	const tabVagas = document.getElementById("tab-vagas");
	if (!tabVagas) return;

	carregarVagas();

	document.getElementById("btnNovaVaga")?.addEventListener("click", abrirModalNovaVaga);
	document.getElementById("btnCloseModal")?.addEventListener("click", fecharModal);
	document.getElementById("btnCancelar")?.addEventListener("click", fecharModal);

	document.getElementById("modalVaga")?.addEventListener("click", (e) => {
		if (e.target.id === "modalVaga") fecharModal();
	});

	document.getElementById("formVaga")?.addEventListener("submit", async (e) => {
		e.preventDefault();

		const vagaId = document.getElementById("vagaId").value;
		const metodo = vagaId ? "PUT" : "POST";
		const url = vagaId
			? `${window.API_BASE_URL}/api/admin/vagas/${vagaId}`
			: `${window.API_BASE_URL}/api/admin/vagas`;

		// Criar FormData para enviar arquivo
		const formData = new FormData();
		
		// Adicionar campos de texto
		formData.append('titulo', document.getElementById("vagaTitulo").value.trim());
		formData.append('empresa', document.getElementById("vagaEmpresa").value);
		formData.append('local', document.getElementById("vagaLocal").value.trim());
		formData.append('salario', document.getElementById("vagaSalario").value.trim());
		formData.append('tipo', document.getElementById("vagaTipo").value);
		formData.append('horario', document.getElementById("vagaHorario").value.trim());
		formData.append('descricao', document.getElementById("vagaDescricao").value.trim());
		
		// Adicionar arrays como JSON
		const responsabilidades = document
			.getElementById("vagaResponsabilidades")
			.value.split("\n")
			.map((r) => r.trim())
			.filter((r) => r);
		formData.append('responsabilidades', JSON.stringify(responsabilidades));
		
		const requisitos = document
			.getElementById("vagaRequisitos")
			.value.split("\n")
			.map((r) => r.trim())
			.filter((r) => r);
		formData.append('requisitos', JSON.stringify(requisitos));
		
		const beneficios = document
			.getElementById("vagaBeneficios")
			.value.split("\n")
			.map((b) => b.trim())
			.filter((b) => b);
		formData.append('beneficios', JSON.stringify(beneficios));
		
		// Adicionar arquivo se selecionado
		const flyerInput = document.getElementById("vagaFlyer");
		if (flyerInput.files && flyerInput.files[0]) {
			formData.append('flyer', flyerInput.files[0]);
		}
		
		formData.append('nova', document.getElementById("vagaNova").checked);

		try {
			const response = await fetch(url, {
				method: metodo,
				credentials: "include",
				body: formData,
			});

			if (!response.ok) throw new Error("Falha ao salvar vaga");

			fecharModal();
			await carregarVagas();
			mostrarNotificacao(
				vagaId ? "Vaga atualizada com sucesso!" : "Vaga criada com sucesso!",
				"success"
			);
		} catch (error) {
			mostrarNotificacao("Erro ao salvar vaga: " + error.message, "error");
		}
	});

	// Sidebar Navigation
	document.querySelectorAll(".sidebar-nav-item").forEach((btn) => {
		btn.addEventListener("click", function () {
			const tabId = this.getAttribute("data-tab");

			document.querySelectorAll(".sidebar-nav-item").forEach((b) => b.classList.remove("active"));
			document.querySelectorAll(".admin-content").forEach((c) => c.classList.remove("active"));

			this.classList.add("active");
			document.getElementById(`tab-${tabId}`)?.classList.add("active");
		});
	});
});
