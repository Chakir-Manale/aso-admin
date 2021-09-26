import { _reducer as listReducer} from './slices/list'
import { _reducer as editReducer} from './slices/edit'
import { _reducer as detailReducer} from './slices/detail'
import { _reducer as listForSelectReducer} from './slices/listForSelect'

export const ordersReducers = {
  ...listReducer,
  ...editReducer,
  ...detailReducer,
  ...listForSelectReducer,
}

export {
  fetchDispatcher as fetchOrders,
  useSelector as useOrdersState,
  actions as ordersActions
} from './slices/list'

export {
  useSelector as useOrdersEditState,
  fetchDispatcher as fetchOrderForEdit,
  resetDispatcher as resetOrderForEdit,
  saveDispatcher as saveOrder
} from './slices/edit'

export {
  useSelector as useOrdersDetailState,
  fetchDispatcher as fetchOrderForDetail
} from './slices/detail'

export {
  useSelector as useOrdersForSelect,
  fetchDispatcher as fetchOrdersForSelect,
  actions as ordersForSelectActions
} from './slices/listForSelect'