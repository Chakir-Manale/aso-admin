import React from "react";
import {localField} from "../../../../_ae/helpers/UIHelper";
import {AELabel} from "../../../../_ae/components/AELabel";
import {FormattedMessage, useIntl} from "react-intl";

export const BLOCK_KEYS = {
  HOME_SLIDER: 'HOME.SLIDER',
  HOME_SIDEBAR: 'HOME.SIDEBAR',
  HOME_GROUP1: 'HOME.GROUP1',
  HOME_GROUP2: 'HOME.GROUP2',
}

export const getBlockKeys = ()=>Object.values(BLOCK_KEYS)

export const Block = ({id, ...props})=>{
  return (
    <AELabel {...props}>
      <FormattedMessage id={id} />
    </AELabel>
  )
}