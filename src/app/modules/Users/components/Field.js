import React from "react";
import {localField} from "../../../../_ae/helpers/UIHelper";
import {fetchUsersForSelect, useUsersForSelect} from "../../../../redux/users";
import {AEAutocompleteField} from "../../../../_metronic/_partials/controls/forms/AEField";
import {useDispatch} from "react-redux";

export const Field = ({...props}) => {
  const dispatch = useDispatch();
  const {data, isLoading, metadata} = useUsersForSelect()

  const handleSearch = search => {
    dispatch(
      fetchUsersForSelect({
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
      name="user"
      label={'USER'}
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