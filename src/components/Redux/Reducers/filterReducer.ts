import { ISortFilter } from "../Types/Types";
import { InferActionType } from "../Store";

//Initial State
const initialState = {
  category: [
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ] as Array<string>,
  activeCategory: null as null | number,
  sort: [
    { name: "Популярности", type: "rating", order: "desc" },
    { name: "Цене", type: "price", order: "desc" },
    { name: "Алфавиту", type: "name", order: "asc" },
  ] as Array<ISortFilter>,
  activeSort: 0,
};

export const actionsFilter = {
  changeActiveCategory: (i: number | null) =>
    ({
      type: "PIZZA/CHANGE_ACTIVE_CATEGORY",
      payload: i,
    } as const),
  changeActiveSort: (i: number) =>
    ({
      type: "PIZZA/CHANGE_ACTIVE_SORT_POPUP",
      payload: i,
    } as const),
};

//Type State
type StateType = typeof initialState;
type ActionTYpe = InferActionType<typeof actionsFilter>;

export const filterReducer = (
  state = initialState,
  action: ActionTYpe
): StateType => {
  switch (action.type) {
    case "PIZZA/CHANGE_ACTIVE_CATEGORY":
      return { ...state, activeCategory: action.payload };
    case "PIZZA/CHANGE_ACTIVE_SORT_POPUP":
      return { ...state, activeSort: action.payload };
    default:
      return state;
  }
};
