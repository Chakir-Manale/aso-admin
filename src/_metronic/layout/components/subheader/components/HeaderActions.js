/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../../_helpers";
import {FormattedMessage} from "react-intl";
import {useHtmlClassService} from "../../..";
import {AEIcon} from "../../../../../_ae/components/svg";
import {AEButton} from "../../../../../_ae/components/buttons";

export function HeaderActions({ subheaderFixed }) {

  return (
    <div className="d-flex align-items-center">
      <AEButton
        variant={subheaderFixed ? "default" : "white"}
        variantHover={"primary"}
        fontWeight={"bold"}
        className={`btn-fixed-height px-2 px-lg-5 mr-2`}
        >
        <AEIcon
          path={'/Communication/Add-user.svg'}
          variant={"primary"}
          size={"lg"}
        >
        </AEIcon>
        {` `}Create new project
      </AEButton>

    </div>
  );
}
