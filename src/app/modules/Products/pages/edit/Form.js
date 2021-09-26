import React from "react";
import {AEField} from "../../../../../_metronic/_partials/controls/forms/AEField";
import {CategoryField} from "../../../Categories";
import {AttributeField} from "../../../Attributes";

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
          <CategoryField
            name="categories"
            label={'CATEGORIES'}
            multiple
            />
        </div>
      </div>
      <div className="form-group row">
        <div className={"col-lg"}>
          <AttributeField
            name="attributes"
            label={'ATTRIBUTES'}
            multiple
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

