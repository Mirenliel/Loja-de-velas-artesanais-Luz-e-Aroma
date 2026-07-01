const produtosLista = document.getElementById('produtos-lista');
const catalogoStatus = document.getElementById('catalogo-status');

function criarImagemProduto(produto) {
  const nome = escaparHTML(produto.nome);

  if (!produto.imagem_url) {
    return `<div class="product-placeholder">${nome}</div>`;
  }

  return `
    <img
      class="product-image"
      src="${escaparHTML(produto.imagem_url)}"
      alt="${nome}"
      onerror="this.outerHTML='<div class=&quot;product-placeholder&quot;>${nome}</div>'"
    >
  `;
}

function criarCardProduto(produto) {
  return `
    <article class="product-card reveal">
      ${criarImagemProduto(produto)}
      <div class="product-content">
        <h2>${escaparHTML(produto.nome)}</h2>
        <div class="product-fragrance">${escaparHTML(produto.fragrancia)}</div>
        <p class="product-description">${escaparHTML(produto.descricao)}</p>
        <div class="product-footer">
          <span class="price">${formatarPreco(produto.preco)}</span>
          <a class="btn btn-primary" href="reserva.html?produto_id=${produto.id}">Reservar</a>
        </div>
      </div>
    </article>
  `;
}

async function carregarCatalogo() {
  try {
    const produtos = await apiRequest('/produtos');

    if (!produtos.length) {
      catalogoStatus.textContent = 'Nenhum produto cadastrado no momento.';
      return;
    }

    catalogoStatus.textContent = '';
    produtosLista.innerHTML = produtos.map(criarCardProduto).join('');
  } catch (error) {
    catalogoStatus.textContent = error.message;
    catalogoStatus.classList.add('error');
  }
}

document.addEventListener('DOMContentLoaded', carregarCatalogo);
