import {toAbsoluteUrl, toEntityFileNameUrl} from "../../_metronic/_helpers";
import React from "react";
import SVG from "react-inlinesvg";
import {Tooltip} from "react-bootstrap";
import {AEOverlayTrigger} from "../AEOverlayTrigger";
import {FullName} from "../../app/modules/Users/components/FullName";
import {Username} from "../../app/modules/Users/components/Username";

export const AEAvatar = ({entity, className = '', size}) => {
  const {id, fileName} = entity

  return (
    <AEOverlayTrigger
      // key={id}
      placement={"top"}
      // trigger={["click"]}
      overlay={
        <Tooltip id={`tooltip_entity_card_proposal_user`}>
          <Username user={entity} />
        </Tooltip>}>
      <div className={`symbol symbol-${size} ${className} `}>
        {
          fileName ?
            <img src={toEntityFileNameUrl(entity, 'users')} alt={` `}/>
            :
            <span className="symbol-label">
            <SVG
              className="h-75 align-self-end"
              src={toAbsoluteUrl("/media/svg/avatars/004-boy-1.svg")}
            />
          </span>
        }
        {/*<i className="symbol-badge bg-primary"/>*/}
      </div>
    </AEOverlayTrigger>
  )
}