import React, {useEffect} from "react";
import * as Yup from "yup";
import {Field, Formik} from "formik";
import {AEAutoComplete} from "../../_metronic/_partials/controls";
import {AEButton} from "../../_ae/components/buttons";
import {injectIntl, useIntl} from "react-intl";
import {connect} from "react-redux";
import * as auth from "../../redux/auth/authRedux";
import {ROLES} from "../../_ae/config";
import {verifyEmail} from "../../redux/auth/api";

function VerifyEmail({match: { params: { token }}, emailVerified }) {
  const {formatHTMLMessage} = useIntl();

  return (
    <Formik
      validationSchema={Yup.object().shape({
          roles:Yup.array().min(1)
      })}
      initialValues={{
        roles:[]
      }}
      onSubmit={(values) => {
        verifyEmail(token, values)
          .then(({}) => {
            emailVerified();
          })
      }}
    >
    {({ handleSubmit, setFieldValue, values, errors, touched }) => (
        <form className="bg-white rounded p-4 -row">
          <div className={"-col-lg-8"}>
            <Field
                name={"roles"}
                component={AEAutoComplete}
                label='ROLE'
                options={[/*ROLES.CUSTOMER*/]}
                multiple
                getOptionLabel={o=>formatHTMLMessage({id:o})}
            />
          </div>
          <div className="-col-lg-4 gutter-t">
            <AEButton block onClick={handleSubmit}>Submit</AEButton>
          </div>
        </form>
    )}
    </Formik>
  )
}
export default injectIntl(connect(null, auth.authActions)(VerifyEmail));