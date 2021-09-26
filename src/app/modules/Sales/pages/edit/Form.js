import React from "react";
import {
  AEDatePickerField,
  AEField, AEFileField
} from "../../../../../_metronic/_partials/controls/forms/AEField";
import {InputAdornment} from "@material-ui/core";
import {MODULES} from "../../../../../_ae/helpers/RoutingHelpers";
import {VariantField} from "../../../Variants";

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
        <div className={"col-md form-group"}>
          <AEFileField
            name="fileName"
            label={'IMAGE'}
            preview
            previewPath={`/${MODULES.SALES}`}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md form-group">
          <AEField
            name="nameFr"
            label={'NAME'}
          />
        </div>
        <div className={"col-md form-group"}>
          <AEField
            name="rate"
            label={'RATE'}
            type={'number'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'> % </InputAdornment>
              ),
            }}
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
      <div className="row">
        <div className={"form-group col-lg"}>
          <AEField
            name="descFr"
            label={'DESCRIPTION'}
            type={'textarea'}
            rows={4}
          />
        </div>
      </div>
      <div className="row">
        <div className={"form-group col-lg"}>
          <VariantField
            multiple
            name={`variants`}
            label={'VARIANTS'}
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

