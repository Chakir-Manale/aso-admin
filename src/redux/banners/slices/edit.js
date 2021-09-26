import {getSlice, useCustomSelector} from "../../helpers";
import * as API from "../api";
import {MODULES} from "../../../_ae/helpers/RoutingHelpers";
import {BLOCK_KEYS} from "../../../app/modules/Banners/components/Block";
import moment from "moment";

export const defaultObject = {
  blockKey: BLOCK_KEYS.HOME_SLIDER,
  titleFr: '',
  subTitleFr: '',
  linkUrl: '',
  linkTextFr: '',
  priority: 0,
  startAt: moment().format('YYYY-MM-DD HH:mm:00'),
  endAt: undefined
}

const {actions, name, reducer} = getSlice({
  name: `${MODULES.BANNERS}.EDIT`,
  data: defaultObject,
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
