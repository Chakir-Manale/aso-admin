import React from "react";
import {AEIcon} from "../../../../_ae/components/svg";
import {FormattedMessage} from "react-intl";

export const USER_STATUSES = {
  PENDING: {
    id: 'PENDING',
    icon: '/General/Shield-protected.svg',
    variant: 'light'
  },
  VERIFIED: {
    id: 'VERIFIED',
    icon: 'General/Shield-check.svg',
    variant: 'success'
  }
}

export const STATUS_KEYS = Object.keys(USER_STATUSES)

export const Status = ({id, withIcon = true, withLabel = true}) => {
  const {icon, variant} = USER_STATUSES[id];

  return (
    <>
      {
        withIcon && <AEIcon path={icon} variant={variant} />
      }
      {
        withLabel && <FormattedMessage id={id} />
      }

    </>
  )
}