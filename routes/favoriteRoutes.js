import express from "express";
import { addFavorite, getFavorites, removeFavorite } from "../controllers/favoriteController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Protected routes
router.post("/", authMiddleware, addFavorite); // add to favorites
router.get("/", authMiddleware, getFavorites); // get all favorites
router.delete("/:recipeId", authMiddleware, removeFavorite); // remove favorite

export default router;
