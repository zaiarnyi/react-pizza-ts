import {
  Action,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import { pizzaReducer } from "./Reducers/PizzaReducer";
import { filterReducer } from "./Reducers/filterReducer";
import { cardReducer } from "./Reducers/cardReducer";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Reducers
const rootReducers = combineReducers({
  pizza: pizzaReducer,
  filter: filterReducer,
  card: cardReducer,
});
//Store
export const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);

//Type State
export type AppStateType = ReturnType<typeof rootReducers>;
//Action Object Type
export type InferActionType<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;
//Type for Thunk Actions
export type ThunkActionType<AT extends Action = Action, R = void> = ThunkAction<
  R,
  AppStateType,
  unknown,
  AT
>;
