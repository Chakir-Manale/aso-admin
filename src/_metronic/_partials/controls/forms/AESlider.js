import React from "react";
import {FieldFeedbackLabel} from "./FieldFeedbackLabel";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/styles";
import {useIntl} from "react-intl";
import get from 'lodash/get';
import {Slider, Tooltip, Typography} from "@material-ui/core";
import {AECurrency} from "../../../../_ae/components/Currency";

const ValueLabelComponent = ({ children, open, value })=>(
  <Tooltip
    open={open}
    enterTouchDelay={0}
    placement="top"
    title={(
      <div className="font-weight-bolder font-size-lg">
        <AECurrency value={value} />
      </div>
    )}
  >
    {children}
  </Tooltip>
)

export function AESlider({
  field,
  form,
  label,
  withFeedbackLabel = true,
  customFeedbackLabel,
  type = "text",
  validation = true,
  shrinkLabel = false,
  disabled = false,
  borderless = false,
  className = '', variant = "outlined",
  rows = 1,
  ...props
}) {
  const {name, value, onChange, onBlur} = field;
  const { touched, errors, values, setFieldValue, setFieldTouched} = form;

  const {formatMessage} = useIntl()
  label = formatMessage({id:label})

  let InputLabelProps =  { }
  if(shrinkLabel) InputLabelProps.shrink = true;
  return (
    <>
      <label className="">
        {label}
      </label>
      <Slider
        ValueLabelComponent={ValueLabelComponent}
        defaultValue={value}
        // value={value}
        onChangeCommitted={(e, newValue)=>{
          setFieldValue(name, newValue)
        }}
        valueLabelDisplay="auto"
        {...props}
      />
      {!disabled && withFeedbackLabel && (
        <FieldFeedbackLabel
          error={get(errors, name)}
          touched={get(touched, name)}
          label={label}
          type={type}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </>
  );
}
