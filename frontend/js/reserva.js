const reservaForm = document.getElementById('reserva-form');
const produtoSelect = document.getElementById('produto_id');
const reservaStatus = document.getElementById('reserva-status');

function definirStatus(mensagem, tipo = '') {
  reservaStatus.textContent = mensagem;
  reservaStatus.className = `form-status ${tipo}`.trim();
}

async function carregarProdutosReserva() {
  try {
    const produtos = await apiRequest('/produtos');
    const params = new URLSearchParams(window.location.search);
    const produtoSelecionado = params.get('produto_id');

    produtoSelect.innerHTML = '<option value="">Selecione uma vela</option>';

    produtos.forEach((produto) => {
      const option = document.createElement('option');
      option.value = produto.id;
      option.textContent = `${produto.nome} - ${produto.fragrancia} - ${formatarPreco(produto.preco)}`;

      if (produtoSelecionado === String(produto.id)) {
        option.selected = true;
      }

      produtoSelect.appendChild(option);
    });

    if (!produtos.length) {
      produtoSelect.innerHTML = '<option value="">Nenhum produto disponivel</option>';
      produtoSelect.disabled = true;
    }
  } catch (error) {
    produtoSelect.innerHTML = '<option value="">Erro ao carregar produtos</option>';
    produtoSelect.disabled = true;
    definirStatus(error.message, 'error');
  }
}

async function enviarReserva(event) {
  event.preventDefault();

  const formData = new FormData(reservaForm);
  const dadosReserva = {
    cliente_nome: formData.get('cliente_nome').trim(),
    cliente_telefone: formData.get('cliente_telefone').trim(),
    produto_id: Number(formData.get('produto_id')),
    quantidade: Number(formData.get('quantidade')),
    observacao: formData.get('observacao').trim()
  };

  definirStatus('Enviando reserva...');

  try {
    await apiRequest('/reservas', {
      method: 'POST',
      body: JSON.stringify(dadosReserva)
    });

    reservaForm.reset();
    produtoSelect.value = '';
    definirStatus('Reserva enviada com sucesso. A loja recebeu sua solicitacao.', 'success');
  } catch (error) {
    definirStatus(error.message, 'error');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  carregarProdutosReserva();
  reservaForm.addEventListener('submit', enviarReserva);
});
