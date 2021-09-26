import React from "react";
import {
  AEField,
  AEFileField
} from "../../../../../_metronic/_partials/controls/forms/AEField";
import {Field} from "../../../Roles/components/Field";
import {RoleField} from "../../../Roles";


export const Form = ({formik: {values, handleSubmit}, btnRef}) => {

  return (
    <div className="form form-label-right">
      <div className={'row gutter-b'}>
        <div className={'form-group col-lg-4'}>
          <AEFileField
            name="fileName"
            label={'IMAGE'}
            preview
            previewPath={'/users'}
          />
        </div>
        <div className={'col-lg-8'}>
          <div className="row">
            <div className={'form-group col-md'}>
              <AEField
                name="firstName"
                label={'FIRST_NAME'}
              />
            </div>
            <div className={'form-group col-md'}>
              <AEField
                name="lastName"
                label={'LAST_NAME'}
              />
            </div>
          </div>
          <div className="row">
            <div className={'form-group col-md'}>
              <AEField
                name="username"
                label={'USERNAME'}
              />
            </div>
            <div className={'form-group col-md'}>
              <AEField
                name="email"
                label={'EMAIL'}
              />
            </div>

          </div>
          {
            ! values.id &&
            <div className={'row'}>
              <div className={'form-group col-md'}>
                <AEField
                  name="password"
                  label={'PASSWORD'}
                  type={'password'}
                />
              </div>
              <div className={'form-group col-md'}>
                <AEField
                  name="_confirm"
                  label={'PASSWORD_CONFIRM'}
                  type={'password'}
                />
              </div>
            </div>
          }
          <div className={'row'}>
            <div className="form-group col-md">
              <RoleField />
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
  );
}

