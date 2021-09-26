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
  fetchAreaForEdit , resetAreaForEdit,
  saveArea,
  useAreasEditState
} from "../../../../../redux/areas";
import {Form} from "./Form";
import {AEButton} from "../../../../../_ae/components/buttons";

export const Edit = ({ history, match: { params: { id }, }}) => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const { isLoading, data, error } = useAreasEditState();

  useEffect(() => {
    dispatch(
      id ?
        fetchAreaForEdit(id) :
        resetAreaForEdit()
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
      <CardBody className={'pt-10'}>
        <Formik
          enableReinitialize
          initialErrors={error}
          validationSchema={
            Yup.object().shape({
              nameFr: Yup.string().required(),
              parent: Yup.object().nullable(),
            })
          }
          initialValues={data}
          onSubmit={values=>{
            dispatch(saveArea(values))
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

