import React, {useState} from "react";
import {FieldFeedbackLabel} from "./FieldFeedbackLabel";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/styles";
import {useIntl} from "react-intl";
import {Rating} from "@material-ui/lab";
import {Box} from "@material-ui/core";
import {AEIcon} from "../../../../_ae/components/svg";

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
    },
  },
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});




function IconContainer(props) {
  const { value: number, ...other } = props;
  return (
    <span {...other}>
      {
        Number.isInteger(number) ? "1" : "0.5"
      }
    </span>);
}


export function AERater({
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
    <div className={classes.root}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          setFieldValue(name, newValue);
        }}
      />
      {value}
    </div>
  );




  return (
    <>
      <TextField
        type={type}
        className={`${className} ${borderless ? classes.borderless : ''} form-control h-auto ${disabled ? 'bg-light' : ''}`+(validation && getFieldCSSClasses(touched[name], errors[name]))}
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
            v = parseInt(v)
          }
          setFieldValue(name, v)
        }}
        onBlur={event => {setFieldTouched(name,true)}}

      />
      {!disabled && withFeedbackLabel && (
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
