import { _reducer as listReducer} from './slices/list'
import { _reducer as deleteReducer} from './slices/delete'
import { _reducer as editReducer} from './slices/edit'
import { _reducer as listForSelectReducer} from './slices/listForSelect'

export const bannersReducers = {
  ...listReducer,
  ...deleteReducer,
  ...editReducer,
  ...listForSelectReducer,
}

export {
  fetchDispatcher as fetchBanners,
  useSelector as useBannersState,
  actions as bannersActions
} from './slices/list'

export {
  useSelector as useBannersEditState,
  fetchDispatcher as fetchBannerForEdit,
  resetDispatcher as resetBannerForEdit,
  saveDispatcher as saveBanner
} from './slices/edit'

export {
  useSelector as useBannersDeleteState,
  fetchDispatcher as fetchBannerForDelete,
  deleteDispatcher as deleteBanner
} from './slices/delete'

export {
  useSelector as useBannersForSelect,
  fetchDispatcher as fetchBannersForSelect,
  actions as bannersForSelectActions
} from './slices/listForSelect'