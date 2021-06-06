import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { actionsCard } from "../Redux/Reducers/cardReducer";
import { AppStateType } from "../Redux/Store";
import { exit, IPizzaAdd } from "../Redux/Types/Types";
import { CardItemOrder } from "../Blocks/CardItemOrder";
import emptySvg from "../../assets/img/empty-cart.png";
import boxSvg from "../../assets/img/cart.svg";
import trash from "../../assets/img/trash.svg";
import goBackBtn from "../../assets/img/grey-arrow-left.svg";

interface ICardProp {}

export const Card: React.FC<ICardProp> = (props) => {
  const dispatch = useDispatch();
  const countOrder = useSelector(
    (state: AppStateType) => state.card.countOrdered
  );
  const currency = useSelector((state: AppStateType) => state.card.currency);
  const shippingPizza: Array<IPizzaAdd> = useSelector(
    (state: AppStateType) => state.card.shippingPizza
  );
  let orderId: number, orderType: number, orderSize: number;

  //Func
  const onDeleteHandler = (e: React.MouseEvent<HTMLElement>) => {
    let target = e.currentTarget;
    if (target && target.classList.contains("cart__clear")) {
      dispatch(actionsCard.deleteAllCard());
    }
  };
  const onIncrementPizza = (
    e: React.MouseEvent<HTMLElement>,
    obj: exit
  ): void => {
    const target = e.currentTarget;
    if (target && target.classList.contains("cart__item-count-plus")) {
      dispatch(actionsCard.getShippingPizza(obj));
    }
  };

  const onDecrementPizza = (
    e: React.MouseEvent<HTMLElement>,
    key: string
  ): void => {
    const target = e.currentTarget;
    if (target && target.classList.contains("cart__item-count-minus")) {
      dispatch(actionsCard.decrementPizzaOrder(key));
    }
  };
  const onRemoveItemPizza = (key: string) => {
    dispatch(actionsCard.removeItemsPizza(key));
  };
  if (!countOrder && !currency) {
    return (
      <div className="cart cart--empty">
        <h2>Корзина пустая</h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={emptySvg} alt="Empty cart" />
        <Link to={"/"} className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart__top">
        <h2 className="content__title">
          <img src={boxSvg} alt="" />
          Корзина
        </h2>
        <div className="cart__clear" onClick={onDeleteHandler}>
          <img src={trash} alt="" />
          <span>Очистить корзину</span>
        </div>
      </div>
      <div className="content__items">
        {shippingPizza &&
          Object.entries(shippingPizza).map(([key, pizzas]) => {
            orderId = +key.split("_")[0];
            orderType = +key.split("_")[1];
            orderSize = +key.split("_")[2];
            return (
              <CardItemOrder
                key={`${orderId}_${orderSize}_${orderType}`}
                types={orderType}
                imageUrl={pizzas.imageUrl.toString()}
                name={pizzas.name.toString()}
                sizes={orderSize}
                count={+pizzas.count}
                price={+pizzas.price}
                id={orderId}
                onIncrementPizza={onIncrementPizza}
                onDecrementPizza={onDecrementPizza}
                onRemoveItemPizza={onRemoveItemPizza}
              />
            );
          })}
      </div>
      <div className="cart__bottom">
        <div className="cart__bottom-details">
          <span>
            {" "}
            Всего пицц: <b>{countOrder} шт.</b>{" "}
          </span>
          <span>
            {" "}
            Сумма заказа: <b>{currency} ₽</b>{" "}
          </span>
        </div>
        <div className="cart__bottom-buttons">
          <Link
            to={"/"}
            className="button button--outline button--add go-back-btn"
          >
            <img src={goBackBtn} alt="" />
            <span>Вернуться назад</span>
          </Link>
          <div className="button pay-btn">
            <span>Оплатить сейчас</span>
          </div>
        </div>
      </div>
    </div>
  );
};
