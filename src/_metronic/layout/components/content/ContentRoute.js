import React, {useEffect, useState} from "react";
import {Route, useHistory, useLocation} from "react-router-dom";
import {Content} from "./Content";
import {getConfig} from "../../../i18n";
import {ErrorPage1} from "../../../../app/pages/ErrorsPages/ErrorPage1";
import ErrorsPage from "../../../../app/pages/ErrorsPages/ErrorsPage";
import {shallowEqual, useSelector} from "react-redux";
import {ROLES} from "../../../../_ae/config";
// import {getRoutes} from "../../../../app/Routes";

export function ContentRoute( props ) {
  // console.log(props)
  const {children, component, title, path, svg, roles = [], context, render} = props;


  const {isAuthorized, user} = useSelector( ({auth}) => ({ user: auth.user, isAuthorized: auth.user != null, }), shallowEqual );
  let exist = false;
  if(isAuthorized) {
    exist = roles.filter(value => user.roles.includes(value)).length > 0
  } else {
    // exist = roles.length === 0
    exist = true
  }
  const history = useHistory()


  // console.log(isAuthorized, exist, path)

  return (
    <Route {...props}>
      {routeProps => {

        // if (! exist) {
        //   history.push('/')
        // }

        if (typeof children === "function") {
          return <Content>{children(routeProps)}</Content>;
        }

        if (!routeProps.match) {
          return null;
        }

        if (children) {
          return <Content>{children}</Content>;
        }

        if (component) {
          return (
            <Content>{React.createElement(component, routeProps)}</Content>
          );
        }

        if (render) {
          return <Content>{render(routeProps)}</Content>;
        }

        return null;
      }}
    </Route>
  );
}
