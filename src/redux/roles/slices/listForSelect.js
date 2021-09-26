import {getSlice, useCustomSelector} from "../../helpers";
import {AEMetadata} from "../../../_ae/AEPagination";
import * as API from "../api";
import {MODULES} from "../../../_ae/helpers/RoutingHelpers";
import {localField} from "../../../_ae/helpers/UIHelper";


const {actions, name, reducer} = getSlice({
  name: `${MODULES.ROLES}.LIST.FOR.SELECT`,
  data: [],
  metadata: new AEMetadata(
    {
      perPage: 5
    },
    {
      field: localField()
    },
    {
      search: ''
    },
    {'*': []}
  ).toJson()
})

const {startCall, endCall, fetched, catchError} = actions;


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
  _reducer,
  fetchDispatcher,
  useSelector,
  actions
}


