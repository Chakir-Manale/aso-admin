import { _reducer as routesForAppReducer} from '../auth/slices/listForApp'
import { _reducer as routesForSelectReducer} from './slices/listForSelect'
import { _reducer as routesForRolesFilterReducer} from './slices/listForRolesFilter'

export const routesReducers = {
  ...routesForAppReducer,
  ...routesForSelectReducer,
  ...routesForRolesFilterReducer
}

//todo move to auth
export {
  fetchDispatcher as fetchRoutesForApp,
  useSelector as useRoutesForAppState
} from '../auth/slices/listForApp'

export {
  fetchDispatcher as fetchRoutesSelect,
  useSelector as useRoutesForSelectState
} from './slices/listForSelect'

export {
  fetchDispatcher as fetchRoutesForRolesFilter,
  useSelector as useRoutesForRolesFilterState
} from './slices/listForRolesFilter'