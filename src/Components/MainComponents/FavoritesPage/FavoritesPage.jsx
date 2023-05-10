import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import FavoriteGame from "./FavoriteGame/FavoriteGame";
import { useSelector } from "react-redux";
import "./FavoritesPage.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FavoritesPage() {
  const favoritesArr = useSelector((state) => state.favorites.favoriteGamesArr);
  const navigation = useNavigate();

  useEffect(() => {
    if (favoritesArr.length == 0) {
      navigation("/");
    }
  });

  return (
    <div>
      <Header />
      <div className="favorites_container">
        <div className="favorites_content">
          <h2 className="favorites_section_name">
            Избранные игры{" "}
            <span className="favorites_game_count">{favoritesArr.length}</span>
          </h2>
          {favoritesArr.length > 0 &&
            favoritesArr.map((game) => {
              return <FavoriteGame key={game.id} game={game} />;
            })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FavoritesPage;
