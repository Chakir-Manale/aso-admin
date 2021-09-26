import React from "react";
import {localField} from "../../../../_ae/helpers/UIHelper";

export const Name = ({entity, fontSize='md', fontWeight='bold'})=>{
  return (
    <span className={`font-size-${fontSize} font-weight-${fontWeight}`}>
      {entity[localField('name')]}
    </span>
  )
}