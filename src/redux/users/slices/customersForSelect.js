import {getSlice, useCustomSelector} from "../../helpers";
import {AEMetadata} from "../../../_ae/AEPagination";
import * as API from "../api";
import {MODULES} from "../../../_ae/helpers/RoutingHelpers";
import {CONFIG} from "../../../_ae/config";

const {actions, name, reducer} = getSlice({
  name: `${MODULES.USERS}.CUSTOMERS.FOR.SELECT`,
  data: [],
  metadata: new AEMetadata(
    {
      perPage: 5
    },
    {
      field: 'firstName'
    },
    {
      search: '',
      role: {
        roleKey: CONFIG.ROLES.CUSTOMER
        //todo OR, WHOLESALER
      }
    },
    {
      '*': [],
      role: {
        '*': []
      }
    }
  ).toJson()
})

const {startCall, endCall, fetched, catchError, reset, setPage} = actions;

const fetchDispatcher = metadata => dispatch => {
  dispatch(startCall());

  return API
    .all(metadata)
    .then(response => {
      response.data.entities = response.data.entities.map(user=>({
        ...user,
        roles: user.userRoles ? user.userRoles.map(userRole=>userRole.role.roleKey) : []
      }))
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


