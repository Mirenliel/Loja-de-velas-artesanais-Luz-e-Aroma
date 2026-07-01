const express = require('express');
const {
  listarProdutos,
  buscarProdutoPorId
} = require('../controllers/produtos.controller');

const router = express.Router();

router.get('/', listarProdutos);
router.get('/:id', buscarProdutoPorId);

module.exports = router;
