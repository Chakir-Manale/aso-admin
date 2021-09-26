import {AEButton} from "./buttons";
import {AEIcon} from "./svg";
import React from "react";
import {useIntl} from "react-intl";

export const AEReport = () =>{
  const {formatMessage} = useIntl()
  return (
    <div className="card card-custom bg-white gutter-b">
      <div className="card-header border-0 pt-5">
        <h3 className="card-title">
          <span className="card-label font-weight-bold font-size-h4 text-dark-75">
            {formatMessage({id:'REPORT'})}
          </span>
        </h3>
        <div className="card-toolbar">
          <AEButton
            variant={"light"}
            fontWeight={"bolder"}
            size={"sm"}
          >
            {formatMessage({id:'SEND'})}
            <AEIcon path={"/Communication/Send.svg"} variant={"primary"}/>
          </AEButton>
        </div>
      </div>
      <div className="card-body pt-1">
        <div className="tab-content mt-5">
          <div className="form-group mb-6">
            <select className="form-control border-0 form-control-solid text-muted font-size-lg font-weight-bolder pl-5 min-h-50px">
              <option>-- {formatMessage({id:'REASON'})} --</option>
              <option>Reason 1</option>
              <option>Reason 2</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group mb-6">
            <textarea className="form-control border-0 form-control-solid pl-6 font-weight-bolder" rows="4"
                      placeholder={formatMessage({id:'DETAIL'})}
            />
          </div>
        </div>
      </div>
    </div>
  )
}