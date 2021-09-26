/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,no-undef */
import React, {useState} from "react";
import SVG from "react-inlinesvg";
import {Tab, Nav} from "react-bootstrap";
import {toAbsoluteUrl} from "../../../../_helpers";
import {WebsocketTest} from "../../../../../_ae/websocketTest";

export function QuickPanel() {
  const [selectedTab, setSelectedTab] = useState("Notifications");

  const setTab = _tabName => {
    setSelectedTab(_tabName);
  };

  return (
      <div id="kt_quick_panel" className="offcanvas offcanvas-left pt-5 pb-10">
        <Tab.Container
            defaultActiveKey={selectedTab}
        >
          {/*begin::Header*/}
          <div
              className="offcanvas-header offcanvas-header-navs d-flex align-items-center justify-content-between mb-5">
            <Nav
                onSelect={setTab}
                as="ul"
                role="tablist"
                className="nav nav-bold nav-tabs nav-tabs-line nav-tabs-line-3x nav-tabs-primary flex-grow-1 px-10"
            >
              {/*<Nav.Item as="li">*/}
              {/*  <Nav.Link*/}
              {/*      eventKey="AuditLogs"*/}
              {/*      className={`nav-link ${*/}
              {/*          selectedTab === "AuditLogs" ? "active" : ""*/}
              {/*      }`}*/}
              {/*  >*/}
              {/*    Audit Logs*/}
              {/*  </Nav.Link>*/}
              {/*</Nav.Item>*/}
              <Nav.Item className="nav-item" as="li">
                <Nav.Link
                    eventKey="Notifications"
                    className={`nav-link ${
                        selectedTab === "Notifications" ? "active" : ""
                    }`}
                >
                  Notifications
                </Nav.Link>
              </Nav.Item>
              {/*<Nav.Item as="li">*/}
              {/*  <Nav.Link*/}
              {/*      eventKey="Settings"*/}
              {/*      className={`nav-link ${*/}
              {/*          selectedTab === "Settings" ? "active" : ""*/}
              {/*      }`}*/}
              {/*  >*/}
              {/*    Settings*/}
              {/*  </Nav.Link>*/}
              {/*</Nav.Item>*/}
            </Nav>

            <div className="offcanvas-close mt-n1 pr-5" style={{position: "absolute", top: "15px", right: "10px"}}>
              <a
                  href="#"
                  className="btn btn-xs btn-icon btn-light btn-hover-primary"
                  id="kt_quick_panel_close"
              >
                <i className="ki ki-close icon-xs text-muted"/>
              </a>
            </div>
          </div>
          {/*end::Header*/}

          {/*begin::Content*/}
          <div className="offcanvas-content px-10">
            <div className="tab-content">
              <div
                  id="kt_quick_panel_logs"
                  role="tabpanel"
                  className={`tab-pane fade pt-3 pr-5 mr-n5 scroll ps ${selectedTab === "AuditLogs" ? "active show" : ""}`}
              >

                <div className="mb-5">
                  <h5 className="font-weight-bold mb-5">Notifications</h5>

                  <div className="d-flex align-items-center bg-light-warning rounded p-5 mb-5">
                  <span className="svg-icon svg-icon-warning mr-5">
                    <SVG
                        src={toAbsoluteUrl("/media//svg/icons/Home/Library.svg")}
                        className="svg-icon svg-icon-lg"
                    />
                  </span>

                    <div className="d-flex flex-column flex-grow-1 mr-2">
                      <a
                          href="#"
                          className="font-weight-normal text-dark-75 text-hover-primary font-size-lg mb-1"
                      >
                        Another purpose persuade
                      </a>
                      <span className="text-muted font-size-sm">
                      Due in 2 Days
                    </span>
                    </div>

                    <span className="font-weight-bolder text-warning py-1 font-size-lg">
                    +28%
                  </span>
                  </div>

                  <div className="d-flex align-items-center bg-light-success rounded p-5 mb-5">
                  <span className="svg-icon svg-icon-success mr-5">
                    <SVG
                        src={toAbsoluteUrl(
                            "/media/svg/icons/Communication/Write.svg"
                        )}
                        className="svg-icon svg-icon-lg"
                    ></SVG>
                  </span>
                    <div className="d-flex flex-column flex-grow-1 mr-2">
                      <a
                          href="#"
                          className="font-weight-normal text-dark-75 text-hover-primary font-size-lg mb-1"
                      >
                        Would be to people
                      </a>
                      <span className="text-muted font-size-sm">
                      Due in 2 Days
                    </span>
                    </div>

                    <span className="font-weight-bolder text-success py-1 font-size-lg">
                    +50%
                  </span>
                  </div>

                  <div className="d-flex align-items-center bg-light-danger rounded p-5 mb-5">
                  <span className="svg-icon svg-icon-danger mr-5">
                    <SVG
                        src={toAbsoluteUrl(
                            "/media/svg/icons/Communication/Group-chat.svg"
                        )}
                        className="svg-icon svg-icon-lg"
                    ></SVG>
                  </span>
                    <div className="d-flex flex-column flex-grow-1 mr-2">
                      <a
                          href="#"
                          className="font-weight-normel text-dark-75 text-hover-primary font-size-lg mb-1"
                      >
                        Purpose would be to persuade
                      </a>
                      <span className="text-muted font-size-sm">
                      Due in 2 Days
                    </span>
                    </div>

                    <span className="font-weight-bolder text-danger py-1 font-size-lg">
                    -27%
                  </span>
                  </div>

                  <div className="d-flex align-items-center bg-light-info rounded p-5">
                  <span className="svg-icon svg-icon-info mr-5">
                    <SVG
                        src={toAbsoluteUrl(
                            "/media/svg/icons/General/Attachment2.svg"
                        )}
                        className="svg-icon svg-icon-lg"
                    ></SVG>
                  </span>

                    <div className="d-flex flex-column flex-grow-1 mr-2">
                      <a
                          href="#"
                          className="font-weight-normel text-dark-75 text-hover-primary font-size-lg mb-1"
                      >
                        The best product
                      </a>
                      <span className="text-muted font-size-sm">
                      Due in 2 Days
                    </span>
                    </div>

                    <span className="font-weight-bolder text-info py-1 font-size-lg">
                    +8%
                  </span>
                  </div>
                </div>
              </div>
              <div
                  id="kt_quick_panel_notifications"
                  role="tabpanel"
                  className={`tab-pane fade pt-2 pr-5 mr-n5 scroll ps ${selectedTab === "Notifications" ? "active show" : ""}`}
              >
                <div className="navi navi-icon-circle navi-spacer-x-0">
                  <a href="#" className="navi-item">
                    <div className="navi-link rounded">
                      <div className="symbol symbol-50 mr-3">
                        <div className="symbol-label">
                          <i className="flaticon-bell text-success icon-lg" />
                        </div>
                      </div>
                      <div className="navi-text">
                        <WebsocketTest />
                        <div className="font-weight-bold font-size-lg">
                          #title2
                        </div>
                        <div className="text-muted">#resume</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/*end::Content*/}
        </Tab.Container>
      </div>
  );
}
