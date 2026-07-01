const express = require('express');
const {
  criarReserva,
  listarReservas
} = require('../controllers/reservas.controller');

const router = express.Router();

router.post('/', criarReserva);
router.get('/', listarReservas);

module.exports = router;
