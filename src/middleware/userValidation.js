import Joi from "joi";

const schemaUser = Joi.object({
  nome: Joi.string().min(3).max(50).required().messages({
    "string.empty": "O nome é obrigatório",
    "string.min": "O nome deve ter pelo menos 3 caracteres.",
    "string.max": "O nome deve ter no máximo 50 caracteres.",
  }),
  cpf: Joi.string()
    .pattern(/^\d{11}$/)
    .required()
    .messages({
      "string.empty": "o CPF é obrigatório",
      "string.pattern.base": "O CPF deve conter exatament 11 dígitos",
    }),
  email: Joi.string().email().required().messages({
    "String.empty": "O email é obrigatório.",
    "String.email": "O email deve ser válido.",
  }),
  telefone: Joi.string()
    .pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)
    .required()
    .messages({
      "string.empty": "O telefone é obrigatório.",
      "string.pattern.base":
        "O telefone deve estar no formato (XX) XXXXX-XXXX.",
    }),
  endereco: Joi.object({
    cep: Joi.string()
      .pattern(/^\d{5}-\d{3}$/)
      .required()
      .messages({
        "string.empty": "O CEP é obrigatório.",
        "string.pattern.base": "O CEP deve estar no formato XXXXX-XXX.",
      }),
    rua: Joi.string().required().messages({
      "string.empty": "A rua é obrigatória.",
    }),
    numero: Joi.string().required().messages({
      "string.empty": "O número é obrigatório.",
    }),
    bairro: Joi.string().required().messages({
      "string.empty": "O bairro é obrigatório.",
    }),
    cidade: Joi.string().required().messages({
      "string.empty": "A cidade é obrigatória.",
    }),
    estado: Joi.string().length(2).required().messages({
      "string.empty": "O estado é obrigatório.",
      "string.length": "O estado deve ter exatamente 2 caracteres.",
    }),
  }).required(),
  genero: Joi.string()
    .valid("Masculino", "Feminino", "Outro")
    .optional()
    .messages({
      "any.only": "O gênero deve ser Masculino, Feminino ou Outro.",
    }),
  foto: Joi.string().uri().optional().messages({
    "string.uri": "A foto deve ser uma URL válida.",
  }),
});

const validateUser = (req, res, next) => {
  const { error } = schemaUser.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map((details) => details.message);

    return res.status(400).json({ errors: messages });
  }

  next();
};

export default validateUser;
