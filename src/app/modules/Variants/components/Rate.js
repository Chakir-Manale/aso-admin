import React from "react";

export const Rate = ({rate, sup = '%'}) => {

  return (
    <>
      {rate.toFixed(2)}
      <sup>{sup}</sup>
    </>
  )
}