import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetGameCardInfoQuery,
  useGetScreenshotsQuery,
  useGetSystemRequirementsQuery,
} from "../../../store/api/gameCardApi";
import "./GameCardPage.css";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGame, setScreenshots } from "../../../store/gameCardSlice";
import { addToFavorites, deleteFavorite } from "../../../store/favoritesSlice";
import { addToCart } from "../../../store/cartSlice";
import TopGames from "../Main/TopGames/TopGames";
import vectors from "../../../data/vectors";
import { setErr } from "../../../store/errorSlice";

function GameCardPage() {
  const { id } = useParams();
  const { data } = useGetGameCardInfoQuery(id);
  const screenshotsData = useGetScreenshotsQuery(id);
  const dispatch = useDispatch();
  const game = useSelector((state) => state.gameCard.game);
  const price = useSelector((state) => state.gameCard.price);
  const favoritesArr = useSelector((state) => state.favorites.favoriteGamesArr);
  const screenshots = useSelector((state) => state.gameCard.screenshots);
  const activationRef = useRef(null);
  const descriptionRef = useRef(null);
  const favoritesRef = useRef(null);
  const navigation = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (data && screenshotsData) {
      dispatch(setGame({ game: data }));
      dispatch(setScreenshots({ screenshots: screenshotsData.data.results }));
    }
  }, [data, price]);

  useEffect(() => {
    const findedGame = favoritesArr.findIndex((item) => item.id == game.id);
    if (findedGame !== -1) {
      favoritesRef.current.classList.add("game_in_favorites_arr");
    }
  }, [favoritesArr]);

  function clickCardDetailsHandler(e) {
    const activeDetails = document.querySelector(".active_game_card_info_text");
    activeDetails.classList.remove("active_game_card_info_text");
    e.target.classList.add("active_game_card_info_text");

    if (e.target.dataset.ref == "descriptionRef") {
      descriptionRef.current.style.display = "block";
      activationRef.current.style.display = "none";
    } else {
      descriptionRef.current.style.display = "none";
      activationRef.current.style.display = "block";
    }
  }

  function clickAddToCartButton() {
    const gameObj = { ...game, price: price };
    dispatch(addToCart({ game: gameObj }));
    dispatch(setErr({ errText: "Игра добавлена в корзину" }));
  }
  function clickArrToFavotitesHandler() {
    const findedGame = favoritesArr.findIndex((item) => item.id == game.id);
    if (findedGame !== -1) {
      dispatch(deleteFavorite({ game: game }));
      favoritesRef.current.classList.remove("game_in_favorites_arr");
      dispatch(setErr({ errText: "Игра удалена из избранного" }));
    } else {
      const gameObj = { ...game, price: price };
      dispatch(addToFavorites({ game: gameObj }));
      dispatch(setErr({ errText: "Игра добавлена в избранные" }));
    }
  }

  return (
    <>
      <Header />
      <div className="game_card_container">
        {game && (
          <div className="game_card">
            <div className="game_card_layer">
              <div className="game_card_row">
                <div className="game_card_row_column">
                  <img
                    className="game_card_img main_img"
                    src={game.background_image}
                    alt=""
                  />
                </div>
                <div className="game_card_row_column">
                  <p className="game_name">{game.name}</p>
                  <p className="game_price">
                    {price ? `${price} ₽` : "Бесплатно"}{" "}
                  </p>
                  <div className="game_buttons">
                    <button
                      onClick={clickAddToCartButton}
                      className="game_button"
                    >
                      В корзину
                    </button>
                    <div
                      onClick={clickArrToFavotitesHandler}
                      ref={favoritesRef}
                      className="svg_container"
                    >
                      {vectors.like}
                    </div>
                  </div>
                  <div className="game_details">
                    <div className="details_block">
                      <p className="details_name">Жанр</p>
                      <p className="details_value">{game.genres[0].name}</p>
                    </div>
                    <div className="details_block">
                      <p className="details_name">Платформа</p>
                      <p className="details_value">Steam</p>
                    </div>
                    <div className="details_block">
                      <p className="details_name">Регион активации</p>
                      <p className="details_value">Страны СНГ</p>
                    </div>
                    <div className="details_block">
                      <p className="details_name">Тип товара</p>
                      <p className="details_value">Ключ</p>
                    </div>
                  </div>
                  <div className="game_garant">
                    <p>Моментальная доставка</p>
                  </div>
                </div>
              </div>
              <div className="game_card_row">
                <div className="screenshots">
                  {screenshots &&
                    screenshots.map((item) => {
                      return (
                        <img
                          key={item.id}
                          src={item.image}
                          className="game_card_img game_screenshot"
                          alt=""
                        />
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="game_card_layer">
              <div className="game_card_row">
                <ul className="game_card_info">
                  <li onClick={(e) => clickCardDetailsHandler(e)}>
                    <span
                      data-ref="descriptionRef"
                      className="active_game_card_info_text game_card_info_text"
                    >
                      Описание товара
                    </span>
                  </li>
                  <li onClick={(e) => clickCardDetailsHandler(e)}>
                    <span
                      data-ref="activationRef"
                      className="game_card_info_text"
                    >
                      Активация
                    </span>
                  </li>
                </ul>
              </div>
              <div className="game_card_row">
                <div
                  ref={descriptionRef}
                  className="game_card_row_block game_card_description active_block"
                >
                  <p className="game_card_description_name">{game.name}</p>
                  {game.description_raw}
                </div>
                <div
                  ref={activationRef}
                  className="game_card_row_block game_card_activation nonactive_block"
                >
                  <p className="game_card_activation_title">Активации игры</p>
                  <p className="game_card_activation_text">
                    Первым шагом в активации ключа Steam является вход в свой
                    аккаунт Steam. Если у вас еще нет аккаунта, то вам нужно
                    зарегистрироваться на сайте Steam. Затем вам нужно нажать на
                    кнопку "Добавить игру", которая находится внизу левой части
                    окна Steam, а затем выбрать "Активировать продукт на Steam".
                  </p>
                  <p className="game_card_activation_text">
                    Далее появится окно, в котором вам нужно ввести ключ,
                    который вы получили после приобретения игры. Ключ может
                    содержать буквы, цифры и дефисы. После ввода ключа нажмите
                    кнопку "Далее", чтобы продолжить.
                  </p>
                  <p className="game_card_activation_text">
                    После активации ключа Steam игра автоматически добавится в
                    вашу библиотеку игр Steam. Чтобы начать играть, просто
                    выберите игру из списка на панели слева и нажмите кнопку
                    "Играть". Важно отметить, что некоторые игры могут требовать
                    установки дополнительного ПО или обновления перед началом
                    игры.
                  </p>
                  <p className="game_card_activation_text">
                    Наконец, важно учитывать, что каждый ключ Steam может быть
                    активирован только один раз. После активации ключа, он
                    становится недействительным и не может быть использован
                    повторно. Если вы заметили какие-либо проблемы при активации
                    ключа, свяжитесь с технической поддержкой Steam для
                    получения помощи.
                  </p>
                </div>
              </div>
              <div className="game_card_row">
                <TopGames />
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default GameCardPage;
