import React from "react";
import "./Footer.css";

import paypal from "../../../img/paypal.png";
import mastercard from "../../../img/mastercard.png";
import webmoney from "../../../img/webmoney.png";
import mir from "../../../img/mir.png";
import visa from "../../../img/visa.png";
import vectors from "../../../data/vectors";

export default function Footer() {
  return (
    <div className="footer_container">
      <footer>
        <div className="footer_row">
          <ul className="payment_systems">
            <li className="payment_system">
              <img src={paypal} alt="" />
            </li>
            <li className="payment_system">
              <img src={mastercard} alt="" />
            </li>
            <li className="payment_system">
              <img src={visa} alt="" />
            </li>
            <li className="payment_system">
              <img src={mir} alt="" />
            </li>
            <li className="payment_system">
              <img src={webmoney} alt="" />
            </li>
            <li className="payment_system">
              <img src={paypal} alt="" />
            </li>
            <li className="payment_system">
              <img src={paypal} alt="" />
            </li>
          </ul>
        </div>
        <div className="footer_row">
          <div className="footer_row_block">
            <p className="footer_row_block_name">О компании</p>
            <ul className="store_info">
              <li className="store_info_item">
                <a href="" className="store_info_link">
                  О нас
                </a>
              </li>
              <li className="store_info_item">
                <a href="" className="store_info_link">
                  Вакансии
                </a>
              </li>
              <li className="store_info_item">
                <a href="" className="store_info_link">
                  Реквизиты
                </a>
              </li>
            </ul>
          </div>
          <div className="footer_row_block">
            <p className="footer_row_block_name">Договор оферты</p>
            <ul className="store_info">
              <li className="store_info_item">
                <a href="" className="store_info_link">
                  Каталог
                </a>
              </li>
              <li className="store_info_item">
                <a href="" className="store_info_link">
                  Акции
                </a>
              </li>
              <li className="store_info_item">
                <a href="" className="store_info_link">
                  Личный кабинет
                </a>
              </li>
            </ul>
          </div>
          <div className="footer_row_block">
            <p className="footer_row_block_name">Договор оферты</p>
            <ul className="store_info">
              <li className="store_info_item">
                <a href="" className="store_info_link">
                  Каталог
                </a>
              </li>
              <li className="store_info_item">
                <a href="" className="store_info_link">
                  Акции
                </a>
              </li>
              <li className="store_info_item">
                <a href="" className="store_info_link">
                  Личный кабинет
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer_row footer_row_keys_info">
          <p className="footer_row_text ">
            Все продаваемые ключи закупаются у официальных дистрибьюторов и
            издателей. В том числе у 1С-СофтКлаб, Бука, Новый Диск и Enaza
          </p>
        </div>
      </footer>
      <div className="footer_row footer_row_last">
        <a href="" className="footer_row_link">
          Правовая информация
        </a>
        <p className="footer_row_text">
          Интернет-магазин игр «Ogre`s eye» © 2022
        </p>
        <ul className="footer_row_socials">
          <li className="social_item">
            <a
              href="https://www.instagram.com/raccoon.ra/"
              target={"_blank"}
              className="social_link"
            >
              {vectors.instagram}
            </a>
          </li>
          <li className="social_item">
            <a
              href="https://vk.com/troubledyoouth"
              target={"_blank"}
              className="social_link"
            >
              {vectors.vk}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
