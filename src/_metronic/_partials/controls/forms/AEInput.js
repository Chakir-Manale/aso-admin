import React from "react";
import {FieldFeedbackLabel} from "./FieldFeedbackLabel";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/styles";
import {useIntl} from "react-intl";
import get from 'lodash/get';

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

const useStyles = makeStyles({
  borderless: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: 0
      }
    }
    // border: 0,
  }
});



export function AEInput({
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

  // console.log(props)

  // console.clear()
  // console.log(touched, errors, name, touched[name], errors[name], field)

  const {formatMessage} = useIntl()
  const classes = useStyles();
  label = formatMessage({id:label})

  let InputLabelProps =  { }
  if(shrinkLabel) InputLabelProps.shrink = true;
  return (
    <>
      <TextField
        type={type}
        className={`${className} ${borderless ? classes.borderless : ''} -form-control -h-auto ${disabled ? 'bg-light' : ''}`+(validation && getFieldCSSClasses(touched[name], errors[name]))}
        variant={variant}
        value={value}
        InputLabelProps={InputLabelProps}
        size={"small"}
        fullWidth
        multiline={type === 'textarea'} rows={rows}
        disabled={disabled}
        label={label}
        onChange={event => {
          let v = event.target.value;
          if (type === "number"){
            v = parseFloat(v)
          }
          setFieldValue(name, v)
        }}
        onBlur={event => {setFieldTouched(name,true)}}
        {...props} //warning endAdornment
      />
      {!disabled && withFeedbackLabel && (
        <FieldFeedbackLabel
          error={get(errors, name)}
          touched={get(touched, name)}
          label={label}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </>
  );
}
