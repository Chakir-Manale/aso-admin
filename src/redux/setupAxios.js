import {
  HTTP_UPDATED,
  HTTP_CREATED,
  HTTP_INVALID_ENTITY,
  HTTP_DELETED,
} from "../_ae/helpers/AxiosHelpers";
import {getIntlMessage} from "../_metronic/i18n";
import {toast} from "react-toastify";
import {AEToaster} from "../_ae/components/toastify/AEAlert";
import React from "react";

export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    config => {
      const {
        auth: {token}
      } = store.getState();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    err => Promise.reject(err)
  );

  axios.interceptors.response.use(function (response) {
    if([HTTP_CREATED, HTTP_UPDATED, HTTP_DELETED].includes(response.status)) {
      toast(<AEToaster variant={"success"} message={{id:`VALIDATION.HTTP_MESSAGE.${response.status}`}}/>)
    }
    return response;
  }, (error)=> {
    let {status, data} = error.response;
    const m = data.message ? data.message : `VALIDATION.HTTP_MESSAGE.${status}`
    toast(<AEToaster variant={"danger"} message={{id:m}}/>)

    switch (status){
      case HTTP_INVALID_ENTITY:{
        let err = {}
        Object.keys(data).forEach((k)=>{ err[k] = getIntlMessage({id:data[k][0]}) });
        data = err;
      } break;
    }
    return Promise.reject(error);
  })
}
