import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetRecomendedQuery,
  useGetDescriptionQuery,
} from "../../../../store/api/recomendedApi";
import {
  addToRecomended,
  addDescription,
} from "../../../../store/recomendedSlice";
import vectors from "../../../../data/vectors";
import "./Recomended.css";
import { useEffect, useState } from "react";
import RecomendedGame from "./RecomendedGame/RecomendedGame";

function Recomended() {
  const dispatch = useDispatch();
  const { data } = useGetRecomendedQuery();
  const recomendedArr = useSelector(
    (state) => state.recomended.recomendedGamesArr
  );
  let [coords, setCoords] = useState(0);
  let [sliderIndex, setSliderIndex] = useState(1);

  useEffect(() => {
    if (data) {
      dispatch(addToRecomended(data.results));
    }
  }, [data]);

  function clickSliderArrowsHandler(e) {
    const slider = document.querySelector(".recomended_content");

    if (e.target.id == "left-arrow") {
      if (coords >= slider.offsetWidth) {
        setCoords((coords -= slider.offsetWidth));
        setSliderIndex(sliderIndex - 1);
        const lastActive = document.querySelector(".active_slider_bar");
        slider.scrollTo({
          behavior: "smooth",
          left: coords,
        });
        if (lastActive.previousElementSibling) {
          lastActive.previousElementSibling.classList.add("active_slider_bar");
          lastActive.classList.remove("active_slider_bar");
        }
      }
    } else {
      if (coords < 3 * slider.offsetWidth) {
        setSliderIndex(sliderIndex + 1);
        setCoords((coords += slider.offsetWidth));
        const lastActive = document.querySelector(".active_slider_bar");
        slider.scrollTo({
          behavior: "smooth",
          left: coords,
        });
        if (lastActive.nextElementSibling) {
          lastActive.nextElementSibling.classList.add("active_slider_bar");
          lastActive.classList.remove("active_slider_bar");
        }
      }
    }
  }

  return (
    <>
      {recomendedArr.length > 0 && (
        <div className="recomended_container">
          <div className="recomended_content">
            {recomendedArr.map((game) => {
              return <RecomendedGame key={game.id} id={game.id} game={game} />;
            })}
          </div>
          <div className="recomended_time_bar">
            <span className="bar_item active_slider_bar"></span>
            <span className="bar_item"></span>
            <span className="bar_item"></span>
            <span className="bar_item"></span>
          </div>
          <div className="recomended_arrows">
            <span
              onClick={(e) => clickSliderArrowsHandler(e)}
              id={"left-arrow"}
              className="arrow_item"
            >
              {vectors.left_arrow}
            </span>
            <span
              onClick={(e) => clickSliderArrowsHandler(e)}
              id={"right-arrow"}
              className="arrow_item"
            >
              {vectors.right_arrow}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default Recomended;
