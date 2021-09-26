import React from "react";
import {AEField} from "../../../../../_metronic/_partials/controls/forms/AEField";

export const Form = ({
                       values,
                       errors,
                       touched,
                       handleChange,
                       handleBlur,
                       handleSubmit,
                       isSubmitting,
                       btnRef,
                       setErrors,
                       setFieldError ,
  ...props
}) => {

  return (
    <div className="form form-label-right">
      <div className="form-group row">
        <div className={'col-lg-4'}>
          <AEField
            name="current"
            label={'CURRENT_PASSWORD'}
            type={'password'}
          />
        </div>
        <div className={'col-lg-4'}>
          <AEField
            name="password"
            label={'PASSWORD'}
            type={'password'}
          />
        </div>
        <div className={'col-lg-4'}>
          <AEField
            name="_password_confirm"
            label={'PASSWORD_CONFIRM'}
            type={'password'}
          />
        </div>
      </div>

      <button
        style={{ display: "none" }}
        ref={btnRef}
        onClick={handleSubmit}
      />
    </div>
  );
}

