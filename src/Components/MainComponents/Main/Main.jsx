import React from "react";
import Recomended from "./Recomended/Recomended";
import TopGames from "./TopGames/TopGames";
import GameList from "./GameList/GameList";
import "./Main.css";

function Main() {
  return (
    <div className="main_container">
      <Recomended />
      <div className="main_content">
        <TopGames />
        <GameList />
      </div>
    </div>
  );
}

export default Main;
