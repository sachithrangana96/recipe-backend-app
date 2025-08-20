import FavoriteRecipe from "../models/FavoriteRecipe.js";

// Add recipe to favorites
export const addFavorite = async (req, res) => {
  const { recipeId, recipeName, recipeThumb, category } = req.body;

  if (!recipeId || !recipeName)
    return res.status(400).json({ message: "recipeId and recipeName are required" });

  try {
    // Check if already favorite
    const existing = await FavoriteRecipe.findOne({
      user: req.user._id,
      recipeId,
    });

    if (existing)
      return res.status(400).json({ message: "Recipe already in favorites" });

    const favorite = await FavoriteRecipe.create({
      user: req.user._id,
      recipeId,
      recipeName,
      recipeThumb,
      category,
    });

    res.status(201).json(favorite);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all favorites for user
export const getFavorites = async (req, res) => {
  try {
    const favorites = await FavoriteRecipe.find({ user: req.user._id });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove favorite
export const removeFavorite = async (req, res) => {
  const { recipeId } = req.params;
  try {
    const removed = await FavoriteRecipe.findOneAndDelete({
      user: req.user._id,
      recipeId,
    });
    if (!removed) return res.status(404).json({ message: "Recipe not found" });
    res.json({ message: "Recipe removed from favorites" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
