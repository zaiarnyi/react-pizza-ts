import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionsFilter } from "../Redux/Reducers/filterReducer";
import { AppStateType } from "../Redux/Store";

interface ICategoryProp {}

export const Category: React.FC<ICategoryProp> = React.memo((props) => {
  const name = useSelector((state: AppStateType) => state.filter.category);
  const activeCategory = useSelector(
    (state: AppStateType) => state.filter.activeCategory
  );
  const dispatch = useDispatch();

  //Func
  const onChangeHandler = (i: number | null) => {
    dispatch(actionsFilter.changeActiveCategory(i));
  };

  return (
    <div className="categories">
      <ul>
        <li
          className={activeCategory === null ? "active" : ""}
          onClick={onChangeHandler.bind(null, null)}
        >
          Все
        </li>
        {name.map((name, i) => {
          return (
            <li
              key={`${name}_${i}`}
              className={activeCategory === i ? "active" : ""}
              onClick={onChangeHandler.bind(null, i)}
            >
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
});
