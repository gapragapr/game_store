import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CartGame from "./CartGame/CartGame";
import banner from "../../../img/banner.png";
import "./CartPage.css";
import { useDispatch, useSelector } from "react-redux";
import webmoney from "../../../img/webmoney_logo.png";
import qiwi from "../../../img/qiwi_logo.png";
import mastercard from "../../../img/mastercard_logo.png";
import visa from "../../../img/visa_logo.png";
import mir from "../../../img/mir_logo.png";
import etherium from "../../../img/etherium_logo.png";
import bitcoin from "../../../img/bitcoin_logo.png";
import samsung from "../../../img/samsungpay_logo.png";

import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setErr } from "../../../store/errorSlice";
import { deleteCart } from "../../../store/cartSlice";

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

  function calculatedSumm() {
    let sum = 0;
    cartArr.map((item) => {
      sum += item.price * item.count;
    });

    return sum;
  }

  function clickPaymentMethodHandler(e) {
    const activeMethod = document.querySelector(".active_method");
    if (activeMethod) {
      activeMethod.classList.remove("active_method");
    }
    e.currentTarget.classList.add("active_method");
  }

  function clickPaymentAcceptButton() {
    const emailInput = document.querySelector(".email_input");
    const activePayment = document.querySelector(".active_method");

    if (emailInput.value == "" || !activePayment) {
      dispatch(setErr({ errText: "Введите e-mail и выберите метод оплаты" }));
    } else {
      dispatch(setErr({ errText: "Инструкции отправлены на вашу почту" }));
      cartArr.map((item) => {
        dispatch(deleteCart({ game: item, type: "deep_delete" }));
      });
    }
  }

  function getGoodsWord(number) {
    let remainder = number % 10;
    let goodsWord = "товар";

    if (remainder === 1 && number !== 11) {
      goodsWord += "";
    } else if (
      remainder >= 2 &&
      remainder <= 4 &&
      !(number >= 12 && number <= 14)
    ) {
      goodsWord += "а";
    } else {
      goodsWord += "ов";
    }

    return goodsWord;
  }

  return (
    <>
      <Header />
      <div className="cart_container">
        <div className="cart_content">
          <div className="cart_content_row">
            <h2 className="cart_section_name">
              Корзина <span className="cart_game_count">{cartCount}</span>
            </h2>
            <div className="cart_banner">
              <img src={banner} alt="" />
              <div className="cart_banner_content">
                <p className="banner_title">
                  Скоро вы увидите кое-что новое...
                </p>
                <p className="banner_text">
                  В ближайшее время вы увидите накопительную систему нашего
                  магазина, и мы гарантируем, что вы будете приятно удивлены...
                </p>
              </div>
            </div>
            {cartArr.length &&
              cartArr.map((game) => {
                return <CartGame key={game.id} game={game} />;
              })}
          </div>
          <div className="cart_content_row">
            <div className="cart_content_row_column">
              <div className="payment_methods">
                <div
                  onClick={(e) => clickPaymentMethodHandler(e)}
                  className="payment_method"
                >
                  <div className="payment_method_row">
                    <div className="circle"></div>
                    <p className="payment_method_name">Электронные кошельки</p>
                  </div>
                  <div className="payment_method_row">
                    <img src={webmoney} alt="" />
                    <img src={qiwi} alt="" />
                  </div>
                </div>
                <div
                  onClick={(e) => clickPaymentMethodHandler(e)}
                  className="payment_method"
                >
                  <div className="payment_method_row">
                    <div className="circle"></div>
                    <p className="payment_method_name">Банковские карты</p>
                  </div>
                  <div className="payment_method_row">
                    <img src={mastercard} alt="" />
                    <img src={visa} alt="" />
                    <img src={mir} alt="" />
                  </div>
                </div>
                <div
                  onClick={(e) => clickPaymentMethodHandler(e)}
                  className="payment_method"
                >
                  <div className="payment_method_row">
                    <div className="circle"></div>
                    <p className="payment_method_name">Криптовалюта</p>
                  </div>
                  <div className="payment_method_row">
                    <img src={etherium} alt="" />
                    <img src={bitcoin} alt="" />
                  </div>
                </div>
                <div
                  onClick={(e) => clickPaymentMethodHandler(e)}
                  className="payment_method"
                >
                  <div className="payment_method_row">
                    <div className="circle"></div>
                    <p className="payment_method_name">Samsung pay</p>
                  </div>
                  <div className="payment_method_row">
                    <img src={samsung} alt="" />
                  </div>
                </div>
              </div>
              <input
                className="email_input"
                placeholder="PlayChill@gmail.com"
                type="email"
              />
            </div>
            <div className="cart_content_row_column">
              <div className="payment_confirm_block">
                <p className="payment_count">
                  {cartCount} {getGoodsWord(cartCount)}
                </p>
                <p className="payment_summ">{calculatedSumm()} ₽ </p>
                <button
                  onClick={clickPaymentAcceptButton}
                  className="payment_accept"
                >
                  Оформить заказ
                </button>
                <p className="payment_accept_text">
                  Покупая данный товар, я подтверждаю,что ознакомился и согласен
                  с условиями и условия магазина
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CartPage;
