/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_helpers";
import {Link} from "react-router-dom";
import {useIntl} from "react-intl";

export function QuickSearch() {
  const {formatMessage} = useIntl()
  return (
    <>
      {/* begin::Search Panel */}
      <div id="kt_quick_search" className="offcanvas offcanvas-left p-10">
        {/* begin::Header */}
        <div className="offcanvas-header d-flex align-items-center justify-content-between mb-5">
          <h3 className="font-weight-bold m-0">
            {formatMessage({id:'SEARCH'})}<br/>
            <small className="text-muted font-size-sm ml-2">
              {formatMessage({id:'QUICK_SEARCH'})}
            </small>
          </h3>
          <a
            href="#"
            className="btn btn-xs btn-icon btn-light btn-hover-primary"
            id="kt_quick_search_close"
          >
            <i className="ki ki-close icon-xs text-muted"/>
          </a>
        </div>
        {/* end::Header */}

        {/* begin::Content */}
        <div className="offcanvas-content">
          {/* begin::Container */}
          <div
            className="quick-search quick-search-offcanvas quick-search-has-result"
            id="kt_quick_search_offcanvas"
          >
            {/* begin::Form */}
            <form
              method="get"
              className="quick-search-form border-bottom pt-5 pb-1"
            >
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <span className="svg-icon svg-icon-lg">
                      <SVG src={toAbsoluteUrl( "/media/svg/icons/General/Search.svg" )} />
                    </span>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control "
                  placeholder={formatMessage({id:'SEARCH'})+'...'}
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="quick-search-close ki ki-close icon-sm text-muted"/>
                  </span>
                </div>
              </div>
            </form>
            {/* end::Form */}

            {/* begin::Wrapper */}
            <div className="quick-search-wrapper pt-5">
              <div className="quick-search-result">
                {/* begin::Message */}
                <div className="text-muted d-none">{formatMessage({id:'LIST.EMPTY'})}</div>
                {/* end::Message */}

                {/* begin::Section */}
                <div className="font-size-sm text-primary font-weight-bolder text-uppercase mb-2">
                  {formatMessage({id:'PROJECTS'})}
                  <Link to="/" className="kt-link float-right">
                    {formatMessage({id:'VIEW_ALL'})}
                  </Link>
                </div>
                <div className="mb-10">
                  <div className="d-flex align-items-center flex-grow-1 mb-2">
                    <div className="symbol symbol-30 flex-shrink-0">
                      <div className="symbol-label" style={{ backgroundImage: `url("${toAbsoluteUrl( "/media/logos/logo-letter-2.png" )}")` }}/>
                    </div>
                    <div className="d-flex flex-column ml-3 mt-2 mb-2">
                      <a href="#" className="font-weight-bold text-dark text-hover-primary" >
                        #title
                      </a>
                      <span className="font-size-sm font-weight-bold text-muted">
                        #sub_title
                      </span>
                    </div>
                  </div>
                  <div className="text-muted d-none">{formatMessage({id:'LIST.EMPTY'})}</div>
                </div>
                {/* end::Section */}

              </div>
            </div>
            {/* end::Wrapper */}
          </div>
          {/* end::Container */}
        </div>
        {/* end::Content */}
      </div>
      {/* end::Search Panel */}
    </>
  );
}
