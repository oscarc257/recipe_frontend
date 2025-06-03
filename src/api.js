// This file is for frontend API calls to your own backend, NOT directly to Spoonacular or using Node.js modules!

// Set your backend API base URL (use environment variable in production, fallback to localhost for dev)
const BASE_URL = process.env.VITE_API_BASE_URL || "http://localhost:5000";

/**
 * Search for recipes using your backend API.
 * @param {string} searchTerm - The search query.
 * @param {number} page - The page number for pagination.
 * @returns {Promise<Object>} - The search results from your backend.
 */
export const searchRecipes = async (searchTerm, page) => {
  const url = `${BASE_URL}/api/recipes/search?searchTerm=${encodeURIComponent(
    searchTerm
  )}&page=${page}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch recipes: ${response.statusText}`);
  }
  return await response.json();
};

/**
 * Get a summary for a specific recipe by ID from your backend.
 * @param {number|string} recipeId - The ID of the recipe.
 * @returns {Promise<Object>} - The recipe summary from your backend.
 */
export const getRecipeSummary = async (recipeId) => {
  const url = `${BASE_URL}/api/recipes/${recipeId}/summary`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch recipe summary: ${response.statusText}`);
  }
  return await response.json();
};

/**
 * Get all favourite recipes from your backend.
 * @returns {Promise<Object>} - The list of favourite recipes.
 */
export const getFavouriteRecipes = async () => {
  const url = `${BASE_URL}/api/recipes/favourite`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch favourite recipes: ${response.statusText}`
    );
  }
  return await response.json();
};

/**
 * Add a recipe to favourites in your backend.
 * @param {Object} recipe - The recipe object to add.
 */
export const addFavouriteRecipe = async (recipe) => {
  const url = `${BASE_URL}/api/recipes/favourite`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ recipeId: recipe.id }),
  });
  if (!response.ok) {
    throw new Error(`Failed to add favourite recipe: ${response.statusText}`);
  }
};

/**
 * Remove a recipe from favourites in your backend.
 * @param {Object} recipe - The recipe object to remove.
 */
export const removeFavouriteRecipe = async (recipe) => {
  const url = `${BASE_URL}/api/recipes/favourite`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ recipeId: recipe.id }),
  });
  if (!response.ok) {
    throw new Error(
      `Failed to remove favourite recipe: ${response.statusText}`
    );
  }
};
