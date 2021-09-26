import React from "react";
import {AEAutocompleteField} from "../../../../_metronic/_partials/controls/forms/AEField";
import {getPaymentStatusKeys, PaymentStatus} from "./PaymentStatus";
import {useIntl} from "react-intl";
import {DeliveryStatus, getDeliveryStatusKeys} from "./DeliveryStatus";
import {getPaymentMethodsKeys, PaymentMethod} from "./PaymentMethod";

export const PaymentMethodField = ({...props}) => {
  const {formatMessage} = useIntl()

  return (
    <AEAutocompleteField
      name={`paymentMethodKey`}
      label={'PAYMENT_METHOD'}
      options={getPaymentMethodsKeys()}
      getOptionLabel={key=>formatMessage({id: key})}
      renderOption={key=><PaymentMethod status={key}/>}
      {...props}
    />
  )
}