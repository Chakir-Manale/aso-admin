/**
 * Entry application component used to compose providers and render Routes.
 * */

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Routes } from "./Routes";
import { I18nProvider } from "../_metronic/i18n";
import { LayoutSplashScreen, MaterialThemeProvider } from "../_metronic/layout";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import {AEAlert} from "../_ae/components/toastify/AEAlert";
import store, {persistor} from "../redux/store";


export default function App({ basename }) {
  return (
    /* Provide Redux store */
    <Provider store={store}>
      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
      <PersistGate persistor={persistor} loading={<LayoutSplashScreen />}>
        {/* Add high level `Suspense` in case if was not handled inside the React tree. */}
        <React.Suspense fallback={<LayoutSplashScreen />}>
          {/* Override `basename` (e.g: `homepage` in `package.json`) */}
          <BrowserRouter basename={basename}>
            {/*This library only returns the location that has been active before the recent location change in the current window lifetime.*/}
            <MaterialThemeProvider>
              {/* Provide `react-intl` context synchronized with Redux state.  */}
              <I18nProvider>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  {/*<ToastContainer*/}
                  {/*  position="top-right"//todo*/}
                  {/*  autoClose={5000}*/}
                  {/*  hideProgressBar={false}*/}
                  {/*  newestOnTop={false}*/}
                  {/*  closeOnClick*/}
                  {/*  rtl={false}*/}
                  {/*  pauseOnFocusLoss*/}
                  {/*  draggable*/}
                  {/*  pauseOnHover*/}
                  {/*>aaa</ToastContainer>*/}
                  <AEAlert />
                  {/* Render routes with provided `Layout`. */}
                  <Routes />
                </MuiPickersUtilsProvider>
              </I18nProvider>
            </MaterialThemeProvider>
          </BrowserRouter>
        </React.Suspense>
      </PersistGate>
    </Provider>
  );
}
