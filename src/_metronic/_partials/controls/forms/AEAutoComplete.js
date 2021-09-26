import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import {useIntl} from "react-intl";
import {FieldFeedbackLabel} from "./FieldFeedbackLabel";
import CircularProgress from "@material-ui/core/CircularProgress";


export function AEAutoComplete({
  field: {name, value, ...fields}, // { name, value, onChange, onBlur }
  form: { touched, errors, setTouched,  setFieldValue, setFieldTouched, values, ...form }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  getOptionLabel = o=>o,
  withFeedbackLabel = true,
  customFeedbackLabel ,
  type = "text",
  validation = true,
  borderless = false,
  size="small",
  disabled = false,
  options = [],
  className = "",
  variant = "outlined",
  multiple = false,
  loading,
  useI18n = true,
  ...props
}) {
  const {formatMessage} = useIntl()
  if (useI18n) {
    label = formatMessage({id:label})
  }


  //console.log(props)

  return (
    <>
      <Autocomplete
        name={name}
        size={size} fullWidth multiple={multiple}
        options={options}
        getOptionLabel={getOptionLabel}
        value={value} //careful: form edit team
        // getOptionSelected={(option) => option === value}
        onChange={(_,v,reason) => {
          const defaultValue = multiple ? [] : undefined;
          setFieldValue(name, reason === "clear" ? defaultValue : v);
        }}
        onBlur={ () => setFieldTouched(name,true) }
        disabled={disabled}
        loading={loading}
        {...props}
        renderInput={(params) => {
          return (
            <>
              <TextField
                {...params}
                label={label}
                variant={variant}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
              {/*{*/}
              {/*  loading &&*/}
              {/*  <ProgressBar*/}
              {/*    variant={"primary"}*/}
              {/*    animated*/}
              {/*    now={100}*/}
              {/*    className="h-2px align-self-center w-50"*/}
              {/*  />*/}
              {/*}*/}
              </>
          )

          // return (
          //   <div ref={params.InputProps.ref}>
          //     <input style={{ width: 200 }} type="text" {...params.inputProps} />
          //   </div>
          // )
          // for ( var i in params ) {
          //   if(i === "inputProps") console.log(i, params[i]);
          // }
          // params.InputProps.inputProps = params.inputProps;
          // delete params.InputProps;
          // params.inputProps.value = "aaa"
          // const {} = params.inputProps;
          // params.inputProps = {
          //
          // }

          //issue
          // console.log(params)
          /*
          * aria-activedescendant: null
            aria-autocomplete: "list"
            aria-controls: null
            autoCapitalize: "none"
            autoComplete: "off"
            className: "MuiAutocomplete-input MuiAutocomplete-inputFocused"
            disabled: false
            id: "mui-353"
            onBlur: ƒ handleBlur(event)
            onChange: ƒ handleInputChange(event)
            onFocus: ƒ handleFocus(event)
            onMouseDown: ƒ handleInputMouseDown(event)
            ref: {current: input#mui-353.MuiInputBase-input.MuiOutlinedInput-input.MuiAutocomplete-input.MuiAutocomplete-input…}
            spellCheck: "false"
            value: "fixx"
* */

          // params.inputProps = {
          //
          // }
          // console.clear()
          // console.log(value, params, props)

          // return (
          //   <Field
          //     component={AEInput}
          //     name={name}
          //     withFeedbackLabel={withFeedbackLabel} customFeedbackLabel={customFeedbackLabel}
          //     type={"select"}
          //     label={label}
          //     shrinkLabel
          //     borderless={borderless}
          //     validation={validation}
          //     {...params}
          //   />
          // )
        }}
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
