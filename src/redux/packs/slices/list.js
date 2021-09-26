import {getSlice, useCustomSelector} from "../../helpers";
import {AEMetadata} from "../../../_ae/AEPagination";
import * as API from "../api";
import {MODULES} from "../../../_ae/helpers/RoutingHelpers";
import {localField} from "../../../_ae/helpers/UIHelper";

const {actions, name, reducer} = getSlice({
  name: `${MODULES.PACKS}.LIST`,
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
      variant: null,
      priceRange: [0, 9999], //todo disable search when price <=0
    },
    {
      '*': [],
      packVariantLines: {
        '*': [],
        variant: {
          '*': []
        }
      }
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


