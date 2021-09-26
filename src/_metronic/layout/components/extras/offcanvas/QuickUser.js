/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,no-undef */
import React from "react";
import SVG from "react-inlinesvg";
import {Link, useHistory} from "react-router-dom";
import {toAbsoluteUrl} from "../../../../_helpers";
import {AEButton} from "../../../../../_ae/components/buttons";
import {injectIntl, useIntl} from "react-intl";
import {connect, shallowEqual, useSelector} from "react-redux";
import * as auth from "../../../../../redux/auth/authRedux";
import {AEIcon, ICONS} from "../../../../../_ae/components/svg";
import {getConfig, setRole, useLang} from "../../../../i18n";
import {AEShareButtons} from "../../../../../_ae/components/AEShareButtons";
import {localField} from "../../../../../_ae/helpers/UIHelper";
import {ROLES} from "../../../../../_ae/config";
import {AEAvatar} from "../../../../../_ae/components/AEAvatar";
import {FullName} from "../../../../../app/modules/Users/components/FullName";
import {MODULES} from "../../../../../_ae/helpers/RoutingHelpers";
import {useRoutesForAppState} from "../../../../../redux/routes";


function QuickUser_(props) {
  const history = useHistory();
  const {formatMessage} = useIntl();
  const lang = useLang();
  const {authUser} = useSelector( ({auth}) => ({ authUser:auth.user }), shallowEqual );
  const {data: routes} = useRoutesForAppState()


  const role = getConfig().role;

  const logoutClick = () => {
      const toggle = document.getElementById("kt_quick_user_toggle");

      if (toggle) {
        toggle.click();
        // setEmyRole(ROLES.CP, false)
      }
      history.push("/logout");
  };

  const Location = ({location}) => {
    const parts = [location[localField()]];
    if (location.city) {
      parts.push(location.city[localField()])
    }

    return parts.join(', ')
  }

  let propMap = [
    {svg:"/Communication/Active-call.svg", text: authUser.phone, hidden: !authUser.phone },
    {svg:"/Communication/Mail-notification.svg", text: authUser.email },
  ]
  if(authUser.location){
    propMap.push({svg:"/Map/Marker2.svg", text: <Location location={authUser.location} />, hidden: !authUser.location })
  }

  return (
      <div id="kt_quick_user" className="offcanvas offcanvas-left offcanvas p-10">
        <div className="offcanvas-header d-flex align-items-center justify-content-between pb-5">
          <h3 className="font-weight-bold m-0">
            {formatMessage({id:'LAYOUT.PANEL.USER.TITLE'})}
          </h3>
          <a
              href="#"
              className="btn btn-xs btn-icon btn-light btn-hover-primary"
              id="kt_quick_user_close"
          >
            <i className="ki ki-close icon-xs text-muted"/>
          </a>
        </div>
        <div className="offcanvas-content pr-5 mr-n5" >
          <div className="d-flex align-items-center mt-5">
            <AEAvatar
              entity={authUser}
              size={100}
              className={'mr-5'}
              >
              <i className="symbol-badge bg-success"/>
            </AEAvatar>
            {/*<div className="symbol symbol-100 mr-5" >*/}
            {/*  <div className="symbol-label" style={{*/}
            {/*    backgroundImage: `url(${toAbsoluteUrl(*/}
            {/*        "/media/users/300_21.jpg"*/}
            {/*    )})`*/}
            {/*  }}/>*/}
            {/*  <i className="symbol-badge bg-success"/>*/}
            {/*  /!*<a href="#" className="btn btn-sm btn-light-primary font-weight-bolder w-100 mt-2">Share</a>*!/*/}

            {/*</div>*/}
            <div className="d-flex flex-column">
              <a
                  href="#"
                  className="font-weight-bold font-size-h5 text-dark-75 text-hover-primary"
              >
                <FullName user={authUser} />
              </a>
              {/*<div className="text-muted mt-1">Application Developer</div>*/}
              <div className="navi mt-2">
                {
                  propMap
                    .filter(p=>!p.hidden)
                    .map(({svg, text},i)=>(
                      <a key={i} href="#" className="navi-item">
                        <span className="navi-link p-0 pb-2">
                          <span className="navi-icon mr-1">
                            <AEIcon
                              size={"lg"}
                              path={svg}
                              variant={"primary"}
                            />
                          </span>
                          <span className="navi-text text-muted text-hover-primary">
                            {text}
                          </span>
                        </span>
                      </a>
                    ))
                }

              </div>

              {/* <Link to="/logout" className="btn btn-light-primary btn-bold">
                Sign Out
              </Link> */}
              {/*<button className="btn btn-light-primary btn-bold" onClick={logoutClick}>Sign out</button>*/}
            </div>
          </div>

          <div className="separator separator-dashed mt-8 mb-5"/>

          <div className={`navi navi-spacer-x-0 p-0`}>
            {
              routes
                .filter(route=>route.context === MODULES.PROFILE)
                .map(({id, routeKey, path, svg}, index)=>(
                <a key={id} href={path} className="navi-item">
                  <div className={`navi-link`}>
                    <div className="symbol symbol-40 bg-light mr-3">
                      <div className="symbol-label">
                        <AEIcon
                          path={svg}
                          size={"md"}
                        />
                      </div>
                    </div>
                    <div className="navi-text">
                      <div className={`font-weight-bold`}>{formatMessage({id: routeKey})}</div>
                      {/*<div className="text-muted">*/}
                      {/*  {formatMessage({id})}*/}
                      {/*  {" "}*/}
                      {/*</div>*/}
                    </div>
                  </div>
                </a>

              ))
            }
          </div>



          <div className="separator separator-dashed my-7"/>
          {/*<div className={'text-center'}>*/}
          {/*  {*/}
          {/*    authUser*/}
          {/*      .roles*/}
          {/*      .filter(rl=>rl !== role)*/}
          {/*      .map(rl=>(*/}
          {/*        <AEButton*/}
          {/*          key={rl}*/}
          {/*          variant={"primary"}*/}
          {/*          fontWeight={"bolder"}*/}
          {/*          onClick={ev=>{*/}
          {/*            setRole(rl);*/}
          {/*          }}*/}
          {/*          block*/}
          {/*          className={"font-size-h6 px-8 py-4 my-3 mr-3"}*/}
          {/*        >*/}
          {/*          {formatMessage({id:'SWITCH_TO'},{to:formatMessage({id: rl})})}*/}
          {/*          <AESVG*/}
          {/*            path={"/Navigation/Arrow-to-right.svg"}*/}
          {/*            size={"lg"}*/}
          {/*            // status={role !== roles.provider ? "primary" : "secondary"}*/}
          {/*            className={"ml-5"}*/}
          {/*          />*/}
          {/*        </AEButton>*/}
          {/*      ))*/}
          {/*  }*/}
          {/*  {*/}
          {/*    // authUser.roles.includes(ROLES.C) &&*/}
          {/*    // authUser.roles.includes(ROLES.A) &&*/}
          {/*    // <AEButton*/}
          {/*    //   variant={"primary"}*/}
          {/*    //   fontWeight={"bolder"}*/}
          {/*    //   onClick={ev=>{*/}
          {/*    //     // console.log("compar",role === roles.provider ? roles.client : roles.provider);*/}
          {/*    //     // console.log("current",role);*/}
          {/*    //     // console.log("next",role === roles.provider ? roles.client : roles.provider);*/}
          {/*    //     // props.switchRole(role === roles.provider ? roles.client : roles.provider)*/}
          {/*    //     setEmyRole(role === ROLES.A ? ROLES.C : ROLES.A);//todo*/}
          {/*    //   }}*/}
          {/*    //   block*/}
          {/*    //   className={"font-size-h6 px-8 py-4 my-3 mr-3"}*/}
          {/*    // >*/}
          {/*    //   {formatMessage({id:'SWITCH_TO'},{to:formatMessage({id:role === ROLES.A ? ROLES.C : ROLES.A})})}*/}
          {/*    //   <AESVG*/}
          {/*    //     path={"/Navigation/Arrow-to-right.svg"}*/}
          {/*    //     size={"lg"}*/}
          {/*    //     // status={role !== roles.provider ? "primary" : "secondary"}*/}
          {/*    //     className={"ml-5"}*/}
          {/*    //   />*/}
          {/*    // </AEButton>*/}


          {/*  }*/}




            <AEButton
              variant={"light"}
              fontWeight={"bolder"}
              block
              onClick={logoutClick}
              className={"font-size-h6 px-8 py-4 my-3 mr-3"}
            >
              {formatMessage({id:'SIGN_OUT'})}
            </AEButton>
          {/*</div>*/}
        </div>
      </div>
  );
}

export const QuickUser = injectIntl(connect(null, auth.authActions)(QuickUser_));