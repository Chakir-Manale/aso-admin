import React from "react";
import {AEIcon, ICONS} from "../../../../_ae/components/svg";
import {FormattedMessage, useIntl} from "react-intl";
import {Tooltip} from "react-bootstrap";
import {FullName} from "./FullName";
import {toAbsoluteUrl, toEntityFileNameUrl} from "../../../../_metronic/_helpers";
import SVG from "react-inlinesvg";
import {AEOverlayTrigger} from "../../../../_ae/AEOverlayTrigger";

export const GENDER = {
  MALE: {
    key: 'MALE',
    icon: ICONS.MALE,
  },
  FEMALE: {
    key: 'FEMALE',
    icon: ICONS.FEMALE
  }
}

export const GENDER_KEYS = Object.values(GENDER).map(o=>o.key)

export const Gender = ({id, showTitle}) => {
  const {icon} = GENDER[id]
  return (
    <>
      <AEOverlayTrigger
        placement={"top"}
        // trigger={["click"]}
        overlay={
          <Tooltip id={`tooltip_gender_${id}`}>
            <FormattedMessage id={id} />
          </Tooltip>}
      >
        <AEIcon
          variant={'dark'}
          path={icon}
        />
      </AEOverlayTrigger>
      { showTitle && <FormattedMessage id={id} /> }
    </>
  )
}