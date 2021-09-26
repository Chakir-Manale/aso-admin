import React from "react";
import {AELabel} from "../../../../_ae/components/AELabel";



export const getFullName = ({firstName, lastName}) => {
  return `${firstName} ${lastName}`
}

export const FullName = ({user, fontSize='md', fontWeight='bold'})=>{
  return (
    <span className={`font-size-${fontSize} font-weight-${fontWeight}`}>
      {getFullName(user)}
      {
        user._code &&
          <AELabel size={fontSize}>
            {user._code}
          </AELabel>
      }
    </span>
  )
}