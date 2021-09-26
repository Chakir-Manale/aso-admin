import React from "react";
import {
  AEField,
  AEFileField
} from "../../../../../_metronic/_partials/controls/forms/AEField";

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
      <div className={'row gutter-b'}>
        <div className={'col-4'}>
          <AEFileField
            name="fileName"
            label={'IMAGE'}
            preview
            previewPath={'/users'}
          />
        </div>
        <div className={'col-8'}>
          <div className="row">
            <div className={'form-group col-lg'}>
              <AEField
                name="firstName"
                label={'FIRST_NAME'}
              />
            </div>
            <div className={'form-group col-lg'}>
              <AEField
                name="lastName"
                label={'LAST_NAME'}
              />
            </div>
          </div>
          <div className="row">
            <div className={'form-group col-lg'}>
              <AEField
                name="email"
                label={'EMAIL'}
              />
            </div>
          </div>
        </div>
      </div>

      <button
        style={{ display: "none" }}
        ref={btnRef}
        onClick={handleSubmit}
      />
    </div>
  )
}

