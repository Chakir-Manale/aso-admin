import { _reducer as usersReducer} from './slices/list'
import { _reducer as usersDeleteReducer} from './slices/delete'
import { _reducer as usersEditReducer} from './slices/edit'
import { _reducer as customersForSelectReducers} from './slices/customersForSelect.js'
import { _reducer as shippersForSelectReducers} from './slices/shippersForSelect'
import { _reducer as listForSelectReducer} from './slices/listForSelect'

export const usersReducers = {
  ...usersReducer,
  ...usersDeleteReducer,
  ...usersEditReducer,
  ...customersForSelectReducers,
  ...shippersForSelectReducers,
  ...listForSelectReducer
}

export {
  fetchDispatcher as fetchUsers,
  useSelector as useUsersListState,
  actions as usersListActions
} from './slices/list'

export {
  useSelector as useUsersEditState,
  fetchDispatcher as fetchUserForEdit,
  resetDispatcher as resetUserForEdit,
  saveDispatcher as saveUser
} from './slices/edit'

export {
  useSelector as useUsersDeleteState,
  fetchDispatcher as fetchUserForDelete,
  deleteDispatcher as deleteUser
} from './slices/delete'

export {
  fetchDispatcher as fetchCustomersForSelect,
  useSelector as useCustomersForSelect,
  actions as customersForSelectActions
} from './slices/customersForSelect'

export {
  fetchDispatcher as fetchShippersForSelect,
  useSelector as useShippersForSelect,
  actions as shippersForSelectActions
} from './slices/shippersForSelect'

export {
  useSelector as useUsersForSelect,
  fetchDispatcher as fetchUsersForSelect,
  actions as usersForSelectActions
} from './slices/listForSelect'