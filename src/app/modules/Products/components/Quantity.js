import React from "react";
import {AELabel} from "../../../../_ae/components/AELabel";


export const Quantity = ({value = 0}) => {
  let variant = '';
  switch (true) {
    case value <= 0:
      variant = 'danger';
      break;
    case value < 10 :
      variant = 'warning';
      break;
    default :
      variant = 'success';
      break;
  }

  return (<AELabel variant={variant}>{value}</AELabel>)
}