import React from "react";
import "./GameList.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetGameListQuery } from "../../../../store/api/gameListApi";
import {
  addToGamesList,
  setOptions,
  clearGamesList,
} from "../../../../store/gameListSlice";
import GameListItem from "./GameListItem/GameListItem";

function GameList() {
  const options = useSelector((state) => state.gamesList.options);
  const gameListArr = useSelector((state) => state.gamesList.gamesListArr);
  const dispatch = useDispatch();
  const { data } = useGetGameListQuery(options, 12);

  useEffect(() => {
    if (data) {
      dispatch(clearGamesList());
      data.results.map((game) => {
        dispatch(addToGamesList(game));
      });
    }
  }, [data, options]);

  function clickSortItemHandler(e) {
    document
      .querySelector(".active_games_sort_link")
      .classList.remove("active_games_sort_link");
    e.target.classList.add("active_games_sort_link");
    dispatch(setOptions({ options: e.target.dataset.option }));
  }

  return (
    <div className="game_list">
      <div className="game_list_row">
        <ul className="games_sort_settings">
          <li className="games_sort_item">
            <span
              onClick={(e) => clickSortItemHandler(e)}
              data-option={"ordering=-sales"}
              className="games_sort_link active_games_sort_link"
            >
              Самые продаваемые
            </span>
          </li>
          <li className="games_sort_item">
            <span
              onClick={(e) => clickSortItemHandler(e)}
              data-option={"ordering=-released&dates=2023-02-01,2023-05-01"}
              className="games_sort_link"
            >
              Новинки
            </span>
          </li>
          <li className="games_sort_item">
            <span
              onClick={(e) => clickSortItemHandler(e)}
              data-option={"metacritic=95,100&ordering=-rating"}
              className="games_sort_link"
            >
              Выбор игроков
            </span>
          </li>
          <li className="games_sort_item">
            <span
              onClick={(e) => clickSortItemHandler(e)}
              data-option={"ordering=-rating"}
              className="games_sort_link"
            >
              Акции
            </span>
          </li>
        </ul>
      </div>
      <div className="game_list_row">
        {gameListArr.map((game) => {
          return <GameListItem key={game.id} game={game} />;
        })}
      </div>
      <div className="game_list_row">
        <button className="game_list_button">Перейти в каталог</button>
      </div>
    </div>
  );
}

export default GameList;
