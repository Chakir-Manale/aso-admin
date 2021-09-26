import {toast, ToastContainer} from "react-toastify";
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import {getConfig} from "../../../_metronic/i18n";
import {useIntl} from "react-intl";

// toast.configure({
//   toastClassName: 'bg-light', // Bootstrap class
//   bodyClassName: 'bg-light-primary', // Another Bootstrap class
// });

export const AEAlert = ({variant='primary'})=>{
  const {rtl} = getConfig();

  return (
    <ToastContainer
      hideProgressBar
      toastClassName={`-bg-${variant} rounded`}
      // bodyClassName={"bg-dark"}
      // progressClassName={"bg-info"}
      rtl={rtl}
      // className={"bg-success"}
      autoClose={3000}
    />
  )
}

export const AEToaster = ({variant='danger', message, fontWeight = "bolder"})=>{
  const {formatMessage} = useIntl();

  return (
    <div className={`font-weight-${fontWeight} text-${variant}`}>
      {message.id ? formatMessage(message) : message}
    </div>
  )
}