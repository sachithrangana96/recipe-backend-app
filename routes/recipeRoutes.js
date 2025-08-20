import express from "express";
import axios from "axios";

const router = express.Router();

// GET recipe categories
router.get("/categories", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.RECEIPE_URL}/1/list.php?c=list`
    );
    // Send the categories back to the client
    console.log(response?.data?.meals);
    res.json(response.data?.meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});


router.get("/by-category", async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) return res.status(400).json({ message: "Category is required" });

    const response = await axios.get(
      `${process.env.RECEIPE_URL}/1/filter.php?c=${encodeURIComponent(category)}`
    );

    res.json(response.data.meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch recipes" });
  }
});

export default router;
