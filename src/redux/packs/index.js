import { _reducer as listReducer} from './slices/list'
import { _reducer as deleteReducer} from './slices/delete'
import { _reducer as editReducer} from './slices/edit'
import { _reducer as listForSelectReducer} from './slices/listForSelect'

export const packsReducers = {
  ...listReducer,
  ...deleteReducer,
  ...editReducer,
  ...listForSelectReducer,
}

export {
  fetchDispatcher as fetchPacks,
  useSelector as usePacksState,
  actions as packsActions
} from './slices/list'

export {
  useSelector as usePacksEditState,
  fetchDispatcher as fetchPackForEdit,
  resetDispatcher as resetPackForEdit,
  saveDispatcher as savePack
} from './slices/edit'

export {
  useSelector as usePacksDeleteState,
  fetchDispatcher as fetchPackForDelete,
  deleteDispatcher as deletePack
} from './slices/delete'

export {
  useSelector as usePacksForSelect,
  fetchDispatcher as fetchPacksForSelect,
  actions as packsForSelectActions
} from './slices/listForSelect'