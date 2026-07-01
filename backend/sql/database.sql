CREATE TABLE IF NOT EXISTS produtos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  fragrancia VARCHAR(100) NOT NULL,
  descricao TEXT NOT NULL,
  preco NUMERIC(10, 2) NOT NULL CHECK (preco >= 0),
  imagem_url VARCHAR(255) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reservas (
  id SERIAL PRIMARY KEY,
  cliente_nome VARCHAR(120) NOT NULL,
  cliente_telefone VARCHAR(30) NOT NULL,
  produto_id INTEGER NOT NULL REFERENCES produtos(id),
  quantidade INTEGER NOT NULL CHECK (quantidade > 0),
  observacao TEXT,
  status VARCHAR(30) NOT NULL DEFAULT 'pendente',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO produtos (nome, fragrancia, descricao, preco, imagem_url)
SELECT
  'Vela Serenidade',
  'Lavanda',
  'Vela artesanal com aroma suave de lavanda, ideal para momentos de relaxamento.',
  34.90,
  'assets/images/vela-lavanda.jpg'
WHERE NOT EXISTS (
  SELECT 1 FROM produtos WHERE nome = 'Vela Serenidade'
);

INSERT INTO produtos (nome, fragrancia, descricao, preco, imagem_url)
SELECT
  'Vela Doce Aconchego',
  'Baunilha',
  'Vela artesanal de baunilha com fragrancia delicada e acolhedora para ambientes internos.',
  32.90,
  'assets/images/vela-baunilha.jpg'
WHERE NOT EXISTS (
  SELECT 1 FROM produtos WHERE nome = 'Vela Doce Aconchego'
);

INSERT INTO produtos (nome, fragrancia, descricao, preco, imagem_url)
SELECT
  'Vela Noite Quente',
  'Canela',
  'Vela artesanal com aroma marcante de canela, perfeita para criar uma atmosfera acolhedora.',
  36.90,
  'assets/images/vela-canela.jpg'
WHERE NOT EXISTS (
  SELECT 1 FROM produtos WHERE nome = 'Vela Noite Quente'
);
