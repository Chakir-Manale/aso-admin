import {getSlice, useCustomSelector} from "../../helpers";
import * as API from "../api";
import {MODULES} from "../../../_ae/helpers/RoutingHelpers";
import {GENDER} from "../../../app/modules/Users/components/Gender";

export const defaultPhoneNumbers = {
  phoneNumber: '+212 '
}

export const defaultAddress = {
  area: null,
  line1: '',
  line2: '',
  fullName: '',
  email: '',
  phoneNumber: '+212 '
}

export const defaultUser = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  // status: USER_STATUSES.VERIFIED.id,
  role: null,
  assignedTo: null,
  gender: GENDER.MALE.key,
  birthDate: undefined,
  dispatcherCode: null,
  password: '',
  phoneNumbers: [
    // defaultPhoneNumbers
  ],
  addresses: [
    // defaultAddress
  ],
}

const {actions, name, reducer} = getSlice({
  name: `${MODULES.USERS}.EDIT`,
  data: {
    ...defaultUser,
    _confirm: '',
  }
})

const {startCall, endCall, fetched, catchError, reset} = actions;

const resetDispatcher = () => dispatch => {
  dispatch(reset());
}

const fetchDispatcher = (id, metadata) => dispatch => {
  dispatch(startCall());

  return API
    .find(id, metadata)
    .then(response => {
      dispatch(fetched(response));
    })
    .catch(response => {
      dispatch(catchError(response));
    }).then(response => {
      dispatch(endCall(response));
    })
    ;
};

const saveDispatcher = (entity, files) => dispatch => {
  dispatch(startCall());

  const ApiCall = entity.id ?
    API.update:
    API.create;

  return ApiCall(entity, files)
    .then(response => {
      dispatch(
        entity.id ?
          fetched(response) :
          endCall(response)
      );
    })
    .catch(response => {
      dispatch(catchError(response));
    }).then(response => {
      dispatch(endCall(response));
    })
    ;
};

const useSelector = () => useCustomSelector(name)

const _reducer = {
  [name]: reducer
}

export {
  fetchDispatcher,
  resetDispatcher,
  saveDispatcher,
  useSelector,
  _reducer
}
