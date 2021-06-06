import React from "react";
import { useSelector } from "react-redux";
import { AppStateType } from "../Redux/Store";

interface ICategoryProp {
  onChangeCategory: (i: number | null) => void;
}

export const Category: React.FC<ICategoryProp> = React.memo((props) => {
  const name = useSelector((state: AppStateType) => state.filter.category);
  const activeCategory = useSelector(
    (state: AppStateType) => state.filter.activeCategory
  );
  return (
    <div className="categories">
      <ul>
        <li
          className={activeCategory === null ? "active" : ""}
          onClick={props.onChangeCategory.bind(null, null)}
        >
          Все
        </li>
        {name.map((name, i) => {
          return (
            <li
              key={`${name}_${i}`}
              className={activeCategory === i ? "active" : ""}
              onClick={props.onChangeCategory.bind(null, i)}
            >
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
});
