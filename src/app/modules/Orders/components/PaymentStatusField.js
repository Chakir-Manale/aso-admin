import React from "react";
import {AEAutocompleteField} from "../../../../_metronic/_partials/controls/forms/AEField";
import {getPaymentStatusKeys, PaymentStatus} from "./PaymentStatus";
import {useIntl} from "react-intl";

export const PaymentStatusField = ({...props}) => {
  const {formatMessage} = useIntl()

  return (
    <AEAutocompleteField
      name={`paymentStatus`}
      label={'PAYMENT_STATUS'}
      options={getPaymentStatusKeys()}
      getOptionLabel={key=>formatMessage({id: key})}
      renderOption={key=><PaymentStatus status={key}/>}
      {...props}
    />
  )
}