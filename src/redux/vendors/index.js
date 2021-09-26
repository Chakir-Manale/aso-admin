import { _reducer as listReducer} from './slices/list'
import { _reducer as deleteReducer} from './slices/delete'
import { _reducer as editReducer} from './slices/edit'
import { _reducer as listForSelectReducer} from './slices/listForSelect'

export const vendorsReducers = {
  ...listReducer,
  ...deleteReducer,
  ...editReducer,
  ...listForSelectReducer,
}

export {
  fetchDispatcher as fetchVendors,
  useSelector as useVendorsState,
  actions as vendorsActions
} from './slices/list'

export {
  useSelector as useVendorsEditState,
  fetchDispatcher as fetchVendorForEdit,
  resetDispatcher as resetVendorForEdit,
  saveDispatcher as saveVendor
} from './slices/edit'

export {
  useSelector as useVendorsDeleteState,
  fetchDispatcher as fetchVendorForDelete,
  deleteDispatcher as deleteVendor
} from './slices/delete'

export {
  useSelector as useVendorsForSelect,
  fetchDispatcher as fetchVendorsForSelect,
  actions as vendorsForSelectActions
} from './slices/listForSelect'