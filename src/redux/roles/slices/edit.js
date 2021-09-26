import {getSlice, useCustomSelector} from "../../helpers";
import * as API from "../api";
import {MODULES} from "../../../_ae/helpers/RoutingHelpers";

const {actions, name, reducer} = getSlice({
  name: `${MODULES.ROLES}.EDIT`,
  data: {
    nameFr: '',
    priority: 10,
    routes: [ ]
  },
})

const {startCall, endCall, fetched, catchError, reset} = actions;


const resetDispatcher = () => dispatch => {
  dispatch(reset());
}

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

const saveDispatcher = (entity, files) => dispatch => {
  dispatch(startCall());

  const ApiCall = entity.id ?
    API.update:
    API.create;

  return ApiCall(entity, files)
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
