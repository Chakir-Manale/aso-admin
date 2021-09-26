import { _reducer as listReducer} from './slices/list'
import { _reducer as deleteReducer} from './slices/delete'
import { _reducer as editReducer} from './slices/edit'
import { _reducer as listForSelectReducer} from './slices/listForSelect'

export const postsReducers = {
  ...listReducer,
  ...deleteReducer,
  ...editReducer,
  ...listForSelectReducer,
}

export {
  fetchDispatcher as fetchPosts,
  useSelector as usePostsState,
  actions as postsActions
} from './slices/list'

export {
  useSelector as usePostsEditState,
  fetchDispatcher as fetchPostForEdit,
  resetDispatcher as resetPostForEdit,
  saveDispatcher as savePost
} from './slices/edit'

export {
  useSelector as usePostsDeleteState,
  fetchDispatcher as fetchPostForDelete,
  deleteDispatcher as deletePost
} from './slices/delete'

export {
  useSelector as usePostsForSelect,
  fetchDispatcher as fetchPostsForSelect,
  actions as postsForSelectActions
} from './slices/listForSelect'