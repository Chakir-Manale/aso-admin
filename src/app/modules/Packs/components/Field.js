import React from "react";
import {localField} from "../../../../_ae/helpers/UIHelper";
import {fetchPacksForSelect, usePacksForSelect} from "../../../../redux/packs";
import {AEAutocompleteField} from "../../../../_metronic/_partials/controls/forms/AEField";
import {useDispatch} from "react-redux";

export const Field = ({...props}) => {
  const dispatch = useDispatch();
  const {data, isLoading, metadata} = usePacksForSelect()

  const handleSearch = search => {
    dispatch(
      fetchPacksForSelect({
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
      name="pack"
      label={'PACK'}
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