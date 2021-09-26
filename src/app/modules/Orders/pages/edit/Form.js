import React from "react";
import {CONFIG} from "../../../../../_ae/config";
import {useAuthState} from "../../../../../redux/auth";
import {ShipperField} from "../../../Users/components/ShipperField";
import {PaymentStatusField} from "../../components/PaymentStatusField";
import {DeliveryStatusField} from "../../components/DeliveryStatusField";

export const Form = ({
                       values,
                       errors,
                       touched,
                       handleChange,
                       handleBlur,
                       handleSubmit,
                       isSubmitting,
                       btnRef,
}) => {
  const {authRole} = useAuthState()
  const isShipper = [CONFIG.ROLES.SHIPPER].includes(authRole);

  return (
    <div className="form form-label-right">
      <div className="row">
        <div className="col-md form-group">
          <PaymentStatusField />
        </div>
        <div className="col-md form-group">
          <DeliveryStatusField />
        </div>
      </div>
      {
        ! isShipper &&
        <div className="row">
          <div className="col-md form-group">
            <ShipperField />
          </div>
        </div>
      }



      <button
        style={{ display: "none" }}
        ref={btnRef}
        onClick={handleSubmit}
      />
    </div>
  );
}

