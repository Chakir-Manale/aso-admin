/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useMemo, useEffect} from "react";
import objectPath from "object-path";
import { useHistory, useLocation, useRouteMatch} from "react-router-dom";
import {
  useHeader,
} from "../../_core/MetronicSubheader";
import {useHtmlClassService} from "../../_core/MetronicLayout";
import {useIntl} from "react-intl";
import {AERole} from "../../../../_ae/components/AERole";
import {Tooltip} from "react-bootstrap";
import {AEIcon} from "../../../../_ae/components/svg";
import {AEOverlayTrigger} from "../../../../_ae/AEOverlayTrigger";
import {AEButton} from "../../../../_ae/components/buttons";
import {AELink} from "../../../../_ae/components/AELink";
import {AESpinner} from "../../../../_ae/spinner/AESpinner";
import {useRoutesForAppState} from "../../../../redux/routes";
import {matchPath} from "react-router";
import {VIEWS} from "../../../../_ae/helpers/RoutingHelpers";


export function Header() {
  const uiService = useHtmlClassService();
  const location = useLocation();
  const {formatMessage} = useIntl()
  const subheader = useHeader();
  const history = useHistory();
  const {data: routes} = useRoutesForAppState();
  const currentRoute = useMemo(()=>{
    return routes.find(r=>matchPath(location.pathname, {path: r.path}))
  }, [routes, location]) ;

  const layoutProps = useMemo(() => {
    return {
      config: uiService.config,
      subheaderFixed: objectPath.get(uiService.config, "subheader.fixed"),
      subheaderMobileToggle: objectPath.get(  uiService.config, "subheader.mobile-toggle" ),
      subheaderCssClasses: uiService.getClasses("subheader", true),
      subheaderContainerCssClasses: uiService.getClasses( "subheader_container", true ),
    };
  }, [uiService]);


  // Do not remove this useEffect, need from update title/breadcrumbs outside (from the page)
  useEffect(() => {}, [subheader]);



  return (
      <>
        <div
            id="kt_subheader"
            className={`subheader py-3 py-lg-7 ${layoutProps.subheaderCssClasses}`}
        >
          <div
              className={`${layoutProps.subheaderContainerCssClasses} d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap`}
          >
            {
              currentRoute &&
              <>
                <div className="d-flex align-items-end mr-5">
                  <div>
                    <AEIcon
                      path={currentRoute.svg}
                      size={'3x'}
                      variant={'primary'}
                      />
                  </div>
                  <h3 className="subheader-title text-dark font-weight-bold my-2 mr-3">
                    {formatMessage({id: currentRoute.routeKey})}
                  </h3>
                  <ul className="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold my-2 p-0">
                    <AELink
                      to={`/${currentRoute.context}`}
                      className={'breadcrumb-item'}
                    >
                      {formatMessage({id: currentRoute.context.toUpperCase()})}
                    </AELink>
                    <li className="breadcrumb-item">
                      {/*todo repeat*/}
                      <AELink
                        to={currentRoute.path}
                        className={'text-muted'}
                      >
                        {formatMessage({id: currentRoute.routeKey})}
                      </AELink>
                    </li>
                  </ul>
                  { subheader.isLoading && <AESpinner className={'ml-5 mb-3'} /> }

                </div>
                <div className="d-flex align-items-center flex-wrap mr-1">
                  {/* begin::Mobile Toggle */}
                  {layoutProps.subheaderMobileToggle && (
                    <button
                      className="burger-icon burger-icon-left mr-4 d-inline-block d-lg-none"
                      id="kt_subheader_mobile_toggle"
                    >
                      <span />
                    </button>
                  )}
                  {/* end::Mobile Toggle */}

                  {/* begin::Heading */}

                  <div className="d-flex align-items-baseline">
                    {
                      // getActionRoutes(currentRoute.context)
                      routes
                        .filter(route=>route.context === currentRoute.context)
                        .filter(route=>route.views.includes(VIEWS.ACTION))
                        .filter(route=>route.path !== location.pathname)
                        .map(route=>{
                          return (
                            <AEOverlayTrigger
                              key={route.id}
                              placement={"bottom"}
                              overlay={
                                <Tooltip id={`tooltip_toolbar_action_${route.id}`}>
                                  { formatMessage({id: route.routeKey})}
                                </Tooltip>}
                            >
                              <AEButton
                                size={'sm'}
                                // variant={'outline-primary'}
                                fontWeight={'bold'}
                                className={'ml-2'}
                                onClick={()=> {
                                  history.push(route.path)
                                }}
                              >
                                <AEIcon path={route.svg}/>
                                {formatMessage({id: route.routeKey})}

                              </AEButton>
                            </AEOverlayTrigger>
                          )
                        })
                    }
                    {/*{*/}
                    {/*  [ROLES.A, ROLES.C, ROLES.SA].includes(role) ?*/}
                    {/*      subheader.toolbarActions :*/}
                    {/*      MENU.map((menu, index)=>{*/}
                    {/*        const {svg, route_path} = menu;*/}
                    {/*        const title = formatMessage({id:menu.title})*/}
                    {/*        const active = location.pathname.includes(route_path);*/}
                    {/*        // if(active) console.log(location, route_path)*/}
                    {/*        return (*/}
                    {/*            <AEOverlayTrigger*/}
                    {/*              key={index}*/}
                    {/*                placement={"bottom"}*/}
                    {/*                overlay={<Tooltip id={`tooltip_toolbar_action_${index}`}>{title}</Tooltip>}>*/}
                    {/*              <Link*/}
                    {/*                  to={route_path}*/}
                    {/*                  // className={`btn ${btnIcon? 'btn-icon':''} bg-light-${location.pathname === pathname ? variant:'white'} mr-1 bg-hover-light-${variant} btn-sm`}*/}
                    {/*                  className={`btn ${!active? 'btn-icon':''} bg-white text-primary btn-text-dark-50 font-weight-bold btn-hover-icon-primary text-hover-primary`}*/}
                    {/*                  // onClick={()=>onClickCallBack && onClickCallBack()}*/}
                    {/*              >*/}
                    {/*                <AESVG path={svg} variant={active ? 'primary':''} size={!active && "xl"}/>*/}
                    {/*                {active && <span className='font-weight-bold'>{title}</span>}*/}
                    {/*              </Link>*/}
                    {/*            </AEOverlayTrigger>*/}
                    {/*        )*/}
                    {/*      })*/}
                    {/*}*/}
                    {/*{subheader.toolbarActions}*/}
                    {/*<BreadCrumbs items={subheader.breadcrumbs} />*/}
                  </div>
                  {/* end::Heading */}
                </div>
              </>

            }


          </div>
        </div>

        {/*{*/}
        {/*  <AERole roles={[ROLES.CP]}>*/}
        {/*    <div className={"container"}>*/}
        {/*      <div className="alert alert-custom alert-white alert-shadow fade show " role="alert">*/}
        {/*        <div className="alert-icon">*/}
        {/*          <AESVG path={"/Code/Warning-2.svg"} variant={"primary"} size={"xl"}/>*/}
        {/*        </div>*/}
        {/*        <div className="alert-text">*/}
        {/*          <span dangerouslySetInnerHTML={{__html: formatHTMLMessage({id:'SUBHEADER.EMAIL_ALERT.TEXT'},{link:formatMessage({id:'SUBHEADER.EMAIL_ALERT.LINK_TEXT'})})}} />*/}
        {/*          /!*{formatHTMLMessage({id:'SUBHEADER.EMAIL_ALERT.TEXT'})}*!/*/}
        {/*          <AEButton*/}
        {/*            fontWeight={"bold"}*/}
        {/*            variant={"light"}*/}
        {/*            size={"sm"}*/}
        {/*            onClick={e=>{*/}
        {/*              requestEmailVerificationLink().then(()=>{*/}
        {/*                toast("SENT !",{type:toast.TYPE.SUCCESS})*/}
        {/*              }).catch(r=>{*/}
        {/*                toast("ERROR !",{type:toast.TYPE.ERROR})*/}
        {/*              })*/}
        {/*            }}*/}
        {/*          >*/}
        {/*            <span dangerouslySetInnerHTML={{__html: formatMessage({id:'SUBHEADER.EMAIL_ALERT.LINK_TEXT'})}} />*/}
        {/*          </AEButton>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </AERole>*/}
        {/*}*/}
      </>

  );
}
