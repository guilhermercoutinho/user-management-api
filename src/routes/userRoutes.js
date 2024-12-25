import express from "express";
import prisma from "../prisma.js";
import validateUser from "../middleware/userValidation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar usuários." });
  }
});

router.post("/", validateUser, async (req, res) => {
  const { nome, cpf, email, telefone, endereco, genero, foto } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        nome,
        cpf,
        email,
        telefone,
        endereco,
        genero,
        foto,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Erro ao cria usuário." });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    !user && res.status(404).json({ error: "Usuário não encontrado." });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar usuário." });
  }
});

router.put("/:id", validateUser, async (req, res) => {
  const { id } = req.params;
  const { nome, cpf, email, telefone, endereco, genero, foto } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        nome,
        cpf,
        email,
        telefone,
        endereco,
        genero,
        foto,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Erro ao atualizar usuário." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Erro ao excluir usuario." });
  }
});

export default router;
