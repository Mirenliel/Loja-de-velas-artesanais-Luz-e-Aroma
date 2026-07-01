const loginForm = document.getElementById('login-form');
const loginStatus = document.getElementById('login-status');

function definirLoginStatus(mensagem, tipo = '') {
  loginStatus.textContent = mensagem;
  loginStatus.className = `form-status ${tipo}`.trim();
}

async function enviarLogin(event) {
  event.preventDefault();

  const formData = new FormData(loginForm);
  const dadosLogin = {
    usuario: formData.get('usuario').trim(),
    senha: formData.get('senha')
  };

  definirLoginStatus('Validando acesso...');

  try {
    await apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify(dadosLogin)
    });

    sessionStorage.setItem('adminAutenticado', 'true');
    window.location.href = 'admin.html';
  } catch (error) {
    definirLoginStatus(error.message, 'error');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('adminAutenticado') === 'true') {
    window.location.href = 'admin.html';
    return;
  }

  loginForm.addEventListener('submit', enviarLogin);
});
