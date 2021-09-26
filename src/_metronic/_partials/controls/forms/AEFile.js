import React from "react";
import {FieldFeedbackLabel} from "./FieldFeedbackLabel";
import TextField from "@material-ui/core/TextField";
import {API_DOCUMENTS_PATH} from "../../../../_ae/helpers/UIHelper";
import Dropzone from "react-dropzone";
import {useIntl} from "react-intl";
import {toAbsoluteUploadUrl} from "../../../_helpers";

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

export function AEFile({
  field: {name, value}, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue, values }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel = true,
  customFeedbackLabel,
  type = "select",
  validation = true,
  shrinkLabel = false,

  //dz props
  preview = false,
  previewPath = '',
  multiple = false,
  accept,
  ...props

}) {
  const {formatMessage} = useIntl()
  label = formatMessage({id:label})
  customFeedbackLabel = customFeedbackLabel ? customFeedbackLabel : formatMessage({id:'DROPZONE.DESCRIPTION'})
  // let InputLabelProps =  {}
  // if(shrinkLabel) InputLabelProps.shrink = true;
  // console.log(value)
  return (
    <>
      <Dropzone
        onDrop={acceptedFiles => {
          setFieldValue(name, multiple ? acceptedFiles : acceptedFiles[0])
        }}
        accept={accept}
        multiple={multiple}
        // noClick={true}
        noKeyboard={true}>
        {({getRootProps, getInputProps, isDragActive}) => {
          let url = null;
          if (preview) {
            switch (true) {
              case value instanceof File :
                url = URL.createObjectURL(value);
                break;
              default:
                url = toAbsoluteUploadUrl(`${previewPath}/${value}`);
            }
          }

          return (
            <div {...getRootProps({className: 'dropzone dropzone-default dropzone-brand h-100 d-flex align-items-center justify-content-center'})} >
              <input {...getInputProps()} />
              <div className="row" >
                {
                  preview && (value || values.fileName) &&
                  <div className={"col-12"}>
                    <img src={url} className="rounded" alt="..." width={100} height={100}/>
                  </div>
                }

                <div className={"col-12"}>
                  {
                    isDragActive ?
                      <p className="dropzone-msg-title">{formatMessage({id:'DROPZONE.DESCRIPTION'})}</p> :
                      <h5 className="kt-section__title">
                        {label}
                        <br/>

                        <small>
                          {withFeedbackLabel && (
                            <FieldFeedbackLabel
                              error={errors[name]}
                              touched={touched[name]}
                              label={label}
                              type={type}
                              customFeedbackLabel={customFeedbackLabel}
                            />
                          )}
                        </small>
                      </h5>
                  }
                  {
                    value && ! preview &&
                      (multiple ? value: [value])
                        .filter((file)=>file.name)
                        .map((file,index)=>(
                          <div key={index} className="label label-inline">{file.name}</div>
                        ))

                  }


                </div>
              </div>
            </div>
          )
        }}
      </Dropzone>

      {/*{label && <label>Enter {label}</label>}*/}
      {/*<TextField*/}
      {/*  type={type}*/}
      {/*  className={"form-control h-auto "+(validation && getFieldCSSClasses(touched[field.name], errors[field.name]))}*/}
      {/*  variant={"outlined"}*/}
      {/*  InputLabelProps={InputLabelProps}*/}
      {/*  size={"small"}*/}
      {/*  fullWidth*/}
      {/*  label={label}*/}
      {/*  {...field}*/}
      {/*  {...props}*/}
      {/*/>*/}

    </>
  );
}
