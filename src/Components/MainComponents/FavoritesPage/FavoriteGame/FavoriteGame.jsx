import React from "react";
import vectors from "../../../../data/vectors";
import { useDispatch } from "react-redux";
import { deleteFavorite } from "../../../../store/favoritesSlice";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./FavoriteGame.css";

function FavoriteGame({ game }) {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  function clickDeleteFromFavoriteButtonHandler(e) {
    e.stopPropagation();
    dispatch(deleteFavorite({ game: game }));
  }

  function clickFavoriteCardHandler(e) {
    e.stopPropagation();
    navigation(`/games/${game.id}`);
  }

  return (
    <div onClick={(e) => clickFavoriteCardHandler(e)} className="favorite_game">
      <div className="favorite_game_column">
        <div className="favorite_game_column_block">
          <img src={game.background_image} alt="" />
        </div>
        <div className="favorite_game_column_block">
          <div className="favorite_game_column_block_layer">
            <p className="favorite_game_name">{game.name}</p>
            <p className="favorite_game_price">
              {game.price ? `${game.price} ₽` : "Бесплатно"}{" "}
              {game.old_price && (
                <span className="faorite_game_old_price">
                  {`${game.old_price} ₽`}{" "}
                </span>
              )}{" "}
            </p>
          </div>
          <div className="favorite_game_column_block_layer">
            <p className="favorite_game_activation_info">
              {" "}
              <span className="grey_text">Регион активации </span>Россия и
              страны СНГ{" "}
            </p>
            <p className="favorite_game_activation_info">
              {" "}
              <span className="grey_text">Сервис активации </span> Steam{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="favorite_game_column">
        <div className="favorite_game_column_block_layer">
          <div
            onClick={(e) => clickDeleteFromFavoriteButtonHandler(e)}
            className="svg_container game_in_favorites_arr"
          >
            {vectors.like}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FavoriteGame;
