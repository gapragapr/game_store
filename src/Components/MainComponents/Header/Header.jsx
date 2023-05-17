import React from "react";
import logo from "../../../img/logo.png";
import SearchInput from "../../SearchInput/SearchInput";
import vectors from "../../../data/vectors";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setErr } from "../../../store/errorSlice";
import "./Header.css";
import HeaderPopup from "./HeaderPopup/HeaderPopup";
import { useState } from "react";
import { setNeedPopup, setPopupText } from "../../../store/popupSlice";

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

  function clickHeaderLinkHandler(e, link) {
    e.preventDefault();
    switch (link) {
      case "recents":
        dispatch(setErr({ errText: "Отзывов нет" }));
        break;
      case "cashback":
        dispatch(setErr({ errText: "Раздел в разработке" }));
        break;
      case "income":
        dispatch(setErr({ errText: "Раздел в разработке" }));
        break;
      case "how_buy":
        dispatch(setNeedPopup({ option: true }));
        dispatch(
          setPopupText({
            popupText: [
              "Перед тем, как приступить к покупке игры в интернет-магазине, определитесь с желаемым заголовком. Можно использовать функцию поиска на сайте магазина или просмотреть разделы с играми, отфильтрованными по жанру, платформе или другим параметрам. Ознакомьтесь с описанием, трейлерами и отзывами, чтобы принять информированное решение.",
              "Перед тем, как приобрести игру, важно убедиться, что она совместима с вашей игровой платформой (компьютером, консолью и т. д.). Внимательно прочитайте системные требования игры, чтобы убедиться, что ваше оборудование соответствует необходимым параметрам.",
              "Когда вы определились с игрой, добавьте ее в корзину, нажав соответствующую кнопку. Затем перейдите в корзину и проверьте выбранный товар. Убедитесь, что в корзине нет ошибок и правильно выбрана платформа. После этого следуйте инструкциям для оформления заказа, введите необходимую информацию (адрес доставки или данные для цифровой загрузки) и выберите способ оплаты.",
              "Выберите предпочитаемый способ оплаты, будь то банковская карта, электронный кошелек или другая доступная опция. Убедитесь, что ваши данные введены правильно, чтобы избежать ошибок. После завершения платежа вы получите подтверждение заказа, которое может быть отправлено на вашу электронную почту или отображено на веб-сайте магазина.",
              "В случае приобретения физической копии игры вам потребуется дождаться доставки. Если же вы приобрели цифровую копию, магазин предоставит вам ссылку для скачивания или вышлет ключ активации на вашу электронную почту. Следуйте инструкциям для скачивания и установки игры, а затем активиру",
            ],
          })
        );
        break;
      case "garants":
        dispatch(setNeedPopup({ option: true }));
        dispatch(
          setPopupText({
            popupText: [
              "Надежные интернет-магазины игр обычно предоставляют гарантии на качество товаров, которые они продают. Это означает, что вы можете быть уверены в том, что приобретенные игры будут лицензионными и не будут иметь проблем совместимости или дефектов. Если у вас возникнут проблемы с игрой, связанные с ее качеством, вы можете обратиться в службу поддержки интернет-магазина для решения проблемы или возврата товара.",
              "Когда делаете покупку игр в интернет-магазине, важно быть уверенным в безопасности своих финансовых данных. Надежные магазины обеспечивают защищенное соединение и используют шифрование для защиты ваших платежных данных. Кроме того, они часто предлагают различные способы оплаты, что позволяет выбрать наиболее удобный и безопасный вариант для вас. Если у вас возникнут сомнения относительно безопасности интернет-магазина, рекомендуется обратиться к отзывам и рейтингам других покупателей.",
              "В случае, если вы не полностью удовлетворены приобретенной игрой, интернет-магазины обычно предлагают гарантию возврата или обмена товара. Правила возврата и обмена могут различаться в зависимости от политики магазина, поэтому рекомендуется внимательно прочитать условия перед покупкой. Если игра не соответствует вашим ожиданиям или имеет технические проблемы, свяжитесь с службой поддержки интернет-магазина для получения информации о процедуре возврата или обмена товара.",
            ],
          })
        );
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
                <a
                  href="#"
                  onClick={(e) => clickHeaderLinkHandler(e, "recents")}
                  className="navigation_link"
                >
                  Отзывы
                </a>
              </li>
              <li className="navigation_item">
                <a
                  href="#"
                  onClick={(e) => clickHeaderLinkHandler(e, "garants")}
                  className="navigation_link"
                >
                  Гарантии
                </a>
              </li>
              <li className="navigation_item">
                <a
                  href="#"
                  onClick={(e) => clickHeaderLinkHandler(e, "how_buy")}
                  className="navigation_link"
                >
                  Как купить
                </a>
              </li>
              <li className="navigation_item">
                <a
                  href="#"
                  onClick={(e) => clickHeaderLinkHandler(e, "cashback")}
                  className="navigation_link"
                >
                  Накопительная
                </a>
              </li>
              <li className="navigation_item">
                <a
                  href="#"
                  onClick={(e) => clickHeaderLinkHandler(e, "income")}
                  className="navigation_link"
                >
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
      <HeaderPopup />
    </div>
  );
}
