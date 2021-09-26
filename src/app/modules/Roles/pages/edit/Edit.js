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
import {
  fetchRoleForEdit , resetRoleForEdit,
  saveRole,
  useRolesEdit
} from "../../../../../redux/roles";
import {Form} from "./Form";
import {AEButton} from "../../../../../_ae/components/buttons";
import {fetchRoutesSelect} from "../../../../../redux/routes";
import {useAuthState} from "../../../../../redux/auth";

//todo server validation errors
export const Edit = ({ history, match: { params: { id }, }}) => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const { user: authUser } = useAuthState();
  const { isLoading, data, error } = useRolesEdit();

  useEffect(() => {
    dispatch(
      id ?
        fetchRoleForEdit(id) :
        resetRoleForEdit()
    );
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(
      fetchRoutesSelect()
    );
  }, [dispatch]);

  console.log(data)

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
              nameFr: Yup.string().required(),
              priority: Yup.number().min(authUser.role.priority+1),
              routes: Yup.array()
            })
          }
          initialValues={data}
          onSubmit={({...values})=>{

            dispatch(saveRole(values))
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

