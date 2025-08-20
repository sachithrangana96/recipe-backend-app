import mongoose from "mongoose";

const favoriteRecipeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    recipeId: { type: String, required: true },
    recipeName: { type: String, required: true },
    recipeThumb: { type: String },
    category: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("FavoriteRecipe", favoriteRecipeSchema);
