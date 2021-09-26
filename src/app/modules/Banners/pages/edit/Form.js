import React from "react";
import {
  AEDatePickerField,
  AEField,
  AEFileField
} from "../../../../../_metronic/_partials/controls/forms/AEField";
import {BlockKeyField} from "../../components/BlockField";

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
      <div className="row">
        <div className={"form-group col-lg"}>
          <AEFileField
            name="fileName"
            label={'LOGO'}
            preview
            previewPath={'/banners'}
          />
        </div>
      </div>
      <div className="row">
        <div className={"form-group col-lg"}>
          <AEField
            name="titleFr"
            label={'TITLE'}
          />
        </div>
        <div className={"form-group col-lg"}>
          <AEField
            name="subTitleFr"
            label={'SUB_TITLE'}
          />
        </div>
      </div>
      <div className="row">
        <div className={"form-group col-lg"}>
          <AEField
            name="priority"
            label={'PRIORITY'}
            type={'number'}
          />
        </div>
        <div className={"form-group col-lg"}>
          <BlockKeyField />
        </div>
      </div>
      <div className="row">
        <div className={"form-group col-lg"}>
          <AEField
            name="linkTextFr"
            label={'LINK_TEXT'}
          />
        </div>
        <div className={"form-group col-lg"}>
          <AEField
            name="linkUrl"
            label={'URL'}
          />
        </div>
      </div>
      <div className="row">
        <div className={"form-group col-lg"}>
          <AEDatePickerField
            name="starAt"
            label={'START_DATE'}
          />
        </div>
        <div className={"form-group col-lg"}>
          <AEDatePickerField
            name="endAt"
            label={'END_DATE'}
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

