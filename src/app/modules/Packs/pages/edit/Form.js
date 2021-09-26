import React, {useEffect} from "react";
import {FormattedMessage, useIntl} from "react-intl";
import {
  AEAutocompleteField,
  AEField, AEFileField
} from "../../../../../_metronic/_partials/controls/forms/AEField";
import {FieldArray} from "formik";
import {AEButton} from "../../../../../_ae/components/buttons";
import {AEIcon, ICONS} from "../../../../../_ae/components/svg";
import {defaultPackVariantLine} from "../../../../../redux/packs/slices/edit";
import {Card, CardBody} from "../../../../../_metronic/_partials/controls";
import {MODULES} from "../../../../../_ae/helpers/RoutingHelpers";
import {VariantField} from "../../../Variants";

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
          <AEFileField
            name="fileName"
            label={'IMAGE'}
            preview
            previewPath={`/${MODULES.PACKS}`}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md form-group">
          <AEField
            name="nameFr"
            label={'NAME'}
          />
        </div>
        <div className={"col-md form-group"}>
          <AEField
            name="price"
            label={'PRICE'}
            type={'number'}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md form-group">
          <AEField
            name="descFr"
            label={'DESCRIPTION'}
          />
        </div>
      </div>
      <div className="form-group">

        <FieldArray
          name="packVariantLines"
          render={(helpers) => (
            <div>
              <div className={'d-flex align-items-center form-group'}>
                <span className="font-size-h3 font-weight-bold">
                  <FormattedMessage id={'VARIANTS'} />
                </span>
                <AEButton
                  variant={'clean'}
                  icon
                  onClick={()=>{
                    helpers.push(defaultPackVariantLine)
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
                values.packVariantLines.map((line, index)=>(
                  <Card key={index} className={'card-border'}>
                    <CardBody className={'pb-0'}>
                      <div className="d-flex justify-content-between align-items-center gutter-b">
                        <div className='font-weight-bold font-size-h5'>
                          <FormattedMessage id={'VARIANT'} />
                          {` : ${index+1}`}
                        </div>
                        {
                          values.packVariantLines.length > 1 &&
                          <AEButton
                            variant={'light-danger'}
                            size={'sm'}
                            onClick={()=>{
                              helpers.remove(index)
                            }}
                          >
                            <AEIcon
                              path={ICONS.DELETE}
                              size={'sm'}
                            />
                            <FormattedMessage id={'DELETE'} />
                          </AEButton>
                        }

                      </div>
                      <div className={'row'}>
                        <div className='col-md form-group'>
                          <VariantField
                            name={`packVariantLines.${index}.variant`}
                            />
                        </div>
                        <div className="col-md form-group">
                          <AEField
                            name={`packVariantLines.${index}.qty`}
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

