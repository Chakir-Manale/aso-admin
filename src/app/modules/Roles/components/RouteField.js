import React from "react";
import {AEAutocompleteField} from "../../../../_metronic/_partials/controls/forms/AEField";
import {useRoutesForAppState} from "../../../../redux/routes";
import {FormattedMessage, useIntl} from "react-intl";
import {createFilterOptions} from "@material-ui/lab";
import {AEIcon} from "../../../../_ae/components/svg";
import {Chip} from "@material-ui/core";

const Option = ({option, icon}) => (
  <div className={'d-flex'}>
    {
      icon &&
      <div className={'pr-2'}>
        <AEIcon
          variant={'primary'}
          path={option.svg}
        />
      </div>
    }

    <div>
      <FormattedMessage id={option.routeKey} />
    </div>
  </div>
)

export const RouteField = ({...props}) => {
  const {formatMessage} = useIntl();
  const {data, isLoading} = useRoutesForAppState()

  const filterOptions = createFilterOptions({
    stringify: option => formatMessage({id: option.routeKey}),
  });

  return (
    <AEAutocompleteField
      name="route"
      label={'ROUTE'}
      options={data}
      getOptionLabel={o=>formatMessage({id: o.routeKey})}
      loading={isLoading}
      filterOptions={filterOptions}
      groupBy={(option) => formatMessage({id: option.context.toUpperCase()})}
      renderOption={o=><Option option={o} icon/>}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((o, index) => (
          <Chip
            size={'small'}
            variant="outlined"
            // color={'primary'}
            icon={(
              <AEIcon
                variant={'primary'}
                path={o.svg}
              />
            )}
            label={<Option option={o} />}
            {...getTagProps({ index })}
          />
        ))
      }
      {...props}
    />
  )
}