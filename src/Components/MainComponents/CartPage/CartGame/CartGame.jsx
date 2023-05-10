import React from "react";
import vectors from "../../../../data/vectors";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteCart } from "../../../../store/cartSlice";
import {
  addToFavorites,
  deleteFavorite,
} from "../../../../store/favoritesSlice";
import "./CartGame.css";
import { useNavigate } from "react-router-dom";

function CartGame({ game }) {
  const dispatch = useDispatch();
  const favoritesArr = useSelector((state) => state.favorites.favoriteGamesArr);
  const navigation = useNavigate();
  const svgRef = useRef(null);

  useEffect(() => {
    favoritesArr.map((item) => {
      if (item.id == game.id) {
        svgRef.current.classList.add("game_in_favorites_arr");
      }
    });
  }, [favoritesArr]);

  function clickDeleteFromFavoriteButtonHandler() {
    if (svgRef.current.classList.contains("game_in_favorites_arr")) {
      svgRef.current.classList.remove("game_in_favorites_arr");
      dispatch(deleteFavorite({ game: game }));
    } else {
      dispatch(addToFavorites({ game: game }));
    }
  }

  function clickGameCardHandler(e) {
    navigation(`/games/${game.id}`);
  }

  function clickDeepDeleteGameFromCartHandler(e) {
    e.stopPropagation();
    dispatch(deleteCart({ game: game, type: "deep_delete" }));
  }
  function clickPlusGameHandler(e) {
    e.stopPropagation();
    dispatch(addToCart({ game: game }));
  }

  function clickMinusGameHandler(e) {
    e.stopPropagation();
    dispatch(deleteCart({ game: game, type: "splice_one_game" }));
  }

  return (
    <div onClick={(e) => clickGameCardHandler(e)} className="cart_game">
      <div className="cart_game_column">
        <div className="cart_game_column_block">
          <img src={game.background_image} alt="" />
        </div>
        <div className="cart_game_column_block">
          <div className="cart_game_column_block_layer">
            <p className="cart_game_name">{game.name}</p>
            <p className="cart_game_price">
              {game.price} ₽{" "}
              {game.old_price && (
                <span className="cart_game_old_price">{game.old_price} ₽ </span>
              )}{" "}
            </p>
          </div>
          <div className="cart_game_column_block_layer">
            <p className="cart_game_activation_info">
              {" "}
              <span className="grey_text">Регион активации </span>Россия и
              страны СНГ{" "}
            </p>
            <p className="cart_game_activation_info">
              {" "}
              <span className="grey_text">Сервис активации </span> Steam{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="cart_game_column">
        <div className="cart_game_column_block_layer">
          <div className="delete_game">
            <button
              onClick={(e) => clickDeepDeleteGameFromCartHandler(e)}
              className="delete_game_button"
            >
              {vectors.close}
            </button>
          </div>
        </div>
        <div className="cart_game_column_block_layer">
          <div className="game_in_cart_count">
            <p
              onClick={(e) => clickMinusGameHandler(e)}
              className="count_symbol"
            >
              -
            </p>
            <p className="cart_count_number">{game.count}</p>
            <p
              onClick={(e) => clickPlusGameHandler(e)}
              className="count_symbol"
            >
              +
            </p>
          </div>
        </div>
        <div className="cart_game_column_block_layer">
          <div
            ref={svgRef}
            onClick={(e) => clickDeleteFromFavoriteButtonHandler(e)}
            className="svg_container"
          >
            {vectors.like}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartGame;
