import React from "react";
import vectors from "../../../../../data/vectors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToFavorites,
  deleteFavorite,
} from "../../../../../store/favoritesSlice";
import { addToCart } from "../../../../../store/cartSlice";

import "./GameListItem.css";
import { setErr } from "../../../../../store/errorSlice";
import { useEffect } from "react";
import { useRef } from "react";
import { setPrice } from "../../../../../store/gameCardSlice";

function GameListItem({ game }) {
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
    navigation(`games/${game.id}`);
  }

  return (
    <div onClick={clickGameCardHandler} className="game_list_item">
      <div style={styles} className="game_list_item_layer first_layer">
        <div className="layer_row">
          <div
            ref={favoritesRef}
            onClick={(e) => clickAddToFavoriteButtonHandler(e)}
            className="svg_container"
          >
            {vectors.like}
          </div>
        </div>
        <div className="layer_row">
          <button
            onClick={(e) => clickAddToCardButtonHandler(e)}
            className="game_list_item_button"
          >
            В корзину
          </button>
        </div>
      </div>
      <div className="game_list_item_layer last_layer">
        <p className="game_list_item_price">{game.price} ₽ </p>
        <p className="game_list_item_name">{game.name}</p>
      </div>
    </div>
  );
}

export default GameListItem;
