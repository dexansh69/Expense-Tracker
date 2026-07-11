import { prisma } from "./lib/prisma";

async function main() {
  // Create a new user
  const user = await prisma.user.create({
    data: {
      email: "devansh@example.com",
      username: "dexansh69",
      password: "hashedPassword123",

      expenses: {
        create: [
          {
            title: "Pizza",
            category: "Food",
            amount: 499.99,
            description: "Dominos with friends",
            date: new Date(),
          },
          {
            title: "Netflix",
            category: "Entertainment",
            amount: 199.0,
            description: "Monthly Subscription",
            date: new Date(),
          },
        ],
      },
    },
    include: {
      expenses: true,
    },
  });

  console.log("Created User:");
  console.dir(user, { depth: null });

  // Fetch all users with their expenses
  const allUsers = await prisma.user.findMany({
    include: {
      expenses: true,
    },
  });

  console.log("\nAll Users:");
  console.dir(allUsers, { depth: null });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });