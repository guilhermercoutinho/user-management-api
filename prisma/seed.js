import prisma from "../src/prisma.js";

async function main() {
  console.log("Inserindo dados iniciais...");

  await prisma.user.createMany({
    data: [
      {
        nome: "João Silva",
        cpf: "12345678901",
        email: "joao.silva@example.com",
        telefone: "(11) 98765-4321",
        endereco: {
          cep: "01001-000",
          rua: "Avenida Central",
          numero: "123",
          bairro: "Centro",
          cidade: "São Paulo",
          estado: "SP",
        },
        genero: "Masculino",
        foto: "https://avatarplaceholder.com/joao.jpg",
      },
      {
        nome: "Maria Oliveira",
        cpf: "98765432100",
        email: "maria.oliveira@example.com",
        telefone: "(21) 99876-5432",
        endereco: {
          cep: "20031-001",
          rua: "Rua das Flores",
          numero: "456",
          bairro: "Jardim",
          cidade: "Rio de Janeiro",
          estado: "RJ",
        },
        genero: "Feminino",
        foto: "https://avatarplaceholder.com/maria.jpg",
      },
    ],
  });

  console.log("Dados inseridos com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
