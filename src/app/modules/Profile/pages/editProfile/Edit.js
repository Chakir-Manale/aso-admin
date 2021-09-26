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
import {fetchProfileForEdit, saveProfile, useProfileEditState} from "../../../../../redux/auth";
import {authActions} from "../../../../../redux/auth/authRedux";
import {getUserByToken} from "../../../../../redux/auth/api";

export const Edit = ({ history }) => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const { isLoading, data, error } = useProfileEditState();

  useEffect(() => {
    dispatch(fetchProfileForEdit());
  }, [dispatch]);

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
              id: Yup.number().nullable(),
              firstName: Yup.string().required(),
              lastName: Yup.string(),
              email: Yup.string().email(),
            })
          }
          initialValues={data}
          onSubmit={({fileName, ...values})=>{
            dispatch(saveProfile(values, fileName)).then((response)=>{
              getUserByToken().then(r => {
                dispatch(authActions.requestUser(r.data))
              })
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

