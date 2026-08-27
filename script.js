// Inicializar Ícones Lucide
lucide.createIcons();

// Sistema Global de Notificações Toast (Feedback Visual)
function showToast(message, type = 'success') {
    const oldToast = document.getElementById('global-toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.id = 'global-toast';
    const bgColor = type === 'success' ? 'bg-emerald-900/90 border-emerald-500 text-emerald-100' : 'bg-amber-900/90 border-amber-500 text-amber-100';
    
    toast.className = `fixed bottom-6 right-6 z-50 ${bgColor} border text-xs font-medium px-5 py-3.5 rounded-sm shadow-2xl flex items-center gap-3 backdrop-blur-md animate-bounce`;
    toast.innerHTML = `<i data-lucide="${type === 'success' ? 'check-circle' : 'info'}" class="w-4 h-4"></i> <span>${message}</span>`;
    
    document.body.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => {
        toast.classList.add('opacity-0', 'transition-opacity', 'duration-500');
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

// Base de Dados de Projetos
const projectsData = {
    alvorada: {
        title: 'Residência Alvorada',
        location: 'Jardins, São Paulo',
        area: '1.450 m²',
        architect: 'Ademar Luiz',
        engineer: 'Eng. Guilherme L. ([SUA EMPRESA])',
        challenge: 'Execução de balanço estrutural em concreto protendido de 14 metros sem apoios visíveis.',
        materials: 'Concreto aparente ripado, Madeira Cumaru autoclavada, Mármore Travertino Navona.',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200'
    },
    lumina: {
        title: 'Torre Lumina Tower',
        location: 'Itaim Bibi, São Paulo',
        area: '18.200 m²',
        architect: 'Aflalo & Gasperini Arquitetos',
        engineer: 'Eng. Ademar Luiz ([SUA EMPRESA])',
        challenge: 'Escavação de 5 subsolos em contenção de estacas secantes com deflexão zero monitorada.',
        materials: 'Pele de vidro dupla insulada com atenuação acústica de 45dB.',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200'
    },
    horizon: {
        title: 'Complexo Horizon Hub',
        location: 'Faria Lima, São Paulo',
        area: '9.800 m²',
        architect: 'KPF Associates',
        engineer: 'Eng. Fernando S. ([SUA EMPRESA])',
        challenge: 'Instalação de cobertura verde extensiva e reaproveitamento de 100% das águas pluviais.',
        materials: 'Aço Corten, painéis fotovoltaicos integrados à fachada (BIPV).',
        image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1200'
    }
};

// Funções dos Modais
function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}

function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
}

// Abrir Ficha do Projeto
function openProjectModal(key) {
    const p = projectsData[key];
    if (!p) return;

    const content = document.getElementById('modal-project-content');
    content.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="h-80 md:h-full rounded overflow-hidden">
                <img src="${p.image}" class="w-full h-full object-cover">
            </div>
            <div class="space-y-4">
                <span class="text-xs text-brand-gold font-bold uppercase tracking-widest">${p.location} • ${p.area}</span>
                <h2 class="font-serif text-3xl text-white">${p.title}</h2>
                
                <div class="space-y-3 pt-4 text-xs">
                    <div>
                        <span class="text-neutral-500 block uppercase">Projeto Arquitetônico</span>
                        <span class="text-white font-medium">${p.architect}</span>
                    </div>
                    <div>
                        <span class="text-neutral-500 block uppercase">Responsável Técnico</span>
                        <span class="text-white font-medium">${p.engineer}</span>
                    </div>
                    <div>
                        <span class="text-neutral-500 block uppercase">Desafio de Engenharia</span>
                        <p class="text-neutral-300 mt-1 leading-relaxed">${p.challenge}</p>
                    </div>
                    <div>
                        <span class="text-neutral-500 block uppercase">Materiais Nobres</span>
                        <p class="text-neutral-300 mt-1 leading-relaxed">${p.materials}</p>
                    </div>
                </div>

                <div class="pt-6">
                    <button onclick="closeModal('modal-project'); openModal('modal-agendamento')" class="w-full bg-brand-gold text-brand-black font-bold text-xs uppercase tracking-widest py-3 rounded-sm hover:bg-brand-goldHover transition-all">
                        Solicitar Reunião sobre este Projeto
                    </button>
                </div>
            </div>
        </div>
    `;
    openModal('modal-project');
}

// Filtro de Projetos
function filterProjects(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.classList.remove('bg-brand-gold', 'text-white', 'font-semibold');
        btn.classList.add('text-neutral-400');
    });
    event.target.classList.add('bg-brand-gold', 'text-white', 'font-semibold');
    event.target.classList.remove('text-neutral-400');

    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.style.display = (category === 'all' || card.dataset.category === category) ? 'block' : 'none';
    });
}

// Lógica Principal de Assinatura do Termo NDA (Fluxo Conectado)
function handleNdaSign(e) {
    e.preventDefault();
    
    const nameInput = e.target.querySelector('input[type="text"]').value;
    
    // 1. Fechar o Modal
    closeModal('modal-nda');
    
    // 2. Desbloquear a área secreta
    document.getElementById('nda-locked-view').classList.add('hidden');
    document.getElementById('nda-unlocked-view').classList.remove('hidden');
    
    // 3. Rolar a tela diretamente para a seção desbloqueada
    document.getElementById('portfolio-privado').scrollIntoView({ behavior: 'smooth' });
    
    // 4. Notificar o usuário
    showToast(`Termo assinado por ${nameInput || 'você'}! Portfólio Off-Market liberado.`);
}

// Validação por Chave VIP
function verifyNdaKey() {
    const val = document.getElementById('nda-key-input').value.trim();
    if (val === 'VIP-2026' || val.toLowerCase() === 'vip') {
        document.getElementById('nda-locked-view').classList.add('hidden');
        document.getElementById('nda-unlocked-view').classList.remove('hidden');
        document.getElementById('portfolio-privado').scrollIntoView({ behavior: 'smooth' });
        showToast('Credencial VIP aceita! Acesso aos ativos liberado.');
    } else {
        document.getElementById('nda-error-msg').classList.remove('hidden');
    }
}

// Portal do Cliente (Troca de Obras)
function updateClientDashboard() {
    const select = document.getElementById('client-project-select').value;
    const progressNum = document.getElementById('dash-progress-num');
    const progressBar = document.getElementById('dash-progress-bar');
    const phase = document.getElementById('dash-phase');

    if (select === 'alvorada') {
        progressNum.textContent = '94%';
        progressBar.style.width = '94%';
        phase.textContent = 'Acompanhamento de Interiores & Paisagismo';
        showToast('Dados da Residência Alvorada carregados.');
    } else {
        progressNum.textContent = '78%';
        progressBar.style.width = '78%';
        phase.textContent = 'Instalação de Esquadrias & Pele de Vidro';
        showToast('Dados da Torre Lumina carregados.');
    }
}

// Downloads Simulados
function simulatedDownload(filename) {
    showToast(`Download de "${filename}" iniciado.`);
}

// Envio do Formulário de Contato / CRM
function handleCrmSubmit(e) {
    e.preventDefault();
    showToast('Solicitação enviada com sucesso! Nossa diretoria entrará em contato em até 2 horas.');
    e.target.reset();
}

// Agendamento VIP
let selectedTime = 'Amanhã • 10:00';

function selectBookingTime(btn) {
    document.querySelectorAll('#modal-agendamento button').forEach(b => {
        if (!b.getAttribute('onclick').includes('confirmBooking')) {
            b.className = 'p-3 bg-brand-black border border-white/10 text-white text-xs rounded text-center hover:border-brand-gold';
        }
    });
    btn.className = 'p-3 bg-brand-black border border-brand-gold text-brand-gold font-semibold text-xs rounded text-center';
    selectedTime = btn.innerText;
}

function confirmBooking() {
    closeModal('modal-agendamento');
    showToast(`Reunião agendada para: ${selectedTime}. Convite enviado por e-mail!`);
}

// Três.js - Visualizador 3D (Gêmeo Digital)
let scene, camera, renderer, houseGroup, wireframeMesh, solidMesh;

function initThreeJS() {
    const container = document.getElementById('three-canvas-container');
    if (!container) return;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0c0e);

    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(20, 15, 25);
    camera.lookAt(0, 2, 0);

    // VINCULAÇÃO GLOBAL PARA FUNCIONAR O ZOOM E RESET
    window.bimCamera = camera;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xd4af37, 1.2);
    dirLight.position.set(10, 20, 15);
    scene.add(dirLight);

    houseGroup = new THREE.Group();

    const slabGeo = new THREE.BoxGeometry(12, 0.4, 10);
    const slabMat = new THREE.MeshStandardMaterial({ color: 0x22252e, roughness: 0.3 });
    const slab = new THREE.Mesh(slabGeo, slabMat);
    houseGroup.add(slab);

    const colGeo = new THREE.BoxGeometry(0.5, 5, 0.5);
    const colMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.2 });
    
    [[-5, 2.5, -4], [5, 2.5, -4], [-5, 2.5, 4], [5, 2.5, 4], [0, 2.5, -4], [0, 2.5, 4]].forEach(pos => {
        const col = new THREE.Mesh(colGeo, colMat);
        col.position.set(...pos);
        houseGroup.add(col);
    });

    const slab2 = new THREE.Mesh(slabGeo, slabMat);
    slab2.position.set(0, 5, 0);
    houseGroup.add(slab2);

    const glassGeo = new THREE.BoxGeometry(11.8, 4.8, 9.8);
    const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x88ccee, transparent: true, opacity: 0.35, roughness: 0.1, transmission: 0.9 });
    solidMesh = new THREE.Mesh(glassGeo, glassMat);
    solidMesh.position.set(0, 2.5, 0);
    houseGroup.add(solidMesh);

    const wireGeo = new THREE.WireframeGeometry(glassGeo);
    const wireMat = new THREE.LineBasicMaterial({ color: 0xd4af37 });
    wireframeMesh = new THREE.LineSegments(wireGeo, wireMat);
    wireframeMesh.position.set(0, 2.5, 0);
    houseGroup.add(wireframeMesh);

    scene.add(houseGroup);

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    container.addEventListener('mousedown', () => isDragging = true);
    container.addEventListener('mouseup', () => isDragging = false);
    container.addEventListener('mouseleave', () => isDragging = false);

    container.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaMove = { x: e.clientX - previousMousePosition.x, y: e.clientY - previousMousePosition.y };
            houseGroup.rotation.y += deltaMove.x * 0.01;
            houseGroup.rotation.x += deltaMove.y * 0.01;
        }
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    function animate() {
        requestAnimationFrame(animate);
        if (!isDragging) houseGroup.rotation.y += 0.003;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Alterar a camada visual do modelo 3D (ADAPTADO À SUA MAQUETE REAL)
function setBimLayer(layer) {
  // 1. Atualizar o destaque visual dos botões
  const buttons = ['all', 'structure', 'mep', 'wireframe'];
  buttons.forEach(b => {
    const btn = document.getElementById(`layer-btn-${b}`);
    if (btn) {
      if (b === layer) {
        btn.className = "px-3 py-1.5 bg-brand-gold text-brand-black text-xs font-bold uppercase rounded-sm shadow transition-all";
      } else {
        btn.className = "px-3 py-1.5 bg-brand-black/90 hover:bg-brand-card text-neutral-300 text-xs uppercase rounded-sm border border-white/10 transition-all";
      }
    }
  });

  // 2. Controlar visibilidade/cores da sua maquete
  if (!solidMesh || !wireframeMesh) return;

  if (layer === 'wireframe') {
    solidMesh.visible = false;
    wireframeMesh.visible = true;
    wireframeMesh.material.color.setHex(0xd4af37);
  } else if (layer === 'structure') {
    solidMesh.visible = true;
    wireframeMesh.visible = true;
    solidMesh.material.color.setHex(0xd4af37); // Tom dourado para estrutura
    solidMesh.material.opacity = 0.8;
  } else if (layer === 'mep') {
    solidMesh.visible = true;
    wireframeMesh.visible = false;
    solidMesh.material.color.setHex(0x10b981); // Verde para instalações (MEP)
    solidMesh.material.opacity = 0.6;
  } else { // 'all' - Completo
    solidMesh.visible = true;
    wireframeMesh.visible = true;
    solidMesh.material.color.setHex(0x88ccee); // Cor original do vidro
    solidMesh.material.opacity = 0.35;
  }
}

// Controles da Câmera 3D
function zoomBim(factor) {
  if (window.bimCamera) {
    window.bimCamera.position.multiplyScalar(factor);
  }
}

function resetBimCamera() {
  if (window.bimCamera) {
    window.bimCamera.position.set(20, 15, 25);
    window.bimCamera.lookAt(0, 2, 0);
    if (houseGroup) {
      houseGroup.rotation.set(0, 0, 0);
    }
  }
}

function toggleFullscreenBim() {
  const container = document.getElementById('three-canvas-container');
  if (!document.fullscreenElement) {
    container.requestFullscreen().catch(err => console.log(err));
  } else {
    document.exitFullscreen();
  }
}

window.onload = function() {
    initThreeJS();
};