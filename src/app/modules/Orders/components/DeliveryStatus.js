import React from "react";
import {AELabel} from "../../../../_ae/components/AELabel";
import {FormattedMessage} from "react-intl";

export const DELIVERY_STATUSES = {
  PROCESSING: {
    key: 'PROCESSING',
    variant: 'light-warning',
  },
  AWAITING_SHIPMENT: {
    key: 'AWAITING_SHIPMENT',
    variant: 'light-info',
  },
  SHIPPED: {
    key: 'SHIPPED',
    variant: 'info',
  },
  AWAITING_PICKUP: {
    key: 'AWAITING_PICKUP',
    variant: 'light-success',
  },
  RETURNED: {
    key: 'RETURNED',
    variant: 'warning',
  },
  COMPLETED: {
    key: 'COMPLETED',
    variant: 'success',
  },
  CANCELLED: {
    key: 'CANCELLED',
    variant: 'dark',
  },
}

export const getDeliveryStatusKeys = () => Object.values(DELIVERY_STATUSES).map(({key})=>key)
export const deliveryStatusKeyExist = key => getDeliveryStatusKeys().includes(key)

export const DeliveryStatus = ({status = DELIVERY_STATUSES.PROCESSING.key, ...props})=>{
  if (! deliveryStatusKeyExist(status)) {
    return null;
  }
  const {key, variant} = DELIVERY_STATUSES[status];

  return (
    <AELabel variant={variant} {...props}>
      <FormattedMessage id={key} />
    </AELabel>
  )
}