import { _reducer as attributesReducer} from './slices/list'
import { _reducer as attributesDeleteReducer} from './slices/delete'
import { _reducer as attributesEditReducer} from './slices/edit'
import { _reducer as attributesForSelectReducer} from './slices/listForSelect'

export const attributesReducers = {
  ...attributesReducer,
  ...attributesDeleteReducer,
  ...attributesEditReducer,
  ...attributesForSelectReducer,
}

export {
  fetchDispatcher as fetchAttributes,
  useSelector as useAttributesState,
  actions as attributesActions
} from './slices/list'

export {
  useSelector as useAttributesEditState,
  fetchDispatcher as fetchAttributeForEdit,
  resetDispatcher as resetAttributeForEdit,
  saveDispatcher as saveAttribute
} from './slices/edit'

export {
  useSelector as useAttributesDeleteState,
  fetchDispatcher as fetchAttributeForDelete,
  deleteDispatcher as deleteAttribute
} from './slices/delete'

export {
  useSelector as useAttributesForSelect,
  fetchDispatcher as fetchAttributesForSelect,
  actions as attributesForSelectActions
} from './slices/listForSelect'