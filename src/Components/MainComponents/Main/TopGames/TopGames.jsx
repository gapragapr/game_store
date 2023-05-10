import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import vectors from "../../../../data/vectors";
import { useGetTopGamesQuery } from "../../../../store/api/topGamesApi";
import { addToTopGames } from "../../../../store/topGamesSlice";
import TopGame from "./TopGame/TopGame";
import "./TopGames.css";

function TopGames() {
  const { data } = useGetTopGamesQuery();
  const dispatch = useDispatch();
  const topGamesArr = useSelector((state) => state.topGames.topGamesArr);

  useEffect(() => {
    if (data) {
      data.results.map((game) => {
        dispatch(addToTopGames(game));
      });
    }
  }, [data]);

  return (
    <div className="top_games_container">
      <h2 className="top_game_section_name">Топ 4 {vectors.topGame}</h2>
      <div className="top_games_content">
        {topGamesArr.length > 0 &&
          topGamesArr.map((game) => {
            return <TopGame key={game.id} game={game} />;
          })}
      </div>
    </div>
  );
}

export default TopGames;
