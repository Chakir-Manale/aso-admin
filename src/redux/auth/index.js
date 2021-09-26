import { _reducer as authEditProfileReducer} from './slices/editProfile'
import { _reducer as authEditPasswordReducer} from './slices/editPassword'

export const authReducers = {
  ...authEditProfileReducer,
  ...authEditPasswordReducer,
}

export {
  useSelector as useProfileEditState,
  fetchDispatcher as fetchProfileForEdit,
  resetDispatcher as resetProfileForEdit,
  saveDispatcher as saveProfile
} from './slices/editProfile'

export {
  useSelector as usePasswordEditState,
  resetDispatcher as resetPasswordForEdit,
  saveDispatcher as savePassword
} from './slices/editPassword'

export {
  useSelector as useAuthState
} from './authRedux'