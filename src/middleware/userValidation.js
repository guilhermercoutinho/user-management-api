import Joi from "joi";

// Define o esquema de validação para os dados do usuário
const schemaUsuario = Joi.object({
  nome: Joi.string().min(3).max(50).required().messages({
    "string.empty": "O nome é obrigatório.",
    "string.min": "O nome deve ter pelo menos 3 caracteres.",
    "string.max": "O nome deve ter no máximo 50 caracteres.",
  }),
  cpf: Joi.string()
    .pattern(/^\d{11}$/)
    .optional()
    .messages({
      "string.pattern.base": "O CPF deve conter exatamente 11 dígitos.",
    }),
  email: Joi.string().email().optional().messages({
    "string.email": "O email deve ser válido.",
  }),
  telefone: Joi.string()
    .pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)
    .optional()
    .messages({
      "string.pattern.base":
        "O telefone deve estar no formato (XX) XXXXX-XXXX.",
    }),
  endereco: Joi.object({
    cep: Joi.string()
      .pattern(/^\d{5}-\d{3}$/)
      .optional()
      .messages({
        "string.pattern.base": "O CEP deve estar no formato XXXXX-XXX.",
      }),
    rua: Joi.string().optional().messages({
      "string.empty": "A rua é obrigatória.",
    }),
    numero: Joi.string().optional().messages({
      "string.empty": "O número é obrigatório.",
    }),
    bairro: Joi.string().optional().messages({
      "string.empty": "O bairro é obrigatório.",
    }),
    cidade: Joi.string().optional().messages({
      "string.empty": "A cidade é obrigatória.",
    }),
    estado: Joi.string().length(2).optional().messages({
      "string.length": "O estado deve ter exatamente 2 caracteres.",
    }),
  }).optional(),
  genero: Joi.string()
    .valid("Masculino", "Feminino", "Outro")
    .optional()
    .messages({
      "any.only": "O gênero deve ser Masculino, Feminino ou Outro.",
    }),
});

// Middleware para validação e adição da imagem com base no gênero
const validarUsuario = async (req, res, next) => {
  const { error } = schemaUsuario.validate(req.body, { abortEarly: false });

  if (error) {
    const mensagens = error.details.map((detalhe) => detalhe.message);
    return res.status(400).json({ erros: mensagens });
  }

  try {
    // Adiciona a imagem com base no gênero
    const genero = req.body.genero;
    const nome = req.body.nome;
    let foto = "";

    if (genero === "Masculino") {
      foto = "https://avatar.iran.liara.run/public/boy";
    } else if (genero === "Feminino") {
      foto = "https://avatar.iran.liara.run/public/girl";
    } else {
      foto = `https://avatar.iran.liara.run/username?username=${nome}`; // Gênero neutro ou outro
    }

    req.body.foto = foto;
    next(); // Continua para a próxima middleware ou rota
  } catch (err) {
    return res.status(500).json({ erro: "Erro ao definir a foto do usuário." });
  }
};

export default validarUsuario;
