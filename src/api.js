// Load environment variables from .env file
const dotenv = require("dotenv");

dotenv.config();

// Get the Spoonacular API key from environment variables
const apiKey = process.env.API_KEY;

// Throw an error if the API key is not set
if (!apiKey) {
  throw new Error("API Key not found. Please set API_KEY in your .env file.");
}

/**
 * Search for recipes using the Spoonacular API.
 * @param {string} searchTerm - The search query.
 * @param {number} page - The page number for pagination.
 * @param {number} resultsPerPage - Number of results per page (default: 10).
 * @returns {Promise<Object>} - The search results from the API.
 */
const searchRecipes = async (searchTerm, page, resultsPerPage = 10) => {
  // Construct the API URL for searching recipes
  const url = new URL("https://api.spoonacular.com/recipes/complexSearch");

  // Set query parameters for the API request
  const queryParams = {
    apiKey: process.env.API_KEY,
    query: searchTerm,
    number: resultsPerPage.toString(),
    offset: (page * resultsPerPage).toString(),
  };
  url.search = new URLSearchParams(queryParams).toString();

  try {
    // Make the API request using fetch
    const response = await fetch(url); // Use global fetch
    if (!response.ok) {
      throw new Error(`Failed to fetch recipes: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

/**
 * Get a summary for a specific recipe by ID.
 * @param {number|string} recipeId - The ID of the recipe.
 * @returns {Promise<Object>} - The recipe summary from the API.
 */
const getRecipeSummary = async (recipeId) => {
  // Construct the API URL for getting recipe summary
  const url = new URL(
    `https://api.spoonacular.com/recipes/${recipeId}/summary`
  );
  const params = { apiKey };
  url.search = new URLSearchParams(params).toString();

  try {
    // Make the API request using fetch
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch recipe summary: ${response.statusText}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error fetching recipe summary:", error);
    throw error;
  }
};

/**
 * Get information for multiple favourite recipes by their IDs.
 * @param {Array<number|string>} ids - Array of recipe IDs.
 * @returns {Promise<Object>} - The recipes information from the API.
 */
const getFavouriteRecipesByIDs = async (ids) => {
  // Return empty results if no IDs are provided
  if (ids.length === 0) {
    return { results: [] };
  }

  // Construct the API URL for getting information about multiple recipes
  const url = new URL("https://api.spoonacular.com/recipes/informationBulk");
  const params = {
    apiKey,
    ids: ids.join(","),
  };
  url.search = new URLSearchParams(params).toString();

  try {
    // Make the API request using fetch
    const searchResponse = await fetch(url);
    if (!searchResponse.ok) {
      throw new Error(
        `Failed to fetch favourite recipes: ${searchResponse.statusText}`
      );
    }
    const json = await searchResponse.json();
    return { results: json };
  } catch (error) {
    console.error("Error fetching favourite recipes:", error);
    throw error;
  }
};

// Export the API functions for use in other modules
module.exports = {
  searchRecipes,
  getRecipeSummary,
  getFavouriteRecipesByIDs,
};
