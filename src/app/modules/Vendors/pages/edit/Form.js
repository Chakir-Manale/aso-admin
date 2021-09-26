import React from "react";
import {useIntl} from "react-intl";
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
}) => {
  const {formatMessage} = useIntl();

  return (
    <div className="form form-label-right">
      <div className="form-group row">
        <div className={"col-lg"}>
          <AEField
            name="name"
            label={'NAME'}
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

