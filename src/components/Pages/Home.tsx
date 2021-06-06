import React from "react";
import { Category } from "../Blocks/Category";
import { Sort } from "../Blocks/Sort";
import { useSelector } from "react-redux";
import { AppStateType } from "../Redux/Store";
import { PizzaBlock } from "../Blocks/PizzaBlock";
import { IsLoadPizza } from "../Blocks/isLoadPizza";

interface IHomeProp {}

export const Home: React.FC<IHomeProp> = (props) => {
  const pizzaItems = useSelector((state: AppStateType) => state.pizza.pizzas);
  const isLoading = useSelector((state: AppStateType) => state.pizza.isLoading);
  const orderPizzas = useSelector(
    (state: AppStateType) => state.card.shippingPizza
  );

  const count = () => {
    let obj: { [key: string]: number } = {};
    return () => {
      Object.keys(orderPizzas).forEach((item) => {
        const id = item.split("_")[0];
        obj[id] = orderPizzas[item].count + (obj[id] || 0);
      });
      return obj;
    };
  };
  return (
    <>
      <div className="content__top">
        <Category />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {!isLoading
          ? pizzaItems.map((item) => {
              return (
                <PizzaBlock
                  key={item.id}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  name={item.name}
                  types={item.types}
                  sizes={item.sizes}
                  price={item.price}
                  category={item.category}
                  rating={item.rating}
                  count={count()()[item.id]}
                />
              );
            })
          : Array(12)
              .fill("_")
              .map((item, i) => {
                return <IsLoadPizza key={i} />;
              })}
      </div>
    </>
  );
};
