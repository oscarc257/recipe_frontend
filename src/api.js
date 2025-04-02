const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";


export const searchRecipes = async (searchTerm, page) => {
  const baseUrl = new URL(`${BASE_URL}/api/recipes/search`);
  baseUrl.searchParams.append("searchTerm", searchTerm);
  baseUrl.searchParams.append("page", String(page));

  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export const getRecipeSummary = async (recipeId) => {
  const url = new URL(`${BASE_URL}/api/recipes/${recipeId}/summary`);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export const getFavouriteRecipes = async () => {
  const url = new URL(`${BASE_URL}/api/recipes/favourite`);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export const addFavouriteRecipe = async (recipe) => {
  const url = new URL(`${BASE_URL}/api/recipes/favourite`);
  const body = {
    recipeId: recipe.id,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};

export const removeFavouriteRecipe = async (recipe) => {
  const url = new URL(`${BASE_URL}/api/recipes/favourite`);
  const body = {
    recipeId: recipe.id,
  };

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};
