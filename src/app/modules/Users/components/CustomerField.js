import React from "react";
import {AEAutocompleteField} from "../../../../_metronic/_partials/controls/forms/AEField";
import {useDispatch} from "react-redux";
import {fetchCustomersForSelect, useCustomersForSelect} from "../../../../redux/users";
import {getFullName} from "./FullName";
import {CONFIG} from "../../../../_ae/config";

export const CustomerField = ({...props}) => {
  const dispatch = useDispatch();
  const {data, metadata, isLoading} = useCustomersForSelect()

  const handleSearch = search => {
    dispatch(
      fetchCustomersForSelect({
        ...metadata,
        filters: {
          ...metadata.filters,
          search
        }
      })
    )
  }

  return (
    <AEAutocompleteField
      name='customer'
      label={CONFIG.ROLES.CUSTOMER}
      options={data}
      getOptionLabel={getFullName}
      onOpen={()=>{
        handleSearch('')
      }}
      onInputChange={(event, search) => {
        handleSearch(search)
      }}
      loading={isLoading}
      {...props}
    />
  )
}