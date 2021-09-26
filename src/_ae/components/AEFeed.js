import {toAbsoluteUrl} from "../../_metronic/_helpers";
import React from "react";
import {AEMoment} from "./moment";
import {useIntl} from "react-intl";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {AERole} from "./AERole";
import {AEIcon} from "./svg";
import {AEButton} from "./buttons";
import {AERating} from "./rating";
import {ROLES} from "../config";

export const AEFeed = ({entity, updateCallback, isAuthor = false }) => {
  const {formatMessage} = useIntl();
  const {id, created_by, message, createdAt, enabled,
    rating
  } = entity; //avatar

  return (
    <div className="d-flex pt-5">
      <div className="symbol symbol-40 symbol-light-success mr-5 mt-1">
        <span className="symbol-label">
          <img src={toAbsoluteUrl("/media/svg/avatars/009-boy-4.svg")} className="h-75 align-self-end" alt=""/>
        </span>
        {/*{*/}
        {/*  isAuthor &&*/}
        {/*  <small className="text-primary pr-2">{formatMessage({id:"AUTHOR"})}</small>*/}
        {/*  // <span className="text-muted text-danger font-weight-normal font-size-sm">{formatMessage({id:"DISABLED"})}</span>*/}
        {/*}*/}
      </div>
      <div className="d-flex flex-column flex-row-fluid">
        <div className="d-flex align-items-center flex-wrap">
          <a href="#" className={`text-dark-75 text-hover-primary font-size-lg font-weight-bolder pr-2 ${isAuthor ? 'text-primary':''}`}>
            {created_by.username}
          </a>
          {
            rating !== undefined && <AERating value={rating} />
          }
          {
            isAuthor &&
            <small className="text-primary pr-2">{formatMessage({id:"AUTHOR"})}</small>
            // <span className="text-muted text-danger font-weight-normal font-size-sm">{formatMessage({id:"DISABLED"})}</span>
          }
          {
            updateCallback &&
            <AERole roles={[/*ROLES.CUSTOMER*/]}>
              {
                <AEButton variant={"link"} icon onClick={updateCallback}
                >
                  <AEIcon path={`/General/${enabled ? "Visible":"Hidden"}.svg`} variant={"danger"} className={"pr-2"}/>
                </AEButton>
              }
            </AERole>
          }





          <AEMoment date={createdAt} className="text-muted font-weight-normal font-size-sm pr-2 ml-auto"/>
          {/*<span className="text-muted font-weight-normal font-size-sm">*/}
          {/*  <AEMoment date={createdAt} />*/}
          {/*</span>*/}

          {/*<AERole roles={[roles.super_admin]}>*/}
          {/*  {*/}
          {/*    !enabled &&*/}
          {/*    <AESVG path={`/General/Hidden.svg`} variant={"danger"}/>*/}
          {/*    // <span className="label label-warning label-sm label-inline">{formatMessage({id:"DISABLED"})}</span>*/}
          {/*    // <span className="text-muted text-danger font-weight-normal font-size-sm">{formatMessage({id:"DISABLED"})}</span>*/}
          {/*  }*/}
          {/*</AERole>*/}

          {/*{*/}
          {/*  isAuthor &&*/}
          {/*  <span className="label label-primary label-sm label-inline">{formatMessage({id:"AUTHOR"})}</span>*/}
          {/*  // <span className="text-muted text-danger font-weight-normal font-size-sm">{formatMessage({id:"DISABLED"})}</span>*/}
          {/*}*/}

          {/*<span className="label label-danger label-sm label-inline">{formatMessage({id:"DISABLED"})}</span>*/}

        </div>
        <span className="text-dark-75 font-size-sm font-weight-normal pt-1">{message}</span>

      </div>
    </div>
  )
}