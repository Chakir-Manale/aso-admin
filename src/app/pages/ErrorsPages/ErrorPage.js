import React from "react";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import "../../../_metronic/_assets/sass/pages/error/error-5.scss";
import {useIntl} from "react-intl";
import {AEButton} from "../../../_ae/components/buttons";
import {AEIcon} from "../../../_ae/components/svg";
import {AELink} from "../../../_ae/components/AELink";


export function ErrorPage({history:{push}, match:{params:{code}}}, ) {
  const {formatMessage} = useIntl()
  const f = postFix => formatMessage({id:`PAGE.ERROR.${code}.${postFix}`})
  return (
    <div className="d-flex flex-column flex-root">
      <div
        className="error error-5 d-flex flex-row-fluid bgi-size-cover bgi-position-center"
        style={{
          backgroundImage: `url(${toAbsoluteUrl("/media/error/bg5.jpg")})`,
        }}
      >
        <div className="container d-flex flex-row-fluid flex-column justify-content-md-center p-12">
          <h1 className="error-title font-weight-boldest text-primary mt-10 mt-md-0 mb-12">
            {f('TITLE')}
          </h1>
          <p className="font-weight-boldest display-4">
            {f('MESSAGE')}
          </p>
          <p className="font-size-h3" dangerouslySetInnerHTML={{__html:f('DESCRIPTION')}} />
          <div className={'d-flex'}>
            <AELink
              to={'/'}
              className="font-size-h3 btn btn-clean text-primary"
            >
              <AEIcon
                path={'/Home/Home.svg'}
                variant={"primary"}
                size={"lg"}
              />
              {formatMessage({id:'GO_HOME'})}
            </AELink>
            <AELink
              to={'/logout'}
              className="font-size-h3 btn btn-clean text-secondary"
            >
              <AEIcon
                path={'/Electric/Shutdown.svg'}
                variant={"secondary"}
                size={"lg"}
              />
              {formatMessage({id:'SIGN_OUT'})}
            </AELink>
          </div>
        </div>
      </div>
    </div>
  );
}
