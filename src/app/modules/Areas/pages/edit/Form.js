import React from "react";
import {AEField} from "../../../../../_metronic/_partials/controls/forms/AEField";
import {AreaField} from "../../index";

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

  return (
    <div className="form form-label-right">
      <div className="form-group row">
        <div className={"col-lg"}>
          <AEField
            name="nameFr"
            label={'NAME'}
          />
        </div>
        <div className={"col-lg"}>
          <AreaField
            name={`parent`}
            label={'PARENT'}
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

