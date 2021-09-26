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
  fetchPackForEdit , resetPackForEdit,
  savePack,
  usePacksEditState
} from "../../../../../redux/packs";
import {Form} from "./Form";
import {AEButton} from "../../../../../_ae/components/buttons";


export const Edit = ({ history, match: { params: { id }, }}) => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const { isLoading, data, error } = usePacksEditState();

  useEffect(() => {
    dispatch(
      id ?
        fetchPackForEdit(id) :
        resetPackForEdit()
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
              descFr: Yup.string(),
              price: Yup.number().positive().required(),
              fileName: Yup.mixed().required(),
              packVariantLines: Yup.array().of(
                Yup.object().shape({
                  qty: Yup.number().positive().required(),
                  variant: Yup.object().required(),
                })
              ).min(1)
            })
          }
          initialValues={data}
          onSubmit={({fileName, ...values})=>{

            dispatch(savePack(values, fileName))
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

