import {getSlice, useCustomSelector} from "../../helpers";
import {AEMetadata} from "../../../_ae/AEPagination";
import * as API from "../api";
import {MODULES} from "../../../_ae/helpers/RoutingHelpers";
import {localField} from "../../../_ae/helpers/UIHelper";

const {actions, name, reducer} = getSlice({
  name: `${MODULES.AREAS}.LIST`,
  data: [],
  metadata: new AEMetadata(
    {
      perPage: 12
    },
    {
      field: localField()
    },
    {
      search: '',
      parent: null
    },
    {
      '*': [],
      parent: {'*': []}
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
  resetDispatcher,
  _reducer,
  actions
}


