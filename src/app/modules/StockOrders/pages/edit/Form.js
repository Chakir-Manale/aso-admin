import React from "react";
import {FormattedMessage} from "react-intl";
import {
  AEDatePickerField,
  AEField
} from "../../../../../_metronic/_partials/controls/forms/AEField";
import {FieldArray} from "formik";
import {AEButton} from "../../../../../_ae/components/buttons";
import {AEIcon, ICONS} from "../../../../../_ae/components/svg";
import {defaultStockOrderLine} from "../../../../../redux/stockOrders/slices/edit";
import {Card, CardBody} from "../../../../../_metronic/_partials/controls";
import {VariantField} from "../../../Variants";
import {VendorField} from "../../../Vendors";

export const Form = ({
                       values,
                       errors,
                       touched,
                       handleChange,
                       handleBlur,
                       handleSubmit,
                       isSubmitting,
                       btnRef,
}) => {

  return (
    <div className="form form-label-right">
      <div className="row">
        <div className="col-md form-group">
          <AEField
            name="number"
            label={'ORDER_NUMBER'}
          />
        </div>
        <div className={"col-md form-group"}>
          <AEField
            name="vat"
            label={'VAT'}
            type={'number'}
          />
        </div>
        <div className={"col-md form-group"}>
          <AEDatePickerField
            name="orderedAt"
            label={'ORDER_DATE'}
            type={'date'}
          />
        </div>
        <div className={"col-md form-group"}>
          <VendorField
            />
        </div>
      </div>
      <div className="form-group">
        <FieldArray
          name="stockOrderLines"
          render={(helpers) => (
            <div>
              <div className={'d-flex align-items-center form-group'}>
                <span className="font-size-h3 font-weight-bold">
                  <FormattedMessage id={'ORDER_LINES'} />
                </span>
                <AEButton
                  variant={'clean'}
                  icon
                  onClick={()=>{
                    helpers.push(defaultStockOrderLine)
                  }}
                >
                  <AEIcon
                    variant={'primary'}
                    path={ICONS.PLUS}
                    size={'lg'}
                  />
                </AEButton>
              </div>
              {
                // !routeLoading &&
                values.stockOrderLines.map((line, index)=>(
                  <Card key={index} className={'card-border'}>
                    <CardBody className={'pb-0'}>
                      <div className="d-flex justify-content-between align-items-center gutter-b">
                        <div className='font-weight-bold font-size-h5'>
                          <FormattedMessage id={'LINE'} />
                          {` : ${index+1}`}
                        </div>
                        <AEButton
                          variant={'light-danger'}
                          size={'sm'}
                          onClick={()=>{
                            helpers.remove(index)
                          }}
                        >
                          <AEIcon
                            // variant={'danger'}
                            path={ICONS.DELETE}
                            size={'sm'}
                          />
                          <FormattedMessage id={'DELETE'} />
                        </AEButton>
                      </div>
                      <div className={'row'}>
                        <div className='col-md form-group'>
                          <VariantField
                            name={`stockOrderLines.${index}.variant`}
                            />
                        </div>
                        <div className="col-md form-group">
                          <AEField
                            name={`stockOrderLines.${index}.price`}
                            label={'PRICE'}
                            type={'number'}
                          />
                        </div>
                        <div className="col-md form-group">
                          <AEField
                            name={`stockOrderLines.${index}.qty`}
                            label={'QUANTITY'}
                            type={'number'}
                          />
                        </div>

                      </div>

                    </CardBody>
                  </Card>
                ))
              }
            </div>
          )}
        />
      </div>



      <button
        style={{ display: "none" }}
        ref={btnRef}
        onClick={handleSubmit}
      />
    </div>
  );
}

