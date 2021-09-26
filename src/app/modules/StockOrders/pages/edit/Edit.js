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
  fetchStockOrderForEdit , resetStockOrderForEdit,
  saveStockOrder,
  useStockOrdersEditState
} from "../../../../../redux/stockOrders";
import {Form} from "./Form";
import {AEButton} from "../../../../../_ae/components/buttons";

export const Edit = ({ history, match: { params: { id }, }}) => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const { isLoading, data, error } = useStockOrdersEditState();

  useEffect(() => {
    dispatch(
      id ?
        fetchStockOrderForEdit(id) :
        resetStockOrderForEdit()
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
              number: Yup.string().required(),
              orderedAt: Yup.string().required(),
              vat: Yup.number().positive().required(),
              vendor: Yup.object().required(),
              stockOrderLines: Yup.array().of(
                Yup.object().shape({
                  price: Yup.number().positive().required(),
                  qty: Yup.number().positive().required(),
                  variant: Yup.object().required(),
                })
              )
            })
          }
          initialValues={data}
          onSubmit={({...values})=>{

            dispatch(saveStockOrder(values))
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

