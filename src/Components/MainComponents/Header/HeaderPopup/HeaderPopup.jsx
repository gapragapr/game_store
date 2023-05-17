import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPopupText, setNeedPopup } from "../../../../store/popupSlice";
import "./HeaderPopup.css";

function HeaderPopup() {
  const popupText = useSelector((state) => state.popup.popupText);
  const needPopup = useSelector((state) => state.popup.needPopup);
  const dispatch = useDispatch();

  function clickPopupContainer(e) {
    e.stopPropagation();
    e.preventDefault();
    dispatch(setNeedPopup({ option: false }));
    dispatch(setPopupText({ popupText: null }));
  }

  return (
    <>
      {needPopup && popupText && (
        <div
          onClick={(e) => clickPopupContainer(e)}
          className="popup_container"
        >
          <div className="popup_content">
            {popupText.map((item) => {
              return <p className="popup_text">{item}</p>;
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default HeaderPopup;
