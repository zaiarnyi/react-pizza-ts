import React, { useState } from "react";
import { IPizza, IPizzaAdd } from "../Redux/Types/Types";
import plusSvg from "../../assets/img/plus.svg";

const onChangeHandler = (i: number, func: (num: number) => void) => {
  func(i);
};
interface IProps {
  count: number;
  onAddPizzaToOrder: (obj: IPizzaAdd) => void;
  sizesName: Array<number>;
  firstSizes: number;
}
export const PizzaBlock: React.FC<IPizza & IProps> = React.memo((props) => {
  const { id, imageUrl, name, types, sizes, price, category } = props; //ok
  const typesName = ["Тонкое", "Традиционное"]; //ok
  const [labelTypes, setLabelTypes] = useState(types[0]); //Ok
  const [labelSize, setLabelSize] = useState(props.firstSizes); //Ok

  const onAddPizzaToCard = {
    [`${id}_${labelTypes}_${props.sizesName[labelSize]}`]: {
      price: price[labelTypes][labelSize],
      sizes: props.sizesName[labelSize],
      name,
      imageUrl,
    },
  };
  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt={name} />
      <h4 className="pizza-block__title">
        {category === 1 ? name + " 🌱" : name}
      </h4>
      <div className="pizza-block__selector">
        <ul>
          {typesName.map((item, i) => {
            return (
              <li key={i}>
                <button
                  onClick={onChangeHandler.bind(null, i, setLabelTypes)}
                  className={labelTypes === i ? "active" : ""}
                  disabled={!types.includes(i)}
                >
                  {item}
                </button>
              </li>
            );
          })}
        </ul>
        <ul>
          {props.sizesName.map((item, i) => {
            return (
              <li key={item}>
                <button
                  onClick={onChangeHandler.bind(null, i, setLabelSize)}
                  className={
                    labelSize === i && sizes.includes(item) ? "active" : ""
                  }
                  disabled={!sizes.includes(item)}
                >
                  {item} см.
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">
          {price[labelTypes][labelSize] === price[types[0]][props.firstSizes] &&
          !props.count
            ? "от " + price[labelTypes][labelSize] + " ₽"
            : price[labelTypes][labelSize] + " ₽"}
        </div>
        <button
          className="button button--outline button--add"
          onClick={props.onAddPizzaToOrder.bind(null, onAddPizzaToCard)}
        >
          <img src={plusSvg} alt="" />
          <span>Добавить</span>
          {<i>{props.count}</i>}
        </button>
      </div>
    </div>
  );
});
