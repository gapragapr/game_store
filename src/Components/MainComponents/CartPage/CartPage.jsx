import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CartGame from "./CartGame/CartGame";
import banner from "../../../img/banner.png";
import "./CartPage.css";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const dispatch = useDispatch();
  const cartArr = useSelector((state) => state.cart.cart);
  const cartCount = useSelector((state) => state.cart.cartCount);
  const navigation = useNavigate();

  useEffect(() => {
    if (cartArr.length == 0) {
      navigation("/");
    }
  });

  return (
    <>
      <Header />
      <div className="cart_container">
        <div className="cart_content">
          <h2 className="cart_section_name">
            Корзина <span className="cart_game_count">{cartCount}</span>
          </h2>
          <div className="cart_banner">
            <img src={banner} alt="" />
            <div className="cart_banner_content">
              <p className="banner_title">Скоро вы увидите кое-что новое...</p>
              <p className="banner_text">
                В ближайшее время вы увидите накопительную систему нашего
                магазина, и мы гарантируем, что вы будете приятно удивлены...
              </p>
            </div>
          </div>
          {cartArr.length > 0 ? (
            cartArr.map((game) => {
              return <CartGame key={game.id} game={game} />;
            })
          ) : (
            <div className="games_not_found">
              <p className="">Вы не добавили еще ни одну игру в корзину.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CartPage;
