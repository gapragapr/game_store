import Footer from "./Components/MainComponents/Footer/Footer";
import Header from "./Components/MainComponents/Header/Header";
import Main from "./Components/MainComponents/Main/Main";
import FavoritesPage from "./Components/MainComponents/FavoritesPage/FavoritesPage";
import ErrNotification from "./Components/ErrNotification/ErrNotification";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErr } from "./store/errorSlice";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import CartPage from "./Components/MainComponents/CartPage/CartPage";
import GameCardPage from "./Components/MainComponents/GameCardPage/GameCardPage";

function App() {
  const haveErr = useSelector((state) => state.err.haveErr);
  const errText = useSelector((state) => state.err.errText);
  const dispatch = useDispatch();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Main />
              <Footer />
            </>
          }
        />
        <Route
          path="/favorites"
          element={
            <>
              <FavoritesPage />
            </>
          }
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/games/:id" element={<GameCardPage />} />
      </>
    )
  );

  useEffect(() => {
    if (haveErr) {
      setTimeout(() => {
        dispatch(clearErr());
      }, 1500);
    }
  }, [haveErr]);

  return (
    <>
      <RouterProvider router={router} />{" "}
      {haveErr && <ErrNotification text={errText} />}
    </>
  );
}

export default App;
