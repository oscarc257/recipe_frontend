import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const RecipeCard = React.memo(({ recipe, onClick, onFavouriteButtonClick, isFavourite }) => {
  const handleFavouriteClick = (event) => {
    event.stopPropagation(); // Prevent triggering the parent onClick
    onFavouriteButtonClick(recipe);
  };

  return (
    <div className="recipe-card" onClick={onClick}>
      <img
        src={recipe.image || "placeholder-image.jpg"} // Fallback image
        alt={recipe.title || "Recipe image"} // Fallback alt text
        className="recipe-card-image"
      />
      <div className="recipe-card-title">
        <span
          onClick={handleFavouriteClick}
          className="favourite-icon"
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
          role="button"
        >
          {isFavourite ? (
            <AiFillHeart size={25} color="red" />
          ) : (
            <AiOutlineHeart size={25} />
          )}
        </span>
        <h3 className="recipe-card-name">{recipe.title || "Untitled Recipe"}</h3>
      </div>
    </div>
  );
});

export default RecipeCard;
