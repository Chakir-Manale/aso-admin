import { _reducer as listReducer} from './slices/list'
import { _reducer as deleteReducer} from './slices/delete'
import { _reducer as editReducer} from './slices/edit'
import { _reducer as listForSelectReducer} from './slices/listForSelect'

export const categoriesReducers = {
  ...listReducer,
  ...deleteReducer,
  ...editReducer,
  ...listForSelectReducer,
}

export {
  fetchDispatcher as fetchCategories,
  useSelector as useCategoriesState,
  actions as categoriesActions
} from './slices/list'

export {
  useSelector as useCategoriesEditState,
  fetchDispatcher as fetchCategoryForEdit,
  resetDispatcher as resetCategoryForEdit,
  saveDispatcher as saveCategory
} from './slices/edit'

export {
  useSelector as useCategoriesDeleteState,
  fetchDispatcher as fetchCategoryForDelete,
  deleteDispatcher as deleteCategory
} from './slices/delete'


export {
  useSelector as useCategoriesForSelect,
  fetchDispatcher as fetchCategoriesForSelect,
  actions as categoriesForSelectActions
} from './slices/listForSelect'