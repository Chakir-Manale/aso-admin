import React, { useMemo } from "react";
import objectPath from "object-path";
// LayoutContext
import { useHtmlClassService } from "../_core/MetronicLayout";
// Import Layout components
import { HeaderMobile } from "./header-mobile/HeaderMobile";
import { Aside } from "./aside/Aside";
import { Footer } from "./footer/Footer";
import { LayoutInit } from "./LayoutInit";
import { Header } from "./subheader/Header";
import { QuickPanel } from "./extras/offcanvas/QuickPanel";
import { QuickUser } from "./extras/offcanvas/QuickUser";
import { QuickSearch } from "./extras/offcanvas/QuickSearch";
import { QuickNotification } from "./extras/offcanvas/QuickNotification";
import { QuickActions } from "./extras/offcanvas/QuickActions";
import { ScrollTop } from "./extras/ScrollTop";
import { StickyToolbar } from "./extras/StickyToolbar";
import { AnimateLoading } from "../../_partials/controls";
import {shallowEqual, useSelector} from "react-redux";
import {AERole} from "../../../_ae/components/AERole";
import {getConfig} from "../../i18n";
import {AEIcon} from "../../../_ae/components/svg";
import {ROLES} from "../../../_ae/config";

export function Layout({ children }) {
  const uiService = useHtmlClassService();
  const {role} = getConfig();
  const {isAuthorized, isEmailVerified} = useSelector( ({auth}) => ({ isAuthorized: auth.user != null, isEmailVerified:!!auth.user.validatedAt }), shallowEqual );
  // const {_isEmailVerified = false, authUser} = useSelector( ({auth}) => ({ _isEmailVerified:!!auth.user.validatedAt, authUser:auth.user }), shallowEqual );


  // Layout settings (cssClasses/cssAttributes)
  const layoutProps = useMemo(() => {
    return {
      selfLayout: objectPath.get(uiService.config, "self.layout"),
      asideDisplay: isAuthorized,
      subheaderDisplay: objectPath.get(uiService.config, "subheader.display"),
      contentCssClasses: uiService.getClasses("content", true),
      contentContainerClasses: uiService.getClasses("content_container", true),
      contentExtended: objectPath.get(uiService.config, "content.extended"),
    };
  }, [uiService, isAuthorized]);



  return layoutProps.selfLayout !== "blank" ? (
    <>
      {/*begin::Main*/}
      <HeaderMobile />

      <div className="d-flex flex-column flex-root">
        {/*begin::Index*/}
        <div className="d-flex flex-row flex-column-fluid page">
          {
            layoutProps.asideDisplay &&
            <Aside />
          }


          {/*begin::Wrapper*/}
          {/*{console.clear()}*/}
          <div
            className={`d-flex flex-column flex-row-fluid ${
              layoutProps.asideDisplay /*&& isEmailVerified*/ ? 'wrapper':''}`}
            id="kt_wrapper"
          >
            {/*begin::Content*/}
            <div
              id="kt_content"
              className={`content ${layoutProps.contentCssClasses} d-flex flex-column flex-column-fluid`}
            >
              <AnimateLoading />

              {layoutProps.subheaderDisplay && <Header />}
              

              {/*begin::Entry*/}
              {layoutProps.contentExtended && <>{children}</>}

              {!layoutProps.contentExtended && (
                <div className="d-flex flex-column-fluid">
                  {/*begin::Container*/}
                  <div className={layoutProps.contentContainerClasses}>
                    {children}
                  </div>
                  {/*end::Container*/}
                </div>
              )}

              {/*end::Entry*/}
            </div>
            {/*end::Content*/}
            <Footer />
          </div>
          {/*end::Wrapper*/}
        </div>
        {/*end::Index*/}
      </div>
      {
        layoutProps.asideDisplay &&
          <>
            <QuickUser />
            <QuickPanel />
            <QuickNotification />
            <QuickSearch />
            <QuickActions />
          </>
      }
      {/*<QuickUser />*/}
      {/*<QuickPanel />*/}
      {/*<QuickNotification />*/}
      <ScrollTop />
      {/*<QuickSearch />*/}
      {/*<QuickActions />*/}
      {/*<StickyToolbar />*/}
      {/*end::Main*/}
      <LayoutInit />
    </>
  ) : (
    // BLANK LAYOUT
    <div className="d-flex flex-column flex-root">{children}</div>
  );
}
