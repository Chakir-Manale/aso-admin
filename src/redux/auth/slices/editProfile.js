import {getSlice, useCustomSelector} from "../../helpers";
import * as API from "../api";
import {MODULES} from "../../../_ae/helpers/RoutingHelpers";
import {defaultUser} from "../../users/slices/edit";

const {actions, name, reducer} = getSlice({
  name: `${MODULES.PROFILE}.editProfile`,
  data: defaultUser,
})

const {startCall, endCall, fetched, catchError, reset} = actions;


const resetDispatcher = () => dispatch => {
  dispatch(reset());
}

const fetchDispatcher = () => dispatch => {
  dispatch(startCall());

  return API
    .getUserByToken()
    .then(response => {
      dispatch(fetched(response));
    })
    .catch(response => {
      dispatch(catchError(response));
    }).then(response => {
      dispatch(endCall(response));
    })
    ;
};

const saveDispatcher = (entity, files) => dispatch => {
  dispatch(startCall());


  return API.update(entity, files)
    .then(response => {
      dispatch(fetched(response));
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
  fetchDispatcher,
  resetDispatcher,
  saveDispatcher,
  useSelector
}
