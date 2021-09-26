import React, { useState } from "react";
import {FormikProvider, useFormik} from "formik";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as Yup from "yup";
import {injectIntl, useIntl} from "react-intl";
import * as auth from "../../../../redux/auth/authRedux";
import { YupAuthPassword, YupAuthPasswordConfirm} from "../../../../_ae/yupjs/Schema";
import {AEField} from "../../../../_metronic/_partials/controls/forms/AEField";
import {resetPassword} from "../../../../redux/auth/api";

const initialValues = {
  password: '',
  _confirm: '',
};

function ResetPassword({match:{params:{token}}}) {

  const { formatMessage } = useIntl();
  const [isRequested, setIsRequested] = useState(false);
  const ForgotPasswordSchema = Yup.object().shape({
    password: YupAuthPassword(),
    _confirm: YupAuthPasswordConfirm(),
  });

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      const {password} = values
      resetPassword(token, {password})
        .then(() => setIsRequested(true))
        .catch(() => {
          setIsRequested(false);
          setSubmitting(false);
          setStatus(
            formatMessage(
              { id: "AUTH.VALIDATION.NOT_FOUND" },
              { name: values.email }
            )
          );
        });
    },
  });

  return (
    <>
      {isRequested && <Redirect to="/auth" />}
      {!isRequested && (
        <div className="login-form login-forgot" style={{ display: "block" }}>
          <div className="text-center mb-10 mb-lg-20">
            <h3 className="font-size-h1">
              {formatMessage({id:"AUTH.RESET.TITLE"})}
            </h3>
            <div className="text-muted font-weight-bold">
              {formatMessage({id:"AUTH.RESET.DESC"})}
            </div>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
          >
            {formik.status && (
              <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                <div className="alert-text font-weight-bold">
                  {formik.status}
                </div>
              </div>
            )}

            <FormikProvider value={formik}>
              {
                [
                  { id: 'PASSWORD', name:'password' },
                  { id: 'PASSWORD_CONFIRM', name:'_confirm' },
                ].map(({id, name})=>(
                  <div key={id} className="form-group">
                    <AEField
                      label={id}
                      name={name}
                      type={'password'}
                      borderless

                      className={`form-control h-auto p-4 -rounded-lg -border-0 ${getInputClasses(name)}`}
                    />
                  </div>
                ))
              }
            </FormikProvider>



            <div className="form-group d-flex flex-wrap flex-center">
              <button
                id="kt_login_forgot_submit"
                type="submit"
                className="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-3"
                disabled={formik.isSubmitting}
              >
                {formatMessage({id:"UPDATE"})}
              </button>
              <Link to="/auth">
                <button
                  type="button"
                  id="kt_login_forgot_cancel"
                  className="btn btn-light-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-3"
                >
                  {formatMessage({id:"CANCEL"})}
                </button>
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default injectIntl(connect(null, auth.authActions)(ResetPassword));
