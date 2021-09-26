import React from "react";
import {localField} from "../../../../_ae/helpers/UIHelper";
import {AEAutocompleteField} from "../../../../_metronic/_partials/controls/forms/AEField";
import {useDispatch} from "react-redux";
import {fetchRolesForSelect, useRolesForSelect} from "../../../../redux/roles";

export const Field = ({...props}) => {
  const dispatch = useDispatch();
  const {data, isLoading, metadata} = useRolesForSelect()

  const handleSearch = search => {
    dispatch(
      fetchRolesForSelect({
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
      name="role"
      label={'ROLE'}
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