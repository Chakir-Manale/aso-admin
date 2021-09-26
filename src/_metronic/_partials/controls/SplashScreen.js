import React from "react";
import {CircularProgress} from "@material-ui/core";
import {toAbsoluteUrl} from "../../_helpers";
import {SITE_NAME} from "../../../_ae/helpers/UIHelper";

export function SplashScreen() {
  return (
    <>
      <div className="splash-screen">
        <img
          src={toAbsoluteUrl("/media/logos/Logo2.png")}
          alt={`${SITE_NAME} logo`}
          height={50}
        />
        <CircularProgress className="splash-screen-spinner" />
      </div>
    </>
  );
}
