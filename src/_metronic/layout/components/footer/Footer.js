import React, { useMemo } from "react";
import objectPath from "object-path";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { FormattedMessage } from "react-intl";

export function Footer() {
  const today = new Date().getFullYear();
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      footerLayout: objectPath.get(uiService.config, "footer.layout"),
      footerClasses: uiService.getClasses("footer", true),
      footerContainerClasses: uiService.getClasses("footer_container", true),
    };
  }, [uiService]);

  return (
    <>
      {/* begin::Footer */}
      {/* doc: add "bg-white" class to have footer with solod background color */}
      <div
        className={`footer py-4 d-flex flex-lg-column ${layoutProps.footerClasses}`}
        id="kt_footer"
      >
        {/* begin::Container */}
        <div
          className={`${layoutProps.footerContainerClasses} d-flex flex-column flex-md-row align-items-center justify-content-between`}
        >
          {/* begin::Copyright */}
          <div className="text-dark order-2 order-md-1">
            <span className="text-muted font-weight-bold mr-">
              {today} &copy;
            </span>
            {` `}
            <a
              href={process.env.REACT_APP_FRONT_URL}
              rel="noopener noreferrer"
              target="_blank"
              className="text-dark-75 text-hover-primary"
            >
              <FormattedMessage id={'MC-SPACE FOR CHANGE'} />
            </a>
          </div>
          {/* end::Copyright */}
          {` `}
          {/* begin::Nav */}
          <div className="nav nav-dark order-1 order-md-2">
            {/*<a*/}
            {/*  href="http://keenthemes.com/metronic"*/}
            {/*  target="_blank"*/}
            {/*  rel="noopener noreferrer"*/}
            {/*  className="nav-link pr-3 pl-0"*/}
            {/*>*/}
            {/*  About*/}
            {/*</a>*/}
          </div>
          {/* end::Nav */}
        </div>
        {/* end::Container */}
      </div>
      {/* end::Footer */}
    </>
  );
}
