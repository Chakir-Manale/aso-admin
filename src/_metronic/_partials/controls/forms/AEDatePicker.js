import React, {useState} from "react";
import {FieldFeedbackLabel} from "./FieldFeedbackLabel";
import TextField from "@material-ui/core/TextField";
import {DateTimePicker, DatePicker} from "@material-ui/pickers";
import moment from "moment";
import {useIntl} from "react-intl";
import {DateTimeFormat} from "../../../../_ae/helpers/momentHelper";

const getFieldCSSClasses = (touched, errors) => {
  const classes = [];
  if (touched && errors) {
    classes.push("is-invalid");
  }

  if (touched && !errors) {
    classes.push("is-valid");
  }

  return classes.join(" ");
};


export const AEDateSerialize = (dateMoment, format = DateTimeFormat)=>dateMoment.format(format)
export const AEDateDeserialize = (dateTimeSting, format = DateTimeFormat)=>{
  const date = moment(dateTimeSting, format)

  return date.isValid() ? date : null
}

export function AEDatePicker({
                               field: { name, value , ...field},
                               form: { touched, errors, values, setFieldValue, setFieldTouched }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                               label,
                               withFeedbackLabel = true,
                               customFeedbackLabel,
                               type = "datetime",
                               validation = true,
                               shrinkLabel = false,
                               disabled = false,
                               inputVariant = "outlined",
                               size="small",
                               ...props
                             }) {
  const {formatMessage} = useIntl()
  label = formatMessage({id:label})
  let InputLabelProps =  {}
  if(shrinkLabel) {
    InputLabelProps.shrink = true;
  }
  let Picker = DateTimePicker;

  let serializationFormat = 'YYYY-MM-DD HH:mm:ss';
  let displayFormat = 'LLL';

  switch (type){
    case "date": {
      Picker = DatePicker;
      serializationFormat = 'YYYY-MM-DD';
      displayFormat = 'LL';
    } break;
  }

  return (
    <>
      <Picker
        clearable
        okLabel={formatMessage({id:'OK'})}
        cancelLabel={formatMessage({id:'CANCEL'})}
        clearLabel={formatMessage({id:'CLEAR'})}
        className={`s ${disabled ? 'bg-light' : ''}`+(validation && getFieldCSSClasses(touched[name], errors[name]))}
        inputVariant={inputVariant}
        InputLabelProps={InputLabelProps}
        size={size}
        fullWidth
        disabled={disabled}
        label={label}
        onChange={date=>{
          setFieldTouched(name, true)
          setFieldValue(name, date?.format(serializationFormat))
        }}
        value={value}
        labelFunc={date => {
          return value ? date.format(displayFormat) : ''
        }}
        helperText={''}
        {...props}
      />
      {withFeedbackLabel && (
        <FieldFeedbackLabel
          error={errors[name]}
          touched={touched[name]}
          label={label}
          type={type}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </>
  );
}
