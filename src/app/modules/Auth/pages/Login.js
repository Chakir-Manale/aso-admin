import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import * as auth from "../../../../redux/auth/authRedux";
import {AEButton} from "../../../../_ae/components/buttons";
import {YupAuthPassword, YupAuthUsername} from "../../../../_ae/yupjs/Schema";
import {CONFIG} from "../../../../_ae/config";
import {AELink} from "../../../../_ae/components/AELink";
import {login} from "../../../../redux/auth/api";

/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/



const initialValues = process.env.NODE_ENV === "production" ?
  {} :
  {
    username: "super_admin",
    password: "azerty",
  };

function Login(props) {
  const { intl:{formatMessage} } = props;
  const [loading, setLoading] = useState(false);

  const enableLoading = () => { setLoading(true); };
  const disableLoading = () => { setLoading(false); };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) { return "is-invalid"; }
    if (formik.touched[fieldname] && !formik.errors[fieldname]) { return "is-valid";  }
    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      username: YupAuthUsername(),
      password: YupAuthPassword()
    }),
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      login(values.username, values.password)
        .then(({ data: { token } }) => {
          disableLoading();
          props.login(token);
        })
        .catch(() => {
          disableLoading();
          setSubmitting(false);
          setStatus( formatMessage({ id: "AUTH.VALIDATION.INVALID_LOGIN", }) );
        });
    },
  });

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">

      <div className="pb-10 pb-lg-12">
        <h3 className="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">
          {formatMessage({id:"AUTH.LOGIN.TITLE"})}
        </h3>
        {
          CONFIG.auth.register.enabled &&
          <div className="text-muted font-weight-bold font-size-h4">
            {formatMessage({id:"AUTH.LOGIN.SUBTITLE"})}
            <Link to="/auth/registration" className="text-primary font-weight-bolder">
              {formatMessage({id:"SIGN_UP"})}
            </Link>
          </div>
        }

      </div>


      {/*begin::Form*/}
      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >
        {formik.status && (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        )}

        <div className="form-group">
          <label className="font-size-h6 font-weight-bolder text-dark">{formatMessage({id:"USERNAME"})}</label>
          <input
            placeholder={formatMessage({id:"USERNAME"})}
            type="username"
            className={`form-control h-auto py-7 px-6 rounded-lg border-0 ${getInputClasses("username")}`}
            name="username"
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formatMessage(formik.errors.username.descriptor, formik.errors.username.props)}</div>
            </div>
          ) : null}
        </div>


        <div className="form-group">
          <div className="d-flex justify-content-between mt-n5">
            <label className="font-size-h6 font-weight-bolder text-dark pt-5">{formatMessage({id:"PASSWORD"})}</label>
            {/*<AELink*/}
            {/*  to={`/auth/password/forgot`}*/}
            {/*  className="text-primary font-size-h6 font-weight-bolder text-hover-primary pt-5"*/}
            {/*  >*/}
            {/*  {formatMessage({id:"AUTH.GENERAL.FORGOT_BUTTON"})}*/}
            {/*</AELink>*/}
          </div>
          <input
            placeholder={formatMessage({id:"PASSWORD"})}
            type="password"
            className={`form-control h-auto py-7 px-6 rounded-lg border-0 ${getInputClasses(
              "password"
            )}`}
            name="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                {formatMessage(formik.errors.password.descriptor, formik.errors.password.props)}
              </div>

              {/*<div className="fv-help-block">{formik.errors.password}</div>*/}
            </div>
          ) : null}
        </div>


        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
          <AEButton
            // id="kt_login_signin_submit"
            type="submit"
            disabled={formik.isSubmitting}
            className={`btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-3`}
            size={"lg"}
          >
            {formatMessage({id:"SIGN_UP"})}
            {loading && <span className="ml-3 spinner spinner-white"/>}
          </AEButton>
          {
            CONFIG.auth.login.google &&
            <AEButton
              className={"px-8 py-4 my-3 font-size-lg"}
              fontWeight={"bolder"}
              variant={"light-primary"}
            >
            <span className="svg-icon svg-icon-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M19.9895 10.1871C19.9895 9.36767 19.9214 8.76973 19.7742 8.14966H10.1992V11.848H15.8195C15.7062 12.7671 15.0943 14.1512 13.7346 15.0813L13.7155 15.2051L16.7429 17.4969L16.9527 17.5174C18.879 15.7789 19.9895 13.221 19.9895 10.1871Z"
                  fill="#4285F4"/>
                <path
                  d="M10.1993 19.9313C12.9527 19.9313 15.2643 19.0454 16.9527 17.5174L13.7346 15.0813C12.8734 15.6682 11.7176 16.0779 10.1993 16.0779C7.50243 16.0779 5.21352 14.3395 4.39759 11.9366L4.27799 11.9466L1.13003 14.3273L1.08887 14.4391C2.76588 17.6945 6.21061 19.9313 10.1993 19.9313Z"
                  fill="#34A853"/>
                <path
                  d="M4.39748 11.9366C4.18219 11.3166 4.05759 10.6521 4.05759 9.96565C4.05759 9.27909 4.18219 8.61473 4.38615 7.99466L4.38045 7.8626L1.19304 5.44366L1.08875 5.49214C0.397576 6.84305 0.000976562 8.36008 0.000976562 9.96565C0.000976562 11.5712 0.397576 13.0882 1.08875 14.4391L4.39748 11.9366Z"
                  fill="#FBBC05"/>
                <path
                  d="M10.1993 3.85336C12.1142 3.85336 13.406 4.66168 14.1425 5.33717L17.0207 2.59107C15.253 0.985496 12.9527 0 10.1993 0C6.2106 0 2.76588 2.23672 1.08887 5.49214L4.38626 7.99466C5.21352 5.59183 7.50242 3.85336 10.1993 3.85336Z"
                  fill="#EB4335"/>
              </svg>
            </span>
              {formatMessage({id:"SIGN_UP_WITH"},{name:"Google"})}

            </AEButton>
          }
        </div>
      </form>
      {/*end::Form*/}
    </div>
  );
}

export default injectIntl(connect(null, auth.authActions)(Login));
