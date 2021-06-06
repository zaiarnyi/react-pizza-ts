import React from "react";
import { useHistory } from "react-router-dom";

interface INoFoundProp {}

export const NoFound: React.FC<INoFoundProp> = (props) => {
  const history = useHistory();

  const onComeBack = () => {
    history.goBack();
  };
  return (
    <div className={"no-found"}>
      <h2>Здесь такой страницы Вы не найдете</h2>
      <button onClick={onComeBack} className="button pay-btn">
        <span>Вернуться назад</span>
      </button>
    </div>
  );
};
