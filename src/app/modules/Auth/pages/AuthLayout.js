/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {Link} from "react-router-dom";
import {toAbsoluteUrl} from "../../../../_metronic/_helpers";
import "../../../../_metronic/_assets/sass/pages/login/login-3.scss";
import {useIntl} from "react-intl";
import {SITE_NAME} from "../../../../_ae/helpers/UIHelper";

export function AuthLayout({children}) {
  const {formatMessage} = useIntl();
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/*begin::Login*/}
        <div
          className="login login-3 wizard d-flex flex-column flex-lg-row flex-column-fluid"
          id="kt_login"
        >
          <div className="login-aside d-flex flex-column flex-row-auto">
            <div className="d-flex flex-column-auto flex-column">
              <Link to="/" className="login-logo text-center py-5">
                <img
                  alt="Logo"
                  className="max-h-100px"
                  src={toAbsoluteUrl("/media/logos/Logo2.png")}
                />
              </Link>
              <h3 className="font-weight-bolder text-center font-size-h3 text-dark-50 line-height-xl py-10">
                {formatMessage({id:"AUTH.WELCOME.TITLE"},{name:SITE_NAME})}
              </h3>
            </div>
            <div className="aside-img d-flex flex-row-fluid bgi-no-repeat bgi-position-x-center"
                 style={{
                   backgroundImage: `url(${toAbsoluteUrl("/media/svg/illustrations/login-visual-1.svg")})`,
                   // backgroundColor: "#F2C98A",
                   backgroundPositionY: 'calc(100% + 0rem)',
                 }}
            />
          </div>

          {/*begin::Content*/}
          <div className="login-content flex-row-fluid d-flex flex-column p-10">


            {/* begin::Content body */}
            <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
              {children}
            </div>
            {/*end::Content body*/}

            {/* begin::Mobile footer */}
            <div
              className="d-flex d-lg-none flex-column-auto flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
              <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">
                &copy; 2021 {SITE_NAME}-MC
              </div>
              <div className="d-flex order-1 order-sm-2 my-2">
                {/*<Link to="/terms" className="text-dark-75 text-hover-primary">*/}
                {/*  {formatMessage({id:"PRIVACY"})}*/}
                {/*</Link>*/}
                {/*<Link*/}
                {/*  to="/terms"*/}
                {/*  className="text-dark-75 text-hover-primary ml-4"*/}
                {/*>*/}
                {/*  {formatMessage({id:"PRIVACY"})}*/}
                {/*</Link>*/}
                {/*<Link*/}
                {/*  to="/terms"*/}
                {/*  className="text-dark-75 text-hover-primary ml-4"*/}
                {/*>*/}
                {/*  {formatMessage({id:"CONTACT"})}*/}
                {/*</Link>*/}
              </div>
            </div>
            {/* end::Mobile footer */}
          </div>
          {/*end::Content*/}
        </div>
        {/*end::Login*/}
      </div>
    </>
  );
}
