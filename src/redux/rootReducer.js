import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "./auth/authRedux";
import {usersReducers} from "./users";
import {routesReducers} from "./routes";
import {rolesReducers} from "./roles";
import {authReducers} from "./auth";
import {areasReducers} from "./areas";
import {categoriesReducers} from "./categories";
import {postsReducers} from "./posts";
import {bannersReducers} from "./banners";
import {salesReducers} from "./sales";
import {packsReducers} from "./packs";
import {variantsReducers} from "./variants";
import {productsReducers} from "./products";
import {ordersReducers} from "./orders";
import {stockOrderReducers} from "./stockOrders";
import {vendorsReducers} from "./vendors";
import {attributesReducers} from "./attributes";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  ...authReducers,
  ...attributesReducers,
  ...areasReducers,
  ...usersReducers,
  ...rolesReducers,
  ...routesReducers,
  ...categoriesReducers,
  ...postsReducers,
  ...bannersReducers,
  ...bannersReducers,
  ...salesReducers,
  ...packsReducers,
  ...variantsReducers,
  ...productsReducers,
  ...ordersReducers,
  ...stockOrderReducers,
  ...vendorsReducers,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
