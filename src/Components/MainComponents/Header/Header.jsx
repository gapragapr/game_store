import React from "react";
import logo from "../../../img/logo.png";
import SearchInput from "../../SearchInput/SearchInput";
import vectors from "../../../data/vectors";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setErr } from "../../../store/errorSlice";
import "./Header.css";

export default function Header() {
  const cart = useSelector((state) => state.cart.cart);
  const cartCount = useSelector((state) => state.cart.cartCount);
  const favorites = useSelector((state) => state.favorites.favoriteGamesArr);
  const navigation = useNavigate();
  const favoriteRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (favorites.length > 0) {
      favoriteRef.current.classList.add("active_favorites");
    } else {
      favoriteRef.current.classList.remove("active_favorites");
    }
  }, [favorites]);

  function openCurrencyModalClickHandler() {
    const modalPopup = document.querySelector(".currency_language_modal");
    const svgArrow = document.querySelector(
      ".currency_language_type .svg_container svg"
    );

    return modalPopup.style.display == "none" || modalPopup.style.display == ""
      ? ((modalPopup.style.display = "flex"),
        (svgArrow.style.transform = "rotate(0deg)"))
      : ((modalPopup.style.display = "none"),
        (svgArrow.style.transform = "rotate(180deg)"));
  }

  function clickLogohandler() {
    navigation("/");
  }

  function clickFavoritesLinkHandler() {
    if (favorites.length > 0) {
      navigation("/favorites");
    } else {
      dispatch(setErr({ errText: "Нет избранных игр" }));
    }
  }

  function clickCartLinkHandler() {
    if (cart.length > 0) {
      navigation("/cart");
    } else {
      dispatch(setErr({ errText: "Корзина пуста" }));
    }
  }

  return (
    <div className="header_container">
      <header>
        <div className="header_row">
          <div className="header_row_block">
            <div className="currency_language_type">
              <p
                onClick={openCurrencyModalClickHandler}
                className="current_type"
              >
                RU <span className="grey_slash">/</span> ₽
                <span className="svg_container">{vectors.select_arrow}</span>
              </p>
              <div className="currency_language_modal">
                <div className="language_block">
                  <p className="language_item active_currency_and_language">
                    Русский (RU)
                  </p>
                  <p className="language_item">English (EN)</p>
                </div>
                <div className="currency_block">
                  <p className="currency_item">$</p>
                  <p className="currency_item">€</p>
                  <p className="currency_item active_currency_and_language">
                    ₽
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="header_row_block">
            <ul className="navigation">
              <li className="navigation_item">
                <a href="" className="navigation_link">
                  Отзывы
                </a>
              </li>
              <li className="navigation_item">
                <a href="" className="navigation_link">
                  Гарантии
                </a>
              </li>
              <li className="navigation_item">
                <a href="" className="navigation_link">
                  Как купить
                </a>
              </li>
              <li className="navigation_item">
                <a href="" className="navigation_link">
                  Накопительная
                </a>
              </li>
              <li className="navigation_item">
                <a href="" className="navigation_link">
                  Заработай
                </a>
              </li>
            </ul>
          </div>
          <div className="header_row_block">
            <div className="user_info">
              <p className="user_name">Admin</p>
              <img src="https://picsum.photos/60" alt="" />
            </div>
          </div>
        </div>
        <div className="header_row">
          <div className="header_row_block">
            <div onClick={clickLogohandler} className="logo_container">
              <img src={logo} alt="" />
              <p className="logo_name">ogre`s eye</p>
            </div>
          </div>
          <div className="header_row_block">
            <SearchInput />
          </div>
          <div className="header_row_block">
            <div
              onClick={clickFavoritesLinkHandler}
              ref={favoriteRef}
              className="svg_container"
            >
              {vectors.like}
              {favorites.length > 0 && (
                <span className="favorites_count">{favorites.length}</span>
              )}
            </div>
            <div onClick={clickCartLinkHandler} className="svg_container">
              {vectors.cart}
              {cart.length > 0 && (
                <span className="cart_count">{cartCount > 0 && cartCount}</span>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
