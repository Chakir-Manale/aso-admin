import React from "react";
import {AEAutocompleteField} from "../../../../_metronic/_partials/controls/forms/AEField";
import {useDispatch} from "react-redux";
import {fetchShippersForSelect, useShippersForSelect} from "../../../../redux/users";
import {getFullName} from "./FullName";
import {CONFIG} from "../../../../_ae/config";
import {UserEntityCard} from "../index";

export const ShipperField = ({...props}) => {
  const dispatch = useDispatch();
  const {data, metadata, isLoading} = useShippersForSelect()

  const handleSearch = search => {
    dispatch(
      fetchShippersForSelect({
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
      name='shipper'
      label={CONFIG.ROLES.SHIPPER}
      options={data}
      getOptionLabel={getFullName}
      onOpen={()=>{
        handleSearch('')
      }}
      onInputChange={(event, search) => {
        handleSearch(search)
      }}
      renderOption={user=>(
        <UserEntityCard
          entity={user}
          size={'xs'}
          avatar
          className={'card-border bg-transparent m-0 border-0'}
        />
      )}
      loading={isLoading}
      {...props}
    />
  )
}