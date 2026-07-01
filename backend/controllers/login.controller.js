function login(req, res) {
  const { usuario, senha } = req.body;
  const adminUser = process.env.ADMIN_USER;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUser || !adminPassword) {
    return res.status(500).json({
      erro: 'Credenciais administrativas não configuradas.'
    });
  }

  if (usuario === adminUser && senha === adminPassword) {
    return res.status(200).json({
      mensagem: 'Login realizado com sucesso.',
      autenticado: true
    });
  }

  return res.status(401).json({
    erro: 'Usuário ou senha inválidos.'
  });
}

module.exports = {
  login
};
