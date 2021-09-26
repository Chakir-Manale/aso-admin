import React from "react";
import {AEAutocompleteField} from "../../../../_metronic/_partials/controls/forms/AEField";
import {getBlockKeys} from "./Block";
import {useIntl} from "react-intl";

export const BlockKeyField = ({...props}) => {
  const {formatMessage} = useIntl()

  return (
    <AEAutocompleteField
      name="blockKey"
      label={'BLOCK'}
      options={getBlockKeys()}
      getOptionLabel={id=>formatMessage({id})}
      {...props}
    />
  )
}