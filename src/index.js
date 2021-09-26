import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import {getConfig, MetronicI18nProvider} from "./_metronic/i18n";
import * as _redux from "./redux";
import axios from "axios";
import store, {persistor} from "./redux/store";
// 3rd-party Plugins
import "../node_modules/highlight.js/styles/googlecode.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "./_metronic/_assets/plugins/keenthemes-icons/font/ki.css";
import "socicon/css/socicon.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./_metronic/_assets/plugins/flaticon/flaticon.css";
import "./_metronic/_assets/plugins/flaticon2/flaticon.css";
import "react-datepicker/dist/react-datepicker.css";
import {HeaderProvider, MetronicLayoutProvider, MetronicSplashScreenProvider} from "./_metronic/layout";
import App from "./app/App";
// import "./sass/style.scss"

_redux.setupAxios(axios, store);

const StyleLoader = React.lazy(() => {
  const {rtl} = getConfig()

  return rtl ? import("./rtl") : import("./ltr")
});



ReactDOM.render(
  <Suspense fallback={<div/>}>
    <MetronicI18nProvider>
      <MetronicLayoutProvider>
        <HeaderProvider>
          <MetronicSplashScreenProvider>
            <StyleLoader />
            <App basename={process.env.PUBLIC_URL} />
          </MetronicSplashScreenProvider>
        </HeaderProvider>
      </MetronicLayoutProvider>
    </MetronicI18nProvider>
  </Suspense>
  ,
  document.getElementById("root")
);