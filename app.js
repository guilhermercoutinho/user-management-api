import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./src/prisma.js";
import userRoutes from "./src/routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/usuarios", userRoutes);

// app.get("/teste-banco", async (req, res) => {
//   try {
//     const allUsers = await prisma.user.findMany();

//     res.json(allUsers);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Erro ao conectar ao banco de dados.", error });
//   }
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
