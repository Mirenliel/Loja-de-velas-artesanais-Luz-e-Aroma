const pool = require('../config/database');

async function listarProdutos(req, res) {
  try {
    const resultado = await pool.query(
      `SELECT id, nome, fragrancia, descricao, preco, imagem_url, criado_em
       FROM produtos
       ORDER BY id ASC`
    );

    res.status(200).json(resultado.rows);
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).json({
      erro: 'Erro ao listar produtos.'
    });
  }
}

async function buscarProdutoPorId(req, res) {
  const { id } = req.params;

  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    return res.status(400).json({
      erro: 'ID do produto inválido.'
    });
  }

  try {
    const resultado = await pool.query(
      `SELECT id, nome, fragrancia, descricao, preco, imagem_url, criado_em
       FROM produtos
       WHERE id = $1`,
      [id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({
        erro: 'Produto não encontrado.'
      });
    }

    return res.status(200).json(resultado.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return res.status(500).json({
      erro: 'Erro ao buscar produto.'
    });
  }
}

module.exports = {
  listarProdutos,
  buscarProdutoPorId
};
