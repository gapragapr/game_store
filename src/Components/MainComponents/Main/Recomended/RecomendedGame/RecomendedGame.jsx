import React from "react";
import { useGetDescriptionQuery } from "../../../../../store/api/recomendedApi";
import { useDispatch } from "react-redux";
import { addToFavorites } from "../../../../../store/favoritesSlice";
import { addToCart } from "../../../../../store/cartSlice";
import { setErr } from "../../../../../store/errorSlice";
import "./RecomendedGame.css";
import { useNavigate } from "react-router-dom";
import { setPrice } from "../../../../../store/gameCardSlice";

function RecomendedGame({ id, game }) {
  const { data } = useGetDescriptionQuery(id);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const styles = {
    backgroundImage: `url(${game.background_image})`,
  };

  function clickAddToFavoriteButtonHandler(e) {
    e.stopPropagation();
    dispatch(addToFavorites({ game: game }));
    dispatch(setErr({ errText: "Игра добавлена в избранное" }));
  }
  function clickAddToCartButtonHandler(e) {
    e.stopPropagation();
    dispatch(addToCart({ game: game }));
    dispatch(setErr({ errText: "Игра добавлена в корзину" }));
  }

  function clickGameCardHandler() {
    dispatch(setPrice({ price: game.price }));
    navigation(`games/${game.id}`);
  }

  return (
    <>
      {data && (
        <div
          onClick={clickGameCardHandler}
          id={id}
          style={styles}
          className="recomended_game"
        >
          <p className="recomended_game_name">{game.name}</p>
          <p className="recomended_game_description">{data.description_raw}</p>
          <p className="recomended_game_price">
            {game.price} ₽{" "}
            <span className="old_price">{game.old_price} ₽ </span>{" "}
          </p>
          <div className="recomended_game_buttons">
            <button
              onClick={(e) => clickAddToCartButtonHandler(e)}
              className="recomended_game_button"
              id="to_cart"
            >
              В корзину
            </button>
            <button
              onClick={(e) => clickAddToFavoriteButtonHandler(e)}
              className="recomended_game_button"
              id="to_favorite"
            >
              В избранное
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default RecomendedGame;
