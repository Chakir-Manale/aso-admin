import React from "react";
import {useIntl} from "react-intl";

export function FieldFeedbackLabel({
  label,
  touched,
  error,
  type,
  customFeedbackLabel
}) {
  //todo depth

  const {formatMessage} = useIntl();


  if (touched && error) {
    const {descriptor, props} = error;

    return <div className="invalid-feedback d-block">
      {descriptor && descriptor.id ? formatMessage(descriptor, {...props, path: label}) : formatMessage({id:"VALIDATION.MIXED.INVALID"},{path:label})}
      {/*{*/}
      {/*  typeof error === 'object' ?*/}
      {/*    Object.keys(error).map(k=>`${k}: ${formatMessage(error[k])}`)*/}
      {/*    :error*/}
      {/*}*/}
    </div>;
  }

  if (touched && !error && label) {
    return (
      <div className="valid-feedback d-block">
        { formatMessage( {id:"VALIDATION.MIXED.VALID"}, {path: label} ) }
      </div>);
  }

  return (
    <div className="feedback d-block font-weight-light">
      {
        customFeedbackLabel &&
          customFeedbackLabel /*:
          formatMessage({id:"VALIDATION.MIXED.UNTOUCHED"}, {type: type, path: label})*/
      }
    </div>
  );
  // switch (type) {
  //   return inputLabel({ label, touched, error, customFeedbackLabel });
    // case "text":
    //   return inputLabel({ label, touched, error, customFeedbackLabel });
    // case "email":
    //   return inputLabel({ label, touched, error, customFeedbackLabel });
    // case "password":
    //   return inputLabel({ label, touched, error, customFeedbackLabel });
    // default:
    //   return selectLabel({ label, touched, error, customFeedbackLabel });
}
