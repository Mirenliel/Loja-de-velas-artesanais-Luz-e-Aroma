const pool = require('../config/database');

function validarTextoObrigatorio(valor) {
  return typeof valor === 'string' && valor.trim().length > 0;
}

async function criarReserva(req, res) {
  const {
    cliente_nome,
    cliente_telefone,
    produto_id,
    quantidade,
    observacao
  } = req.body;

  const produtoId = Number(produto_id);
  const quantidadeReserva = Number(quantidade);

  if (!validarTextoObrigatorio(cliente_nome)) {
    return res.status(400).json({
      erro: 'O nome do cliente é obrigatório.'
    });
  }

  if (!validarTextoObrigatorio(cliente_telefone)) {
    return res.status(400).json({
      erro: 'O telefone do cliente é obrigatório.'
    });
  }

  if (!Number.isInteger(produtoId) || produtoId <= 0) {
    return res.status(400).json({
      erro: 'Produto inválido.'
    });
  }

  if (!Number.isInteger(quantidadeReserva) || quantidadeReserva <= 0) {
    return res.status(400).json({
      erro: 'A quantidade deve ser um número inteiro maior que zero.'
    });
  }

  try {
    const produto = await pool.query(
      'SELECT id FROM produtos WHERE id = $1',
      [produtoId]
    );

    if (produto.rowCount === 0) {
      return res.status(404).json({
        erro: 'Produto não encontrado.'
      });
    }

    const resultado = await pool.query(
      `INSERT INTO reservas
        (cliente_nome, cliente_telefone, produto_id, quantidade, observacao)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, cliente_nome, cliente_telefone, produto_id, quantidade, observacao, status, criado_em`,
      [
        cliente_nome.trim(),
        cliente_telefone.trim(),
        produtoId,
        quantidadeReserva,
        observacao ? observacao.trim() : null
      ]
    );

    return res.status(201).json({
      mensagem: 'Reserva criada com sucesso.',
      reserva: resultado.rows[0]
    });
  } catch (error) {
    console.error('Erro ao criar reserva:', error);
    return res.status(500).json({
      erro: 'Erro ao criar reserva.'
    });
  }
}

async function listarReservas(req, res) {
  try {
    const resultado = await pool.query(
      `SELECT
        reservas.id,
        reservas.cliente_nome,
        reservas.cliente_telefone,
        reservas.produto_id,
        produtos.nome AS produto_nome,
        produtos.fragrancia AS produto_fragrancia,
        reservas.quantidade,
        reservas.observacao,
        reservas.status,
        reservas.criado_em
       FROM reservas
       INNER JOIN produtos ON produtos.id = reservas.produto_id
       ORDER BY reservas.criado_em DESC`
    );

    return res.status(200).json(resultado.rows);
  } catch (error) {
    console.error('Erro ao listar reservas:', error);
    return res.status(500).json({
      erro: 'Erro ao listar reservas.'
    });
  }
}

module.exports = {
  criarReserva,
  listarReservas
};
