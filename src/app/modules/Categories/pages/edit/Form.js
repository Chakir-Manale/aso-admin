import React from "react";
import {AEField, AEFileField} from "../../../../../_metronic/_partials/controls/forms/AEField";
import {CategoryField} from "../../index";

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
          <AEField
            name="priority"
            label={'PRIORITY'}
            type={'number'}
          />
        </div>
        <div className={"col-lg"}>
          <CategoryField
            name={`parent`}
            label={'PARENT'}
            />
        </div>
      </div>
      <div className="form-group row">
        <div className={"col-lg"}>
          <AEField
            type={'textarea'}
            rows={5}
            name="descFr"
            label={'DESCRIPTION'}
          />
        </div>
      </div>
      <div className="form-group row">
        <div className={"col-lg"}>
          <AEFileField
            name="iconFileName"
            label={'ICON'}
            preview
            previewPath={'/categories'}
            />
        </div>
        <div className={"col-lg"}>
          <AEFileField
            name="fileName"
            label={'BANNER'}
            preview
            previewPath={'/categories'}
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

