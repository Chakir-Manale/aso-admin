import React, {useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {
  Card,
  CardBody, CardFooter,
  ModalProgressBar,
} from "../../../../../_metronic/_partials/controls";
import {useIntl} from "react-intl";
import {Formik} from "formik";
import * as Yup from "yup";
import {Form} from "./Form";
import {AEButton} from "../../../../../_ae/components/buttons";
import {savePassword, saveProfile, usePasswordEditState} from "../../../../../redux/auth";
import {YupAuthPassword, YupAuthPasswordConfirm} from "../../../../../_ae/yupjs/Schema";

export const Edit = ({ history }) => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const { isLoading, data, error } = usePasswordEditState();

  const saveBtnRef = useRef();
  const saveBtnRefClick = () => {
    if (saveBtnRef && saveBtnRef.current) {
      const {current} = saveBtnRef;
      current.click()
    }
  };

  return (
    <Card>
      {isLoading && <ModalProgressBar />}
      <CardBody className={'pt-10'}>
        <Formik
          enableReinitialize
          initialErrors={error}
          validationSchema={
            Yup.object().shape({
              current: Yup.string().required(),
              password: Yup.string().when('id', {
                is: (val) => !val,
                then: YupAuthPassword()
              }),
              _password_confirm: Yup.string().when('id', {
                is: (val) => !val,
                then: YupAuthPasswordConfirm()
              }),
            })
          }
          initialValues={data}
          onSubmit={values=>{
            dispatch(savePassword(values)).then((response)=>{
              // getUserByToken().then(r => {
              //   dispatch(authActions.logout())
              // })
            })
          }}
          render={formik=>(
            <Form
              {...formik}
              btnRef={saveBtnRef}
            />)}
        />
      </CardBody>
      <CardFooter className={'d-flex justify-content-end'}>
        <AEButton
          variant={'light'}
          onClick={history.goBack}
        >
          <i className="fa fa-arrow-left"/>
          {formatMessage({id:'BACK'})}
        </AEButton>
        <AEButton
          className="ml-2"
          onClick={saveBtnRefClick}
        >
          {formatMessage({id:'SAVE'})}
        </AEButton>
      </CardFooter>
    </Card>
  );
}

