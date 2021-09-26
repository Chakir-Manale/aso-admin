import React, { useState } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as Yup from "yup";
import {injectIntl, useIntl} from "react-intl";
import * as auth from "../../../../redux/auth/authRedux";
import {YupAuthEmail} from "../../../../_ae/yupjs/Schema";
import {requestPassword} from "../../../../redux/auth/api";

const initialValues = {
  email: "",
};

function ForgotPassword(props) {
  const { formatMessage } = useIntl();
  const [isRequested, setIsRequested] = useState(false);
  const ForgotPasswordSchema = Yup.object().shape({
    email: YupAuthEmail(),
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
      requestPassword(values.email)
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
              {formatMessage({id:"AUTH.FORGOT.TITLE"})}
            </h3>
            <div className="text-muted font-weight-bold">
              {formatMessage({id:"AUTH.FORGOT.DESC"})}
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
            <div className="form-group">
              <input
                placeholder={formatMessage({id:"EMAIL"})}
                type="email"
                className={`form-control h-auto py-7 px-6 rounded-lg border-0 ${getInputClasses("email")}`}
                name="email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formatMessage(formik.errors.email.descriptor, formik.errors.email.props)}</div>
                </div>
              ) : null}
            </div>
            <div className="form-group d-flex flex-wrap flex-center">
              <button
                id="kt_login_forgot_submit"
                type="submit"
                className="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-3"
                disabled={formik.isSubmitting}
              >
                {formatMessage({id:"SUBMIT"})}
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

export default injectIntl(connect(null, auth.authActions)(ForgotPassword));
