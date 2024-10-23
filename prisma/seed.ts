import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const recipeData = [
  {
    title: "Spaghetti Carbonara",
    ingredients: "Spaghetti, eggs, pancetta, Parmesan cheese, black pepper",
    instructions:
      "Cook pasta. Fry pancetta. Mix eggs and cheese. Combine all ingredients.",
    cookingTime: 30,
    servings: 4,
  },
  {
    title: "Chicken Stir-Fry",
    ingredients: "Chicken breast, mixed vegetables, soy sauce, garlic, ginger",
    instructions:
      "Cut chicken. Stir-fry vegetables. Add chicken and sauce. Cook until done.",
    cookingTime: 25,
    servings: 3,
  },
  {
    title: "Vegetable Soup",
    ingredients: "Carrots, celery, onions, potatoes, vegetable broth, herbs",
    instructions:
      "Chop vegetables. Simmer in broth. Add herbs. Cook until vegetables are tender.",
    cookingTime: 45,
    servings: 6,
  },
];
async function main() {
  console.log("Start seeding...");
  for (const recipe of recipeData) {
    const createdRecipe = await prisma.recipe.create({
      data: recipe,
    });
    console.log(`Created recipe with id: ${createdRecipe.id}`);
  }
  console.log("Seeding finished.");
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
