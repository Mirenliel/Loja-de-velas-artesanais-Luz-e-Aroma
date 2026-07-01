const produtosTabela = document.getElementById('admin-produtos-tabela');
const reservasTabela = document.getElementById('admin-reservas-tabela');
const produtosStatus = document.getElementById('admin-produtos-status');
const reservasStatus = document.getElementById('admin-reservas-status');
const produtosTotal = document.getElementById('produtos-total');
const reservasTotal = document.getElementById('reservas-total');
const logoutButton = document.getElementById('logout-button');

function verificarAcessoAdmin() {
  if (sessionStorage.getItem('adminAutenticado') !== 'true') {
    window.location.href = 'login.html';
    return false;
  }

  return true;
}

function sairAdmin() {
  sessionStorage.removeItem('adminAutenticado');
  window.location.href = 'login.html';
}

async function carregarProdutosAdmin() {
  try {
    const produtos = await apiRequest('/produtos');
    produtosTotal.textContent = produtos.length;

    if (!produtos.length) {
      produtosStatus.textContent = 'Nenhum produto cadastrado.';
      return;
    }

    produtosStatus.textContent = '';
    produtosTabela.innerHTML = produtos.map((produto) => `
      <tr>
        <td>${escaparHTML(produto.nome)}</td>
        <td>${escaparHTML(produto.fragrancia)}</td>
        <td>${formatarPreco(produto.preco)}</td>
      </tr>
    `).join('');
  } catch (error) {
    produtosStatus.textContent = error.message;
    produtosStatus.classList.add('error');
  }
}

async function carregarReservasAdmin() {
  try {
    const reservas = await apiRequest('/reservas');
    reservasTotal.textContent = reservas.length;

    if (!reservas.length) {
      reservasStatus.textContent = 'Nenhuma reserva recebida.';
      return;
    }

    reservasStatus.textContent = '';
    reservasTabela.innerHTML = reservas.map((reserva) => `
      <tr>
        <td>${escaparHTML(reserva.cliente_nome)}</td>
        <td>${escaparHTML(reserva.cliente_telefone)}</td>
        <td>${escaparHTML(reserva.produto_nome)}</td>
        <td>${reserva.quantidade}</td>
        <td><span class="status-pill">${escaparHTML(reserva.status)}</span></td>
        <td>${formatarData(reserva.criado_em)}</td>
      </tr>
    `).join('');
  } catch (error) {
    reservasStatus.textContent = error.message;
    reservasStatus.classList.add('error');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (!verificarAcessoAdmin()) {
    return;
  }

  logoutButton.addEventListener('click', sairAdmin);
  carregarProdutosAdmin();
  carregarReservasAdmin();
});
