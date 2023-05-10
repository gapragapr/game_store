import React from "react";
import vectors from "../../../../../data/vectors";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../../store/cartSlice";
import {
  addToFavorites,
  deleteFavorite,
} from "../../../../../store/favoritesSlice";
import { setErr } from "../../../../../store/errorSlice";
import { useNavigate } from "react-router-dom";
import "./TopGame.css";
import { setPrice } from "../../../../../store/gameCardSlice";

function TopGame({ game }) {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const favoritesArr = useSelector((state) => state.favorites.favoriteGamesArr);
  const styles = {
    backgroundImage: `url(${game.background_image})`,
  };
  const favoritesRef = useRef(null);

  useEffect(() => {
    const findedGame = favoritesArr.findIndex((item) => item.id == game.id);
    if (findedGame !== -1) {
      favoritesRef.current.classList.add("game_in_favorites_arr");
    }
  }, [favoritesArr]);

  function clickAddToFavoriteButtonHandler(e) {
    e.stopPropagation();
    if (!favoritesRef.current.classList.contains("game_in_favorites_arr")) {
      dispatch(addToFavorites({ game: game }));
      dispatch(setErr({ errText: "Игра добавлена в избранное" }));
    } else {
      dispatch(deleteFavorite({ game: game }));
      dispatch(setErr({ errText: "Игра удалена из избранного" }));
      favoritesRef.current.classList.remove("game_in_favorites_arr");
    }
  }

  function clickAddToCardButtonHandler(e) {
    e.stopPropagation();
    dispatch(addToCart({ game: game }));
    dispatch(setErr({ errText: "Игра добавлена в корзину" }));
  }

  function clickGameCardHandler() {
    dispatch(setPrice({ price: game.price }));
    navigation(`/games/${game.id}`);
  }

  return (
    <div onClick={clickGameCardHandler} className="top_game">
      <div style={styles} className="top_game_layer first_layer">
        <div className="layer_row">
          <p className="top_game_notification">Top {vectors.topGame} 4</p>
          <div
            onClick={(e) => clickAddToFavoriteButtonHandler(e)}
            ref={favoritesRef}
            className="svg_container"
          >
            {vectors.like}
          </div>
        </div>
        <div className="layer_row">
          <button
            onClick={(e) => clickAddToCardButtonHandler(e)}
            className="top_game_button"
          >
            В корзину
          </button>
        </div>
      </div>
      <div className="top_game_layer last_layer">
        <p className="top_game_price">{game.price} ₽ </p>
        <p className="top_game_name">{game.name}</p>
      </div>
    </div>
  );
}

export default TopGame;
