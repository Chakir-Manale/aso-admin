import React from "react";
import {AEField, AEFileField, AEHtmlField} from "../../../../../_metronic/_partials/controls/forms/AEField";


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
            name="titleFr"
            label={'TITLE'}
          />
        </div>
      </div>
      <div className="form-group row">
        <div className={"col-lg"}>
          <AEHtmlField
            name="contentFr"
            label={'DESCRIPTION'}
          />
        </div>
      </div>
      <div className="form-group row">
        <div className={"col-lg"}>
          <AEFileField
            name="fileName"
            label={'IMAGE'}
            preview
            previewPath={'/posts'}
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

