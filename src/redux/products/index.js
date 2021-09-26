import { _reducer as productsReducer} from './slices/list'
import { _reducer as productsDeleteReducer} from './slices/delete'
import { _reducer as productsEditReducer} from './slices/edit'
import { _reducer as productsDetailReducer} from './slices/detail'
import { _reducer as listForSelectReducer} from './slices/listForSelect'

export const productsReducers = {
  ...productsReducer,
  ...productsDeleteReducer,
  ...productsEditReducer,
  ...productsDetailReducer,
  ...listForSelectReducer,
}

export {
  fetchDispatcher as fetchProducts,
  useSelector as useProductsState,
  actions as productsActions
} from './slices/list'

export {
  useSelector as useProductsEditState,
  fetchDispatcher as fetchProductForEdit,
  resetDispatcher as resetProductForEdit,
  saveDispatcher as saveProduct
} from './slices/edit'

export {
  useSelector as useProductsDeleteState,
  fetchDispatcher as fetchProductForDelete,
  deleteDispatcher as deleteProduct
} from './slices/delete'

export {
  useSelector as useProductsDetailState,
  resetDispatcher as resetProductForDetail,
  fetchDispatcher as fetchProductForDetail,
} from './slices/detail'

export {
  useSelector as useProductsForSelect,
  fetchDispatcher as fetchProductsForSelect,
  actions as productsForSelectActions
} from './slices/listForSelect'