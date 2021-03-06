/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
// import { useSelector } from "react-redux";
import SVG from "react-inlinesvg";
import objectPath from "object-path";
import { toAbsoluteUrl } from "../../../_helpers";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { UserProfileDropdown } from "./dropdowns/UserProfileDropdown";
import {AEOverlayTrigger} from "../../../../_ae/AEOverlayTrigger";
import {useIntl} from "react-intl";

export function QuickUserToggler() {
  // const { user } = useSelector((state) => state.auth);
  const {formatMessage} = useIntl();
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      offcanvas: objectPath.get(uiService.config, "extras.user.layout") === "offcanvas",
    };
  }, [uiService]);

  return (
    <>
      {layoutProps.offcanvas && (
        <AEOverlayTrigger
          overlay={<Tooltip id="quick-user-tooltip">{formatMessage({id:"USER_PROFILE"})}</Tooltip>}
        >
          <div
            className="btn btn-icon btn-clean btn-lg w-40px h-40px"
            id="kt_quick_user_toggle"
            data-placement="right"
            data-container="body"
            data-boundary="window"
          >
            <span className="symbol symbol-30 symbol-lg-40">
              <span className="svg-icon svg-icon-lg">
                <SVG src={toAbsoluteUrl("/media/svg/icons/General/User.svg")} />
              </span>
            </span>
          </div>
        </AEOverlayTrigger>
      )}

      {!layoutProps.offcanvas && <UserProfileDropdown />}
    </>
  );
}
