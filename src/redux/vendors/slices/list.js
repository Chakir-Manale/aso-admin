import {getSlice, useCustomSelector} from "../../helpers";
import {AEMetadata} from "../../../_ae/AEPagination";
import * as API from "../api";
import {MODULES} from "../../../_ae/helpers/RoutingHelpers";

const {actions, name, reducer} = getSlice({
  name: `${MODULES.VENDORS}.LIST`,
  data: [],
  metadata: new AEMetadata(
    {
      perPage: 24
    },
    {
      field: name
    },
    {},
    {
      '*': []
    }
  ).toJson()
})

const {startCall, endCall, fetched, catchError, reset} = actions;

const resetDispatcher = () => dispatch => {
  dispatch(reset());
}

const fetchDispatcher = metadata => dispatch => {
  dispatch(startCall());

  return API
    .all(metadata)
    .then(response => {
      dispatch(fetched(response));

      return response;
    })
    .catch(response => {
      dispatch(catchError(response));

      return response;
    }).then(response=>{
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
  useSelector,
  _reducer,
  actions
}


