import { IPizzaAdd } from "../Types/Types";
import { InferActionType } from "../Store";
//Initial State
const initialState = {
  shippingPizza: [] as [] | any | IPizzaAdd,
  countOrdered: 0,
  currency: 0,
};

export const actionsCard = {
  getShippingPizza: (body: IPizzaAdd) =>
    ({
      type: "PIZZA/GET_BUY_FROM_PIZZA_BLOCK",
      payload: body,
    } as const),
  deleteAllCard: () =>
    ({
      type: "PIZZA/DELETE_ALL_CARD",
    } as const),
  decrementPizzaOrder: (key: string) =>
    ({
      type: "PIZZA/DECREMENT_PIZZA_ORDER_CARD",
      payload: key,
    } as const),
  getOrderFromStorage: (obj: StateType) =>
    ({
      type: "PIZZA/GET_ORDER_FROM_LOCALSTORAGE",
      payload: obj,
    } as const),
  removeItemsPizza: (key: string) =>
    ({
      type: "PIZZA/REMOVE_ITEM_PIZZA_FROM_CARD",
      payload: key,
    } as const),
};

//Type State
type StateType = typeof initialState;
type ActionType = InferActionType<typeof actionsCard>;

export const cardReducer = (
  state = initialState,
  action: ActionType
): StateType => {
  switch (action.type) {
    case "PIZZA/GET_BUY_FROM_PIZZA_BLOCK": {
      let keyPayload: string = Object.keys(action.payload).join("");
      let body: IPizzaAdd = { ...action.payload };
      let count = state.shippingPizza[keyPayload]
        ? state.shippingPizza[keyPayload].count + 1
        : 1;
      let newState = {
        ...state,
        currency: state.currency + body[keyPayload].price,
        countOrdered: state.countOrdered + 1,
        shippingPizza: {
          ...state.shippingPizza,
          ...{ [keyPayload]: { ...body[keyPayload], count } },
        },
      };
      localStorage.setItem("order", JSON.stringify(newState));
      return newState;
    }
    case "PIZZA/DELETE_ALL_CARD": {
      let newState = {
        ...state,
        shippingPizza: [],
        countOrdered: 0,
        currency: 0,
      };
      localStorage.setItem("order", JSON.stringify(newState));
      return newState;
    }
    case "PIZZA/DECREMENT_PIZZA_ORDER_CARD": {
      let copyState = JSON.parse(JSON.stringify(state));
      let body = { ...copyState.shippingPizza[action.payload] };
      body.count = state.shippingPizza[action.payload].count - 1;

      if (body.count === 0) {
        let obj = {
          ...copyState,
          currency:
            copyState.currency - copyState.shippingPizza[action.payload].price,
          countOrdered: state.countOrdered - 1,
        };
        delete copyState.shippingPizza[action.payload];
        localStorage.setItem("order", JSON.stringify(obj));
        return obj;
      }
      let newState = {
        ...copyState,
        countOrdered: state.countOrdered - 1,
        currency:
          copyState.currency - copyState.shippingPizza[action.payload].price,
        shippingPizza: {
          ...copyState.shippingPizza,
          [action.payload]: { ...body },
        },
      };
      localStorage.setItem("order", JSON.stringify(newState));
      return newState;
    }
    case "PIZZA/GET_ORDER_FROM_LOCALSTORAGE":
      return { ...state, ...action.payload };
    case "PIZZA/REMOVE_ITEM_PIZZA_FROM_CARD": {
      let prevCurrentItem = state.shippingPizza[action.payload];
      let newState = {
        ...state,
        currency:
          state.currency - prevCurrentItem.price * prevCurrentItem.count,
        countOrdered: state.countOrdered - prevCurrentItem.count,
      };
      delete newState.shippingPizza[action.payload];
      localStorage.setItem("order", JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
};
