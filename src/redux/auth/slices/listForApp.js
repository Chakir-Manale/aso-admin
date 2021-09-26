import {getSlice, useCustomSelector} from "../../helpers";
import * as API from "../api";
import {ROUTES} from "../../../app/Routes";
import {MODULES} from "../../../_ae/helpers/RoutingHelpers";

const {actions, name, reducer} = getSlice({
  name: `${MODULES.ROUTES}.FOR.APP`,
  data: [],
  // metadata: new AEMetadata(
  //   {
  //     perPage: 1000
  //   },
  //   {field: 'id'},
  //   {},
  //   {'*': [], 'assignTo': {'*': [], 'location': {'*': []}}}
  // )
})

const {startCall, endCall, fetched, catchError, reset} = actions;


const fetchDispatcher = metadata => dispatch => {
  dispatch(startCall());

  return API
    .getAuthUserRoutes(metadata)
    .then(response => {

      response.data.entities = response.data.entities
        .filter(dbRoute=>ROUTES.findIndex(appRoute=>appRoute.routeKey === dbRoute.routeKey) !== -1)
        .map(dbRoute=>({
          ...dbRoute,
          ...ROUTES.find(appRoute=>appRoute.routeKey === dbRoute.routeKey),
          // roles: dbRoute.routeRoles.map(routeRole=>routeRole.role.roleKey),
          // dbRoute
        }))

      // console.log(response.data.entities)
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


