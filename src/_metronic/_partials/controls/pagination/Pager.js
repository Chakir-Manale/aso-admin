import React from "react";
import {FormattedMessage, useIntl} from "react-intl";
import {Dropdown} from "react-bootstrap";

export function Pager({
                        perPage, total, setPerPage,
                        counts = [10,20,30,50,100]
                      }) {



  return (
    <div className="d-flex align-items-center">
      <Dropdown className="dropdown-inline" drop="up" alignRight >
        <Dropdown.Toggle
          variant="transparent"
          className="btn btn-light btn-sm font-weight-bolder dropdown-toggle">
          {perPage}
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu py-0 min-w-10px">
          {
            counts.map(o=>(
              <Dropdown.Item
                key={o}
                onClick={() => setPerPage(o)}
                className={`text-capitalize rounded ${perPage === o ? 'text-primary':''}`}>
                {o}
              </Dropdown.Item>
            ))
          }
        </Dropdown.Menu>
      </Dropdown>
      <span className="text-muted pl-3">

                <FormattedMessage
                  id={"METADATA.PAGINATION.DISPLAY_OF"}
                  values={{display:Math.min(perPage, total), total}}
                />
              </span>
    </div>
  );
}
