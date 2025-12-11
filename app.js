// app.js
document.addEventListener('DOMContentLoaded', () => {
  // Configurar tema escuro
  const darkToggle = document.getElementById('darkToggle');
  
  // Verificar preferência salva ou do sistema
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const savedPreference = localStorage.getItem('ac_dark');
  
  if (savedPreference === '1' || (!savedPreference && prefersDark.matches)) {
    document.body.classList.add('dark');
    darkToggle.textContent = '☀️';
    darkToggle.setAttribute('title', 'Modo claro');
  }
  
  // Alternar tema
  darkToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('ac_dark', isDark ? '1' : '0');
    
    // Atualizar ícone
    darkToggle.textContent = isDark ? '☀️' : '🌙';
    darkToggle.setAttribute('title', isDark ? 'Modo claro' : 'Modo escuro');
  });
  
  // PWA - Instalação
  const installBtn = document.getElementById('installBtn');
  let deferredPrompt;
  
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'inline-block';
  });
  
  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    
    if (choice.outcome === 'accepted') {
      installBtn.style.display = 'none';
    }
    
    deferredPrompt = null;
  });
  
  // Fechar modais com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-back').forEach(modal => {
        modal.style.display = 'none';
      });
    }
  });
  
  // Fechar modal clicando fora
  document.querySelectorAll('.modal-back').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
  
  // Adicionar acessibilidade
  document.querySelectorAll('[onclick]').forEach(element => {
    const onclick = element.getAttribute('onclick');
    if (onclick && onclick.includes('openModal') || onclick.includes('enterApp')) {
      element.setAttribute('role', 'button');
      element.setAttribute('tabindex', '0');
      
      // Adicionar evento de tecla Enter
      element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          element.click();
        }
      });
    }
  });
});

// Funções de navegação (mantidas como globais para compatibilidade)
function enterApp() {
  document.getElementById('welcome').style.display = 'none';
  document.getElementById('mainMenu').style.display = 'block';
  document.getElementById('mainMenu').scrollIntoView({ behavior: 'smooth' });
}

function openSection(id) {
  document.getElementById('mainMenu').style.display = 'none';
  document.getElementById(id).style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function backToMenu() {
  document.getElementById('rotasSection').style.display = 'none';
  document.getElementById('mainMenu').style.display = 'block';
}

function openModal(which) {
  const modalId = which === 'avisosModal' ? 'avisosModalBack' : 'ajudaModalBack';
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'flex';
    // Focar no botão de fechar
    const closeBtn = modal.querySelector('.close');
    setTimeout(() => closeBtn?.focus(), 100);
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'none';
  }
}

// Função auxiliar para abrir rotas no Maps
function openMapsWithCoords(q) {
  const url = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
  window.open(url, '_blank', 'noopener,noreferrer');
}
