import React, {useEffect} from "react";
import {FormattedMessage} from "react-intl";
import {
  AEAutocompleteField,
  AEField,
  AEFileField
} from "../../../../../_metronic/_partials/controls/forms/AEField";
import {localField} from "../../../../../_ae/helpers/UIHelper";
import {InputAdornment} from "@material-ui/core";
import {useProductsDetailState} from "../../../../../redux/products";
import {ProductField} from "../../../Products";

export const Form = ({values, handleSubmit, setFieldValue, btnRef}) => {
  const {data:product} = useProductsDetailState(); // todo


  useEffect(()=>{
    setFieldValue('product', product.id ? product : values.product)
  }, [product])


  return (
    <div className="form form-label-right">
      <div className="form-group row">
        <div className={"col-lg"}>
          <AEFileField
            multiple
            name={'images'}
            label={'IMAGES'}
            // preview
            previewPath={'/variant_images'}
          />
        </div>
      </div>

      <div className="form-group row">
        <div className={"col-lg"}>
          <ProductField
            disabled
          />
        </div>

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
            name="shippingDelay"
            label={'SHIPPING_DELAY'}
            type={'number'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <FormattedMessage id={'HOURS'} />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={"col-lg"}>
          <AEField
            name="price"
            label={'PRICE'}
            type={'number'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <FormattedMessage id={'MAD'} />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>

      {
        values.product && values.product.attributes.length > 0 &&
        <div className="form-group row">
          {
            values.product.attributes.map((attribute, index)=>(
              <div key={attribute.id} className={"col-lg"}>
                <AEAutocompleteField
                  name={`options.${index}`}
                  label={attribute[localField()]}
                  options={attribute.options}
                  getOptionLabel={o=>o.value}
                  useI18n={false}
                />
              </div>
            ))
          }
        </div>
      }


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


      <button
        style={{ display: "none" }}
        ref={btnRef}
        onClick={handleSubmit}
      />
    </div>
  );
}

