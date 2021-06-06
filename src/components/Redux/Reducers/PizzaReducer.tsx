import { IPizza } from "../Types/Types";
import { InferActionType, ThunkActionType } from "../Store";
import { pizzaApi } from "../../API/PizzaApi";

//Start State
const initialState = {
  pizzas: [] as Array<IPizza>,
  isLoading: false,
};
//Actions
const actionsPizzas = {
  changeLoading: (flag: boolean) =>
    ({
      type: "PIZZAS/IS_LOADING",
      payload: flag,
    } as const),
  getPizzas: (body: Array<IPizza>) =>
    ({
      type: "PIZZAS/GET_ARRAY_PIZZAS",
      payload: body,
    } as const),
};

//Type State
type StateType = typeof initialState;
//Type Actions
type ActionsType = InferActionType<typeof actionsPizzas>;

export const pizzaReducer = (
  state = initialState,
  action: ActionsType
): StateType => {
  switch (action.type) {
    case "PIZZAS/IS_LOADING":
      return { ...state, isLoading: action.payload };
    case "PIZZAS/GET_ARRAY_PIZZAS":
      return { ...state, pizzas: [...action.payload] };
    default:
      return state;
  }
};

export const thunkGetPizzas = (
  cat: number | null,
  sortArg: string,
  order: string
): ThunkActionType => async (dispatch) => {
  let category = cat !== null ? "category=" + cat + "&" : "",
    variable = sortArg === "price" ? sortArg + "[%270%27][%270%27]" : sortArg,
    sort = `_sort=${variable}&_order=${order}`,
    url = `/pizzas`,
    queryString = cat !== null || sort ? "?" : "";

  dispatch(actionsPizzas.changeLoading(true));
  let res = await pizzaApi<Array<IPizza>>(
    `${url}${queryString}${category}${sort}`
  );
  dispatch(actionsPizzas.getPizzas(res));
  dispatch(actionsPizzas.changeLoading(false));
};
