import {OverlayTrigger, Tooltip} from "react-bootstrap";
import React from "react";
import {getConfig} from "../_metronic/i18n";


export const AEOverlayTrigger = ({children, placement,...props})=>{
  const {rtl} = getConfig();
  return (
    <OverlayTrigger
      placement={placement ? placement : rtl ? 'left':'right'}
      {...props}
    >
      {children}
    </OverlayTrigger>
  )
}