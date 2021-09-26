import React from "react";
export const AECurrency = ({value = 0, currency='MAD', ...props})=>{

  return (
    <>
      { Number(value).toLocaleString() }
      {` `}
      <sup>{currency}</sup>
    </>
  )
}