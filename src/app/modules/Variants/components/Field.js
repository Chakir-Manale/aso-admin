import React from "react";
import {localField} from "../../../../_ae/helpers/UIHelper";
import {fetchVariantsForSelect, useVariantsForSelect} from "../../../../redux/variants";
import {AEAutocompleteField} from "../../../../_metronic/_partials/controls/forms/AEField";
import {useDispatch} from "react-redux";

export const Field = ({...props}) => {
  const dispatch = useDispatch();
  const {data, isLoading, metadata} = useVariantsForSelect()

  const handleSearch = search => {
    dispatch(
      fetchVariantsForSelect({
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
      name="variant"
      label={'VARIANT'}
      options={data}
      getOptionLabel={option=>option[localField()]}
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