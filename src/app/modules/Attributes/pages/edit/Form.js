import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import {useIntl} from "react-intl";
import {AEAutocompleteField, AEField, AEFileField} from "../../../../../_metronic/_partials/controls/forms/AEField";
import {useMetadata} from "../../../../../_ae/AEPagination";
import {localField} from "../../../../../_ae/helpers/UIHelper";
import {InputAdornment} from "@material-ui/core";
import {AEButton} from "../../../../../_ae/components/buttons";
import {AEIcon, ICONS} from "../../../../../_ae/components/svg";
import {defaultPhoneNumbers} from "../../../../../redux/users/slices/edit";
import {FieldArray} from "formik";

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
  const {formatMessage} = useIntl();

  return (
    <div className="form form-label-right">
      <div className="form-group row">
        <div className={"col-lg"}>
          <AEField
            name="nameFr"
            label={'NAME'}
          />
        </div>
      </div>
      <div className="form-group row">
        <div className={"col-lg"}>
          <AEField
            type={'textarea'}
            rows={5}
            name="descFr"
            label={'DESCRIPTION'}
          />
        </div>
      </div>
      <div className="">
        <FieldArray
          name="options"
          render={arrayHelpers => {

            return (
              <div className={''}>
                <div className={'d-flex align-items-center pl-3 gutter-b'}>
                  <span className="font-size-h3 font-weight-bold">
                    {formatMessage({id: 'OPTIONS'})}
                  </span>
                  <AEButton
                    variant={'clean'}
                    icon
                    onClick={()=>{
                      arrayHelpers.push( {
                        route: undefined
                      })
                    }}
                  >
                    <AEIcon
                      variant={'primary'}
                      path={ICONS.PLUS}
                      size={'lg'}
                    />
                  </AEButton>
                </div>
                <div className={'row from-group'}>
                  {
                    values.options.map((option, index)=>(
                      <div key={index} className={'form-group col-lg-3'}>
                        <AEField
                          name={`options.${index}.value`}
                          label={'VALUE'}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <AEButton
                                  variant={'clean'}
                                  icon
                                  onClick={()=>{
                                    arrayHelpers.remove(index)
                                  }}
                                >
                                  <AEIcon path={ICONS.DELETE} variant={'danger'}/>
                                </AEButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                    ))
                  }
                </div>

              </div>
            )

          }}
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

