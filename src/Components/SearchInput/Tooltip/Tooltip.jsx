import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setGame, setPrice } from "../../../store/gameCardSlice";
import "./Tooltip.css";

function Tooltip({ game, setSearchText }) {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  function clickTooltipGameHandler() {
    dispatch(setGame({ game: game }));
    dispatch(setPrice({ price: game.price }));
    navigation(`/games/${game.id}`);
    setSearchText("");
  }

  return (
    <div onClick={clickTooltipGameHandler} className="tooltip">
      <div className="tooltip_row">
        <div className="tooltip_column">
          <div className="tooltip_column_block">
            <img src={game.background_image} alt="" />
          </div>
          <div className="tooltip_column_block">
            <p className="tooltip_name">{game.name}</p>
            <p className="tooltip_price">{game.price} ₽ </p>
            <div className="tooltip_details">
              <p className="tooltip_detail_item">
                <span className="tooltip_circle"></span>
                Ключ
              </p>
              <p className="tooltip_detail_item">
                <span className="tooltip_circle"></span>
                Steam
              </p>
            </div>
          </div>
        </div>
        <div className="tooltip_column"></div>
      </div>
    </div>
  );
}

export default Tooltip;
