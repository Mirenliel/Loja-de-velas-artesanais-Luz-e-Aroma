const BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000/api'
  : '/api';

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  let data = null;

  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }

  if (!response.ok) {
    const message = data && data.erro ? data.erro : 'Erro ao comunicar com a API.';
    throw new Error(message);
  }

  return data;
}

function formatarPreco(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function formatarData(valor) {
  if (!valor) {
    return '-';
  }

  return new Date(valor).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  });
}

function escaparHTML(valor) {
  return String(valor ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function configurarMenuMobile() {
  const button = document.querySelector('[data-menu-toggle]');
  const links = document.querySelector('[data-nav-links]');

  if (!button || !links) {
    return;
  }

  button.addEventListener('click', () => {
    links.classList.toggle('open');
  });
}

document.addEventListener('DOMContentLoaded', configurarMenuMobile);
