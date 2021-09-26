import React, { useMemo } from "react";
import { AsideMenuList } from "./AsideMenuList";
import { useHtmlClassService } from "../../../_core/MetronicLayout";
import {checkIsActive, toAbsoluteUrl} from "../../../../_helpers";
import {NavLink, useLocation}  from "react-router-dom";
import SVG from "react-inlinesvg";
import {SVGIcon} from "../../../../_partials/controls";
import {AEIcon} from "../../../../../_ae/components/svg";
import {useSelector} from "react-redux";

export function AsideMenu({ isActive, childMenu }) {
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      layoutConfig: uiService.config,
      asideMenuAttr: uiService.getAttributes("aside_menu"),
      ulClasses: uiService.getClasses("aside_menu_nav", true),
      asideClassesFromConfig: uiService.getClasses("aside_menu", true),
    };
  }, [uiService]);

  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };

  return (
    <div className={`tab-pane fade ${isActive && "show active"}`}>
      <div className="aside-menu-wrapper flex-column-fluid px-10 py-5">
        {/* begin::Menu Container */}
        <div
          id="kt_aside_menu"
          data-menu-vertical="1"
          className={`aside-menu min-h-lg-800px ${layoutProps.asideClassesFromConfig}`}
          {...layoutProps.asideMenuAttr}
        >
          <ul className={`menu-nav ${layoutProps.ulClasses}`}>

            {
              childMenu.map((menu, index)=>{
                const {id, title, svg, route_path, children, parent} = menu;
                // console.log(route_path)
                return (

                  <li
                    key={index}
                    className={`menu-item ${menu.hasChildren() ? '-menu-item-submenu':''} ${getMenuItemActive(route_path, menu.hasChildren())}`}
                    aria-haspopup="true"
                    data-menu-toggle="hover"

                    // onClick={event => {
                    //   if (menu.hasChildren()){
                    //     document.body.classList.remove("aside-minimize")
                    //   }else {
                    //     document.body.classList.add("aside-minimize")
                    //   }
                    // }}
                  >
                    {/*{console.log(route_path)}*/}
                    {/*{console.log([parent.id, id].join('.'))}*/}
                    <NavLink className={`menu-link ${ menu.hasChildren() ? 'menu-toggle' :'' }`}
                             to={route_path}
                             activeClassName="selected"
                    >
                      <AEIcon path={svg}/>
                      <span className="menu-text">{title}</span>
                      {
                        menu.hasChildren() && <i className="menu-arrow"/>
                      }
                    </NavLink>
                    {
                      menu.hasChildren() &&
                      children.map(({id, title, svg, children, route_path})=>(
                        <div key={id} className="menu-submenu ">
                          <i className="menu-arrow"/>
                          <ul className="menu-subnav">
                            <li className="menu-item  menu-item-parent" aria-haspopup="true">
                            <span className="menu-link">
                              <span className="menu-text">{title}</span>
                            </span>
                            </li>
                            <li className={`menu-item ${getMenuItemActive( route_path )}`}
                                aria-haspopup="true"
                            >
                              <NavLink className="menu-link" to={route_path}>
                                <i className="menu-bullet menu-bullet-dot">
                                  <span/>
                                </i>
                                <span className="menu-text">{title}</span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      ))

                    }
                  </li>
                )
              }
              )
            }

          </ul>
        </div>
        {/* end::Menu Container */}
      </div>
    </div>
  );
}
