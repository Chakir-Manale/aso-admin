import { _reducer as listReducer} from './slices/list'
import { _reducer as deleteReducer} from './slices/delete'
import { _reducer as editReducer} from './slices/edit'
import { _reducer as listForSelectReducer} from './slices/listForSelect'

export const rolesReducers = {
  ...listReducer,
  ...deleteReducer,
  ...editReducer,
  ...listForSelectReducer,
}

export {
  fetchDispatcher as fetchRoles,
  useSelector as useRolesList,
  actions as rolesActions
} from './slices/list'

export {
  useSelector as useRolesEdit,
  fetchDispatcher as fetchRoleForEdit,
  resetDispatcher as resetRoleForEdit,
  saveDispatcher as saveRole
} from './slices/edit'

export {
  useSelector as useRolesDelete,
  fetchDispatcher as fetchRoleForDelete,
  deleteDispatcher as deleteRole
} from './slices/delete'

export {
  useSelector as useRolesForSelect,
  fetchDispatcher as fetchRolesForSelect,
  actions as rolesForSelectActions
} from './slices/listForSelect'
