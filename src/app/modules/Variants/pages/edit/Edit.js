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
  fetchVariantForEdit , resetVariantForEdit,
  saveVariant,
  useVariantsEditState
} from "../../../../../redux/variants";
import {Form} from "./Form";
import {AEButton} from "../../../../../_ae/components/buttons";
import {
  fetchProductForDetail, resetProductForDetail,
} from "../../../../../redux/products";

export const Edit = ({ history, match: { params: { productId, id:variantId }, }}) => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const { isLoading, data, error } = useVariantsEditState();

  useEffect(() => {
    dispatch(
      variantId ?
        fetchVariantForEdit(variantId) :
        resetVariantForEdit()
    );
  }, [variantId, dispatch]);

  useEffect(() => {
    dispatch(
      productId ?
        fetchProductForDetail(productId) :
        resetProductForDetail()
    );
  }, [productId, dispatch]);

  const saveBtnRef = useRef();
  const saveBtnRefClick = () => {
    if (saveBtnRef && saveBtnRef.current) {
      const {current} = saveBtnRef;
      current.click()
    }
  };

  // console.log({
  //   ...data,
  //   product: productState.data
  // })

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
              nameFr: Yup.string().required(),
              descFr: Yup.string(),
              status: Yup.string().required(),
              shippingDelay: Yup.number().positive().required(),
              price: Yup.number().positive().required(),
              product: Yup.object().required(),
              options: Yup.array(),
            })
          }
          initialValues={data}
          onSubmit={({images, ...values})=>{
            // console.log(values, fileName)
            dispatch(saveVariant(values, {images}))
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

