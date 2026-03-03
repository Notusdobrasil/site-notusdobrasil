/**
 * Script para carregar e exibir vagas dinamicamente
 */

// Configuração da API
const API_BASE_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : "https://backend-site-notusdobrasil.onrender.com";

console.log("Vagas API Base URL:", API_BASE_URL);

let vagasGlobal = [];

/**
 * Carrega vagas da API
 */
async function carregarVagas() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/vagas`);
        
        if (!response.ok) {
            throw new Error('Erro ao carregar vagas');
        }
        
        const vagas = await response.json();
        vagasGlobal = vagas;
        
        console.log('Vagas carregadas:', vagas.length);
        
        if (vagas.length === 0) {
            exibirMensagemSemVagas();
        } else {
            renderizarVagas(vagas);
        }
        
    } catch (error) {
        console.error('Erro ao carregar vagas:', error);
        exibirErroCarregamento();
    }
}

/**
 * Exibe mensagem quando não há vagas
 */
function exibirMensagemSemVagas() {
    const containerSidebar = document.querySelector('.vagas-sidebar');
    const containerDetalhes = document.querySelector('.vagas-detalhes');
    
    if (containerSidebar) {
        containerSidebar.innerHTML = `
            <div class="empty-state" style="padding: 40px; text-align: center;">
                <i class="fa-solid fa-briefcase" style="font-size: 48px; color: #ccc; margin-bottom: 16px;"></i>
                <p style="color: #666; font-size: 16px;">Não há vagas disponíveis no momento.</p>
                <p style="color: #999; font-size: 14px; margin-top: 8px;">Envie seu currículo abaixo para ser avisado de novas oportunidades!</p>
            </div>
        `;
    }
    
    if (containerDetalhes) {
        containerDetalhes.innerHTML = '';
    }
}

/**
 * Exibe mensagem de erro ao carregar vagas
 */
function exibirErroCarregamento() {
    const containerSidebar = document.querySelector('.vagas-sidebar');
    
    if (containerSidebar) {
        containerSidebar.innerHTML = `
            <div class="error-state" style="padding: 40px; text-align: center;">
                <i class="fa-solid fa-exclamation-triangle" style="font-size: 48px; color: #f44336; margin-bottom: 16px;"></i>
                <p style="color: #666; font-size: 16px;">Erro ao carregar vagas.</p>
                <p style="color: #999; font-size: 14px; margin-top: 8px;">Por favor, tente novamente mais tarde.</p>
            </div>
        `;
    }
}

/**
 * Renderiza as vagas na página
 */
function renderizarVagas(vagas) {
    renderizarCards(vagas);
    renderizarDetalhes(vagas);
    inicializarEventos();
}

/**
 * Renderiza os cards de vagas na sidebar
 */
function renderizarCards(vagas) {
    const containerSidebar = document.querySelector('.vagas-sidebar');
    
    if (!containerSidebar) return;
    
    containerSidebar.innerHTML = vagas.map((vaga, index) => `
        <div class="vaga-card ${index === 0 ? 'active' : ''}" data-vaga="${vaga.id}">
            ${vaga.nova ? '<div class="vaga-card-badge">NOVA</div>' : ''}
            <h3 class="vaga-card-titulo">${vaga.titulo}</h3>
            <div class="vaga-card-info">
                <p class="vaga-card-avaliacao">
                    <span class="vaga-card-empresa">${vaga.empresa}</span>
                </p>
                <p class="vaga-card-local">
                    <i class="fa-solid fa-location-dot"></i> ${vaga.local}
                </p>
                <p class="vaga-card-salario">${vaga.salario}</p>
                <p class="vaga-card-tipo">
                    <i class="fa-solid fa-building"></i> ${vaga.tipo}
                </p>
            </div>
        </div>
    `).join('');
}

/**
 * Renderiza os detalhes das vagas
 */
function renderizarDetalhes(vagas) {
    const containerDetalhes = document.querySelector('.vagas-detalhes');
    
    if (!containerDetalhes) return;
    
    containerDetalhes.innerHTML = vagas.map((vaga, index) => `
        <div class="vaga-detalhe-content ${index === 0 ? 'active' : ''}" id="vaga-${vaga.id}">
            <div class="vaga-detalhe-header">
                <div>
                    <h2>${vaga.titulo}</h2>
                    <p class="vaga-detalhe-local">
                        <i class="fa-solid fa-location-dot"></i> ${vaga.local}
                    </p>
                    <p class="vaga-detalhe-salario">${vaga.salario}</p>
                    <p class="vaga-detalhe-tipo">
                        <i class="fa-solid fa-building"></i> ${vaga.tipo}
                    </p>
                </div>
                <div class="vaga-detalhe-logo">
                    ${obterLogoEmpresa(vaga.empresa)}
                </div>
            </div>

            <button class="btn-candidatar" onclick="window.location.href='#formulario'">
                <i class="fa-solid fa-paper-plane"></i> CANDIDATAR-ME
            </button>

            <div class="vaga-detalhe-tabs">
                <button class="tab-btn active" data-tab="descricao-${vaga.id}">VAGA</button>
                ${vaga.flyerUrl ? `<button class="tab-btn" data-tab="flyer-${vaga.id}">FLYER</button>` : ''}
            </div>

            <div class="vaga-detalhe-body">
                <div class="tab-content active" id="descricao-${vaga.id}">
                    <h3>${vaga.titulo}</h3>
                    <p><strong>${vaga.empresa}</strong></p>
                    
                    ${vaga.descricao ? `<p>${vaga.descricao}</p>` : ''}

                    ${vaga.responsabilidades && vaga.responsabilidades.length > 0 ? `
                        <h4>Principais Responsabilidades:</h4>
                        <ul>
                            ${vaga.responsabilidades.map(r => `<li>${r}</li>`).join('')}
                        </ul>
                    ` : ''}

                    ${vaga.requisitos && vaga.requisitos.length > 0 ? `
                        <h4>Requisitos:</h4>
                        <ul>
                            ${vaga.requisitos.map(r => `<li>${r}</li>`).join('')}
                        </ul>
                    ` : ''}

                    ${vaga.beneficios && vaga.beneficios.length > 0 ? `
                        <h4>Benefícios:</h4>
                        <ul>
                            ${vaga.beneficios.map(b => `<li>${b}</li>`).join('')}
                        </ul>
                    ` : ''}

                    <p><strong>Salário:</strong> ${vaga.salario}</p>
                    ${vaga.horario ? `<p><strong>Horário:</strong> ${vaga.horario}</p>` : ''}
                </div>

                ${vaga.flyerUrl ? `
                    <div class="tab-content" id="flyer-${vaga.id}">
                        <h3>Flyer da Vaga - ${vaga.titulo}</h3>
                        <div class="flyer-container">
                            <img src="${API_BASE_URL}${vaga.flyerUrl}" alt="Flyer ${vaga.titulo}" class="flyer-image">
                            <div class="flyer-actions">
                                <button class="btn-download-flyer" onclick="downloadFlyer('${API_BASE_URL}${vaga.flyerUrl}', 'Vaga-${sanitizeFileName(vaga.titulo)}.jpg')">
                                    <i class="fa-solid fa-download"></i> Baixar Flyer
                                </button>
                                <button class="btn-share-flyer" onclick="compartilharFlyer('${vaga.titulo}')">
                                    <i class="fa-solid fa-share-nodes"></i> Compartilhar
                                </button>
                            </div>
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

/**
 * Obtém o logo da empresa baseado no nome
 */
function obterLogoEmpresa(nomeEmpresa) {
    const logos = {
        'Notus do Brasil': './images/logo-notus-azul.webp',
        'Notus Sistemas Térmicos': './images/logo-notus-azul.webp',
        'Vip Soft': './images/Logo_Vipsoft.webp',
        'Vipsoft': './images/Logo_Vipsoft.webp',
        'Notus Tooling': './images/logo-notustooling-azul.webp',
        'NTR': './images/logo-ntr-azul.webp'
    };
    
    const logoUrl = logos[nomeEmpresa] || './images/logo-notus-azul.webp';
    return `<img src="${logoUrl}" alt="${nomeEmpresa}">`;
}

/**
 * Sanitiza nome de arquivo
 */
function sanitizeFileName(filename) {
    return filename
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/[^a-zA-Z0-9]/g, '-') // Substitui caracteres especiais por hífen
        .replace(/-+/g, '-') // Remove hífens duplicados
        .replace(/^-|-$/g, ''); // Remove hífens do início e fim
}

/**
 * Inicializa eventos dos cards e tabs
 */
function inicializarEventos() {
    const vagaCards = document.querySelectorAll('.vaga-card');
    const vagaDetalhes = document.querySelectorAll('.vaga-detalhe-content');

    // Adicionar evento de clique em cada card
    vagaCards.forEach(card => {
        card.addEventListener('click', function() {
            const vagaId = this.getAttribute('data-vaga');
            
            // Remover classe active de todos os cards
            vagaCards.forEach(c => c.classList.remove('active'));
            
            // Adicionar classe active no card clicado
            this.classList.add('active');
            
            // Esconder todos os detalhes
            vagaDetalhes.forEach(detalhe => {
                detalhe.classList.remove('active');
            });
            
            // Mostrar detalhe da vaga selecionada
            const detalheAtivo = document.getElementById('vaga-' + vagaId);
            if (detalheAtivo) {
                detalheAtivo.classList.add('active');
            }
            
            // Scroll suave para o topo dos detalhes em mobile
            if (window.innerWidth <= 1024) {
                detalheAtivo.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Funcionalidade das tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const parentDetalhe = this.closest('.vaga-detalhe-content');
            const tabName = this.getAttribute('data-tab');
            
            // Remover active de todas as tabs do mesmo detalhe
            parentDetalhe.querySelectorAll('.tab-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // Adicionar active na tab clicada
            this.classList.add('active');
            
            // Mostrar conteúdo correspondente
            if (tabName) {
                parentDetalhe.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                const targetContent = parentDetalhe.querySelector('#' + tabName);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            }
        });
    });
}

/**
 * Função para download do flyer
 */
function downloadFlyer(imagemUrl, nomeArquivo) {
    const link = document.createElement('a');
    link.href = imagemUrl;
    link.download = nomeArquivo;
    link.target = '_blank';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('Download iniciado! O flyer será salvo em sua pasta de downloads.');
}

/**
 * Função para compartilhar o flyer
 */
function compartilharFlyer(tituloVaga) {
    const url = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: `Vaga: ${tituloVaga} - Notus do Brasil`,
            text: `Confira esta vaga disponível: ${tituloVaga}`,
            url: url
        })
        .then(() => console.log('Compartilhamento realizado com sucesso'))
        .catch((error) => console.log('Erro ao compartilhar:', error));
    } else {
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copiado para a área de transferência! Cole e compartilhe com outras pessoas.');
        }).catch(() => {
            alert('Link da página: ' + url);
        });
    }
}

// Carregar vagas quando a página carregar
document.addEventListener('DOMContentLoaded', carregarVagas);
