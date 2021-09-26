import { _reducer as stockOrderReducer} from './slices/list'
import { _reducer as stockOrderDetailReducer} from './slices/detail'
import { _reducer as stockOrderEditReducer} from './slices/edit'
import { _reducer as listForSelectReducer} from './slices/listForSelect'

export const stockOrderReducers = {
  ...stockOrderReducer,
  ...stockOrderDetailReducer,
  ...stockOrderEditReducer,
  ...listForSelectReducer,
}

export {
  fetchDispatcher as fetchStockOrders,
  useSelector as useStockOrdersState,
  actions as stockOrdersActions
} from './slices/list'

export {
  useSelector as useStockOrdersEditState,
  fetchDispatcher as fetchStockOrderForEdit,
  resetDispatcher as resetStockOrderForEdit,
  saveDispatcher as saveStockOrder
} from './slices/edit'

export {
  useSelector as useStockOrdersDetailState,
  fetchDispatcher as fetchStockOrderForDetail,
  deleteDispatcher as deleteStockOrder
} from './slices/detail'

export {
  useSelector as useStockOrdersForSelect,
  fetchDispatcher as fetchStockOrdersForSelect,
  actions as stockOrderForSelectActions
} from './slices/listForSelect'
