import {toAbsoluteUrl} from "../../_metronic/_helpers";
import React from "react";
import "./emyloder.css"
import {useIntl} from "react-intl";

export const AESpinner = (props) => {
  const {formatMessage} = useIntl();

  const m = formatMessage({id:'LOADING'})
  return (
    <div {...props}>
      {/*<span className="pl-3 font-weight-bolder">{m}</span>*/}
      <img
        src={toAbsoluteUrl('/media/logos/Logo.png')}
        className="rotate max-h-15px" alt={m}
      />

    </div>

  )
}
