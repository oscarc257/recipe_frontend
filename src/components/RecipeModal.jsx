import { useEffect, useState } from "react";
import * as RecipeAPI from "../api";

const RecipeModal = ({ recipeId, onClose }) => {
  const [recipeSummary, setRecipeSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeSummary = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const summaryRecipe = await RecipeAPI.getRecipeSummary(recipeId);
        setRecipeSummary(summaryRecipe);
      } catch (error) {
        console.error("Error fetching recipe summary:", error);
        setError("Failed to load recipe summary. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipeSummary();
  }, [recipeId]);

  if (isLoading) {
    return (
      <>
        <div className="overlay"></div>
        <div className="modal">
          <div className="modal-content">
            <p>Loading...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="overlay"></div>
        <div className="modal">
          <div className="modal-content">
            <p>{error}</p>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </>
    );
  }

  if (!recipeSummary) {
    return null;
  }

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal" role="dialog" aria-labelledby="modal-title">
        <div className="modal-content">
          <div className="modal-header">
            <h2 id="modal-title">{recipeSummary.title}</h2>
            <button
              className="close-btn"
              onClick={onClose}
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
          <p dangerouslySetInnerHTML={{ __html: recipeSummary.summary }}></p>
        </div>
      </div>
    </>
  );
};

export default RecipeModal;
