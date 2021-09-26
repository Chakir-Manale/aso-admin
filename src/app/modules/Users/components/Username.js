import React from "react";
import {CONFIG} from "../../../../_ae/config";
import {AELabel} from "../../../../_ae/components/AELabel";



export const getUsername = ({username}) => {
  return `${username}`
}

export const Username = ({user, fontSize='md', fontWeight='bold'})=>{
  return (
    <span className={`font-size-${fontSize} font-weight-${fontWeight}`}>
      @{getUsername(user)}
    </span>
  )
}