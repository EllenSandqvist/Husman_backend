import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await prisma.recipe.findMany();
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: req.params.id },
    });
    res.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const recipe = await prisma.recipe.create({
      data: req.body,
    });
    res.json(recipe);
  } catch (error: any) {
    console.error("Error creating recipe:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});
export default router;
