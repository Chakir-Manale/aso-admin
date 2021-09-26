import {getSlice, useCustomSelector} from "../../helpers";
import * as API from "../api";
import {MODULES} from "../../../_ae/helpers/RoutingHelpers";
import {defaultObject} from "./edit";

const {actions, name, reducer} = getSlice({
  name: `${MODULES.SALES}.DELETE`,
  data: defaultObject
})

const {startCall, endCall, fetched, catchError, reset} = actions;

const fetchDispatcher = (id, metadata) => dispatch => {
  dispatch(startCall());


  return API
    .find(id, metadata)
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

const deleteDispatcher = (id, metadata) => dispatch => {
  dispatch(startCall());

  return API
    .destroy(id, metadata)
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
  fetchDispatcher,
  deleteDispatcher,
  useSelector,
  _reducer
}