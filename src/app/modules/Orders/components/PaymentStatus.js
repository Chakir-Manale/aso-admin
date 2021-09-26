import React from "react";
import {AELabel} from "../../../../_ae/components/AELabel";
import {FormattedMessage} from "react-intl";

export const PAYMENT_STATUSES = {
  UNPAID: {
    key: 'UNPAID',
    variant: '',
  },
  PAID: {
    key: 'PAID',
    variant: 'success',
  },
  FAILED: {
    key: 'FAILED',
    variant: 'danger',
  },
}

export const getPaymentStatusKeys = () => Object.values(PAYMENT_STATUSES).map(({key})=>key)
export const paymentStatusKeyExist = key => getPaymentStatusKeys().includes(key)

export const PaymentStatus = ({status = PAYMENT_STATUSES.UNPAID.key, ...props})=>{
  if (! paymentStatusKeyExist(status)) {
    return null;
  }
  const {key, variant} = PAYMENT_STATUSES[status];

  return (
    <AELabel variant={variant} {...props}>
      <FormattedMessage id={key} />
    </AELabel>
  )
}