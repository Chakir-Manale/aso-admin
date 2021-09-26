import React from "react";

export const Name = ({entity, fontSize='md', fontWeight='bold'})=>{
  return (
    <span className={`font-size-${fontSize} font-weight-${fontWeight}`}>
      {entity.number}
    </span>
  )
}