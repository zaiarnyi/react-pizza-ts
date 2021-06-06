import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../Redux/Store";
import { actionsFilter } from "../Redux/Reducers/filterReducer";

interface ISortProp {}

export const Sort: React.FC<ISortProp> = React.memo((props) => {
  const dispatch = useDispatch();
  const activeSort = useSelector(
    (state: AppStateType) => state.filter.activeSort
  );
  const sort = useSelector((state: AppStateType) => state.filter.sort);
  const [popup, setPopup] = useState(false);
  const sortRef = useRef(null);

  //Func
  const onChangeSort = (i: number) => {
    dispatch(actionsFilter.changeActiveSort(i));
  };
  const onChangeViewPopup = () => {
    setPopup((prev) => !prev);
  };
  const clickForClose = (e: any) => {
    const path = e.path || (e.composedPath && e.composedPath());
    if (!path.includes(sortRef.current)) {
      setPopup(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", clickForClose);
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div
        className={!popup ? "sort__label" : "sort__label open"}
        onClick={onChangeViewPopup}
      >
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span>{sort[activeSort].name}</span>
      </div>
      {popup && (
        <div className="sort__popup">
          <ul>
            {sort.map((item, i) => {
              return (
                <li
                  key={`${item.type}_${i}`}
                  className={activeSort === i ? "active" : ""}
                  onClick={onChangeSort.bind(null, i)}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
});
