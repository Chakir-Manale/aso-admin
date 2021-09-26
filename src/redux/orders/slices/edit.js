import {getSlice, useCustomSelector} from "../../helpers";
import * as API from "../api";
import {MODULES} from "../../../_ae/helpers/RoutingHelpers";
import {PAYMENT_STATUSES} from "../../../app/modules/Orders/components/PaymentStatus";

export const defaultOrderPackLine = {
  qty: 1,
  pack: undefined
}

export const defaultOrderVariantLine = {
  qty: 1,
  variant: undefined
}


export const defaultObject = {
  createdBy: null,
  shipper: null,
  orderPackLines: [
    defaultOrderPackLine
  ],
  orderVariantLines: [
    defaultOrderVariantLine
  ],
  line1: '',
  line2: '',
  fullName: '',
  email: '',
  phoneNumber: '',
  paymentStatus: null,
  deliveryStatus: null,
}

const {actions, name, reducer} = getSlice({
  name: `${MODULES.ORDERS}.EDIT`,
  data: defaultObject
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
