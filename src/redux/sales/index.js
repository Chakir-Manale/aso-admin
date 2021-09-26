import { _reducer as listReducer} from './slices/list'
import { _reducer as deleteReducer} from './slices/delete'
import { _reducer as editReducer} from './slices/edit'
import { _reducer as listForSelectReducer} from './slices/listForSelect'

export const salesReducers = {
  ...listReducer,
  ...deleteReducer,
  ...editReducer,
  ...listForSelectReducer,
}

export {
  fetchDispatcher as fetchSales,
  useSelector as useSalesState,
  actions as salesActions
} from './slices/list'

export {
  useSelector as useSalesEditState,
  fetchDispatcher as fetchSaleForEdit,
  resetDispatcher as resetSaleForEdit,
  saveDispatcher as saveSale
} from './slices/edit'

export {
  useSelector as useSalesDeleteState,
  fetchDispatcher as fetchSaleForDelete,
  deleteDispatcher as deleteSale
} from './slices/delete'

export {
  useSelector as useSalesForSelect,
  fetchDispatcher as fetchSalesForSelect,
  actions as salesForSelectActions
} from './slices/listForSelect'
