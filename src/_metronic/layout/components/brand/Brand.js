import React from "react";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../_helpers";
import {getConfig} from "../../../i18n";
import {ROLES} from "../../../../_ae/config";



export function Brand() {

  return (
    <>
      {/* begin::Brand */}
      <div
        className={`aside-brand d-flex flex-column align-items-center flex-column-auto py-5 py-lg-8`}
      >
        {/* begin::Logo */}
        <Link to="" className="brand-logo">
          <img
            alt="logo"
            src={toAbsoluteUrl(`/media/logos/Logo.png`)}
            className={`max-h-50px`}
          />
        </Link>
        {/* end::Logo */}
      </div>
      {/* end::Brand */}
    </>
  );
}
