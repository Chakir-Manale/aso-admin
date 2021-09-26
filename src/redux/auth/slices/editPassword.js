import {getSlice, useCustomSelector} from "../../helpers";
import * as API from "../api";
import {MODULES} from "../../../_ae/helpers/RoutingHelpers";

const {actions, name, reducer} = getSlice({
  name: `${MODULES.PROFILE}.editPassword`,
  data: {},
})

const {startCall, endCall, fetched, catchError, reset} = actions;


const resetDispatcher = () => dispatch => {
  dispatch(reset());
}

const saveDispatcher = entity => dispatch => {
  dispatch(startCall());

  return API.updatePassword(entity)
    .then(response => {
      // dispatch(fetched(response));
    })
    .catch(response => {
      dispatch(catchError(response));
    }).then(response => {
      dispatch(endCall(response));
    })
    ;
};

const useSelector = () => useCustomSelector(name)

const _reducer = {
  [name]: reducer
}

export {
  _reducer,
  resetDispatcher,
  saveDispatcher,
  useSelector
}
