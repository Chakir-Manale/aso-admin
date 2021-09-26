import { _reducer as listReducer} from './slices/list'
import { _reducer as deleteReducer} from './slices/delete'
import { _reducer as editReducer} from './slices/edit'
import { _reducer as listForSelectReducer} from './slices/listForSelect'

export const variantsReducers = {
  ...listReducer,
  ...deleteReducer,
  ...editReducer,
  ...listForSelectReducer,
}

export {
  fetchDispatcher as fetchVariants,
  useSelector as useVariantsState,
  actions as variantsActions
} from './slices/list'

export {
  useSelector as useVariantsEditState,
  fetchDispatcher as fetchVariantForEdit,
  resetDispatcher as resetVariantForEdit,
  saveDispatcher as saveVariant
} from './slices/edit'

export {
  useSelector as useVariantsDeleteState,
  fetchDispatcher as fetchVariantForDelete,
  deleteDispatcher as deleteVariant
} from './slices/delete'

export {
  useSelector as useVariantsForSelect,
  fetchDispatcher as fetchVariantsForSelect,
  actions as variantsForSelectActions
} from './slices/listForSelect'