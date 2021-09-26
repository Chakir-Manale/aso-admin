import React from "react";
import {AEAutocompleteField} from "../../../../_metronic/_partials/controls/forms/AEField";
import {getPaymentStatusKeys, PaymentStatus} from "./PaymentStatus";
import {useIntl} from "react-intl";
import {DeliveryStatus, getDeliveryStatusKeys} from "./DeliveryStatus";

export const DeliveryStatusField = ({...props}) => {
  const {formatMessage} = useIntl()

  return (
    <AEAutocompleteField
      name={`deliveryStatus`}
      label={'DELIVERY_STATUS'}
      options={getDeliveryStatusKeys()}
      getOptionLabel={key=>formatMessage({id: key})}
      renderOption={key=><DeliveryStatus status={key}/>}
      {...props}
    />
  )
}