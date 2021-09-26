import React, {useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {
  Card,
  CardBody, CardHeader, CardHeaderToolbar,
  ModalProgressBar,
} from "../../../../../_metronic/_partials/controls";
import {FormattedMessage} from "react-intl";
import {Formik} from "formik";
import * as Yup from "yup";
import {
  fetchUserForEdit, resetUserForEdit,
  saveUser,
  useUsersEditState
} from "../../../../../redux/users";
import {Form} from "./Form";
import {AEButton} from "../../../../../_ae/components/buttons";
import {YupAuthPassword, YupAuthPasswordConfirm, YupAuthUsername} from "../../../../../_ae/yupjs/Schema";

export const Edit = ({ history, match: { params: { id }, }}) => {
  const dispatch = useDispatch();
  const { isLoading, data, error } = useUsersEditState();

  useEffect(() => {
    dispatch(
      id ?
        fetchUserForEdit(id) :
        resetUserForEdit()
    );
  }, [id, dispatch]);

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
      <CardHeader className={'d-flex justify-content-end'}>
        <CardHeaderToolbar>
          <AEButton
            variant={'light'}
            onClick={history.goBack}
          >
            <i className="fa fa-arrow-left"/>
            <FormattedMessage id={'BACK'} />
          </AEButton>
          <AEButton
            className="ml-2"
            onClick={saveBtnRefClick}
          >
            <FormattedMessage id={'SAVE'} />
          </AEButton>

        </CardHeaderToolbar>

      </CardHeader>
      <CardBody>

        <Formik
          enableReinitialize
          initialErrors={error}
          validationSchema={
            Yup.object().shape({
              id: Yup.number().nullable(),
              firstName: Yup.string().required(),
              lastName: Yup.string(),
              email: Yup.string().email(),
              username: YupAuthUsername(),
              password: Yup.string().when('id', {
                is: (val) => !val,
                then: YupAuthPassword()
              }),
              _confirm: Yup.string().when('id', {
                is: (val) => !val,
                then: YupAuthPasswordConfirm()
              }),
              role: Yup.object().nullable(),
              attributes: Yup.array().of(Yup.object().shape({
                attKey: Yup.string().required(),
                attValue: Yup.string().required(),
              })),
            })
          }
          initialValues={data}
          onSubmit={({fileName, ...values})=>{
            dispatch(saveUser(values, {fileName}))
          }}
          render={formik=>(
            <Form
              formik={formik}
              btnRef={saveBtnRef}
            />)}
        />

      </CardBody>

    </Card>
  );
}

