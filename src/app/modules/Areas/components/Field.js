import React from "react";
import {localField} from "../../../../_ae/helpers/UIHelper";
import {fetchAreasForSelect, useAreasForSelect} from "../../../../redux/areas";
import {AEAutocompleteField} from "../../../../_metronic/_partials/controls/forms/AEField";
import {useDispatch} from "react-redux";

export const Field = ({...props}) => {
  const dispatch = useDispatch();
  const {data, isLoading, metadata} = useAreasForSelect()

  const handleSearch = search => {
    dispatch(
      fetchAreasForSelect({
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
      name="area"
      label={'AREA'}
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