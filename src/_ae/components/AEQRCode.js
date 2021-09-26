import QRCode from "qrcode.react";
import React from "react";
import {toAbsoluteUrl} from "../../_metronic/_helpers";
import {useIntl} from "react-intl";

export const AEQRCode = ({pathname})=>{
  const {formatMessage} = useIntl()
  return (
    <div className={"text-center"}>
      <div className="example">
        <div className="example-preview rounded">
          <QRCode value={toAbsoluteUrl('/'+pathname)}/>
        </div>
      </div>
      <div className="h5 my-2 font-weight-bold">
        {/*<AESVG icon={"/Devices/iPhone-X.svg"} />*/}
        {formatMessage({id:'QRCODE.TITLE'})}
        {/*Scan With Your <span className={"text-primary"}>Smartphone</span> To Get It Handy.*/}
      </div>
    </div>

  )
}