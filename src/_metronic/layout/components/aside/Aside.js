/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useMemo, useState} from "react";
import objectPath from "object-path";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { toAbsoluteUrl } from "../../../_helpers";
import { AsideSearch } from "./AsideSearch";
import { AsideMenu } from "./aside-menu/AsideMenu";
import { LanguageSelectorDropdown } from "../extras/dropdowns/LanguageSelectorDropdown";
import { QuickUserToggler } from "../extras/QuickUserToggler";
import { Brand } from "../brand/Brand";
import {AEIcon} from "../../../../_ae/components/svg";
import {useDispatch, useSelector} from "react-redux";
import {getConfig} from "../../../i18n";
import {AEOverlayTrigger} from "../../../../_ae/AEOverlayTrigger";
import {Link, useLocation} from "react-router-dom";
import {useIntl} from "react-intl";
import {ROLES} from "../../../../_ae/config";
import {AERole} from "../../../../_ae/components/AERole";
import {fetchRoutesForApp, useRoutesForAppState} from "../../../../redux/routes";
import {VIEWS} from "../../../../_ae/helpers/RoutingHelpers";


export function Aside() {
  const dispatch = useDispatch();
  const uiService = useHtmlClassService();
  const location = useLocation()
  const {formatMessage} = useIntl()
  const {data: routes} = useRoutesForAppState();

  const {user: authUser} = useSelector(state => state.auth);
  // const [MENU, setMenu] = useState([]);

  const {role} = getConfig()

  const layoutProps = useMemo(() => {
    return {
      asideClassesFromConfig: uiService.getClasses("aside", true),
      asideSecondaryDisplay: objectPath.get(
        uiService.config,
        "aside.secondary.display"
      ),
      asideSelfMinimizeToggle: objectPath.get(
        uiService.config,
        "aside.self.minimize.toggle"
      ),
      extrasSearchDisplay: objectPath.get(
        uiService.config,
        "extras.search.display"
      ),
      extrasNotificationsDisplay: objectPath.get(
        uiService.config,
        "extras.notifications.display"
      ),
      extrasQuickActionsDisplay: objectPath.get(
        uiService.config,
        "extras.quick-actions.display"
      ),
      extrasQuickPanelDisplay: objectPath.get(
        uiService.config,
        "extras.quick-panel.display"
      ),
      extrasLanguagesDisplay: objectPath.get(
        uiService.config,
        "extras.languages.display"
      ),
      extrasUserDisplay: objectPath.get(
        uiService.config,
        "extras.user.display"
      ),
    };
  }, [uiService]);


  // const [activeTab, setActiveTab] = useState("dashboard");
  // const handleTabChange = (id) => {
  //   setActiveTab(id);
  //   const asideWorkspace = KTUtil.find(
  //     document.getElementById("kt_aside"),
  //     ".aside-secondary .aside-workspace"
  //   );
  //   if (asideWorkspace) {
  //     KTUtil.scrollUpdate(asideWorkspace);
  //   }
  // };

  const closeMenu = ()=>{
    document.body.classList.add("aside-minimize")
  }
  const openMenu = ()=>{
    document.body.classList.remove("aside-minimize")
  }

  // useEffect(()=>{
  //   const menuI = MENU.findIndex(m=>m.id === activeTab);
  //   // console.log(menuI, activeTab)
  //   if(menuI !== -1){
  //     const menu = MENU[menuI];
  //     // console.log("menu",menu)
  //
  //     if(menu.hasChildren()) closeMenu()
  //     else openMenu()
  //
  //   }
  // },[MENU, activeTab])

  // useEffect(()=>{
  //
  //   setMenu(getMenu(role))
  // }, [role,formatMessage])

  return (
    <>
      {/* begin::Aside */}
      <div
        id="kt_aside"
        className={`aside aside-left d-flex ${layoutProps.asideClassesFromConfig}`}
      >
        {/* begin::Primary */}
        <div className="aside-primary d-flex flex-column align-items-center flex-row-auto">
          <Brand />
          {/* begin::Nav Wrapper */}
          <div className="aside-nav d-flex flex-column align-items-center flex-column-fluid py-5 scroll scroll-pull">
            {/* begin::Nav */}
            <ul className="list-unstyled flex-column" role="tablist">

              {
                routes
                  .filter(route=>route.views.includes(VIEWS.MENU))
                  .map((route, index)=>{
                    const {svg, path} = route;

                    const title = formatMessage({id: route.context.toUpperCase()})
                    const active = location.pathname.startsWith(`/${route.context}`);
                    // if(active) console.log(location, path)
                    return (
                      <li
                        key={index}
                        className="nav-item mb-3 btn-hover-info svg-icon" title={title}>
                        <AEOverlayTrigger
                          overlay={ <Tooltip id={`tooltip_${index}`}>{title}</Tooltip> }
                        >
                          <Link
                            to={path}
                            // className={`nav-link btn btn-icon btn-clean text-hover-info btn-lg ${activeTab === id && "active"} `}
                            className={`nav-link btn btn-icon btn-clean text-hover-info btn-lg ${active ? 'active' : ''}`}
                            // data-toggle="tab"
                            // data-target={`#${id}`}
                            // role="tab"
                            // onClick={() => handleTabChange(id)}
                          >
                            <AEIcon path={svg} className={'btn-hover-danger'} size={'2x'}/>
                          </Link>
                        </AEOverlayTrigger>
                      </li>
                    )
                }
                )
              }

            </ul>
            {/* end::Nav */}
          </div>
          {/* end::Nav Wrapper */}

          {/* begin::Footer */}
          <div className="aside-footer d-flex flex-column align-items-center flex-column-auto py-4 py-lg-10">
            {/* begin::Aside Toggle */}
            {layoutProps.asideSecondaryDisplay &&
              layoutProps.asideSelfMinimizeToggle && (

                <>
                  <AEOverlayTrigger
                    overlay={<Tooltip id="toggle-aside">Toggle Aside</Tooltip>}
                  >
                    <span
                      className="aside-toggle btn btn-icon btn-primary btn-hover-primary shadow-sm"
                      id="kt_aside_toggle"
                      // onClick={event => {
                      //   openMenu()
                      // }}

                    >
                      <i className="ki ki-bold-arrow-back icon-sm" />
                    </span>
                  </AEOverlayTrigger>
                  {/*<OverlayTrigger*/}
                  {/*  placement={rtl ? 'left':'right'}*/}
                  {/*  */}
                  {/*>*/}
                  {/*  */}
                  {/*</OverlayTrigger>*/}
                </>
              )}
            {/* end::Aside Toggle */}

            {/* begin::Search */}
            {layoutProps.extrasSearchDisplay && (
              <AEOverlayTrigger
                overlay={<Tooltip id="toggle-search">{formatMessage({id:'QUICK_SEARCH'})}</Tooltip>}
              >
                <a
                  href="#"
                  className="btn btn-icon btn-clean btn-lg mb-1"
                  id="kt_quick_search_toggle"
                >
                  <span className="svg-icon svg-icon-lg">
                    <SVG
                      src={toAbsoluteUrl("/media/svg/icons/General/Search.svg")}
                    />
                  </span>
                </a>
              </AEOverlayTrigger>
            )}
            {/* end::Search */}

            {/* begin::Notifications */}
            {layoutProps.extrasNotificationsDisplay && (
              <AEOverlayTrigger
                overlay={
                  <Tooltip id="toggle-notifications">{formatMessage({id:"Notifications"})}</Tooltip>
                }
              >
                <a
                  href="#"
                  className="btn btn-icon btn-clean btn-lg mb-1 position-relative"
                  id="kt_quick_notifications_toggle"
                  data-placement="right"
                  data-container="body"
                  data-boundary="window"
                >
                  <span className="svg-icon svg-icon-lg">
                    <SVG
                      src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                    />
                  </span>
                </a>
              </AEOverlayTrigger>
            )}
            {/* end::Notifications */}

            {/* begin::Quick Actions */}
            {layoutProps.extrasQuickActionsDisplay && (
              <AEOverlayTrigger
                overlay={
                  <Tooltip id="toggle-quick-actions">Quick Actions</Tooltip>
                }
              >
                <a
                  href="#"
                  className="btn btn-icon btn-clean btn-lg mb-1"
                  id="kt_quick_actions_toggle"
                >
                  <span className="svg-icon svg-icon-lg">
                    <SVG
                      src={toAbsoluteUrl(
                        "/media/svg/icons/Media/Equalizer.svg"
                      )}
                    />
                  </span>
                </a>
              </AEOverlayTrigger>
            )}
            {/* end::Quick Actions */}

            {/* begin::Quick Panel */}
            {layoutProps.extrasNotificationsDisplay && (
              <AEOverlayTrigger
                overlay={<Tooltip id="toggle-quick-panel">{formatMessage({id:'QUICK_PANEL'})}</Tooltip>}
              >
                <a
                  href="#"
                  className="btn btn-icon btn-clean btn-lg mb-1 position-relative"
                  id="kt_quick_panel_toggle"
                  data-placement="right"
                  data-container="body"
                  data-boundary="window"
                >
                  <span className="svg-icon svg-icon-lg">
                    <SVG
                      src={toAbsoluteUrl(
                        "/media/svg/icons/Layout/Layout-4-blocks.svg"
                      )}
                    />
                  </span>
                  <span className="label label-sm label-light-danger label-rounded font-weight-bolder position-absolute top-0 right-0 mt-1 mr-1">
                    3
                  </span>
                </a>
              </AEOverlayTrigger>
            )}
            {/* end::Quick Panel */}

            {/* begin::Languages*/}
            {layoutProps.extrasLanguagesDisplay && <LanguageSelectorDropdown />}
            {/* end::Languages */}

            {/* begin::User*/}
            {layoutProps.extrasUserDisplay && <QuickUserToggler />}
            {/* end::User */}
          </div>
          {/* end::Footer */}
        </div>
        {/* end::Primary */}

        {layoutProps.asideSecondaryDisplay && (
          <>
            {/* begin::Secondary */}
            <div className="aside-secondary d-flex flex-row-fluid">
              {/* begin::Workspace */}
              <div className="aside-workspace scroll scroll-push my-2">
                <div className="tab-content">
                  {/*<AsideSearch isActive={activeTab === tabs.tabId1} />*/}
                  {
                    // MENU.map(({id, children})=>(
                    //   <AsideMenu
                    //     key={id}
                    //     isActive={activeTab === id}
                    //     childMenu={children}
                    //   />
                    // ))
                  }
                </div>
              </div>
              {/* end::Workspace */}
            </div>
            {/* end::Secondary */}
          </>
        )}
      </div>
      {/* end::Aside */}
    </>
  );
}
