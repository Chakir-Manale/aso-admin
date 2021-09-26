import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import {setRole} from "../../_metronic/i18n";
import {toAbsoluteUrl} from "../../_metronic/_helpers";
import {getUserByToken} from "./api";
import {useCustomSelector} from "../helpers";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  VerifyEmail: "[Verify Email] Action"
};

// console.log(roles)
const initialAuthState = {
  user: undefined,
  token: undefined,
  authRole: undefined
};

export const reducer = persistReducer(
  { storage, key: "v706-demo3-auth", whitelist: ["user", "token","authRole"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { token } = action.payload;
        return { token, user: undefined, authRole: undefined };
      }

      case actionTypes.Register: {
        const { token } = action.payload;
        return { token, user: undefined, authRole: undefined };
      }

      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialAuthState;
      }

      case actionTypes.UserLoaded: {
        const { user } = action.payload;
        return { ...state, user, authRole: user.role.roleKey };
      }

      case actionTypes.VerifyEmail: {

        // const { role } = action.payload;
        // console.log('switch', role)
        return { ...state };
      }

      default:
        return state;
    }
  }
);

export const authActions = {
  login: token => ({ type: actionTypes.Login, payload: { token } }),
  emailVerified: () => ({ type: actionTypes.VerifyEmail }),
  register: token => ({  type: actionTypes.Register, payload: { token } }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: user => ({ type: actionTypes.UserRequested, payload: { user } }),
  fulfillUser: user => ({ type: actionTypes.UserLoaded, payload: { user } })
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(authActions.requestUser());
  });

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(authActions.requestUser());
  });
  yield takeLatest(actionTypes.VerifyEmail, function* verifiedEmail() {
    const { data: user } = yield getUserByToken();
    yield put(authActions.fulfillUser(user));
    setRole(user.roles[0], false);
    window.location.replace(toAbsoluteUrl())
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    const { data:user } = yield getUserByToken();

    user.roles = [user.role.roleKey]

    if (user.roles.length > 0) {
      setRole(user.roles[0], false);
      yield put(authActions.fulfillUser(user));
    }

  });
}

const useSelector = () => useCustomSelector('auth')

export {
  useSelector,
}