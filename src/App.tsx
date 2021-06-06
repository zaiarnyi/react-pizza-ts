import React, {useEffect} from "react";
import {Header} from "./components/General/Header";
import {Route, Switch, useLocation} from "react-router-dom";
import {Home} from "./components/Pages/Home";
import {Card} from "./components/Pages/Card";
import {NoFound} from "./components/Pages/404";
import {useDispatch, useSelector} from "react-redux";
import {thunkGetPizzas} from "./components/Redux/Reducers/PizzaReducer";
import {AppStateType} from "./components/Redux/Store";
import {actionsCard} from "./components/Redux/Reducers/cardReducer";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const category = useSelector(
    (state: AppStateType) => state.filter.activeCategory
  );
  const sort = useSelector((state: AppStateType) => state.filter.sort);
  const activeSort = useSelector(
    (state: AppStateType) => state.filter.activeSort
  );
  const cardClassNames =
    location.pathname === "/card" ? " container--cart" : "";

  useEffect(() => {
    let sortType = sort[activeSort].type;
    let sortOrder = sort[activeSort].order;
    dispatch(thunkGetPizzas(category, sortType, sortOrder));
  }, [category, activeSort]);
  useEffect(() => {
    const order = JSON.parse(localStorage.getItem("order") || "{}");
    dispatch(actionsCard.getOrderFromStorage(order));
  }, []);

  return (
    <>
      <Header />
      <div className="content">
        <div className={`container${cardClassNames}`}>
          <Switch>
            <Route path={"/"} component={Home} exact />
            <Route path={"/card"} component={Card} exact />
            <Route path={"*"} component={NoFound} />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default App;
