import {AEInput} from "./AEInput";
import {Field} from "formik";
import React from "react";
import {AEAutoComplete} from "./AEAutoComplete";
import {AEDatePicker} from "./AEDatePicker";
import {AEFile} from "./AEFile";
import {AEEditor} from "./AEHtmlEditor";
import {AESlider} from "./AESlider";

export const AEField = ({name, label, component = AEInput, ...props}) => (
  <Field
    name={name}
    label={label}
    component={component}
    {...props}
  />
)

export const AEAutocompleteField = ({...props}) => (
  <AEField
    component={AEAutoComplete}
    {...props}
  />
)

export const AEDatePickerField = ({...props}) => (
  <AEField
    component={AEDatePicker}
    {...props}
  />
)

export const AEFileField = ({...props}) => (
  <AEField
    component={AEFile}
    {...props}
  />
)

export const AEHtmlField = ({...props}) => (
  <AEField
    component={AEEditor}
    {...props}
  />
)

export const AESliderField = ({...props}) => (
  <AEField
    component={AESlider}
    {...props}
  />
)