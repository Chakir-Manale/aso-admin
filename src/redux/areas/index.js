import { _reducer as areasReducer} from './slices/list'
import { _reducer as areasDeleteReducer} from './slices/delete'
import { _reducer as areasEditReducer} from './slices/edit'
import { _reducer as areasForSelectReducer} from './slices/listForSelect'

export const areasReducers = {
  ...areasReducer,
  ...areasDeleteReducer,
  ...areasEditReducer,
  ...areasForSelectReducer
}

export {
  fetchDispatcher as fetchAreas,
  useSelector as useAreasState,
  actions as areasActions
} from './slices/list'

export {
  useSelector as useAreasEditState,
  fetchDispatcher as fetchAreaForEdit,
  resetDispatcher as resetAreaForEdit,
  saveDispatcher as saveArea
} from './slices/edit'

export {
  useSelector as useAreasDeleteState,
  fetchDispatcher as fetchAreaForDelete,
  deleteDispatcher as deleteArea
} from './slices/delete'

export {
  useSelector as useAreasForSelect,
  fetchDispatcher as fetchAreasForSelect,
  actions as areasForSelectActions
} from './slices/listForSelect'